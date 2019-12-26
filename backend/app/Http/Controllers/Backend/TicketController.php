<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Ticket;
use App\TicketConversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     *
     */
    public function index(Request $request)
    {

        $entities = Ticket::where( function ($q) use ($request) {
            // Filter If Request Contain Filter Input
            if ($request->has('filter')) {

                $filter = json_decode($request->get('filter'), true);

                if (@$filter['id']) {
                    $q->where('id', '=', $filter['id']);
                }

                if (@$filter['created_by'] != -1) {
                    $q->where('created_by', '=', $filter['created_by']);
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
     * @param $id
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function conversations($id)
    {
        $ticket = Ticket::with(['createdBy', 'conversations' => function($q) {
            $q->with(['createdBy']);
        }])->find($id);


        $list = [
            'id' => $ticket->id,
            'title' => $ticket->title,
            'created_by' => [
                'id' => $ticket->createdBy->id,
                'name' => $ticket->createdBy->name,
                'mobile' => $ticket->createdBy->mobile,
                'role_key' => $ticket->createdBy->role_key,
            ],
            'created_at' => $ticket->created_at,
            'conversations' => [],
        ];

        foreach ($ticket->conversations as $conversation) {
            $list['conversations'][] = [
                'created_by' => [
                    'id' => $conversation->createdBy->id,
                    'name' => $conversation->createdBy->name,
                    'mobile' => $conversation->createdBy->mobile,
                    'role_key' => $conversation->createdBy->role_key,
                ],
                'id' => $conversation->id,
                'content' => $conversation->content,
                'is_customer' => $ticket->created_by == $conversation->created_by ? true: false,
                'created_at' => $conversation->created_at,
            ];
        }


        return response($list);
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeConversations($id, Request $request)
    {

        $ticket = Ticket::find($id);

        $result = $ticket->conversations()->create([
            'created_by' => Auth::id(),
            'content' => $request->get('content'),
        ]);

        if ($result) {
            return response()->json(['status' => true, 'msg' => 'با موفقیت انجام شد.']);
        }

        return response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);
    }

    /**
     * @param $ticket_id
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteConversation($ticket_id, $id)
    {
        $status = false;
        $cnv = TicketConversation::find($id);

        if ($cnv->ticket_id == $ticket_id) {
            $status = $cnv->delete();
        }

        if ($status) {
            return response()->json(['status' => true, 'msg' => 'با موفقیت انجام شد.']);
        }

        return response()->json(['status' => false, 'msg' => 'خطایی رخ داده است.']);

    }

}
