<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class TransferController extends Controller
{
    public function index()
    {
        $transfers = Transfer::all();
        return response()->json(['transfers' => $transfers], 200);
    }

    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'User is not authenticated.'], 401);
        }
        
        $user = Auth::user();
        $userAccounts = $user->accounts()->pluck('id');
        
        if (!$userAccounts->contains($request->source_account_id) || 
            !$userAccounts->contains($request->destination_account_id)) {
            return response()->json(['error' => 'Source and destination accounts must belong to the same user.'], 403);
        }
    
        $transfer = Transfer::create([
            'user_id' => $request->user_id,
            'source_account_id' => $request->source_account_id,
            'destination_account_id' => $request->destination_account_id,
            'amount' => $request->amount,
            'description' => $request->description,
        ]);
        return response()->json(['transfer' => $transfer], 201);
    }


    public function show($id)
    {
        $transfer = Transfer::find($id);

        if (!$transfer) {
            return response()->json(['message' => 'Transfer not found'], 404);
        }

        return response()->json(['transfer' => $transfer], 200);
    }

    public function update(Request $request, $id)
    {
        $transfer = Transfer::find($id);

        if (!$transfer) {
            return response()->json(['message' => 'Transfer not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string|max:255',
            'source_account_id' => 'required|exists:accounts,id',
            'destination_account_id' => 'required|exists:accounts,id',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $transfer->update([
            'user_id' => $request->user_id,
            'source_account_id' => $request->source_account_id,
            'destination_account_id' => $request->destination_account_id,
            'amount' => $request->amount,
            'description' => $request->description,
        ]);

        return response()->json(['transfer' => $transfer], 200);
    }

    public function destroy($id)
    {
        $transfer = Transfer::find($id);

        if (!$transfer) {
            return response()->json(['message' => 'Transfer not found'], 404);
        }

        $transfer->delete();
        return response()->json(['message' => 'Transfer deleted successfully'], 200);
    }
}