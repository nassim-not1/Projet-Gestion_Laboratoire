import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function FormInput({
    label,
    name,
    value,
    onChange,
    error,
    type = 'text',
    required = false,
    ...props
}) {
    return (
        <div>
            <InputLabel htmlFor={name} value={label} />
            <TextInput
                id={name}
                name={name}
                type={type}
                value={value ?? ''}
                className="mt-1 block w-full"
                onChange={(event) => onChange(name, event.target.value)}
                required={required}
                {...props}
            />
            <InputError message={error} className="mt-2" />
        </div>
    );
}
