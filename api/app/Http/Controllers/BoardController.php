<?php

namespace App\Http\Controllers;

use App\Http\Requests\BoardCreateRequest;
use App\Http\Resources\BoardResource;
use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    // public function index(string $project, Request $request)
    // {
    //     return $request->user()->projects->map->boards->flatten();
    // }

    public function store(BoardCreateRequest $request)
    {
        $data = $request->validated();

        $board = Board::create($data);

        return new BoardResource($board);
    }

    // public function show(string $project, string $board, Request $request)
    // {
    //     $board = $request->user()->boards()->where('uuid', $board)->firstOrFail();

    //     return new BoardResource($board);
    // }

    public function update(Board $board, BoardCreateRequest $request)
    {
        $board->update($request->validated());

        return new BoardResource($board);
    }

    public function destroy(Board $board, Request $request)
    {
        $board->load('project');
        abort_if($request->user()->id !== $board->project->user_id, 403, 'You are not authorized to delete this board');

        $board->delete();

        return response()->json(['message' => 'Board deleted successfully']);
    }
}
