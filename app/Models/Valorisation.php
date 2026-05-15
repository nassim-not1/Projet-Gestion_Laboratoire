<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Valorisation extends Model
{
    /** @use HasFactory<\Database\Factories\ValorisationFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type',
        'date',
        'partner_name',
        'research_project_id',
        'member_id',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
        ];
    }

    public function researchProject(): BelongsTo
    {
        return $this->belongsTo(ResearchProject::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }
}
