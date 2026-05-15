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

const colors = ['#4f46e5', '#059669', '#d97706', '#dc2626', '#0891b2', '#7c3aed'];

export default function Dashboard({ stats, charts }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h1 className="text-2xl font-semibold text-slate-950">Dashboard</h1>
                    <p className="mt-1 text-sm text-slate-500">Vue synthetique des activites du laboratoire.</p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Membres" value={stats.members} tone="indigo" />
                <StatCard label="Projets" value={stats.projects} tone="slate" />
                <StatCard label="Projets en cours" value={stats.activeProjects} tone="emerald" />
                <StatCard label="Projets termines" value={stats.finishedProjects} tone="amber" />
                <StatCard label="Equipements" value={stats.equipments} tone="slate" />
                <StatCard label="Equipements disponibles" value={stats.availableEquipments} tone="emerald" />
                <StatCard label="Publications" value={stats.publications} tone="indigo" />
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

            <section className="mt-6 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-950">Top 5 membres par publications</h2>
                <div className="mt-4 divide-y divide-slate-100">
                    {charts.topMembers.map((member, index) => (
                        <div key={member.id} className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium text-slate-950">{index + 1}. {member.first_name} {member.last_name}</p>
                                <p className="text-sm text-slate-500">Production scientifique indexee</p>
                            </div>
                            <span className="rounded-md bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
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
        <section className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            <div className="mt-4 h-72">{children}</div>
        </section>
    );
}

function BarGraph({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
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
