<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Product;
use App\ProductCategory;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function withBrand($id, Request $request)
    {
        $page = $request->get('page') ?? 1;
        $limit = $request->get('limit') ?? 24;






    }
}
