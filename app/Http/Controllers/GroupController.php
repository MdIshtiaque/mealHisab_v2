<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{

    public function index()
    {
        try {
            $groups = Group::with(['members.user'])
                ->withCount('members')
                ->get();

            return response()->json([
                'groups' => $groups,
                'success' => true
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching groups',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        try {
            $group = Group::create($request->all());
            return response()->json([
                'group' => $group,
                'success' => true
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating group',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
