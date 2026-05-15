<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ResearchProject extends Model
{
    /** @use HasFactory<\Database\Factories\ResearchProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'start_date',
        'end_date',
        'status',
        'funding_source',
        'budget',
        'responsable_id',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'budget' => 'decimal:2',
        ];
    }

    public function responsable(): BelongsTo
    {
        return $this->belongsTo(Member::class, 'responsable_id');
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(Member::class, 'member_project')
            ->withPivot('role_in_project')
            ->withTimestamps();
    }

    public function publications(): HasMany
    {
        return $this->hasMany(Publication::class);
    }

    public function valorisations(): HasMany
    {
        return $this->hasMany(Valorisation::class);
    }
}
