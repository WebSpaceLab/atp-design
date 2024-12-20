<?php

namespace App\Repository;

use App\Entity\User;
use Carbon\Carbon;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\QueryBuilder as DoctrineQueryBuilder;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<User>
* @implements PasswordUpgraderInterface<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

    public function getWithSearchQueryBuilder(?string $column, ?string $term, ?string $month, ?string $orderBy = 'createdAt', ?string $orderDir = 'DESC'): DoctrineQueryBuilder
    {
        $qb = $this->createQueryBuilder('user')
            ->andWhere('user.isDelete = false');

        if ($term) {
            $qb->andWhere('user.'.$column.' LIKE :term')
                ->setParameter('term', '%' . $term . '%');
        }

        if($month) {
            $from = Carbon::createFromFormat('d-m-Y', $month)->startOfMonth();
            $to = Carbon::createFromFormat('d-m-Y', $month)->endOfMonth();
    
            $qb->andWhere('user.createdAt BETWEEN :from AND :to')
                ->setParameter('from', $from)
                ->setParameter('to', $to);
        }

        return $qb->orderBy('user.' . $orderBy , $orderDir);
    }

    public function getActiveMonths()
    {
        return $this->createQueryBuilder('u')
            ->select('u.createdAt')
            ->distinct(true)
            // ->from('App:User', 'user')
            ->orderBy('u.createdAt', 'DESC')
            ->where('u.isDelete = false')
            ->getQuery()
            ->getResult();
    }

    public function save(User $user, bool $flush = false): void
    {
        $this->getEntityManager()->persist($user);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(User $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findNewSignUps()
    {
        return $this->createQueryBuilder('u')
            ->select('u')
            ->where('u.createdAt >= :date')
            ->setParameter('date', Carbon::now()->subDays(7))
            ->getQuery()
            ->getResult();
    }

    public function findUserGrowth()
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = '
            SELECT COUNT(id) as total, 
                   EXTRACT(YEAR FROM created_at) as year, 
                   EXTRACT(MONTH FROM created_at) as month
            FROM user
            WHERE created_at >= :date
            AND is_delete = false
            GROUP BY year, month
            ORDER BY year ASC, month ASC
        ';
        $stmt = $conn->prepare($sql);
        $stmt->bindValue('date', Carbon::now()->subMonths(6)->startOfMonth()->format('Y-m-d'));
        $result = $stmt->executeQuery();
        
        return $result->fetchAllAssociative();
    }

    public function getUserGrowthChartData()
    {
        $growthData = $this->findUserGrowth();
        
        $labels = [];
        $data = [];
        
        foreach ($growthData as $row) {
            $date = Carbon::createFromDate($row['year'], $row['month'], 1);
            $labels[] = $date->format('F Y'); // Nazwa miesiąca i rok
            $data[] = (int)$row['total'];
        }
        
        return [
            'labels' => $labels,
            'datasets' => [
                [
                    'label' => 'Nowi użytkownicy',
                    'backgroundColor' => '#1e40af',
                    'data' => $data,
                ],
            ],
        ];
    }
//    /**
//     * @return User[] Returns an array of User objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?User
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
