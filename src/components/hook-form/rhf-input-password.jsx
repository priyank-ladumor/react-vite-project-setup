import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';

// ----------------------------------------------------------------------

export default function RHFPasswordField({ name, helperText, ...other }) {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((show) => !show);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    value={field.value || ''}
                    onChange={(event) => field.onChange(event.target.value)}
                    error={!!error}
                    helperText={error ? error.message : helperText}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <Icon icon="tabler:eye-off" /> : <Icon icon="tabler:eye" />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    {...other}
                />
            )}
        />
    );
}

RHFPasswordField.propTypes = {
    name: PropTypes.string.isRequired,
    helperText: PropTypes.node,
};

RHFPasswordField.defaultProps = {
    helperText: null,
};
