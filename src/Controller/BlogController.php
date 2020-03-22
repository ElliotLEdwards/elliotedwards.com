<?php
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    /**
     * @Route("/blog/", name="blog_list")
     */
    public function list(Request $request)
    {
        $access_token = $request->query->get('access_token');
        $refresh_token = $request->query->get('refresh_token');
        
        
        $var = $access_token . $refresh_token;
        // $var = $access_token + $refresh_token;
        
        return $this->render('base.html.twig', [
            "accessToken" => $access_token,
            "refreshToken" => $refresh_token
         ]);
    }
}