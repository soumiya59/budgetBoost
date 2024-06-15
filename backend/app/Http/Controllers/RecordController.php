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
    public function getAllMyRecords(request $request){
        $user = Auth::user();
        $records = $user->records()->get();
        return response()->json(['records' => $records], 200);
    }
    
    public function getAccountRecords(request $request, $id){
        $account = Account::find($id);
        $records = $account->records()->get();
        return response()->json(['records' => $records], 200);
    }

    public function search($searchTerm){
        $user = Auth::user();
        if ($user) {
            
            $userRecords = $user->records();
            $records = $userRecords->where(function($query) use ($searchTerm) {
               $query->where('amount', 'like', '%'.$searchTerm.'%')
                    ->orWhere('type', 'like', '%'.$searchTerm.'%')
                    ->orWhere('category', 'like', '%'.$searchTerm.'%')
                    ->orWhere('option', 'like', '%'.$searchTerm.'%')
                    ->orWhere('description', 'like', '%'.$searchTerm.'%');
            })->get();
            
            if ($records->isEmpty()) {
                return response()->json(['message' => 'Record not found'], 404);
            }else{
                return response()->json(['records' => $records], 200);
            }
            
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'account_id' => 'required|max:255',
            'amount' => 'required|numeric|min:0',
            'category' => 'required|string',
            'option' => 'required|string',
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
            'option' => $request->option,
            'amount' => $request->amount,
            'description' => $request->description,
            'type'=>$request->type
        ]);
        $user->records()->save($record);
        $record->account->updateBalance($record->amount, $record->type);


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
            'category' => 'required|string',
            'option' => 'required|string',
            'description' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        
        $record->account->updateBalanceWithRecordUpdate($record->amount, $record->type, $request->amount, $request->type);

        $record->update([
            'account_id' => $request->account_id,
            'amount' => $request->amount,
            'type'=>$request->type,
            'category' => $request->category,
            'option' => $request->option,
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

        $record->account->revertBalance($record->amount, $record->type);
        $record->delete();
        return response()->json(['message' => 'Record deleted successfully'], 200);
    }
}