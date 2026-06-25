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
            className="btn-danger min-h-9 px-3 py-1.5"
        >
            {label}
        </button>
    );
}
