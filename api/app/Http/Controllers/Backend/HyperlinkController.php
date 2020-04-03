<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Menu;
use Illuminate\Http\Request;

class HyperlinkController extends Controller
{
    public function index(Request $request)
    {

        return response(Menu::get()->toTree()); // footer id is 2
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
                    $node = new Menu([
                        'label' => trim($new),
                    ]);
                    $node->appendToNode(Menu::find($item));
                    $node->save();
                }
            }
            return response()->json(['status' => true, 'msg' => 'با موفقیت ایجاد شدند.']);
        } else {
            return response()->json(['status' => false, 'msg' => 'نمیتوانید روت جدید ایجاد کنید.']);
        }
    }

    public function show($id){
        $entity = Menu::find($id);
        $list = [
            'value' => $entity->value,
            'label' => $entity->label,
            'status' => $entity->status,
            'external_link' => $entity->external_link,


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


        Menu::where('value', $id)->update($request->all());

        $nodes = Menu::descendantsAndSelf($id);
        foreach ($nodes as $nod) {
            $nod->status = $request->get('status');
            $nod->save();
        }

        return response()->json(['status' => true, 'msg' => 'با موفقیت به روز رسانی گردید']);
    }



}
