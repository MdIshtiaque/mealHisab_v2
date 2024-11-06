<?php

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;


if (!function_exists('uploadToB2')) {
    function uploadToB2($file, string $folder, ?string $oldFile = null): string|bool
    {
        try {
            // Delete old file if exists
            if ($oldFile) {
                deleteFile($oldFile);
            }

            // Generate unique filename
            $extension = $file->getClientOriginalExtension();
            $filename = Str::uuid() . '.' . $extension;

            // Ensure folder ends with trailing slash
            $folder = rtrim($folder, '/') . '/';

            // Store file
            $path = $file->storeAs($folder, $filename, 'b2');

            return $path;
        } catch (\Exception $e) {
            Log::error('B2 Store Error: ' . $e->getMessage());
            return false;
        }
    }
}

if (!function_exists('deleteFile')) {
    function deleteFile(string $path): bool
    {
        try {
            if (!$path) return true;

            if (Storage::disk('b2')->exists($path)) {
                return Storage::disk('b2')->delete($path);
            }

            return true;
        } catch (\Exception $e) {
            Log::error('B2 Delete Error: ' . $e->getMessage());
            return false;
        }
    }
}

if (!function_exists('b2RetrieveFile')) {
    function b2RetrieveFile(?string $path, ?string $defaultImage = null): string
    {
        try {
            if (!$path) {
                return $defaultImage ?? '';
            }

            if (Storage::disk('b2')->exists($path)) {
                return Storage::disk('b2')->get($path);
            }

            return $defaultImage ?? '';
        } catch (\Exception $e) {
            Log::error('B2 Retrieve Error: ' . $e->getMessage());
            return $defaultImage ?? '';
        }
    }
}
