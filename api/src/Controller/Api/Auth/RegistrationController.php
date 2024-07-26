<?php

namespace App\Controller\Api\Auth;

use App\Controller\AbstractAPIController;
use App\Entity\User;
use App\Entity\VerificationToken;
use App\Repository\UserRepository;
use App\Repository\VerificationTokenRepository;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationController extends AbstractAPIController
{
    public function __construct(
        private VerificationTokenRepository $verificationTokenRepository,
        private MailerInterface $mailer
    ) {}

    #[Route('/api/auth/register', name: 'auth.register', methods: ['POST'])]
    public function register(Request $request, ValidatorInterface $validator, UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository): JsonResponse
    {
        $req = $request->toArray();

        // Sprawdzenie czy użytkownik o podanej nazwie i emailu użytkownika już istnieje
        $user = $userRepository->findOneBy(['username' => $req['username']]);
        if($user) {
            return $this->json(['errors' => [
                'username' => 'A user with this username already exists'
            ]],  Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        
        $user = $userRepository->findOneBy(['email' => $req['email']]);
        if($user) {
            if(!$user->getVerificationToken()->isIsVerified()) {
                return $this->json(['errors' => [
                    'email' => 'A user with this email already exists. Registration has not been confirmed yet. Please check your email.'
                ]], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            return $this->json(['errors' => [
                'email' => 'A user with this email already exists.'
            ]], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if(strlen($req['password']) < 6) {
            return $this->json(['errors' => [
                'password' => 'The password must be at least 6 characters long.'
            ]], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if(strlen($req['password']) > 20) {
            return $this->json(['errors' => [
                'password' => 'The password must be at most 20 characters long.'
            ]], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if($req['password'] !== $req['password_confirmation']) {
            return $this->json(['errors' => [
                'password_confirmation' => 'The password confirmation does not match.'
            ]], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Utworzenie nowego użytkownika
        $user = new User();
        $user->setUsername($req['username']);
        $user->setEmail($req['email']);
        $user->setPassword($passwordHasher->hashPassword($user, $req['password']));
        $user->setIsActiveAccount(false);
        $user->setIsAgree($req['isAgree']);
        $user->setRoles(['ROLE_USER']);

        // Walidacja danych
        $violations = $validator->validate($user, null, ['register']);

        if (count($violations) > 0) {
            $errors = $this->formatValidationErrors($violations);
            
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        
        // // Wygenerowanie tokenu weryfikacyjnego
        $verificationToken = $this->generateVerificationToken($user);

        // // Wysłanie maila weryfikacyjnego
        $this->sendVerificationEmail($user->getEmail(), $verificationToken, $user);

        $this->flash('Registration completed successfully. Check your email inbox for verification.');

        return $this->api([], [], 201);
    }

    private function generateVerificationToken(User $user): string
    {
        $token = bin2hex(random_bytes(32));

        // Zapisanie tokena do bazy danych w tabeli VerificationToken
        $verificationToken = new VerificationToken();
        $verificationToken->setToken($token);
        $verificationToken->setOwnedBy($user);
        $verificationToken->setIsVerified(false);

        $this->verificationTokenRepository->save($verificationToken, true);

        return $token;
    }


    private function sendVerificationEmail(string $email, string $verificationToken, User $user): void
    {
        $url = $this->generateUrl('verify.email', ['token' => $verificationToken], UrlGeneratorInterface::ABSOLUTE_URL);
   
        $email = (new TemplatedEmail())
            ->from(new Address('noreply@example.com', 'Atp'))
            ->to(new Address($email, $user->getUsername()))
            ->subject('Potwierdzenie adresu email')
            ->htmlTemplate('email/verification-email.html.twig')
            ->context([
                'name' => $user->getUsername(),
                'url' => $url
            ]);

        $this->mailer->send($email);
    }

    #[Route('/api/verify/email', name: 'verify.email')]
    public function verifyUserEmail(Request $request, UserRepository $userRepository): RedirectResponse
    {
        $token = $request->query->get('token');

        if ($token == '' | null) {
            return $this->redirectToClientRoute('/');
        }

        $verificationToken = $this->verificationTokenRepository->findOneBy(['token' =>  $token]);
        $verificationToken->setIsVerified(true);

        $this->verificationTokenRepository->save($verificationToken, true);

        $userId = $verificationToken->getOwnedBy()->getId();

        $user =  $userRepository->find($userId);
        $user->setIsActiveAccount(true);

        $userRepository->save($user, true);

        return $this->redirectToClientRoute('/?verified=true');
    }
}
