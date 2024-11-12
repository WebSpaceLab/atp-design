<?php

namespace App\Controller\Api\Authorization;

use App\Controller\AbstractAPIController;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
#[Route('/api/dashboard', name: 'dashboard')]
class DashboardController extends AbstractAPIController
{

    #[Route('', name: ':index', methods: ['GET'])]
    public function index(UserRepository $userRepository): JsonResponse
    {   
        // $this->denyAccessUnlessGranted('ROLE_USER');
        
        $user = $this->getUser();
        $users = $userRepository->findAll();

        // Total users
        $totalUsers = count($users);

        // New SignUps
        $newSignUps = $userRepository->findNewSignUps();
        $userGrowth = $userRepository->getUserGrowthChartData();

        return $this->api([
            'users' => [
                'total' => $totalUsers,
                'newSignUps' => count($newSignUps),
                'userGrowth' => $userGrowth,
            ],

            'user' => $user
        ], ['profile:read']);
    }
}
