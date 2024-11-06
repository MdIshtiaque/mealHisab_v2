<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Backblaze B2 Storage
        Storage::extend('b2', function ($app, $config) {
            $config['endpoint'] = $config['endpoint'] ?? 'https://s3.' . $config['region'] . '.backblazeb2.com';

            return Storage::createS3Driver($config);
        });

        // Sanctum Personal Access Token Model
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);
    }
}
