<?php

namespace App\Http\Controllers;

use App\Models\product;
use App\Models\Image;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use DB;




class ProductController extends Controller
{
    public function show(){
        $products = DB::select(


      
            'SELECT products.*, images.*,skus.* 
             FROM products, images, skus 
             WHERE skus.product_id = products.product_id  AND products.product_id = images.product_id
             ORDER BY products.name ASC;');





        return response()->json(['products' => $products]);
        
    }

}
