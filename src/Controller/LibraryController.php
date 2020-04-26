<?php
namespace App\Controller;

use App\Entity\Library;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;

class LibraryController extends AbstractController {

    /**
     * @Route("/library", name="create_library_entry")
     */
    public function createLibraryEntry(): Response
    {
        $entityManager = $this->getDoctrine()->getManager();

        $library = new Library();
        $library->setTitle('test title');
        $library->setArtist('artist');
        $library->setAlbum('album');
        $library->setPopularity(33);


        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        $entityManager->persist($library);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return new Response('Saved new product with id '.$library->getId());
    }
}
