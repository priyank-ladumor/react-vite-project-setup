import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import FormHelperText from '@mui/material/FormHelperText';
import PropTypes from 'prop-types';
import Editor from '../editor/editor';

export default function RHFEditor({ name, helperText = null, ...other }) {
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
                    sx={{ '& .ql-editor': { minHeight: 200 }, border: (!!error || helperText) ? 'solid 1px red' : 'solid 1px gray' }}
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
};
