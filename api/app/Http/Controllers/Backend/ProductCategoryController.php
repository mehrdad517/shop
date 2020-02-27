<?php

namespace App\Http\Controllers\Backend;

use App\Brand;
use App\File;
use App\GroupAttribute;
use App\Http\Controllers\Controller;
use App\ProductCategory;
use App\ProductPriceParameter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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

        $new_node = explode(',', trim($request->get('label'), ','));
        $selected = $request->get('items');
        if (!empty($selected)) {
            foreach ($selected as $item) {
                foreach ($new_node as $new) {
                    $node = new ProductCategory([
                        'label' => trim($new),
                        'slug' => str_replace(' ', '-', trim($new)),
                        'meta_title' => trim($new),
                        'meta_description' => trim($new),
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

        $entity = \App\ProductCategory::with(['files' => function($q) {
            $q->orderBy('order', 'asc');
        }])->find($id);

        $files = [];
        foreach ($entity->files as $file) {
            $files[] = [
                'percent' => 100, // for react component
                'file' => $file['file'],
                'mime_type' => $file['mime_type'],
                'path' => Storage::url('product-categories/' . $id . '/' . $file['file']), // image or file address
                'collection' => $file['collection'],
                'directory' => 'product-categories',
                'link' => $file['link'] ?? '',
                'caption' => $file['caption'] ?? '',
                'order' => $file['order'],
            ];
        }
        $list = [
            'value' => $entity->value,
            'label' => $entity->label,
            'heading' => $entity->heading,
            'slug' => $entity->slug ?? '',
            'meta_title' => $entity->meta_title ?? '',
            'meta_description' => $entity->meta_description ?? '',
            'content' => $entity->content ?? '',
            'status' => $entity->status,
            'files' => $files


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
        ]);
        if ($validator->fails()) {
            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        if ($request->get('slug')) {
            $slug = ProductCategory::where('slug', str_replace(' ', '-', $request->get('slug')))->where('value', '<>', $id)->count();
            if ($slug > 0) {
                return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
            }
        }

        $result = ProductCategory::where('value', $id)->first();

        $result->update([
            'meta_title' => $request->get('meta_title'),
            'meta_description' => $request->get('meta_description'),
            'heading' => $request->get('heading'),
            'content' => $request->get('content'),
            'slug' => str_replace(' ', '-', $request->get('slug')),
            'status' => $request->get('status'),
            'label' => $request->get('label')
        ]);

        if ($request->has('files')) {

            foreach ($request->get('files')  as $file) {

                if ($file) {

                    $check_exist = File::where('file', $file['file']);

                    if ($check_exist->count() > 0) {

                        $check_exist->update([
                            'collection' => $file['collection'],
                            'link' => $file['link'],
                            'caption' => $file['caption'],
                            'order' => $file['order']
                        ]);

                    } else {

                        $old = 'attachment/' . $file['file'];

                        if ($file['mime_type'] == 'image') {

                            foreach ([500,300,200,100,50] as $dir) {
                                $copy = Storage::copy($old, 'product-categories/' . $id . '/' . $dir . '/' . $file['file']);
                                if ($copy) {
                                    $copy = \Intervention\Image\Facades\Image::make(storage_path('app/public/product-categories/' . $id . '/' . $dir . '/' . $file['file']));
                                    $copy->resize($dir, $dir);
                                    $copy->save();
                                }
                            }
                        }

                        $new = 'product-categories/' . $id . '/' . $file['file'];

                        $move = Storage::move($old, $new);

                        if ($move) {

                            $result->files()->create([
                                'created_by' => Auth::id(),
                                'file' => $file['file'],
                                'directory' => 'product-categories',
                                'collection' => $file['collection'],
                                'size' => json_encode([500,300,200,100,50]),
                                'link' => $file['link'],
                                'caption' => $file['caption'],
                                'order' => $file['order']
                            ]);
                        }
                    }
                }

            }
        }

        $nodes = ProductCategory::descendantsAndSelf($id);

        foreach ($nodes as $nod) {
            $nod->status = $request->get('status');
            $nod->save();
        }

        return response()->json(['status' => true, 'msg' => 'با موفقیت به روز رسانی گردید']);
    }


    public function getAttributes($id)
    {
        $list = [];
        $result = DB::table('group_attribute_category as gac')
            ->select(DB::raw('distinct ga.id as id'), 'ga.title as title')
            ->leftJoin('group_attribute as ga', 'ga.id', '=', 'gac.attribute_id')
            ->whereIn('gac.category_id', explode(',', $id))
            ->get()->toArray();

        foreach ($result as $key => $r) {
            $list[] = [
                'id' => $r->id,
                'title' => $r->title,
                'options' => GroupAttribute::find($r->id)->tags,
                'value' => '',
                'order' => $key,

            ];
        }

        return response($list);
    }

    // store attribute or remove
    public function storeAttributes($id, Request $request)
    {
        $entities = ProductCategory::descendantsAndSelf($id);

        foreach ($entities as $entity) {
            $check = DB::table('group_attribute_category')->where('category_id', $entity->value)->where('attribute_id', $request->get('attributes'));
            if ($check->count() > 0) {
                $check->delete();
            } else {
                $entity->attributes()->attach($request->get('attributes'));
            }
        }

        return response()->json(['status' => true, 'msg' => 'با موفقیت انجام شد.']);
    }

    // get category id and show all attribute with checked column
    public function getAllAttributesWithChecked($id, Request $request)
    {
        $list = [];

        $list['data'] = DB::select('call product_category_get_all_attibutes_with_checked(?, ?, ?)', [$id, $request->get('page'), $request->get('title') ?? '']);

        $list['total'] = $request->get('title') == '' ? GroupAttribute::count() : count($list['data']);

        return response($list);

    }

    public function getBrands($id)
{
    $list = [];
    $result = DB::table('brand_switch_category as bsc')
        ->select(DB::raw('distinct b.id as id'), 'b.title as title')
        ->leftJoin('brand as b', 'b.id', '=', 'bsc.brand_id')
        ->whereIn('bsc.category_id', explode(',', $id))
        ->get()->toArray();

    foreach ($result as $key => $r) {
        $list[] = [
            'id' => $r->id,
            'title' => $r->title,
        ];
    }

    return response($list);
}


    // store attribute or remove
    public function storeBrands($id, Request $request)
    {
        $entities = ProductCategory::descendantsAndSelf($id);

        foreach ($entities as $entity) {
            $check = DB::table('brand_switch_category')->where('category_id', $entity->value)->where('brand_id', $request->get('brands'));
            if ($check->count() > 0) {
                $check->delete();
            } else {
                $entity->brands()->attach($request->get('brands'));
            }
        }

        return response()->json(['status' => true, 'msg' => 'با موفقیت انجام شد.']);
    }

    // get category id and show all attribute with checked column
    public function getAllBrandsWithChecked($id, Request $request)
    {
        $list = [];

        $list['data'] = DB::select('call product_category_get_all_brands_with_checked(?, ?, ?)', [$id, $request->get('page'), $request->get('title') ?? '']);

        $list['total'] = $request->get('title') == '' ? Brand::count() : count($list['data']);

        return response($list);

    }

    public function getPriceParameters($id)
    {
        $list = [];
        $result = DB::table('price_parameter_switch_category as ppsc')
            ->select(DB::raw('distinct p.value as id'), 'p.label as title')
            ->leftJoin('price_parameter as p', 'p.value', '=', 'ppsc.price_parameter_id')
            ->whereIn('ppsc.category_id', explode(',', $id))
            ->get()->toArray();

        foreach ($result as $key => $r) {
            $list[] = [
                'id' => $r->id,
                'title' => $r->title,
            ];
        }

        return response($list);
    }


    // store attribute or remove
    public function storePriceParameters($id, Request $request)
    {
        $entities = ProductCategory::descendantsAndSelf($id);

        foreach ($entities as $entity) {
            $check = DB::table('price_parameter_switch_category')->where('category_id', $entity->value)->where('price_parameter_id', $request->get('price_parameter'));
            if ($check->count() > 0) {
                $check->delete();
            } else {
                $entity->priceParameters()->attach($request->get('price_parameter'));
            }
        }

        return response()->json(['status' => true, 'msg' => 'با موفقیت انجام شد.']);
    }

    // get category id and show all attribute with checked column
    public function getAllPriceParametersWithChecked($id, Request $request)
    {
        $list = [];

        $list['data'] = DB::select('call product_category_get_all_price_parameters_with_checked(?, ?, ?)', [$id, $request->get('page'), $request->get('title') ?? '']);

        $list['total'] = $request->get('title') == '' ? ProductPriceParameter::count() : count($list['data']);

        return response($list);

    }
}
