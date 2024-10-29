import { Controller, useFormContext } from 'react-hook-form';
import { MuiOtpInput } from 'mui-one-time-password-input';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';

export default function RHFCode({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <MuiOtpInput
                        {...field}
                        autoFocus
                        gap={1.5}
                        length={6}
                        TextFieldsProps={{
                            error: !!error,
                            placeholder: '-',
                        }}
                        {...other}
                    />
                    {error && (
                        <FormHelperText sx={{ px: 2 }} error>
                            {error.message}
                        </FormHelperText>
                    )}
                </div>
            )}
        />
    );
}

RHFCode.propTypes = {
    name: PropTypes.string.isRequired,
    other: PropTypes.object,
};

RHFCode.defaultProps = {
    other: {},
};
