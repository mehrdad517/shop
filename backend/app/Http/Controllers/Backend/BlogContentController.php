<?php

namespace App\Http\Controllers\Backend;

use App\BlogContent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogContentController extends Controller
{
    public function index(Request $request)
    {

        $entities = BlogContent::where(function ($q) use ($request) {
            if ($request->has('filter')) {
                $filter = json_decode($request->get('filter'), true);

                if (@$filter['id']) {
                    $q->where('id', '=', $filter['id']);
                }

                if (@$filter['title']) {
                    $q->where('title', 'like', '%' . $filter['title'] . '%')->orWhere('slug', 'like', '%' . $filter['title'] . '%');
                }

                if (@$filter['status'] != -1) {
                    $q->where('status', $filter['status']);
                }
            }
        })->orderBy($request->get('sort_field') ?? 'id', $request->get('sort_type') ?? 'desc')
            ->paginate($request->get('limit') ?? 10);

        return response($entities);

    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validator = \Validator::make($request->all(), [
                'title' => 'required',
                'content' => 'required',
                'meta_title' => 'required',
                'meta_description' => 'required',
                'slug' => 'required|unique:blog_content',
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
            }

            if ($request->get('slug')) {
                $slug = BlogContent::where('slug', $request->get('slug'))->count();
                if ($slug > 0) {
                    return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
                }
            }

            $result = BlogContent::firstOrCreate([
                'title' => $request->get('title'),
                'slug' => $request->get('slug'),
                'content' => $request->get('content'),
                'meta_title' => $request->get('meta_title'),
                'meta_description' => $request->get('meta_description'),
                'status' => $request->get('status'),
                'created_by' => Auth::id()
            ]);

            $result->categories()->detach();
            $result->categories()->attach($request->get('categories'));


            foreach ($request->get('files')  as $file) {
                if ($file) {
                    $result->files()->create([
                        'created_by' => Auth::id(),
                        'path' => $file['address'],
                        'collection' => $file['collection']
                    ]);
                }

            }


            if ($result) {
                return response()->json(['status' => true, 'msg' => 'با موفقیت انجام شد.', 'result' => $result], 200);
            }

            return response()->json(['status' => false, 'msg' => 'un success'], 200);
        } catch (\Exception $exception) {
            return response()->json(['status' => false, 'msg' => $exception->getMessage()]);
        }

    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $result = BlogContent::with(['categories' => function ($q) {
            $q->select('value', 'label');
        }])->find($id);

        if ($result) {

            return response([
                'title' => $result->title,
                'code' => $result->code,
                'brand_id' => $result->brand_id,
                'status' => $result->status,
                'slug' => $result->slug ?? '',
                'meta_title' => $result->meta_title ?? '',
                'meta_description' => $result->meta_description ?? '',
                'content' => $result->content ?? '',
                'categories' => $result->categories
            ]);
        }

        return response()->json(['status' => false, 'msg' => 'request is invalid'], 200);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'title' => 'required',
            'code' => 'required',
            'brand_id' => 'required'
        ], [
            'title.required' => 'عنوان نمیتواند خالی باشد.',
            'code.required' => 'کد محصول نمیتواند خالی باشد.',
            'brand_id.required' => 'برند را وارد نکرده اید.'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

      /*  if ($request->get('slug')) {
            $slug = BlogContent::where('slug', $request->get('slug'))->where('id', '<>', $id)->count();
            if ($slug > 0) {
                return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
            }
        }*/
        $result = BlogContent::updateOrCreate(['id' => $id], [
            'title' => $request->get('title'),
            'content' => $request->get('content'),
            'brand_id' => $request->get('brand_id') > 0 ? $request->get('brand_id') : null,
            'code' => $request->get('code'),
            'status' => $request->get('status'),
            'slug' => $request->get('slug'),
            'meta_title' => $request->get('meta_title'),
            'meta_description' => $request->get('meta_description'),
        ]);

        $result->categories()->detach();
        $result->categories()->attach($request->get('categories'));
        if ($request->has('attributes')) {
            foreach ($request->get('attributes') as $item) {
                if ($item['value']) {
                    $check = DB::table('group_attribute_product')->where('product_id', $id)->where('attribute_id', $item['id'])->where('value', $item['value']);
                    if ($check->count() > 0) {
                        $check->update([
                            'value' => $item['value'],
                            'order' => $item['order'],
                            'main' => $item['main']
                        ]);
                    } else {
                        DB::table('group_attribute_product')->insert([
                            'product_id' => $id,
                            'attribute_id' => $item['id'],
                            'value' => $item['value'],
                            'order' => $item['order'],
                            'main' => $item['main']
                        ]);
                    }
                } else {
                    if (@$item['row']) {
                        $check = DB::table('product_pins')->where('product_id', $id)->where('group_attribute_product_ids', 'like', "%$item[row]%");
                        if ($check->count() == 0) {
                            DB::table('group_attribute_product')->where('id', $item['row'])->delete();
                        } else {
                            foreach ($check->get() as $ch) {
                                DB::table('product_pins')->where('id', $ch->id)->update([
                                    'group_attribute_product_ids' => str_replace("$item[row]/", '', $ch->group_attribute_product_ids)
                                ]);
                            }
                            DB::table('group_attribute_product')->where('id', $item['row'])->delete();
                        }
                    }
                }
            }
        }

        if ($result) {
            return response()->json(['status' => true, 'msg' => 'عملیات موفقیت امیز بود.'], 200);
        }

        return response()->json(['status' => false, 'msg' => 'un success'], 200);

    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changestatus($id, Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'status' => 'required',
        ], [
            'status.required' => 'وضعیت را وارد نکرده اید.',
        ]);

        if ($validator->fails()) {

            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        $model = BlogContent::where('id', $id)->update([
            'status' => $request->get('status')
        ]);

        if ($model) {

            return Response()->json(['status' => true, 'msg' => 'عملیات موفقیت آمیز بود.']);
        }
        return Response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }
}
