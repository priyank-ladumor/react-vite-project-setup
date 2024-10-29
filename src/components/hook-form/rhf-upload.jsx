import { Controller, useFormContext } from 'react-hook-form';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import { Upload, UploadBox, UploadAvatar } from '../upload'; // For layout
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export function RHFUploadAvatar({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div>
                    <UploadAvatar error={!!error} file={field.value} {...other} />

                    {!!error && (
                        <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                            {error.message}
                        </FormHelperText>
                    )}
                </div>
            )}
        />
    );
}

RHFUploadAvatar.propTypes = {
    name: PropTypes.string.isRequired,
    other: PropTypes.object,
};

RHFUploadAvatar.defaultProps = {
    other: {},
};

// ----------------------------------------------------------------------

export function RHFUploadBox({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <UploadBox files={field.value} error={!!error} {...other} />
            )}
        />
    );
}

RHFUploadBox.propTypes = {
    name: PropTypes.string.isRequired,
    other: PropTypes.object,
};

RHFUploadBox.defaultProps = {
    other: {},
};

// ----------------------------------------------------------------------

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
    zIndex: 2, // Ensure it's above other content
};

export function RHFUpload({ name, loading, multiple, helperText, ...other }) {
    const { control } = useFormContext();
    const imageloading = loading;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Box position="relative" width="100%"> {/* Ensure this has relative positioning */}
                    {imageloading && (
                        <Box sx={overlayStyle}>
                            <CircularProgress />
                        </Box>
                    )}
                    {multiple ? (
                        <Upload
                            multiple
                            accept={{ 'image/*': [] }}
                            files={field.value}
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
                    ) : (
                        <Upload
                            accept={{ 'image/*': [] }}
                            file={field.value}
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
                </Box>
            )}
        />
    );
}

RHFUpload.propTypes = {
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    multiple: PropTypes.bool,
    helperText: PropTypes.node,
    other: PropTypes.object,
};

RHFUpload.defaultProps = {
    loading: false,
    multiple: false,
    helperText: null,
    other: {},
};
