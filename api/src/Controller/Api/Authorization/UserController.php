<?php

namespace App\Controller\Api\Authorization;

use App\Controller\AbstractAPIController;
use App\Repository\UserRepository;
use App\Repository\VerificationTokenRepository;
use App\Service\PaginationHelper;
use App\Service\QueryHelper;
use App\Service\UsersHelper;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_USER')]
#[Route('/api/users', name: 'user')]
class UserController extends AbstractAPIController
{
    public function __construct(
        private PaginationHelper $paginationHelper, 
        private QueryHelper $QueryHelper,
        private UsersHelper $usersHelper,
        private VerificationTokenRepository $verificationTokenRepository,
        private MailerInterface $mailer
    ) {}

    #[Route('', name: ':index', methods: ['GET'])]
    public function index(Request $request, UserRepository $userRepository): JsonResponse
    {
        $query = $request->query->all();

        $queryBuilder = $userRepository->getWithSearchQueryBuilder(
           $query['column'] ,$query['term'], $query['month'], $query['orderBy'], $query['orderDir']
        );

        $pagination = $this->paginationHelper->paginate($queryBuilder, $query['page'], $query['per_page']);

        return $this->api([
            'users' => $pagination['data'],
            'pagination' => $pagination['pagination'],
            'queryParams' =>  $this->QueryHelper->params($request, ['column', 'term', 'month', 'orderBy', 'orderDir', 'page', 'per_page']),
            'months' => $this->usersHelper->getMonths(),
        ], ['user:read']); 
    }
}
