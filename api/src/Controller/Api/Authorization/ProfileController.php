<?php

namespace App\Controller\Api\Authorization;

use App\Controller\AbstractAPIController;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\UploaderHelper;
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

#[IsGranted('ROLE_USER')]
#[Route('/api/users', name: 'profile')]
class ProfileController extends AbstractAPIController
{
    public function __construct(private UserRepository $userRepository) {}

    #[Route('/{id}', name: ':me', methods: ['GET'])]
    public function index(#[CurrentUser()] User $user = null): JsonResponse
    {
        return $this->api([
            'user' => $user 
        ], ['profile:read']);   
    }

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

    #[Route('/{id}/avatar-update', name: ':avatar-update', methods: ['POST'])]
    public function avatarUrlUpdate(#[CurrentUser()] User $user, Request $request, UserRepository $userRepository, UploaderHelper $uploaderHelper): JsonResponse
    {
        $file = $request->files->get('image');

        $this->validated([
            'avatar' => [
                new NotBlank(),
            ],
        ], $file);
        
        if($file) {
            $filename = $uploaderHelper->createdFileName($file);
            $uploadDir = $this->getParameter('uploads_dir') .'/profile/'. $user->getId();
            
            // $image = new Image($imageManager, ['driver' => 'imagick']);
            // $img = $image->create($uploadDir);
            
            // $croppedImage = $img->crop(
            //     $request->request->get('width'),
            //     $request->request->get('height'),
            //     $request->request->get('left'),
            //     $request->request->get('top'),
            // );
            
            // $croppedImage->save($uploadDir);
            if(!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            } else {
                $files = glob($uploadDir . '/*'); // get all file names

                foreach($files as $item){ // iterate files
                    if(is_file($item))
                    unlink($item); // delete file
                }
            }

            $filename = $uploaderHelper->uploadImage($file, $uploadDir);
            
            if(!$filename) {
                return $this->json([
                    'flash' => [
                        'message' => 'Something went wrong. The file was not uploaded.',
                        'type' => 'error'
                    ],
                ], Response::HTTP_BAD_REQUEST);
            }
            
            $user->setAvatarUrl('/uploads/profile/'. $user->getId(). '/' . $filename);
            $userRepository->save($user, true);

            $this->flash('Profile picture has been updated.');

            return $this->api(['user' => $user], ['profile:read']);
        }

        return $this->json([
            'flash' => [
                'message' => 'Coś poszło nie tak. Plik nie został przesłany.',
                'type' => 'error'
            ],
        ], Response::HTTP_BAD_REQUEST);
    }
}
