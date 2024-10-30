import PropTypes from 'prop-types';
import { alpha, createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar, { formats } from './Toolbar';
import ReactQuill from 'react-quill';

const theme = createTheme({
    palette: {
        error: {
            main: '#d32f2f',
        },
    },
});

const StyledEditor = styled('div')(({ theme, error }) => ({
    border: error ? `solid 1px ${theme.palette.error.main}` : 'none',
    '& .ql-editor': {
        backgroundColor: error ? alpha(theme.palette.error.main, 0.08) : 'transparent',
    },
}));

export default function Editor({
    id = 'minimal-quill',
    error = false,
    simple = false,
    helperText = null,
    sx,
    ...other
}) {
    const modules = {
        toolbar: {
            container: `#${id}`,
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
        },
        clipboard: {
            matchVisual: false,
        },
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledEditor error={error} sx={{ ...sx }}>
                <Toolbar id={id} simple={simple} />
                <ReactQuill
                    modules={modules}
                    formats={formats}
                    placeholder="Write something awesome..."
                    {...other}
                />
            </StyledEditor>
            {helperText && <div>{helperText}</div>}
        </ThemeProvider>
    );
}

Editor.propTypes = {
    id: PropTypes.string,
    error: PropTypes.bool,
    simple: PropTypes.bool,
    helperText: PropTypes.node,
    sx: PropTypes.object,
    other: PropTypes.object,
};
