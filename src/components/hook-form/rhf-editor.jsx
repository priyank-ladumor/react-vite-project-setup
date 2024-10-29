import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';
import Editor from '../editor/editor';

export default function RHFEditor({ name, helperText, ...other }) {
    const {
        control,
        watch,
        setValue,
        formState: { isSubmitSuccessful },
    } = useFormContext();

    const values = watch();

    useEffect(() => {
        if (values[name] === '<p><br></p>') {
            setValue(name, '', {
                shouldValidate: !isSubmitSuccessful,
            });
        }
    }, [isSubmitSuccessful, name, setValue, values]);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Editor
                    id={name}
                    value={field.value}
                    onChange={(content) => {
                        field.onChange(content);
                    }}
                    error={!!error}
                    helperText={
                        (!!error || helperText) && (
                            <FormHelperText error={!!error} sx={{ px: 2 }}>
                                {error ? error?.message : helperText}
                            </FormHelperText>
                        )
                    }
                    {...other}
                />
            )}
        />
    );
}

RHFEditor.propTypes = {
    name: PropTypes.string.isRequired,
    helperText: PropTypes.node,
    other: PropTypes.object,
};

RHFEditor.defaultProps = {
    helperText: null,
    other: {},
};
