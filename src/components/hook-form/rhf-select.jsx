import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { FormControl } from '@mui/material';

// ----------------------------------------------------------------------

export function RHFSelect({
    name,
    native,
    maxHeight = 220,
    helperText,
    children,
    PaperPropsSx,
    ...other
}) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    select
                    fullWidth
                    SelectProps={{
                        native,
                        MenuProps: {
                            PaperProps: {
                                sx: {
                                    ...(!native && {
                                        maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                                    }),
                                    ...PaperPropsSx,
                                },
                            },
                        },
                        sx: { textTransform: 'capitalize' },
                    }}
                    error={!!error}
                    helperText={error ? error?.message : helperText}
                    {...other}
                >
                    {children}
                </TextField>
            )}
        />
    );
}

RHFSelect.propTypes = {
    name: PropTypes.string.isRequired,
    native: PropTypes.bool,
    maxHeight: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    helperText: PropTypes.node,
    children: PropTypes.node.isRequired,
    PaperPropsSx: PropTypes.object,
};

RHFSelect.defaultProps = {
    native: false,
    maxHeight: 220,
    helperText: null,
    PaperPropsSx: {},
};

// ----------------------------------------------------------------------

export function RHFMultiSelect({
    name,
    chip,
    label,
    options,
    checkbox,
    placeholder,
    helperText,
    ...other
}) {
    const { control } = useFormContext();

    const renderValues = (selectedIds) => {
        const selectedItems = options.filter((item) => selectedIds.includes(item.value));

        if (!selectedItems.length && placeholder) {
            return <Box sx={{ color: 'text.disabled' }}>{placeholder}</Box>;
        }

        if (chip) {
            return (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedItems.map((item) => (
                        <Chip key={item.value} size="small" label={item.label} />
                    ))}
                </Box>
            );
        }

        return selectedItems.map((item) => item.label).join(', ');
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <FormControl error={!!error} {...other}>
                    {label && <InputLabel id={name}> {label} </InputLabel>}

                    <Select
                        {...field}
                        multiple
                        displayEmpty={!!placeholder}
                        id={`multiple-${name}`}
                        labelId={name}
                        label={label}
                        renderValue={renderValues}
                    >
                        {options.map((option) => {
                            const selected = field.value.includes(option.value);

                            return (
                                <MenuItem key={option.value} value={option.value}>
                                    {checkbox && <Checkbox size="small" disableRipple checked={selected} />}

                                    {option.label}
                                </MenuItem>
                            );
                        })}
                    </Select>

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
}

RHFMultiSelect.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    chip: PropTypes.bool,
    checkbox: PropTypes.bool,
    placeholder: PropTypes.string,
    helperText: PropTypes.node,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
};

RHFMultiSelect.defaultProps = {
    label: '',
    chip: false,
    checkbox: false,
    placeholder: '',
    helperText: null,
};
