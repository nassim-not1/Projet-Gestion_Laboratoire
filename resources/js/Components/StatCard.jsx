export default function StatCard({ label, value, tone = 'slate' }) {
    const tones = {
        slate: 'border-slate-200 bg-white text-slate-900',
        indigo: 'border-indigo-200 bg-indigo-50 text-indigo-950',
        emerald: 'border-emerald-200 bg-emerald-50 text-emerald-950',
        amber: 'border-amber-200 bg-amber-50 text-amber-950',
    };

    return (
        <div className={`rounded-md border p-5 shadow-sm ${tones[tone] || tones.slate}`}>
            <p className="text-sm font-medium text-slate-600">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-normal">{value}</p>
        </div>
    );
}
