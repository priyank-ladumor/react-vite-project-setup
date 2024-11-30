import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from 'yup';
import FormProvider from "@/components/hook-form/form-provider";
import RHFTextField from "@/components/hook-form/rhf-text-field.jsx";
import { Box, Button, Chip, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import RHFAutocomplete from "@/components/hook-form/rhf-autocomplete";
import { RHFCheckbox, RHFMultiCheckbox, } from "@/components/hook-form/rhf-checkbox";
import RHFCodeOTP from "@/components/hook-form/rhf-code-otp";
import RHFEditor from "@/components/hook-form/rhf-editor";
import RHFRadioGroup from "@/components/hook-form/rhf-radio-group";
import { RHFMultiSelect, RHFSelect } from "@/components/hook-form/rhf-select";
import RHFSlider from "@/components/hook-form/rhf-slider";
import RHFSwitch from "@/components/hook-form/rhf-switch";
import { RHFFileUpload, RHFMultiFileUpload } from "@/components/hook-form/rhf-upload";
import { Icon } from "@iconify/react/dist/iconify.js";
import RHFPasswordField from "@/components/hook-form/rhf-input-password";


const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    auto_complete: Yup.array()
        .of(
            Yup.object().shape({
                _id: Yup.string().nullable(),
                name: Yup.string().required(),
            })
        )
        .min(1, 'At least one related search is required')
        .required()
        .label('auto_complete'),
    single_select: Yup.boolean().oneOf([true], 'Single select must be checked').required('Single select is required'),
    multi_select: Yup.array().of(Yup.string()).min(1, 'At least one multi select is required').required()
        .label('multi_select'),
    otp: Yup.string().required('OTP is required').test(
        'len',
        'OTP must be 6 digits',
        (val) => val?.length === 6
    ).label('otp'),
    editor: Yup.string().required().label('editor'),
    radio: Yup.string().required('radio is required').label('radio'),
    singleSelect: Yup.string().required('singleSelect is required').label('singleSelect'),
    multiSelect: Yup.array().of(Yup.string()).min(1, 'At least one multiSelect is required').required()
        .label('multiSelect'),
    sliderValue: Yup.number()
        .required('Slider value is required')
        .min(0, 'Value must be at least 0')
        .max(100, 'Value cannot exceed 100'),
    switchValue: Yup.bool().required('Switch value is required'),
    singlefile: Yup.mixed()
        .required('File is required')
        .test('fileSize', 'File size should not exceed 5MB', (file) =>
            file ? file.size <= 5 * 1024 * 1024 : true
        )
        .test('fileFormat', 'Unsupported file format', (file) =>
            file ? ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) : true
        ),
    multiplefile: Yup.array()
        .of(
            Yup.mixed()
                .required('File is required')
                .test('fileSize', 'File size should not exceed 5MB', (file) =>
                    file ? file.size <= 5 * 1024 * 1024 : true
                )
                .test('fileFormat', 'Unsupported file format', (file) =>
                    file ? ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type) : true
                )
        )
        .min(1, 'At least one file is required')
        .required(),
    relatedItems: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.string().required('ID is required'),
                name: Yup.string().required('Name is required'),
            })
        )
        .min(1, 'At least one item is required')
        .required(),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
});

const relatedSearchArr = [
    { _id: 1, name: 'Related Search 1' },
    { _id: 2, name: 'Related Search 2' },
    { _id: 3, name: 'Related Search 3' },
    { _id: 4, name: 'Related Search 4' },
    { _id: 5, name: 'Related Search 5' },
];

const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
];

const marks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 37,
        label: '37°C',
    },
    {
        value: 100,
        label: '100°C',
    },
];

function valuetext(value) {
    return `${value}°C`;
}

const Form = () => {
    const formMethods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: '',
            auto_complete: [],
            single_select: false,
            multi_select: [],
            otp: '',
            editor: '',
            radio: '',
            singleSelect: '',
            multiSelect: [],
            sliderValue: 37,
            switchValue: false,
            singlefile: null,
            multiplefile: null,
            relatedItems: [{ id: '', name: '' }],
            password: '',
        },
    });

    const { handleSubmit, control } = formMethods;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "relatedItems",
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log('data --->', data);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <div>
            <FormProvider methods={formMethods} onSubmit={onSubmit}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        overflow: 'auto',
                        padding: 2,
                    }}
                >
                    <RHFTextField name="name" type="text" label="Name" />
                    <RHFPasswordField name="password" label="Password" />
                    <RHFAutocomplete
                        name="auto_complete"
                        label="auto_complete"
                        placeholder="+ Related Search"
                        multiple
                        freeSolo
                        disabled={!relatedSearchArr}
                        options={relatedSearchArr}
                        sx={{ mt: 3 }}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            return option.name || '';
                        }}
                        renderOption={(props, option) => (
                            <li {...props} key={option._id}>
                                {option.name}
                            </li>
                        )}
                        renderTags={(selected, getTagProps) =>
                            selected.map((option, index) => (
                                <Chip
                                    {...getTagProps({ index })}
                                    key={option._id}
                                    label={option.name}
                                    size="small"
                                    color="primary"
                                    variant="soft"
                                />
                            ))
                        }
                    />
                    <RHFCheckbox
                        name="single_select"
                        label="single_select"
                    />
                    <RHFMultiCheckbox
                        name="multi_select"
                        label="multi_select"
                        options={options}
                        row
                    />
                    <RHFCodeOTP name="otp" label="otp" />
                    <Typography variant="subtitle2">editor</Typography>
                    <RHFEditor simple name="editor" />
                    <RHFRadioGroup
                        name="radio"
                        label="radio"
                        options={options}
                        spacing={2}
                        row
                    />
                    <RHFSelect
                        name="singleSelect"
                        label="Select an Option"
                        native={false}
                    >
                        <MenuItem value="" disabled>
                            Select...
                        </MenuItem>
                        {options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </RHFSelect>

                    <RHFMultiSelect
                        name="multiSelect"
                        label="Select Multiple Options"
                        options={options}
                        chip={true}
                        checkbox={true}
                    />
                    <Stack sx={{ width: 'calc(100% - 10px)' }} >
                        <Typography gutterBottom>Slider Example</Typography>
                        <RHFSlider
                            name="sliderValue"
                            step={null}
                            aria-label="Restricted values"
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            marks={marks}
                        />
                    </Stack>
                    <Typography gutterBottom>Switch Example</Typography>
                    <RHFSwitch
                        name="switchValue"
                        label="Enable Feature"
                    />
                    <RHFFileUpload
                        name="singlefile"
                        label="Upload your Single file"
                        accept=".jpg,.png,.pdf"
                    />
                    <RHFMultiFileUpload
                        name="multiplefile"
                        label="Upload your Multiple file"
                        accept=".jpg,.png,.pdf"
                        multiple
                    />
                    {/* Dynamic Field Array */}
                    <Typography variant="h6">Related Items / Dynamic Field Array</Typography>
                    {fields.map((item, index) => (
                        <Box key={item.id} display="flex" alignItems="center" gap={1}>
                            <RHFTextField
                                name={`relatedItems[${index}].id`}
                                label="ID"
                                placeholder="Enter ID"
                                control={control}
                            />

                            <RHFTextField
                                name={`relatedItems[${index}].name`}
                                label="Name"
                                placeholder="Enter Name"
                                control={control}
                            />

                            <IconButton onClick={() => remove(index)} color="error">
                                <Icon icon="mdi:remove-outline" />
                            </IconButton>
                        </Box>
                    ))}

                    {/* Button to Add a New Field Item */}
                    <Button
                        type="button"
                        onClick={() => append({ id: '', name: '' })}
                        startIcon={<Icon icon="icon-park-outline:add" />}
                    >
                        Add Related Item
                    </Button>

                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </FormProvider>
        </div>
    );
};

export default Form;

