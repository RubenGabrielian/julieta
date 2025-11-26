<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/letter-from-juliet', function () {
    return Inertia::render('LetterFromJuliet');
});

Route::resource('posts', PostController::class)->only(['index', 'show', 'create', 'store']);