export default function StatCard({ label, value, tone = 'slate' }) {
    const tones = {
        slate: {
            card: 'border-slate-200 bg-white text-slate-950 before:bg-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white',
            dot: 'bg-slate-400 dark:bg-slate-500',
        },
        teal: {
            card: 'border-teal-200 bg-teal-50 text-teal-950 before:bg-teal-600 dark:border-teal-900 dark:bg-teal-950/60 dark:text-teal-50',
            dot: 'bg-teal-600 dark:bg-teal-300',
        },
        emerald: {
            card: 'border-emerald-200 bg-emerald-50 text-emerald-950 before:bg-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-50',
            dot: 'bg-emerald-600 dark:bg-emerald-300',
        },
        amber: {
            card: 'border-amber-200 bg-amber-50 text-amber-950 before:bg-amber-500 dark:border-amber-900 dark:bg-amber-950/60 dark:text-amber-50',
            dot: 'bg-amber-500 dark:bg-amber-300',
        },
        sky: {
            card: 'border-sky-200 bg-sky-50 text-sky-950 before:bg-sky-600 dark:border-sky-900 dark:bg-sky-950/60 dark:text-sky-50',
            dot: 'bg-sky-600 dark:bg-sky-300',
        },
    };
    const selectedTone = tones[tone] || tones.slate;

    return (
        <div className={`relative overflow-hidden rounded-lg border p-5 shadow-sm shadow-slate-200/60 before:absolute before:left-0 before:top-0 before:h-1 before:w-full dark:shadow-black/20 ${selectedTone.card}`}>
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{label}</p>
                <span className={`h-2.5 w-2.5 rounded-full ${selectedTone.dot}`} />
            </div>
            <p className="mt-4 text-3xl font-semibold leading-none">{value}</p>
        </div>
    );
}
