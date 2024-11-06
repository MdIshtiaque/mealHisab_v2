<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    protected $fillable = ['name', 'description', 'members_count', 'is_active'];

    public function members(): HasMany
    {
        return $this->hasMany(GroupMember::class);
    }
}
