<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquipmentReservation extends Model
{
    /** @use HasFactory<\Database\Factories\EquipmentReservationFactory> */
    use HasFactory;

    protected $fillable = [
        'equipment_id',
        'member_id',
        'reservation_date',
        'start_time',
        'end_time',
        'purpose',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'reservation_date' => 'date',
        ];
    }

    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
}
