<?php

namespace App\Controller\Api\Authorization;

use App\Controller\AbstractAPIController;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Constraints\EqualTo;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[Route('/api/profile', name: 'profile')]
class Profile extends AbstractAPIController
{
    public function __construct(private UserRepository $userRepository) {}

    #[IsGranted('ROLE_USER')]
    #[Route('/{id}', name: ':me', methods: ['GET'])]
    public function me(#[CurrentUser()] User $user = null): JsonResponse
    {
        return $this->api([
            'user' => $user 
        ], ['profile:read']);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/{id}', name: ':update', methods: ['PATCH', 'PUT'])]
    public function update(#[CurrentUser()] User $user = null, Request $request, ValidatorInterface $validator): JsonResponse
    {
        $req = $request->toArray();

        $user->setUsername($req['username']);
        $user->setEmail($req['email']);
        $user->setFirstName($req['firstName']);
        $user->setLastName($req['lastName']);
        $user->setBio($req['bio']);

        $violations = $validator->validate($user, null, ['profile:write']);

        if (count($violations) > 0) {
            $errors = $this->formatValidationErrors($violations);
            
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $this->userRepository->save($user, true);

        $this->flash('Profile updated successfully.');

        return $this->api([
            'user' => $user 
        ], ['profile:read']);
    }


    #[IsGranted('ROLE_USER')]
    #[Route('/{id}/update-password', name: ':update-password', methods: ['PATCH'])]
    public function updatePassword(#[CurrentUser()] User $user = null, Request $request, ValidatorInterface $validator, UserPasswordHasherInterface $passwordHasher, UserRepository $userRepository): JsonResponse
    {
        $data = $request->toArray();
        
        $constraints = new Assert\Collection([
            'current_password' => [
                new NotBlank(),
                new Length(['min' => 8]),
            ],
            'password' => [
                new NotBlank(),
                new Length(['min' => 8]),
            ],
            'password_confirmation' => [
                new NotBlank(),
                new Length(['min' => 8]),
                new EqualTo(['value' => $data['password'], 'message' => 'Passwords do not match.']),
            ],
        ]);
    
        $violations = $validator->validate($data, $constraints);

        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $violation) {
                $propertyPath = trim($violation->getPropertyPath(), '[\]');
                $errors[$propertyPath] = $violation->getMessage();
            }
    
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if (!$passwordHasher->isPasswordValid($user, $data['current_password'])) {
            return $this->json(['errors' => [
                'current_password' =>  'Invalid password'
            ]], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    
        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $data['password']
        );

        $user->setPassword($hashedPassword);
        $userRepository->save($user, true);

        $this->flash('Password change successful.');
        
        return $this->api([]);
    }
}
