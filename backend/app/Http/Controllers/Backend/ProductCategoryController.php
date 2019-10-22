<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\ProductCategory;
use Illuminate\Http\Request;
use Validator;

class ProductCategoryController extends Controller
{

    public function index(Request $request)
    {
        return response(\App\ProductCategory::get()->toTree());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'label' => 'required',
        ]);

        if ($validator->fails()) {
            return Response()->json(['status' => false, 'msg' => 'لطفا نام دسته را انتخاب کنید.']);
        }

        $new_node = explode(',', $request->get('label'));
        $selected = $request->get('items');
        if (!empty($selected)) {
            foreach ($selected as $item) {
                foreach ($new_node as $new) {
                    $node = new ProductCategory([
                        'label' => trim($new),
                    ]);
                    $node->appendToNode(ProductCategory::find($item));
                    $node->save();
                }
            }
            return response()->json(['status' => true, 'msg' => 'با موفقیت ایجاد شدند.']);
        } else {
            foreach ($new_node as $new) {
                ProductCategory::create([
                    'label' => $new,
                ]);
            }
            return response()->json(['status' => true, 'msg' => 'با موفقیت ایجاد شد.']);
        }
    }


    /**
     * @param null $id
     * @return \Illuminate\Http\Response
     */
    public function updateTree($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'label' => 'required',
        ]);
        if ($validator->fails()) {
            return Response()->json(['status' => false, 'msg' => 'فیلد را پر کنید']);
        }

        ProductCategory::where('value', $id)->update($request->all());

        return response()->json(['status' => true, 'msg' => 'با موفقیت به روز رسانی گردید']);
    }

}
