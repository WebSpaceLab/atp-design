<?php

namespace App\Controller\Api;

use App\Controller\AbstractAPIController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class App extends AbstractAPIController
{
    #[Route('/api/app', name: 'app.index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        
        return $this->api([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/App.php',
        ]);
    }
}
