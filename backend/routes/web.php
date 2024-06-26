<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\RecordController;


Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});
 
// Route::post('/tokens/create', function (Request $request) {
//     $token = $request->user()->createToken($request->token_name);
 
//     return ['token' => $token->plainTextToken];
// });

// User routes
Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get('/users', [UserController::class, 'index']);
});
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

//record routes
Route::get('/records', [RecordController::class, 'index']);
Route::get('/myrecords', [RecordController::class, 'getAllMyRecords']);
Route::get('/myrecords/{id}', [RecordController::class, 'getAccountRecords']);
Route::post('/records', [RecordController::class, 'store']);
Route::get('/records/{id}', [RecordController::class, 'show']);
Route::get('/records/search/{searchTerm}', [RecordController::class, 'search']);
Route::put('/records/{id}', [RecordController::class, 'update']);
Route::delete('/records/{id}', [RecordController::class, 'destroy']);

// Category routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

// Account routes
Route::get('/accounts', [AccountController::class, 'index']);
Route::get('/myaccounts', [AccountController::class, 'getUserAccounts']);
Route::get('/myaccounts/{id}', [AccountController::class, 'getUserAccountById']);
Route::delete('/myaccounts/{id}', [AccountController::class, 'deleteAccountById']);
Route::put('/myaccounts/{id}', [AccountController::class, 'editAccount']);
Route::post('/addaccount', [AccountController::class, 'addAccount']);

Route::post('/accounts', [AccountController::class, 'store']);
Route::get('/accounts/{id}', [AccountController::class, 'show']);
Route::put('/accounts/{id}', [AccountController::class, 'update']);
Route::get('/accounts/search', [AccountController::class, 'search']);
Route::delete('/accounts/{id}', [AccountController::class, 'destroy']);

// Transfer routes
Route::get('/transfers', [TransferController::class, 'index']);
Route::post('/transfers', [TransferController::class, 'store']);
Route::get('/transfers/{id}', [TransferController::class, 'show']);
Route::put('/transfers/{id}', [TransferController::class, 'update']);
Route::delete('/transfers/{id}', [TransferController::class, 'destroy']);

// Goal routes
Route::get('/goals', [GoalController::class, 'index']);
Route::get('/mygoals', [GoalController::class, 'getUserGoals']);
Route::post('/addgoal', [GoalController::class, 'addGoalToUser']);
Route::post('/addamount', [GoalController::class, 'addAmountToGoal']);
route::delete('/mygoals/{id}', [GoalController::class, 'deleteGoalById']);
Route::post('/goals', [GoalController::class, 'store']);
Route::get('/goals/{id}', [GoalController::class, 'show']);
Route::put('/goals/{id}', [GoalController::class, 'update']);
Route::delete('/goals/{id}', [GoalController::class, 'destroy']);


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';