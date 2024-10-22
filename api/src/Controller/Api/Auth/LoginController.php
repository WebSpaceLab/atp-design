<?php

namespace App\Controller\Api\Auth;

use ApiPlatform\Metadata\IriConverterInterface as MetadataIriConverterInterface;
use App\Controller\AbstractAPIController;
use App\Entity\User;
use App\Security\ApiTokenHandler;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class LoginController extends AbstractAPIController
{
    #[Route('/api/auth/login', name: 'auth.login', methods: ['POST'])]
    public function login(#[CurrentUser()] User $user = null, ApiTokenHandler $apiTokenHandler, MetadataIriConverterInterface $iriConverter): JsonResponse
    {
        // Check if the user is already logged in and check that the Content-Type header is "application/json"
        if(!$user) {
            return $this->json([
                'error' => 'Invalid login request: check that the Content-Type header is "application/json".',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Check if a user with the given username and email already exists
        if(!$user->getVerificationToken()) {
            return $this->json([
                'error' => 'The account is not verified. Please check your email.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        if(!$user->getVerificationToken()->isIsVerified()) {
            return $this->json([
                'error' => 'The account is not verified. Please check your email.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Check if the account is active
        if(!$user->isIsActiveAccount()) {
            return $this->json([
                'error' => 'The account is not active.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Check if the account is not agree
        if(!$user->isIsAgree()) {
            return $this->json([
                'error' => 'The account is not agree.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Check if the account is deleted
        if($user->isIsDelete()) {
            return $this->json([
                'error' => 'The account is deleted. Please contact the administrator.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        // Create a token for the user
        $apiToken = $apiTokenHandler->createForUser($user);

        // Flash a message to the client
        $this->flash('Login successful.');

        return $this->api([
            'apiToken' => $apiToken,
            'apiTokenExpiresAt' => $user->getApiToken()->getExpiresAt(),
            'Location' => '/api/users/' . $user->getId(),
        ]);
    }

    #[Route('/api/auth/logout', name: 'auth.logout', methods: ['GET'])]
    public function logout(): never
    {
        throw new \Exception('Logout failed?'); 
    }

    // Redirected logout
    #[Route('/api/auth/logout', name: 'app_auth_logout_redirected')]
    public function logoutRedirected(): JsonResponse
    {
        $this->flash('Wylogowano pomyślnie.');

        return $this->api([]);
    }

}
