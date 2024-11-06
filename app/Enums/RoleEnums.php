<?php

namespace App\Enums;

use App\Traits\UseEnum;

enum RoleEnums: string
{
    use UseEnum;

    case ADMIN = 'admin';
    case MEMBER = 'member';
}
