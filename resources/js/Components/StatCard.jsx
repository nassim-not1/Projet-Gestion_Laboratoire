export default function StatCard({ label, value, tone = 'slate' }) {
    const tones = {
        slate: 'border-slate-200 bg-white text-slate-900 before:bg-slate-400',
        teal: 'border-teal-200 bg-teal-50 text-teal-950 before:bg-teal-600',
        emerald: 'border-emerald-200 bg-emerald-50 text-emerald-950 before:bg-emerald-600',
        amber: 'border-amber-200 bg-amber-50 text-amber-950 before:bg-amber-500',
        sky: 'border-sky-200 bg-sky-50 text-sky-950 before:bg-sky-600',
    };

    return (
        <div className={`relative overflow-hidden rounded-lg border p-5 shadow-sm shadow-slate-200/60 before:absolute before:left-0 before:top-0 before:h-1 before:w-full ${tones[tone] || tones.slate}`}>
            <p className="text-sm font-medium text-slate-600">{label}</p>
            <p className="mt-3 text-3xl font-semibold">{value}</p>
        </div>
    );
}
