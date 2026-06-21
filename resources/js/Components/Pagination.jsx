import { Link } from '@inertiajs/react';

export default function Pagination({ links = [] }) {
    if (!links.length) {
        return null;
    }

    return (
        <nav className="mt-6 flex flex-wrap items-center gap-2" aria-label="Pagination">
            {links.map((link, index) =>
                link.url ? (
                    <Link
                        key={`${link.label}-${index}`}
                        href={link.url}
                        preserveScroll
                        className={`inline-flex min-h-10 items-center justify-center rounded-md border px-3 py-2 text-sm font-semibold transition ${
                            link.active
                                ? 'border-teal-700 bg-teal-700 text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <span
                        key={`${link.label}-${index}`}
                        className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-400"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ),
            )}
        </nav>
    );
}
