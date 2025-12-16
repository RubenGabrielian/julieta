<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function showLogin()
    {
        // If already logged in, redirect to dashboard
        if (session('admin_logged_in')) {
            return redirect('/admin/dashboard');
        }

        return Inertia::render('Admin/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $adminUsername = env('ADMIN_USERNAME', 'admin');
        $adminPassword = env('ADMIN_PASSWORD', 'admin123');

        if ($request->username === $adminUsername && $request->password === $adminPassword) {
            session(['admin_logged_in' => true]);
            return redirect('/admin/dashboard');
        }

        return back()->withErrors([
            'credentials' => 'Invalid username or password.',
        ]);
    }

    public function logout()
    {
        session()->forget('admin_logged_in');
        return redirect('/admin/login');
    }

    public function dashboard()
    {
        $orders = \App\Models\Order::latest()->get();
        $posts = \App\Models\Post::latest()->get();

        return Inertia::render('Admin/Dashboard', [
            'orders' => $orders,
            'posts' => $posts,
        ]);
    }

    public function cancelOrder(Request $request, $id)
    {
        $order = \App\Models\Order::findOrFail($id);

        // Only allow canceling pending or active orders
        if (!in_array($order->status, ['pending', 'active'])) {
            return back()->withErrors([
                'order' => 'This order cannot be cancelled.',
            ]);
        }

        $order->status = 'cancelled';
        $order->save();

        return redirect('/admin/dashboard')->with('success', 'Order cancelled successfully. No future payments will be processed.');
    }
}

