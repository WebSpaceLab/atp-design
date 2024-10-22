<?php

namespace App\Controller\Api;

use App\Controller\AbstractAPIController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Intervention\Image\ImageManager;
use Symfony\Component\HttpFoundation\Response;

class App extends AbstractAPIController
{
    #[Route('/api/app', name: 'app.index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $this->flash('Welcome to your new controller!');

        return $this->api([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/App.php',
        ]);
    }

    #[Route('/')]
    public function example(ImageManager $manager): Response
    {
        return $this->render('/homepage/index.html.twig',[
            // 'image' => $image,
        ]);
    }
}
