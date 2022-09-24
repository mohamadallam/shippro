<?php

namespace App\GraphQL\Mutations;

use App\Models\Shipment;
use GraphQL\Error\Error;
use Illuminate\Support\Facades\Auth;

final class AddShipment
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $guard =  Auth::guard(config('sanctum.guard', 'web'));
        $user = $guard->user();
        $shipment = new Shipment();
        $shipment->waybill =  $args['waybill'];
        $shipment->customer_address =  $args['customer_address'];
        $shipment->customer_name =  $args['customer_name'];
        $shipment->customer_phone_number =  $args['customer_phone_number'];
        $shipment->user_id =  $user->id;
        $shipment->save();
        return $shipment;
    }
}
