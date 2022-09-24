<?php

namespace App\Policies;

use App\Models\Shipment;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ShipmentPolicy
{
    use HandlesAuthorization;



    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Shipment  $shipment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Shipment $shipment)
    {
        return $user->id === $shipment->user_id;
    }


    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Shipment  $shipment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Shipment $shipment)
    {
        return $user->id === $shipment->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Shipment  $shipment
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Shipment $shipment)
    {
        return $user->id === $shipment->user_id;
    }
}
