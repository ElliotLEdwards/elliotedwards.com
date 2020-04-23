<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

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
        $savedTracks = json_decode($request->request->get('savedTracks'), true);
        if($savedTracks)
        {
            foreach($savedTracks as $savedTrackKey => $savedTrack) {
                $tab[$savedTrackKey] = $savedTrack;
            }
        } else {
            $tab['error'] = "Nothing to save";
        }
        
        
        $jsonData = 'Hello from the spotify controller';
        return new JsonResponse(json_encode($savedTracks)); 

    }
}