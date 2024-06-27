<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class GoalController extends Controller
{
    public function index()
    {
        $goals = Goal::all();
        return response()->json(['goals' => $goals], 200);
    }
    
    public function getUserGoals(Request $request)
    {
        $user = Auth::user();
        $goals = $user->goals()->get();
        return response()->json(['goals' => $goals], 200);
    }
    public function deleteGoalById(Request $request, $id)
    {
        $user = Auth::user();
        $goal = $user->goals()->find($id);
        $goal->delete();
        return response()->json(['message' => 'Goal deleted successfully'], 200);
    }
    public function addGoalToUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'current_amount' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $user = Auth::user();
        $goal = new Goal([
            'name' => $request->name,
            'target_amount' => $request->target_amount,
            'current_amount' => $request->current_amount,
            'last_added_amount' => $request->current_amount,
            'completion_date' => $request->completion_date,
            'status' => 'in progress',
            'currency' => $request->currency ,
        ]);
        $user->goals()->save($goal);
        return response()->json(['goal' => $goal], 201);
    }
    
    public function addAmountToGoal(Request $request){
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $user = Auth::user();
        $goal = $user->goals()->find($request->goalId);
        $goal->current_amount += $request->amount;
        $goal->last_added_amount = $request->amount;
        $goal->save();
        return response()->json(['goal' => $goal], 200);
    }
    
    public function setGoalAsReached(Request $request, $id)
    {
        $user = Auth::user();
        $goal = $user->goals()->find($id);
        $goal->current_amount = $goal->target_amount;
        $goal->last_added_amount = $goal->target_amount;
        $goal->status = 'completed';
        $goal->save();
        return response()->json(['goal' => $goal], 200);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'current_amount' => 'required|numeric|min:0',
            'completion_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $goal = Goal::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'target_amount' => $request->target_amount,
            'current_amount' => $request->current_amount,
            'last_added_amount' => $request->current_amount, 
            'completion_date' => $request->completion_date,
            'status' => 'in progress',
            'currency' => $request->currency 
        ]);

        return response()->json(['goal' => $goal], 201);
    }

    public function show($id)
    {
        $goal = Goal::find($id);

        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], 404);
        }

        return response()->json(['goal' => $goal], 200);
    }

    public function update(Request $request, $id)
    {
        $goal = Goal::find($id);
        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], 404);
        }

        $goal->update([
            'name' => $request->name,
            'target_amount' => $request->target_amount,
            'current_amount' => $request->current_amount,
            'completion_date' => $request->completion_date,
            'last_added_amount' => $request->current_amount,
            'status' => $request->status ?? 'in progress',
            'currency' => $request->currency 
        ]);
        return response()->json(['goal' => $goal], 200);
    }

    public function destroy($id)
    {
        $goal = Goal::find($id);

        if (!$goal) {
            return response()->json(['message' => 'Goal not found'], 404);
        }

        $goal->delete();
        return response()->json(['message' => 'Goal deleted successfully'], 200);
    }
}