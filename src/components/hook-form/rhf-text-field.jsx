import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, type, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    type={type}
                    value={type === 'number' && field.value === 0 ? '' : field.value}
                    onChange={(event) => {
                        if (type === 'number') {
                            field.onChange(Number(event.target.value));
                        } else {
                            field.onChange(event.target.value);
                        }
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                />
            )}
        />
    );
}

RHFTextField.propTypes = {
    name: PropTypes.string.isRequired,
    helperText: PropTypes.node,
    type: PropTypes.string,
    other: PropTypes.object,
};

RHFTextField.defaultProps = {
    helperText: null,
    type: 'text',
    other: {},
};
