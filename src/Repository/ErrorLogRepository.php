<?php

/**
 * ErrorLog repository
 */

namespace App\Repository;

use App\Entity\ErrorLog;
use DateTime;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\QueryException;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Common\Collections\Criteria;

/**
 * ErrorLogRepository class
 *
 * @method ErrorLog|null find($id, $lockMode = null, $lockVersion = null)
 * @method ErrorLog|null findOneBy(array $criteria, array $orderBy = null)
 * @method ErrorLog[]    findAll()
 * @method ErrorLog[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ErrorLogRepository extends ServiceEntityRepository
{

    const MAX_PER_PAGE = 20;

    /**
     * constructor
     *
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ErrorLog::class);
    }

    /**
     * conseguir por filtrado
     *
     * @param mixed $params
     * @throws QueryException
     */
    public function getBy($params)
    {
        $orderBy = (isset($params->orderBy)?$params->orderBy:"id");
        $order = (isset($params->order)?$params->order:"DESC");
        // Create our query
        $query = $this->createQueryBuilder('p')
            ->orderBy("p.{$orderBy}", $order);
        if (isset($params->user) && $params->user > 0) {
            $userCriteria = new Criteria();
            $userCriteria->where(Criteria::expr()->eq("p.user", $params->user));
            $query->addCriteria($userCriteria);
        }
        if(isset($params->startDate) && $params->startDate != "") {
            $dateCriteria = new Criteria();
            $dateCriteria->where(Criteria::expr()->gt("p.createdAt", new DateTime($params->startDate)));
            $dateCriteria->andWhere(Criteria::expr()->lt("p.createdAt", new DateTime($params->endDate)));
            $query->addCriteria($dateCriteria);
        }
        if (isset($params->search) && $params->search != "") {
            $searchRoute = str_replace("_", "/", $params->search);
            $searchFileWin = str_replace("_", "\\", $params->search);
            $searchFileLin = str_replace("_", "/", $params->search);
            $searchCriteria = new Criteria();
            $searchCriteria->where(Criteria::expr()->contains("p.clientip", $params->search));
            $searchCriteria->orWhere(Criteria::expr()->contains("p.route", $searchRoute));
            $searchCriteria->orWhere(Criteria::expr()->contains("p.file", $searchFileWin));
            $searchCriteria->orWhere(Criteria::expr()->contains("p.file", $searchFileLin));
            $searchCriteria->orWhere(Criteria::expr()->contains("p.message", $params->search));
            $query->addCriteria($searchCriteria);
        }
        if (isset($params->method) && $params->method != "") {
            $methodCriteria = new Criteria();
            $methodCriteria->where(Criteria::expr()->eq("p.method", strtoupper($params->method)));
            $query->addCriteria($methodCriteria);
        }
        $query->getQuery();

        $paginator = new Paginator($query);
        $paginator->getQuery()
            ->setFirstResult(self::MAX_PER_PAGE * ($params->page - 1)) // Offset
            ->setMaxResults(self::MAX_PER_PAGE); // Limit

        return $paginator;
    }

    // /**
    //  * @return ErrorLog[] Returns an array of ErrorLog objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ErrorLog
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
