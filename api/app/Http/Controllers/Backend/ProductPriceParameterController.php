<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\ProductPriceParameter;
use Illuminate\Http\Request;

class ProductPriceParameterController extends Controller
{

    public function index(Request $request)
    {

        return response(ProductPriceParameter::get()->toTree());
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

                    // check exist
                    if (ProductPriceParameter::where('label', trim($new))->count() == 0 ) {
                        $node = new ProductPriceParameter([
                            'label' => trim($new),
                        ]);
                        $node->appendToNode(ProductPriceParameter::find($item));
                        $node->save();
                    }
                }
            }
            return response()->json(['status' => true, 'msg' => 'با موفقیت ایجاد شدند.']);
        } else {
            foreach ($new_node as $new) {
                ProductPriceParameter::create([
                    'label' => $new,
                ]);
            }
            return response()->json(['status' => true, 'msg' => 'با موفقیت ایجاد شد.']);
        }
    }

    public function show($id){
        $entity = ProductPriceParameter::find($id);
        $list = [
            'value' => $entity->value,
            'label' => $entity->label,
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
        $validator = \Validator::make($request->all(), [
            'label' => 'required',
        ], [
            'label.required' => 'نام خود را وارد نکرده اید.',
        ]);
        if ($validator->fails()) {
            return Response()->json(['status' => false, 'msg' => $validator->errors()->first()]);
        }

        ProductPriceParameter::where('value', $id)->update($request->all());

        $nodes = ProductPriceParameter::descendantsAndSelf($id);
        foreach ($nodes as $nod) {
            $nod->status = $request->get('status');
            $nod->save();
        }

        return response()->json(['status' => true, 'msg' => 'با موفقیت به روز رسانی گردید']);
    }



}
