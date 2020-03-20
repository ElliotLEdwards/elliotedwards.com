<?php
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\BrowserKit\Request;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    /**
     * @Route("/blog", name="blog_list")
     */
    public function list(Request $request)
    {
        $title = $request->attributes->get('access_token');
        $title = $request->attributes->get('refresh_token');
        $var = "elliotedwards.com first commit !";
        return $this->render('base.html.twig', [
            "myVariable" => $var,
         ]);
    }
}