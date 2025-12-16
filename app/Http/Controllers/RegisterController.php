<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Mail\OrderConfirmed;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'instagram_username' => ['required', 'string', 'max:255'],
            'quantity' => ['nullable', 'integer', 'min:1'],
            'total_price' => ['nullable', 'numeric', 'min:0'],
            'option_id' => ['nullable', 'string'],
            'option_title' => ['nullable', 'string'],
        ]);

        // Determine if it's from send-letter (has option_title) or letter-from-juliet (subscription)
        $isFromSendLetter = !empty($validated['option_title']);

        $orderData = [
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'],
            'instagram_username' => $validated['instagram_username'],
            'status' => 'pending',
        ];

        if ($isFromSendLetter) {
            // From send-letter page - one-time purchase
            $orderData['subscription_type'] = $validated['option_title'];
            $orderData['monthly_price'] = 0;
            $orderData['quantity'] = $validated['quantity'] ?? 1;
            $orderData['total_price'] = $validated['total_price'] ?? 0;
        } else {
            // From letter-from-juliet page - subscription
            $orderData['subscription_type'] = 'Նամակ Ջուլիետից';
            $orderData['monthly_price'] = 3000.00;
            $orderData['quantity'] = 1;
            $orderData['total_price'] = null;
        }

        $order = Order::create($orderData);

        // Send confirmation email to the user
        Mail::to($validated['email'])->send(new OrderConfirmed($order));

        // After successful payment/registration, redirect to home page
        // and flash a success message + email so we can show a toast there
        return redirect('/')
            ->with('success', 'Ձեր պատվերը ստացված է։')
            ->with('email', $validated['email']);
    }
}

