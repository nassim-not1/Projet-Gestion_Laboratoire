import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatCard from '@/Components/StatCard';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const colors = ['#0f766e', '#0284c7', '#d97706', '#059669', '#e11d48', '#475569'];

export default function Dashboard({ stats, charts }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="page-kicker">Vue d'ensemble</p>
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Vue synthetique des activites du laboratoire.</p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Membres" value={stats.members} tone="teal" />
                <StatCard label="Projets" value={stats.projects} tone="sky" />
                <StatCard label="Projets en cours" value={stats.activeProjects} tone="emerald" />
                <StatCard label="Projets termines" value={stats.finishedProjects} tone="amber" />
                <StatCard label="Equipements" value={stats.equipments} tone="slate" />
                <StatCard label="Equipements disponibles" value={stats.availableEquipments} tone="emerald" />
                <StatCard label="Publications" value={stats.publications} tone="teal" />
                <StatCard label="Valorisations" value={stats.valorisations} tone="amber" />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <ChartCard title="Publications par annee">
                    <BarGraph data={charts.publicationsByYear} />
                </ChartCard>
                <ChartCard title="Projets par statut">
                    <PieGraph data={charts.projectsByStatus} />
                </ChartCard>
                <ChartCard title="Equipements par statut">
                    <BarGraph data={charts.equipmentsByStatus} />
                </ChartCard>
                <ChartCard title="Publications par type">
                    <PieGraph data={charts.publicationsByType} />
                </ChartCard>
            </div>

            <section className="app-surface mt-6 p-6">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div>
                        <p className="page-kicker">Production scientifique</p>
                        <h2 className="text-lg font-semibold text-slate-950">Top 5 membres par publications</h2>
                    </div>
                    <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        Publications indexees
                    </span>
                </div>
                <div className="mt-4 divide-y divide-slate-100">
                    {charts.topMembers.map((member, index) => (
                        <div key={member.id} className="flex items-center justify-between gap-4 py-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-teal-50 text-sm font-bold text-teal-800">
                                    {index + 1}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-medium text-slate-950">{member.first_name} {member.last_name}</p>
                                    <p className="text-sm text-slate-500">Production scientifique indexee</p>
                                </div>
                            </div>
                            <span className="rounded-md bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800">
                                {member.publications_count}
                            </span>
                        </div>
                    ))}
                    {charts.topMembers.length === 0 && <p className="py-4 text-sm text-slate-500">Aucune publication.</p>}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

function ChartCard({ title, children }) {
    return (
        <section className="app-surface p-6">
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            <div className="mt-4 h-72">{children}</div>
        </section>
    );
}

function BarGraph({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#0f766e" radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

function PieGraph({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Tooltip />
                <Pie data={data} dataKey="total" nameKey="label" outerRadius={92} label>
                    {data.map((entry, index) => (
                        <Cell key={entry.label} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
