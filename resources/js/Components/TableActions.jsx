import ConfirmDeleteButton from '@/Components/ConfirmDeleteButton';
import { Link } from '@inertiajs/react';

export default function TableActions({ showHref, editHref, deleteHref, canEdit = true, canDelete = true }) {
    return (
        <div className="flex flex-wrap gap-2">
            {showHref && (
                <Link
                    href={showHref}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Voir
                </Link>
            )}
            {canEdit && editHref && (
                <Link
                    href={editHref}
                    className="rounded-md border border-indigo-200 px-3 py-1.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-50"
                >
                    Modifier
                </Link>
            )}
            {canDelete && deleteHref && <ConfirmDeleteButton href={deleteHref} />}
        </div>
    );
}
