<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IncomeController extends Controller
{
    public function index()
    {
        $incomes = Income::all();
        return response()->json(['incomes' => $incomes], 200);
    }

    public function getUserIncomes(Request $request)
    {
        $user = Auth::user();
        $incomes = $user->incomes()->get();
        return response()->json(['incomes' => $incomes], 200);
    }
    
    public function addIncome(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        
        $account = Account::findOrFail($accountId);

        // Create a new income for the account
        $income = new Income();
        $income->amount = $request->amount;
        $income->description = $request->description;
        
        // Associate the income with the account
        $account->incomes()->save($income);

        // $user = Auth::user();
        // $income = new Income([
        //     'account_id' => $request->account_id,
        //     'amount' => $request->amount,
        //     'source' => $request->source,
        //     'description' => $request->description,
        // ]);
        // $user->accounts()->incomes()->save($income);

        return response()->json(['income' => $income], 201);
    }

    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'account_id' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $income = Income::create([
            'account_id' => $request->account_id,
            'amount' => $request->amount,
            'source' => $request->source,
            'description' => $request->description,
        ]);

        return response()->json(['income' => $income], 201);
    }

    public function show($id)
    {
        $income = Income::find($id);

        if (!$income) {
            return response()->json(['message' => 'Income not found'], 404);
        }

        return response()->json(['income' => $income], 200);
    }

    public function update(Request $request, $id)
    {
        $income = Income::find($id);

        if (!$income) {
            return response()->json(['message' => 'Income not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'account_id' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'source' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            // 'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $income->update([
            'account_id' => $request->account_id,
            'amount' => $request->amount,
            'source' => $request->source,
            'description' => $request->description,
            // 'date' => $request->date,
        ]);

        return response()->json(['income' => $income], 200);
    }

    public function destroy($id)
    {
        $income = Income::find($id);

        if (!$income) {
            return response()->json(['message' => 'Income not found'], 404);
        }

        $income->delete();
        return response()->json(['message' => 'Income deleted successfully'], 200);
    }
}