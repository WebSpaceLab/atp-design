<?php

namespace App\Controller\Api\Authorization;

use App\Controller\AbstractAPIController;
use App\Entity\Media;
use App\Entity\User;
use App\Repository\MediaRepository;
use App\Service\MediaHelper;
use App\Service\PaginationHelper;
use App\Service\UploaderHelper;
use App\Service\QueryHelper;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Validator\Constraints\Length;
use Intervention\Image\ImageManagerStatic;
use Janwebdev\ImageBundle\Image;
use Symfony\Component\Validator\Constraints as Assert;

#[Route('/api/media', name: 'app_media')]
#[isGranted('ROLE_USER')]
class MediaController extends AbstractAPIController
{
    public function __construct(
        private PaginationHelper $paginationHelper, 
        private MediaHelper $mediaHelper, 
        private QueryHelper $QueryHelper
    ) {}

    #[Route('', name: ':index', methods: ['GET'])]
    public function list(Request $request, MediaRepository $mediaRepository, #[CurrentUser()] User $user): JsonResponse
    {
        $query = $request->query->all();

        $queryBuilder = $mediaRepository->getWithSearchQueryBuilder(
            $query['term'], $query['month'], $query['orderBy'], $query['orderDir'], $query['fileType']
        );

        $this->mediaHelper->changePreviewUrlsType($queryBuilder);

        $pagination = $this->paginationHelper->paginate($queryBuilder, $query['page'], $query['per_page']);

        return $this->api([
            'media' => $pagination['data'],
            'pagination' => $pagination['pagination'],
            'queryParams' =>  $this->QueryHelper->params($request, ['term','fileType','month']),
            'months' => $this->mediaHelper->getMonths(),
            'fileTypes' => $this->mediaHelper->getFileTypes(),
        ], ['media:read']);
    }

    #[Route('', name: ':create', methods: ['POST'])]
    public function create(Request $request, MediaRepository $mediaRepository, #[CurrentUser()] User $user, UploaderHelper $uploaderHelper): JsonResponse
    {
        $file = $request->files->get('file');

        $this->validated([
            new NotBlank(),
            new File()
        ], $file);

        if($file) {
            $media = new Media();
            $media->setName($file->getClientOriginalName());
            $media->setMimeType($file->getMimeType());
            $media->setSize($file->getSize());

            $filename = $uploaderHelper->uploadImage($file, $this->getUploadsDir($user, 'images'));

            if(!$filename) {
                return $this->json([
                    'flash' => [
                        'message' => 'Coś poszło nie tak. Plik nie został przesłany.',
                        'type' => 'error'
                    ],
                ], Response::HTTP_BAD_REQUEST);
            }

            $media->setFilePath('/uploads/images/'.$user->getId(). '/'  . $filename);
            $media->setFileName($filename);
            $media->setAuthor($user);

            $mediaRepository->save($media, true);

            $this->mediaHelper->changePreviewUrlType($media);
            
            $this->flash('The file has been added.');

            return $this->api(['media' => $media], ['media:read']);
        }

        return $this->json([
            'flash' => [
                'message' => 'Coś poszło nie tak. Plik nie został przesłany.',
                'type' => 'error'
            ],
        ], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/cropper', name: ':create-with-cropper', methods: ['POST'])]
    public function createWithCropper(Request $request, MediaRepository $mediaRepository, #[CurrentUser()] User $user, UploaderHelper $uploaderHelper): JsonResponse
    {
        $file = $request->files->get('file');

        $this->validated([
            new NotBlank(),
            new File()
        ], $file);

        if($file) {
            // $image = new Image($imageManager, ['driver' => 'imagick']);
            // $img = $image->create($uploadDir);
            
            // $croppedImage = $img->crop(
            //     $request->request->get('width'),
            //     $request->request->get('height'),
            //     $request->request->get('left'),
            //     $request->request->get('top'),
            // );
            
            // $croppedImage->save($uploadDir);


            $media = new Media();
            $media->setName($file->getClientOriginalName());
            $media->setMimeType($file->getMimeType());
            $media->setSize($file->getSize());

            $filename = $uploaderHelper->uploadImage($file, $this->getUploadsDir($user, 'images'));

            if(!$filename) {
                return $this->json([
                    'flash' => [
                        'message' => 'Coś poszło nie tak. Plik nie został przesłany.',
                        'type' => 'error'
                    ],
                ], Response::HTTP_BAD_REQUEST);
            }

            $media->setFilePath('/uploads/images/'.$user->getId(). '/'  . $filename);
            $media->setFileName($filename);
            $media->setAuthor($user);

            $mediaRepository->save($media, true);

            $this->mediaHelper->changePreviewUrlType($media);
            
            $this->flash('The file has been added.');

            return $this->api(['media' => $media], ['media:read']);
        }

        return $this->json([
            'flash' => [
                'message' => 'Coś poszło nie tak. Plik nie został przesłany.',
                'type' => 'error'
            ],
        ], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/movie', name: ':create-using-url', methods: ['POST'])]
    public function createUsingUrl(Request $request, MediaRepository $mediaRepository, #[CurrentUser()] User $user, UploaderHelper $uploaderHelper): JsonResponse
    {
        $data = $request->toArray();

        $constraints = new Assert\Collection([
            'name' => [
                new Assert\NotBlank(),
                new Assert\Length([
                    'min' => 2, 
                    'minMessage' => 'Nazwa musi składać się z przynajmniej 2 liter.'
                ]),
            ],
            'mediaUrl' => [
                new Assert\NotBlank(),
                new Assert\Length([
                    'min' => 2, 
                    'minMessage' => 'Nazwa musi składać się z przynajmniej 2 liter.'
                ]),
            ],
            'type' => [
                new Assert\NotBlank(),
                new Assert\Length([
                    'min' => 2, 
                    'minMessage' => 'Nazwa musi składać się z przynajmniej 2 liter.'
                ]),
            ],
        ]);

        $this->validated($constraints, $data);

        // Przetwarzanie URL w zależności od typu
        switch ($data['type']) {
            case "video/youTube":
                $data['movieUrl'] = $uploaderHelper->getYoutubeId($data['mediaUrl']);
                break;
            default:
                $data['movieUrl'] = $data['mediaUrl'];
                break;
        }

        $media = new Media();
        $media->setName($data['name']);

        if($data['movieUrl']) {
            $media->setPathUrl($data['movieUrl']);
        }

        $media->setAuthor($user);
        $media->setMimeType($data['type']);
        $mediaRepository->save($media, true);

        $this->flash('Film został dodany.');

        return $this->api(['media' => $media], ['media:read']);
    }

    #[Route('/{id}', name: ':show', methods: ['GET'])]
    public function show(Media $media): JsonResponse
    {
        if(is_null($media)) {
            return $this->json([
                'flash' => [
                    'message' => 'Nie znaleziono pliku.',
                    'type' => 'error'
                ],
            ], Response::HTTP_NOT_FOUND);
        }

        return $this->api(['media' => $media], ['media:read']);
    }


    #[Route('/{id}', name: ':update', methods: ['POST'])]
    public function update(Media $media, Request $request,  UploaderHelper $uploaderHelper, MediaRepository $mediaRepository, #[CurrentUser()] User $user)
    {
        $file = $request->files->get('file');

        $violations = $this->validator->validate($file, [
            new NotBlank(),
            new File()
        ]);

        if (count($violations) > 0) {
            return $this->json([
                'flash' => [
                    'message' => 'Nieprawidłowy plik.',
                    'type' => 'error'
                ],
            ], Response::HTTP_BAD_REQUEST);
        }

        if(is_null($media)) {
            return $this->json([
                'flash' => [
                    'message' => 'Nie znaleziono pliku.',
                    'type' => 'error'
                ],
            ], Response::HTTP_NOT_FOUND);
        }

        if($file) {
            $media->setName($file->getClientOriginalName());
            $media->setMimeType($file->getMimeType());
            $media->setSize($file->getSize());
            
            $filename = $uploaderHelper->uploadImage($file, $this->getUploadsDir($user, 'images'));

            if(!$filename) {
                return $this->json([
                    'flash' => [
                        'message' => 'Coś poszło nie tak. Plik nie został przesłany.',
                        'type' => 'error'
                    ],
                ], Response::HTTP_BAD_REQUEST);
            }

            $media->setFileName($filename);
            $media->setFilePath('/uploads/' .  $filename);
            $mediaRepository->save($media, true);

            $this->flash('The file has been updated.');

            return $this->api(['media' => $media], ['admin:media:read']);
        }
        
        return $this->json([
            'flash' => [
                'message' => 'Coś poszło nie tak. Plik nie został przesłany. aaa',
                'type' => 'error'
            ],
        ], Response::HTTP_BAD_REQUEST);
    }

    #[Route('/{id}', name: ':delete', methods: ['DELETE'])]
    public function delete(Media $media, MediaRepository $mediaRepository)
    {
        if(is_null($media)) {
            return $this->json([
                'flash' => [
                    'message' => 'Nie znaleziono pliku.',
                    'type' => 'error'
                ],
            ], Response::HTTP_NOT_FOUND);
        }

        if($media->isIsUsed()) {

            $media->setIsDelete(true);
            $mediaRepository->save($media, true);

            return $this->json([
                'flash' => [
                    'message' => 'Plik został usunięty.',
                    'type' => 'success'
                ],
            ], Response::HTTP_OK);
        }

        if($media->getPathUrl()) {
            $mediaRepository->remove($media, true);

            return $this->json([
                'flash' => [
                    'message' => 'Plik został usunięty.',
                    'type' => 'success'
                ],
            ], Response::HTTP_OK);
        }

        $filesystem = new Filesystem();

        try {
            $filesystem->remove(
                $this->getUploadsDir($this->getUser(), 'images') . $media->getFileName()
            );
        } catch (\Exception $e) {
            return $this->json([
                'flash' => [
                    'message' => 'Nie udało się usunąć pliku.',
                    'type' => 'error'
                ],
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $mediaRepository->remove($media, true);
        } catch (\Exception $e) {
            return $this->json([
                'flash' => [
                    'message' => 'Nie udało się usunąć pliku.',
                    'type' => 'error'
                ],
            ], Response::HTTP_BAD_REQUEST);
        }
        
        return $this->json([
            'flash' => [
                'message' => 'Plik został usunięty.',
                'type' => 'success'
            ],
        ], Response::HTTP_OK);
    }

    private function getUploadsDir(User $user, string $folder = 'images')
    {
        return $this->getParameter('uploads_dir') . '/' . $folder . '/'. $user->getId() . '/';
    }
}
