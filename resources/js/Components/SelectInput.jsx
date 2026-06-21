import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function SelectInput({
    label,
    name,
    value,
    onChange,
    error,
    options = [],
    placeholder = 'Selectionner',
    required = false,
    multiple = false,
}) {
    const selectedValue = multiple ? value || [] : value ?? '';

    return (
        <div>
            <InputLabel htmlFor={name} value={label} />
            <select
                id={name}
                name={name}
                value={selectedValue}
                multiple={multiple}
                className="form-control mt-1 block w-full"
                onChange={(event) => {
                    if (multiple) {
                        onChange(
                            name,
                            Array.from(event.target.selectedOptions).map((option) => Number(option.value)),
                        );
                        return;
                    }

                    onChange(name, event.target.value);
                }}
                required={required}
            >
                {!multiple && <option value="">{placeholder}</option>}
                {options.map((option) => {
                    const optionValue = typeof option === 'string' ? option : option.id;
                    const optionLabel = typeof option === 'string' ? option : option.name || option.title || option.label;

                    return (
                        <option key={optionValue} value={optionValue}>
                            {optionLabel}
                        </option>
                    );
                })}
            </select>
            <InputError message={error} className="mt-2" />
        </div>
    );
}
