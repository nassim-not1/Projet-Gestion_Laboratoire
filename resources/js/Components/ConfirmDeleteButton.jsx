import { router } from '@inertiajs/react';

export default function ConfirmDeleteButton({ href, label = 'Supprimer', message = 'Confirmer la suppression ?' }) {
    const handleDelete = () => {
        if (window.confirm(message)) {
            router.delete(href);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-50"
        >
            {label}
        </button>
    );
}
