<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipment>
 */
class ShipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'waybill' => Str::random(10),
            'customer_address' => fake()->city() . ', ' . fake()->state(),
            'customer_name' => fake()->name(),
            'customer_phone_number' => fake()->numerify('##########'),
            'user_id' => random_int(1, 10),
        ];
    }
}
