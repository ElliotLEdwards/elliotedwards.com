<?php

namespace App\Controller;

use App\Entity\Library;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;


class SpotifyController extends AbstractController
{
    /**
     * @Route("/spotify/", name="spotify_list")
     */
    public function list(Request $request)
    {
        $access_token = $request->query->get('access_token');
        $refresh_token = $request->query->get('refresh_token');
       
        return $this->render('base.html.twig', [
            "access_token" => $access_token,
            "refresh_token" => $refresh_token
         ]);
    }

    /**
     * @Route("/spotify/{savedTracks}", name="spotify_set")
     */
    public function setTracks(Request $request) 
    {
        $entityManager = $this->getDoctrine()->getManager();
        $savedTracks = $request->request->get('savedTracks');
        
        $library = new Library();
        
        if($savedTracks)
        {
            foreach($savedTracks as $savedTrackKey => $savedTrack) {
                if(isset($savedTrack['track']['name']))
                {
                    $library->setTitle($savedTrack['track']['name']);
                }
                if(isset($savedTrack['track']['artists'][0]['name']))
                {
                    $library->setArtist($savedTrack['track']['artists'][0]['name']);
                }
                if(isset($savedTrack['track']['album']['name']))
                {
                    $library->setAlbum($savedTrack['track']['album']['name']);
                }
                if(isset($savedTrack['track']['popularity']))
                {
                    $library->setPopularity($savedTrack['track']['popularity']);
                }
                $entityManager->persist($library);
                $entityManager->flush();
            }
        } else {
            $tab['error'] = "Nothing to save";
        }
        
        
        return new JsonResponse(json_encode($savedTracks)); 

    }
}