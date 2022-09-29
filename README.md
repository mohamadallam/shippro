## About Shippro

Shippro is a small platform for a shipping company (Test).

-   user can login or register.
-   He can create, update, view and cancel shipments he own.

## Framewroks used

Laravel & Graphql for the APIs
and ReactJs for the frontend.

### Terminal Commands used during the development of this application (Backend).

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

### Terminal Commands used during the development of this application (FrontEnd).

-   npm install @reduxjs/toolkit
-   npm i react-redux
-   npm i @apollo/client
-   npm i graphql-tag
-   npm i react-router-dom
-   npm install @mui/material @emotion/react @emotion/styled
-   npm i notistack
-   npm i @mui/styles
-   git add .
-   git commit -m "Frontend Layout (Frontend Project Skeleton) : ReactJS, Redux, AppoloClient for GraphQL API, API SERVICES,Setup Api Connections "
-   git push -u origin master
-   git add .
-   git commit -m "remove some unsed comments"
-   git push -u origin master
-   npm i @mui/icons-material
-   git add .
-   git commit -m "FrontEnd (Pages, Components) Added using Material UI, Redesign User Authentication, Add Some Functionality and fix some issues "
-   git push -u origin master
-   git add .
-   git commit -m "Frontend: add action links to appBar and drawer"
-   git push -u origin master
-   npm run dev

## The Goal from this Project to build Skeleton App using

-   ReactJS
-   GraphQL
-   Laravel -

## Next Set to Improve this App

-   Convert React App to typescript
-   replace services with useQuery (React hook) to request GraphQL Apis
-   modify the Project Layout a bit
-   add more Components and more functionality if needed
