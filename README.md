## About Shippro

Shippro is a small platform for a shipping company (Test).

-   user can login or register.
-   He can create, update, view and cancel shipments he own.

## Framewroks used

Laravel & Graphql for the APIs
and ReactJs for the frontend.

# Terminal Commands used during the development of this application.

-   laravel new shippro
-   cd shippro/
-   composer require nuwave/lighthouse=4.14.1
-   composer require mll-lab/laravel-graphql-playground=2.1.0
-   composer require --dev barryvdh/laravel-ide-helper
-   composer require mll-lab/laravel-graphql-playground
-   composer require nuwave/lighthouse
-   php artisan vendor:publish --tag=lighthouse-schema
-   php artisan make:model Shipment -m
-   php artisan migrate
-   php artisan make:factory ShipmentFactory
-   php artisan migrate:refresh --seed
-   composer require laravel/sanctum
-   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
-   php artisan migrate
-   php artisan vendor:publish --tag=lighthouse-schema
-   php artisan vendor:publish --tag=lighthouse-config
-   php artisan vendor:publish --tag=graphql-playground-view
-   php artisan vendor:publish --tag=graphql-playground-config
-   php artisan lighthouse:mutation Login
-   php artisan lighthouse:mutation Logout
-   php artisan make:listener AuthenticateUser
-   php artisan make:policy ShipmentPolicy --model=Shipment
-   php artisan lighthouse:mutation Shipments
-   php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
