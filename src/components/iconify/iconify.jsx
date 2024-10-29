import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const Iconify = forwardRef(({ icon, width = 20, sx = {}, ...other }, ref) => (
    <Box
        ref={ref}
        component={Icon}
        className="component-iconify"
        icon={icon}
        sx={{ width, height: width, ...sx }}
        {...other}
    />
));

Iconify.displayName = 'Iconify';

Iconify.propTypes = {
    icon: PropTypes.string.isRequired,
    width: PropTypes.number,
    sx: PropTypes.object,
};

Iconify.defaultProps = {
    width: 20,
    sx: {},
};

export default Iconify;
