import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';

export default function RHFAutocomplete({
    name,
    label,
    placeholder,
    helperText,
    ...other
}) {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
                    renderInput={(params) => (
                        <TextField
                            label={label}
                            placeholder={placeholder}
                            error={!!error}
                            helperText={error ? error?.message : helperText}
                            {...params}
                        />
                    )}
                    {...other}
                />
            )}
        />
    );
}

RHFAutocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    helperText: PropTypes.string,
    other: PropTypes.object,
};

RHFAutocomplete.defaultProps = {
    label: '',
    placeholder: '',
    helperText: '',
    other: {},
};
