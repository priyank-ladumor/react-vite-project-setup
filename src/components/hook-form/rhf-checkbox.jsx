import { Controller, useFormContext } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel, {
    formControlLabelClasses,
} from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export function RHFCheckbox({ name, helperText, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <FormControlLabel control={<Checkbox {...field} checked={field.value} />} {...other} />

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
                    )}
                </div>
            )}
        />
    );
}

RHFCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    helperText: PropTypes.node,
};

RHFCheckbox.defaultProps = {
    helperText: null,
};

// ----------------------------------------------------------------------


export function RHFMultiCheckbox({
    row,
    name,
    label,
    options,
    spacing,
    helperText,
    sx,
    ...other
}) {
    const { control } = useFormContext();

    const getSelected = (selectedItems, item) =>
        selectedItems.includes(item)
            ? selectedItems.filter((value) => value !== item)
            : [...selectedItems, item];

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl component="fieldset">
                    {label && (
                        <FormLabel component="legend" sx={{ typography: 'body2' }}>
                            {label}
                        </FormLabel>
                    )}

                    <FormGroup
                        sx={{
                            ...(row && {
                                flexDirection: 'row',
                            }),
                            [`& .${formControlLabelClasses.root}`]: {
                                '&:not(:last-of-type)': {
                                    mb: spacing || 0,
                                },
                                ...(row && {
                                    mr: 0,
                                    '&:not(:last-of-type)': {
                                        mr: spacing || 2,
                                    },
                                }),
                            },
                            ...sx,
                        }}
                    >
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={
                                    <Checkbox
                                        checked={field.value.includes(option.value)}
                                        onChange={() => field.onChange(getSelected(field.value, option.value))}
                                    />
                                }
                                label={option.label}
                                {...other}
                            />
                        ))}
                    </FormGroup>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error} sx={{ mx: 0 }}>
                            {error ? error?.message : helperText}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
}

RHFMultiCheckbox.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        })
    ).isRequired,
    row: PropTypes.bool,
    label: PropTypes.string,
    spacing: PropTypes.number,
    helperText: PropTypes.node,
    sx: PropTypes.object,
};

RHFMultiCheckbox.defaultProps = {
    row: false,
    label: '',
    spacing: 0,
    helperText: null,
    sx: {},
};
