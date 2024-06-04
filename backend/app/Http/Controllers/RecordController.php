<?php

namespace App\Http\Controllers;

use App\Models\Record;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class RecordController extends Controller
{
    public function index()
    {
        $records = Record::all();
        return response()->json(['records' => $records], 200);
    }
    public function getAllRecords(request $request){
        $user = Auth::user();
        $records = $user->records()->get();
        return response()->json(['records' => $records], 200);
    }
    
    public function getAccountRecords(request $request, $id){
        $account = Account::find($id);
        $records = $account->records()->get();
        return response()->json(['records' => $records], 200);
    }
    
    public function search(request $request){
        $searchTerm = $request->filled('query') ? $request->input('query') : null;
        $user = Auth::user();
        $query = $user->records::query();
        if ($searchTerm) {
            $query->where('amount', 'like', '%'.$searchTerm.'%')
                    ->orWhere('type', 'LIKE', "%$searchTerm%")
                    ->orWhere('currency', 'LIKE', "%$searchTerm%")
                    ->orWhere('category', 'LIKE', "%$searchTerm%")
                    ->orWhere('description', 'LIKE', "%$searchTerm%")
                    ->get();
        };
        return response()->json(['records' => $query], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'account_id' => 'required|max:255',
            'amount' => 'required|numeric|min:0',
            'currency'=>'required|string',
            'category' => 'required|string',
            'description' => 'nullable|string|max:255',
            'type'=> 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $user = Auth::user();
        $record = new Record([
            'account_id' => $request->account_id,
            'category' => $request->category,
            'amount' => $request->amount,
            'currency'=>$request->currency,
            'description' => $request->description,
            'type'=>$request->type
        ]);
        $user->records()->save($record);
        return response()->json(['record' => $record], 201);
    }

    public function show(request $request, $id)
    {
        $record = Record::find($id);

        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        return response()->json(['record' => $record], 200);
    }

    public function update(Request $request, $id)
    {
        $record = Record::find($id);

        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'account_id' => 'required|numeric|min:0',
            'amount' => 'required|numeric|min:0',
            'type'=> 'required|string',
            'currency'=>'required|string',
            'category' => 'required|string',
            'description' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $record->update([
            'account_id' => $request->account_id,
            'amount' => $request->amount,
            'type'=>$request->type,
            'currency'=>$request->currency,
            'category' => $request->category,
            'description' => $request->description
        ]);

        return response()->json(['record' => $record], 200);
    }

    public function destroy($id)
    {
        $record = Record::find($id);

        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $record->delete();
        return response()->json(['message' => 'Record deleted successfully'], 200);
    }
}