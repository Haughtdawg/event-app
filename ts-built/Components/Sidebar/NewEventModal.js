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
var Checkbox_1 = require("@mui/material/Checkbox");
var formik_1 = require("formik");
var yup = require("yup");
var TextField_1 = require("@mui/material/TextField");
var client_1 = require("@apollo/client");
var eventQueries_1 = require("../../Utilities/GraphQLQueries/eventQueries");
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
function NewEventModal(props) {
    var refetch = props.refetch;
    var _a = (0, react_1.useState)(false), open = _a[0], setOpen = _a[1];
    var handleOpen = function () { return setOpen(true); };
    var handleClose = function () {
        setOpen(false);
        formik.resetForm();
    };
    var _b = (0, client_1.useMutation)(eventQueries_1.CREATE_EVENT), createEvent = _b[0], _c = _b[1], error = _c.error, data = _c.data;
    (0, react_1.useEffect)(function () {
        if (data) {
            refetch();
        }
    }, [data]);
    var formik = (0, formik_1.useFormik)({
        initialValues: {
            name: '',
            description: '',
            date: '',
            time: '',
            isAllDay: false,
        },
        validationSchema: yup.object({
            name: yup.string().required('Required field'),
            date: yup.string().required(),
            time: yup.string().when('isAllDay', {
                is: false,
                then: yup.string().required('Time or "all day" required'),
            }),
            isAllDay: yup.boolean(),
        }),
        onSubmit: function (values) {
            var isValidTime = /^\d{2}:\d{2}$/.test(formik.values.time);
            createEvent({
                variables: {
                    name: formik.values.name,
                    description: formik.values.description,
                    time: "".concat(formik.values.date, "T").concat(isValidTime ? formik.values.time : '00:00', ":00"),
                    isAllDay: formik.values.isAllDay,
                },
            });
            handleClose();
        },
    });
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", __assign({ style: { display: 'flex', justifyContent: 'center' } }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, __assign({ onClick: handleOpen }, { children: "Create New Event" })) })), (0, jsx_runtime_1.jsx)(Modal_1.default, __assign({ open: open, onClose: handleClose, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: (0, jsx_runtime_1.jsxs)(Box_1.default, __assign({ sx: style }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h1" }, { children: "Create New Event" })), (0, jsx_runtime_1.jsxs)("form", __assign({ onSubmit: formik.handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ style: { margin: '2%' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h5" }, { children: "Event Name" })), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "name", name: "name", placeholder: "Event Name", value: formik.values.name, onChange: formik.handleChange, onBlur: formik.handleBlur, error: formik.touched.name && Boolean(formik.errors.name), helperText: formik.touched.name && formik.errors.name, required: true })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { margin: '2%' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h5" }, { children: "Event Description" })), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "description", name: "description", value: formik.values.description, onChange: formik.handleChange, multiline: true, placeholder: "What's this event?" })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ style: { margin: '2%' } }, { children: [(0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ variant: "h5" }, { children: "Date & Time" })), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "date", name: "date", type: "date", required: true, value: formik.values.date, onChange: formik.handleChange, onBlur: formik.handleBlur }), (0, jsx_runtime_1.jsx)(TextField_1.default, { id: "time", name: "time", type: "time", value: formik.values.time, onChange: formik.handleChange, error: formik.submitCount > 0 && Boolean(formik.errors.time), helperText: formik.submitCount > 0 && formik.errors.time })] })), (0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        margin: '2%',
                                    } }, { children: [(0, jsx_runtime_1.jsx)(Checkbox_1.default, { id: "isAllDay", name: "isAllDay", checked: formik.values.isAllDay, onChange: formik.handleChange, style: { paddingLeft: 0 } }), (0, jsx_runtime_1.jsx)(Typography_1.default, __assign({ align: "center", variant: "h6" }, { children: "All day event?" }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ style: { display: 'flex', flex: 1, justifyContent: 'center' } }, { children: (0, jsx_runtime_1.jsx)(Button_1.default, __assign({ variant: "outlined", size: "large", type: "submit", disabled: !formik.dirty || !!formik.errors.name || !!formik.errors.date }, { children: "Submit" })) }))] }))] })) }))] }));
}
exports.default = NewEventModal;
