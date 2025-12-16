<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'successMessage' => session('success'),
        'email' => session('email'),
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
});
Route::get('/provisions', function () {
    return Inertia::render('Provisions');
});
Route::get('/privacy', function () {
    return Inertia::render('Privacy');
});

Route::get('/letter-from-juliet', function () {
    return Inertia::render('LetterFromJuliet');
});

Route::get('/send-letter', function () {
    return Inertia::render('SendLetter');
});

Route::get('/blog', function () {
    $posts = \App\Models\Post::latest()->get();
    
    return Inertia::render('Blog', [
        'posts' => $posts,
    ]);
});

Route::get('/register', function (Request $request) {
    return Inertia::render('Register', [
        'option_id' => $request->query('option'),
        'option_title' => $request->query('title'),
        'option_price' => $request->query('price'),
    ]);
});

Route::post('/register', [RegisterController::class, 'store']);

Route::resource('posts', PostController::class)->only(['index', 'show']);

// Admin routes for posts
Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
    // Define parameterized routes first to ensure proper matching
    Route::post('/delete-posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::post('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::post('/edit-posts/{post}', [PostController::class, 'update']);
    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    
    // Then define routes without parameters
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts', [PostController::class, 'adminIndex'])->name('posts.index');
    
    // Orders routes
    Route::post('/orders/{id}/cancel', [AdminController::class, 'cancelOrder'])->name('orders.cancel');
});

// Admin routes
Route::get('/admin/login', [AdminController::class, 'showLogin']);
Route::post('/admin/login', [AdminController::class, 'login']);
Route::post('/admin/logout', [AdminController::class, 'logout'])->middleware('admin');

Route::middleware('admin')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
});