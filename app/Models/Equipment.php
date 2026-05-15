<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Equipment extends Model
{
    /** @use HasFactory<\Database\Factories\EquipmentFactory> */
    use HasFactory;

    protected $table = 'equipments';

    protected $fillable = [
        'name',
        'type',
        'description',
        'inventory_code',
        'status',
        'location',
        'responsible_member_id',
    ];

    public function responsibleMember(): BelongsTo
    {
        return $this->belongsTo(Member::class, 'responsible_member_id');
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(EquipmentReservation::class);
    }
}
