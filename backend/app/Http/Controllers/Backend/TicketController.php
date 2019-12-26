<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Ticket;
use Illuminate\Http\Request;

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
                'content' => $conversation->content,
                'created_at' => $conversation->created_at,
            ];
        }


        return response($list);
    }

}
