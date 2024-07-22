<?php

namespace App\Http\Controllers;

use App\Http\Requests\TicketCreateRequest;
use App\Http\Resources\TicketResource;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function store(TicketCreateRequest $request)
    {
        $data = $request->validated();

        $ticket = Ticket::create([
            ...$data, 
            'creator_id' => $request->user()->id
        ]);

        return new TicketResource($ticket);
    }

    public function show(string $ticket)
    {
        $ticket = Ticket::with('creator', 'members')->findOrFile($ticket);

        return new TicketResource($ticket);
    }

    public function update(Ticket $ticket, TicketCreateRequest $request)
    {
        $ticket->update($request->validated());

        return new TicketResource($ticket);
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json(['message' => 'Ticket deleted successfully']);
    }

    public function assign(Ticket $ticket, Request $request)
    {
        $data = $request->validate([
            'user' => ['required', 'array'],
        ]);
        
        $users = User::whereIn('email', $data['users'])->select('id', 'email')->get();

        // send email to those users who are not signed up

        $ticket->members()->sync($users->pluck('id'));

        return new TicketResource($ticket);
    }
}
