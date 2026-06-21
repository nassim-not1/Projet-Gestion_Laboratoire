import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash = {} } = usePage().props;

    if (!flash.success && !flash.error) {
        return null;
    }

    return (
        <div className="mb-6 space-y-3">
            {flash.success && (
                <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 shadow-sm">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="font-medium">{flash.success}</span>
                </div>
            )}

            {flash.error && (
                <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 shadow-sm">
                    <span className="mt-1 h-2 w-2 rounded-full bg-red-500" />
                    <span className="font-medium">{flash.error}</span>
                </div>
            )}
        </div>
    );
}
