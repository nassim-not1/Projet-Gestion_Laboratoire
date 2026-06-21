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
                className="form-control mt-1 block w-full"
            />
            <InputError message={error} className="mt-2" />
        </div>
    );
}
