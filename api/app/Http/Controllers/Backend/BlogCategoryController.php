<?php

namespace App\Http\Controllers\Backend;

use App\BlogCategory;
use App\File;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BlogCategoryController extends Controller
{
    public function index(Request $request)
    {
        return response(BlogCategory::get()->toTree());
    }

    public function store(Request $request)
    {

        $validator = \Validator::make($request->all(), [
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
                    $node = new BlogCategory([
                        'label' => trim($new),
                        'slug' => remove_special_char($new),
                        'meta_title' => trim($new),
                        'meta_description' => trim($new),
                    ]);
                    $node->appendToNode(BlogCategory::find($item));
                    $node->save();
                }
            }
            return response()->json(['status' => true, 'msg' => 'با موفقیت ایجاد شدند.']);
        } else {
            foreach ($new_node as $new) {
                BlogCategory::create([
                    'label' => $new,
                    'slug' => remove_special_char($new),
                    'meta_title' => trim($new),
                    'meta_description' => trim($new),
                ]);
            }
            return response()->json(['status' => true, 'msg' => 'با موفقیت ایجاد شد.']);
        }
    }

    public function show($id){
        $entity = BlogCategory::with(['files' => function($q) {
            $q->orderBy('order', 'asc');
        }])->find($id);


        $files = [];
        foreach ($entity->files as $file) {
            $files[] = [
                'percent' => 100, // for react component
                'file' => $file['file'],
                'mime_type' => $file['mime_type'],
                'path' => Storage::url('blog-categories/' . $id . '/' . $file['file']), // image or file address
                'collection' => $file['collection'],
                'directory' => 'blog-categories',
                'link' => $file['link'] ?? '',
                'caption' => $file['caption'] ?? '',
                'order' => $file['order'],
            ];
        }

        $list = [
            'value' => $entity->value,
            'label' => $entity->label,
            'slug' => $entity->slug ?? '',
            'heading' => $entity->heading ?? '',
            'meta_title' => $entity->meta_title ?? '',
            'meta_description' => $entity->meta_description ?? '',
            'content' => $entity->content,
            'status' => $entity->status,
            'files'=> $files


        ];
        return response($list);
    }


    /**
     * @param null $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'label' => 'required',
        ], [
            'label.required' => 'نام خود را وارد نکرده اید.',
        ]);
        if ($validator->fails()) {
            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        if ($request->get('slug')) {
            $slug = BlogCategory::where('slug', str_replace(' ', '-', $request->get('slug')))->where('value', '<>', $id)->count();
            if ($slug > 0) {
                return Response()->json(['status' => false, 'msg' => 'اسلاگ قبلا ثبت شده است.']);
            }
        }

        $result = BlogCategory::where('value', $id)->first();

        $result->update([
            'meta_title' => $request->get('meta_title'),
            'meta_description' => $request->get('meta_description'),
            'content' => $request->get('content'),
            'heading' => $request->get('heading'),
            'slug' => str_replace(' ', '-', $request->get('slug')),
            'status' => $request->get('status'),
            'label' => $request->get('label')
        ]);

        if ($request->has('files')) {

            foreach ($request->get('files')  as $file) {

                if ($file) { // some file empty

                    $check_exist = File::where('file', $file['file']);

                    if ($check_exist->count() > 0) {
                        $result->files()->updateOrCreate(['file' => $file['file']],[
                            'collection' => $file['collection'],
                            'link' => $file['link'],
                            'caption' => $file['caption'],
                            'order' => $file['order']
                        ]);

                    } else { // update

                        $old = 'attachment/' . $file['file'];

                        if ($file['mime_type'] == 'image') {

                            foreach ([500,300,200,100,50] as $dir) {

                                $copy = Storage::copy($old, 'blog-categories/' . $id . '/' . $dir . '/' . $file['file']);

                                if ($copy) {

                                    $copy = \Intervention\Image\Facades\Image::make(storage_path('app/public/blog-categories/' . $id . '/' . $dir . '/' . $file['file']));
                                    $copy->resize($dir, $dir);
                                    $copy->save();
                                }
                            }
                        }

                        $new = 'blog-categories/' . $id . '/' . $file['file'];

                        $move = Storage::move($old, $new); // Move Main Image

                        if ($move) {
                            $result->files()->updateOrCreate([
                                'created_by' => Auth::id(),
                                'mime_type' => $file['mime_type'],
                                'file' => $file['file'],
                                'collection' => $file['collection'],
                                'directory' => 'blog-categories',
                                'size' => $file['mime_type'] == 'image' ? json_encode([500,300,200,100,50]): NULL,
                                'link' => $file['link'],
                                'caption' => $file['caption'],
                                'order' => $file['order']
                            ]);
                        }
                    }
                }

            }
        }

        $nodes = BlogCategory::descendantsAndSelf($id);
        foreach ($nodes as $nod) {
            $nod->status = $request->get('status');
            $nod->save();
        }

        return response()->json(['status' => true, 'msg' => 'با موفقیت به روز رسانی گردید']);
    }



}
