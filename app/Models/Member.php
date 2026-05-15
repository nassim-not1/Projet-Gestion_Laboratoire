<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Member extends Model
{
    /** @use HasFactory<\Database\Factories\MemberFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'grade',
        'research_domain',
        'bio',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(ResearchProject::class, 'member_project')
            ->withPivot('role_in_project')
            ->withTimestamps();
    }

    public function responsibleProjects(): HasMany
    {
        return $this->hasMany(ResearchProject::class, 'responsable_id');
    }

    public function publications(): BelongsToMany
    {
        return $this->belongsToMany(Publication::class, 'member_publication')
            ->withPivot('author_order')
            ->withTimestamps();
    }

    public function responsibleEquipments(): HasMany
    {
        return $this->hasMany(Equipment::class, 'responsible_member_id');
    }

    public function equipmentReservations(): HasMany
    {
        return $this->hasMany(EquipmentReservation::class);
    }

    public function valorisations(): HasMany
    {
        return $this->hasMany(Valorisation::class);
    }
}
