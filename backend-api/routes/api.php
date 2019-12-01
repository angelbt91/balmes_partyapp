<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/postmessage', 'MessagesController@PostMessage');
Route::get('/getmessages', 'MessagesController@GetMessages');
Route::put('/updatemessage', 'MessagesController@UpdateMessage');
Route::post('/testpusher', 'MessagesController@TestBroadcast');
