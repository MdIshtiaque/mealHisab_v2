<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Storage;

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
        Storage::extend('b2', function($app, $config) {
            $config['endpoint'] = $config['endpoint'] ?? 'https://s3.' . $config['region'] . '.backblazeb2.com';

            return Storage::createS3Driver($config);
        });
    }
}
