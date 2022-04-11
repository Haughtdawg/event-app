"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Box_1 = require("@mui/material/Box");
var Button_1 = require("@mui/material/Button");
var Typography_1 = require("@mui/material/Typography");
var Modal_1 = require("@mui/material/Modal");
var formik_1 = require("formik");
var yup = require("yup");
var TextField_1 = require("@mui/material/TextField");
var client_1 = require("@apollo/client");
var attendeeQueries_1 = require("../Utilities/GraphQLQueries/attendeeQueries");
var style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function AttendeeModal(props) {
    var refetch = props === null || props === void 0 ? void 0 : props.refetch;
    var eventId = props.eventId;
    var isUpdate = props === null || props === void 0 ? void 0 : props.isUpdate;
    var attendee = __assign({}, props === null || props === void 0 ? void 0 : props.attendee);
    var setOpen = props.setOpen;
    var open = props.open;
    var updateAttendee = props === null || props === void 0 ? void 0 : props.updateAttendee;
    var handleClose = function () {
        setOpen(false);
        formik.resetForm();
    };
    var handleSubmit = function () {
        console.log('handling submit!');
        if (isUpdate) {
            updateAttendee({
                variables: {
                    firstName: formik.values.firstName,
                    lastName: formik.values.lastName,
                    phoneNumber: formik.values.phoneNumber,
                    email: formik.values.email,
                    eventId: eventId,
                    id: attendee.id,
                },
            });
        }
        else {
            createAttendee({
                variables: {
                    firstName: formik.values.firstName,
                    lastName: formik.values.lastName,
                    phoneNumber: formik.values.phoneNumber,
                    email: formik.values.email,
                    eventId: eventId,
                },
            });
        }
        handleClose();
    };
    var initialValues = isUpdate
        ? {
            firstName: attendee.firstName,
            lastName: attendee.lastName,
            phoneNumber: attendee.phoneNumber,
            email: attendee.email,
        }
        : {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
        };
    var _a = (0, client_1.useMutation)(attendeeQueries_1.CREATE_ATTENDEE), createAttendee = _a[0], _b = _a[1], createError = _b.error, createData = _b.data;
    (0, react_1.useEffect)(function () {
        if (createData) {
            refetch();
        }
    }, [createData]);
    var formik = (0, formik_1.useFormik)({
        initialValues: initialValues,
        validationSchema: yup.object({
            firstName: yup.string().required('Required field'),
            lastName: yup.string().required('Required field'),
            email: yup.string().email(),
            phoneNumber: yup.string().when('email', {
                is: '',
                then: yup.string().required('Need some form of contact info'),
            }),
        }),
        onSubmit: function () {
            handleSubmit();
        },
    });
    // console.log('attendee is', attendee);
    // console.log('isUpdate is', isUpdate);
    // console.log('formik is', formik);
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Modal_1.default, __assign({ open: open, onClose: handleClose, onBackdropClick: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: style }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h1" }, { children: isUpdate ? 'Update Attendee' : 'Create New Attendee' })), (0, jsx_runtime_1.jsxs)("form", __assign({ onSubmit: formik.handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ style: { margin: '2%' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h5" }, { children: "Attendee Name" })), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "firstName", name: "firstName", placeholder: "First Name", value: formik.values.firstName, onChange: formik.handleChange, onBlur: formik.handleBlur, error: formik.touched.firstName && Boolean(formik.errors.firstName), helperText: formik.touched.firstName && formik.errors.firstName, required: true }), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "lastName", name: "lastName", value: formik.values.lastName, onChange: formik.handleChange, multiline: true, placeholder: "Last Name", style: { marginLeft: '2%' } })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { margin: '2%' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h5" }, { children: "Email" })), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "email", name: "email", type: "email", required: true, value: formik.values.email, onChange: formik.handleChange, onBlur: formik.handleBlur })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { margin: '2%' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h5" }, { children: "Phone Number" })), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "phoneNumber", name: "phoneNumber", type: "phoneNumber", value: formik.values.phoneNumber, onChange: formik.handleChange, error: formik.submitCount > 0 && Boolean(formik.errors.phoneNumber), helperText: formik.submitCount > 0 && formik.errors.phoneNumber })] })), (0, jsx_runtime_1.jsx)("div", __assign({ style: { display: 'flex', flex: 1, justifyContent: 'center' } }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, __assign({ variant: "outlined", size: "large", type: "submit", disabled: !formik.dirty ||
                                        !!formik.errors.firstName ||
                                        !!formik.errors.lastName }, { children: "Submit" })) }))] }))] })) })) }));
}
exports.default = AttendeeModal;
