<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::all();
        return response()->json(['accounts' => $accounts], 200);
    }
    
    public function getUserAccounts(Request $request)
    {
        // Retrieve the authenticated user
        $user = Auth::user();
        
        // Retrieve the accounts associated with the user
        $accounts = $user->accounts()->get();

        // Return the accounts as JSON response
        return response()->json(['accounts' => $accounts], 200);
    }
    public function getUserAccountById(Request $request, $id)
    {
        $user = Auth::user();
        $account = $user->accounts()->find($id);
        return response()->json(['account' => $account], 200);
    }
    
    public function deleteAccountById(Request $request, $id)
    {
        $user = Auth::user();
        $account = $user->accounts()->find($id);
        $account->delete();
        return response()->json(['message' => 'Account deleted successfully'], 200);
    }
    
    public function editAccount(Request $request, $id)
    {
        $user = Auth::user();
        $account = $user->accounts()->find($id);
        $account->update($request->all());
        return response()->json(['account' => $account], 200);
    }
    
    public function search(request $request){
        $searchTerm = $request->filled('query') ? $request->input('query') : null;
        $user = Auth::user();
        $query = $user->records::query();
        if ($searchTerm) {
            $query->where('name', 'like', '%'.$searchTerm.'%')
                    ->orWhere('balance', 'LIKE', "%$searchTerm%")
                    ->orWhere('currency', 'LIKE', "%$searchTerm%")
                    ->get();
        };
        return response()->json(['accounts' => $query], 200);
    }


    public function addAccount(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'balance' => 'required|numeric|min:0',
            'currency' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Create a new account for the logged-in user
        $user = Auth::user();
        $account = new Account([
            'name' => $request->name,
            'balance' => $request->balance,
            'currency' => $request->currency,
        ]);
        $user->accounts()->save($account);

        return response()->json(['account' => $account], 201);
    }

    

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'currency' => 'required|string|in:mad,usd,euro',
            'balance' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $account = Account::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'currency' => $request->currency,
            'balance' => $request->balance,
        ]);

        return response()->json(['account' => $account], 201);
    }

    public function show($id)
    {
        $account = Account::find($id);

        if (!$account) {
            return response()->json(['message' => 'Account not found'], 404);
        }

        return response()->json(['account' => $account], 200);
    }

    public function update(Request $request, $id)
    {
        $account = Account::find($id);

        if (!$account) {
            return response()->json(['message' => 'Account not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'currency' => 'required|string|in:mad,usd,euro',
            'balance' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $account->update([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'currency' => $request->currency,
            'balance' => $request->balance,
        ]);

        return response()->json(['account' => $account], 200);
    }

    public function destroy($id)
    {
        $account = Account::find($id);

        if (!$account) {
            return response()->json(['message' => 'Account not found'], 404);
        }

        $account->delete();
        return response()->json(['message' => 'Account deleted successfully'], 200);
    }
}