import { FormProvider as Form } from 'react-hook-form';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const FormProvider = ({ children, onSubmit, methods }) => {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
};

FormProvider.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    methods: PropTypes.object.isRequired,
};

export default FormProvider;
