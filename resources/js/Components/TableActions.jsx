import ConfirmDeleteButton from '@/Components/ConfirmDeleteButton';
import { Link } from '@inertiajs/react';

export default function TableActions({ showHref, editHref, deleteHref, canEdit = true, canDelete = true }) {
    return (
        <div className="flex flex-wrap gap-2">
            {showHref && (
                <Link
                    href={showHref}
                    className="btn-secondary min-h-0 px-3 py-1.5"
                >
                    Voir
                </Link>
            )}
            {canEdit && editHref && (
                <Link
                    href={editHref}
                    className="btn-soft min-h-0 px-3 py-1.5"
                >
                    Modifier
                </Link>
            )}
            {canDelete && deleteHref && <ConfirmDeleteButton href={deleteHref} />}
        </div>
    );
}
