<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->get();
        
        return Inertia::render('Blog/Index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Max 2MB
            'mp3' => 'nullable|file|mimes:mp3,audio/mpeg|max:20480', // Max 20MB
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
            $validated['image'] = $imagePath;
        }

        if ($request->hasFile('mp3')) {
            $mp3Path = $request->file('mp3')->store('mp3s', 'public');
            $validated['mp3'] = $mp3Path;
        }

        $post = Post::create($validated);

        // If coming from admin, redirect to admin dashboard
        if (session('admin_logged_in')) {
            return redirect('/admin/dashboard')
                ->with('success', 'Post created successfully!');
        }

        return redirect()->route('posts.show', $post->id)
            ->with('success', 'Post created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $relatedPosts = Post::where('id', '!=', $post->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Edit', [
            'blogPost' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Max 2MB
            'mp3' => 'nullable|file|mimes:mp3,audio/mpeg|max:20480', // Max 20MB
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($post->image && Storage::disk('public')->exists($post->image)) {
                Storage::disk('public')->delete($post->image);
            }
            $imagePath = $request->file('image')->store('posts', 'public');
            $validated['image'] = $imagePath;
        }

        if ($request->hasFile('mp3')) {
            // Delete old file if exists
            if ($post->mp3 && Storage::disk('public')->exists($post->mp3)) {
                Storage::disk('public')->delete($post->mp3);
            }
            $mp3Path = $request->file('mp3')->store('mp3s', 'public');
            $validated['mp3'] = $mp3Path;
        }

        $post->update($validated);

        return redirect('/admin/posts')
            ->with('success', 'Post updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        // Delete image file if exists
        if ($post->image && Storage::disk('public')->exists($post->image)) {
            Storage::disk('public')->delete($post->image);
        }

        // Delete MP3 file if exists
        if ($post->mp3 && Storage::disk('public')->exists($post->mp3)) {
            Storage::disk('public')->delete($post->mp3);
        }

        $post->delete();

        return redirect('/admin/posts')
            ->with('success', 'Post deleted successfully!');
    }

    /**
     * Display admin posts listing.
     */
    public function adminIndex()
    {
        $posts = Post::latest()->get();
        
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
        ]);
    }
}
