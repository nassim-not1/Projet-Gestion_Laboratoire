<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Member;
use App\Models\Publication;
use App\Models\ResearchProject;
use App\Models\Valorisation;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'members' => Member::count(),
                'projects' => ResearchProject::count(),
                'activeProjects' => ResearchProject::where('status', 'en_cours')->count(),
                'finishedProjects' => ResearchProject::where('status', 'termine')->count(),
                'equipments' => Equipment::count(),
                'availableEquipments' => Equipment::where('status', 'disponible')->count(),
                'publications' => Publication::count(),
                'valorisations' => Valorisation::count(),
            ],
            'charts' => [
                'publicationsByYear' => Publication::query()
                    ->selectRaw('publication_year as label, count(*) as total')
                    ->groupBy('publication_year')
                    ->orderBy('publication_year')
                    ->get(),
                'projectsByStatus' => ResearchProject::query()
                    ->selectRaw('status as label, count(*) as total')
                    ->groupBy('status')
                    ->get(),
                'equipmentsByStatus' => Equipment::query()
                    ->selectRaw('status as label, count(*) as total')
                    ->groupBy('status')
                    ->get(),
                'publicationsByType' => Publication::query()
                    ->selectRaw('publication_type as label, count(*) as total')
                    ->groupBy('publication_type')
                    ->get(),
                'topMembers' => Member::query()
                    ->withCount('publications')
                    ->orderByDesc('publications_count')
                    ->limit(5)
                    ->get(['id', 'first_name', 'last_name']),
            ],
        ]);
    }
}
