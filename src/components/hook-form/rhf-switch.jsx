import { Controller, useFormContext } from 'react-hook-form';
import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export default function RHFSwitch({ name, helperText, isControlled = true, ...other }) {
    const { control } = useFormContext();

    const renderControlled = (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <FormControlLabel control={<Switch {...field} checked={field.value} />} {...other} />

                    {(!!error || helperText) && (
                        <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
                    )}
                </div>
            )}
        />
    );

    const renderUncontrolled = <FormControlLabel control={<Switch />} {...other} />;

    return isControlled ? renderControlled : renderUncontrolled;
}

RHFSwitch.propTypes = {
    name: PropTypes.string.isRequired,
    helperText: PropTypes.node,
    isControlled: PropTypes.bool,
    other: PropTypes.object,
};

RHFSwitch.defaultProps = {
    helperText: null,
    isControlled: true,
    other: {},
};
