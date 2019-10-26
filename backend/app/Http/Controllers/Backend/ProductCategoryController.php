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

    public function show($id){
        $entity = \App\ProductCategory::find($id);
        $list = [
            'value' => $entity->value,
            'label' => $entity->label,
            'slug' => $entity->slug ?? '',
            'meta_title' => $entity->meta_title ?? '',
            'meta_description' => $entity->meta_description ?? '',
            'status' => $entity->status,


        ];
        return response($list);
    }


    /**
     * @param null $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'label' => 'required',
        ], [
            'label.required' => 'نام خود را وارد نکرده اید.',
        ]);
        if ($validator->fails()) {
            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        if ($request->get('slug')) {
            $slug = ProductCategory::where('slug', $request->get('slug'))->where('value', '<>', $id)->count();
            if ($slug > 0) {
                return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
            }
        }

        ProductCategory::where('value', $id)->update($request->all());

        $nodes = ProductCategory::descendantsAndSelf($id);
        foreach ($nodes as $nod) {
            $nod->status = $request->get('status');
            $nod->save();
        }

        return response()->json(['status' => true, 'msg' => 'با موفقیت به روز رسانی گردید']);
    }


    public function storeAttributes(Request $request)
    {
        $categories = $request->get('categories');
        foreach ($categories as $category) {
            $entity = ProductCategory::find($category);
            $entity->attributes()->detach();
            $entity->attributes()->attach($request->get('attributes'));
        }

        return response()->json(['statue' => true, 'msg' => 'با موفقیت انجام شد.']);
    }

    public function getAttributes($id)
    {
        $list = [];
        $items = explode(',', $id);
        foreach ($items as $item) {
            foreach (ProductCategory::find($item)->attributes as $attr) {
                $list[] = $attr;
            }
        }
        return response($list);

    }

}
