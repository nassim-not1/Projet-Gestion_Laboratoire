import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function TextAreaInput({
    label,
    name,
    value,
    onChange,
    error,
    rows = 4,
    required = false,
}) {
    return (
        <div>
            <InputLabel htmlFor={name} value={label} />
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value ?? ''}
                onChange={(event) => onChange(name, event.target.value)}
                required={required}
                className="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <InputError message={error} className="mt-2" />
        </div>
    );
}
