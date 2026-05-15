<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Publication extends Model
{
    /** @use HasFactory<\Database\Factories\PublicationFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'abstract',
        'publication_type',
        'journal_or_conference',
        'publication_year',
        'doi',
        'link',
        'keywords',
        'research_project_id',
    ];

    public function researchProject(): BelongsTo
    {
        return $this->belongsTo(ResearchProject::class);
    }

    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Member::class, 'member_publication')
            ->withPivot('author_order')
            ->withTimestamps();
    }
}
