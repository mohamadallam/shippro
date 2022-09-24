<?php

namespace App\GraphQL\Mutations;

use App\Models\Shipment;
use Illuminate\Support\Facades\Auth;

final class Shipments
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $guard =  Auth::guard(config('sanctum.guard', 'web'));
        $user = $guard->user();
        return Shipment::where('user_id', $user->id)->get();
    }
}
