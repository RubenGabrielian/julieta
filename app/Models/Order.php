<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'instagram_username',
        'subscription_type',
        'monthly_price',
        'quantity',
        'total_price',
        'status',
    ];
}
