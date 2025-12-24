<?php

namespace App\Enums;

enum Color: string
{
    case BLUE = 'blue';
    case RED = 'red';
    case GREEN = 'green';
    case YELLOW = 'yellow';
    case PURPLE = 'purple';
    case PINK = 'pink';
    case INDIGO = 'indigo';
    case ORANGE = 'orange';
    case TEAL = 'teal';
    case GRAY = 'gray';

    /**
     * Get all color values as an array.
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
