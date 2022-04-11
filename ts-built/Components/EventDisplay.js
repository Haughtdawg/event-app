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
exports.EventDisplay = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("@apollo/client");
var eventQueries_1 = require("../Utilities/GraphQLQueries/eventQueries");
var attendeeQueries_1 = require("../Utilities/GraphQLQueries/attendeeQueries");
var react_1 = require("react");
var material_1 = require("@mui/material");
var Phone_1 = require("@mui/icons-material/Phone");
var Email_1 = require("@mui/icons-material/Email");
var Delete_1 = require("@mui/icons-material/Delete");
var IconButton_1 = require("@mui/material/IconButton");
var Edit_1 = require("@mui/icons-material/Edit");
var Tooltip_1 = require("@mui/material/Tooltip");
var timestamptzToDate_1 = require("../Utilities/timestamptzToDate");
var DialogTitle_1 = require("@mui/material/DialogTitle");
var Dialog_1 = require("@mui/material/Dialog");
var AttendeeModal_1 = require("./AttendeeModal");
function EventDisplay(props) {
    var eventId = props.eventId;
    var _a = (0, client_1.useQuery)(eventQueries_1.GET_THIS_EVENT, {
        variables: { eventId: eventId },
    }), loading = _a.loading, loadError = _a.error, data = _a.data, refetch = _a.refetch;
    var _b = (0, client_1.useMutation)(eventQueries_1.DELETE_EVENT), deleteEvent = _b[0], _c = _b[1], deleteEvtError = _c.error, deleteEvtData = _c.data;
    var _d = (0, client_1.useMutation)(attendeeQueries_1.DELETE_ATTENDEE), deleteAttendee = _d[0], _e = _d[1], deleteError = _e.error, deleteData = _e.data;
    var _f = (0, client_1.useMutation)(attendeeQueries_1.UPDATE_ATTENDEE), updateAttendee = _f[0], _g = _f[1], updateError = _g.error, updateData = _g.data;
    var _h = (0, react_1.useState)(false), open = _h[0], setOpen = _h[1];
    var _j = (0, react_1.useState)(false), openDelEvt = _j[0], setOpenDelEvt = _j[1];
    var _k = (0, react_1.useState)(false), openNewAttendee = _k[0], setOpenNewAttendee = _k[1];
    var _l = (0, react_1.useState)(false), openUpdateAttendee = _l[0], setOpenUpdateAttendee = _l[1];
    var _m = (0, react_1.useState)(0), delAttendeeIdx = _m[0], setDelAttendeeIdx = _m[1];
    var _o = (0, react_1.useState)(0), updateAttendeeIdx = _o[0], setUpdateAttendeeIdx = _o[1];
    (0, react_1.useEffect)(function () {
        if (deleteData) {
            refetch();
        }
        if (deleteError) {
            console.error(deleteError);
        }
        if (updateData) {
            console.log('updateData is', updateData);
            refetch();
        }
        if (deleteEvtData) {
            props.refetch();
        }
    }, [deleteData, updateData, deleteError]);
    var attendeeDeleter = function (attendee) {
        var id = attendee.id;
        deleteAttendee({ variables: { id: id } });
        setDelAttendeeIdx(0);
    };
    var openDelModal = function (idx) {
        setDelAttendeeIdx(idx);
        setOpen(true);
    };
    var openUpdateModal = function (idx) {
        setUpdateAttendeeIdx(idx);
        setOpenUpdateAttendee(true);
    };
    var handleClose = function () {
        setOpen(false);
    };
    var inviteStatus = function (attendee) {
        if (attendee.canAttend === null) {
            return 'No Reply';
        }
        else if (attendee.canAttend) {
            return 'Accepted';
        }
        else {
            return 'Declined';
        }
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(material_1.Container, __assign({ style: {
                display: 'flex',
                flex: 8,
                flexDirection: 'column',
                marginTop: '2%',
                marginBottom: '2%',
            } }, { children: (0, jsx_runtime_1.jsxs)(material_1.Paper, __assign({ style: { height: '90vh' } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "text", width: '100%', height: '10%' }), (0, jsx_runtime_1.jsx)(material_1.Divider, {}), (0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "text", width: '100%', height: '90%' })] })) })));
    }
    if (loadError) {
        console.error(loadError);
        return (0, jsx_runtime_1.jsx)("div", { children: "Whoops!" });
    }
    if (data) {
        var date = (0, timestamptzToDate_1.default)(data.events[0].time);
        var timeString = date.toLocaleDateString([], { dateStyle: 'full' });
        var completeTimeString = data.events[0].isAllDay
            ? "All day ".concat(timeString)
            : "".concat(timeString, " starting at ").concat(date.toLocaleTimeString([], {
                timeStyle: 'short',
            }));
        var noAttendees = data.events[0].attendees.length === 0;
        return ((0, jsx_runtime_1.jsxs)(material_1.Container, __assign({ style: {
                display: 'flex',
                flex: 8,
                flexDirection: 'column',
                marginTop: '2%',
                marginBottom: '2%',
            } }, { children: [openUpdateAttendee && ((0, jsx_runtime_1.jsx)(AttendeeModal_1.default, { eventId: eventId, isUpdate: true, attendee: noAttendees ? {} : data.events[0].attendees[updateAttendeeIdx], open: openUpdateAttendee, setOpen: setOpenUpdateAttendee, updateAttendee: updateAttendee })), (0, jsx_runtime_1.jsx)(AttendeeModal_1.default, { refetch: refetch, eventId: eventId, isUpdate: false, open: openNewAttendee, setOpen: setOpenNewAttendee }), (0, jsx_runtime_1.jsx)(Dialog_1.default, __assign({ onClose: handleClose, open: open }, { children: (0, jsx_runtime_1.jsxs)(material_1.Container, __assign({ style: {
                            margin: '2%',
                            display: 'flex',
                            flex: 1,
                            alignContent: 'center',
                            flexDirection: 'column',
                        } }, { children: [(0, jsx_runtime_1.jsx)(DialogTitle_1.default, __assign({ style: { fontSize: 32, textAlign: 'center' } }, { children: "Delete Attendee" })), (0, jsx_runtime_1.jsxs)(material_1.Typography, __assign({ variant: "h5" }, { children: ["Are you sure you want to delete attendee", ' ', "".concat(noAttendees
                                        ? ''
                                        : data.events[0].attendees[delAttendeeIdx].firstName, " ").concat(noAttendees
                                        ? ''
                                        : data.events[0].attendees[delAttendeeIdx].lastName, " "), "from your list?"] })), (0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                                    display: 'flex',
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginTop: '5%',
                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, __assign({ variant: "contained", color: "error", onClick: function () {
                                            attendeeDeleter(data.events[0].attendees[delAttendeeIdx]);
                                            refetch();
                                            handleClose();
                                        } }, { children: "Delete" })), (0, jsx_runtime_1.jsx)(material_1.Button, __assign({ variant: "contained", color: "primary", onClick: handleClose }, { children: "Cancel" }))] }))] })) })), (0, jsx_runtime_1.jsx)(Dialog_1.default, __assign({ onClose: function () { return setOpenDelEvt(false); }, open: openDelEvt }, { children: (0, jsx_runtime_1.jsxs)(material_1.Container, __assign({ style: {
                            margin: '2%',
                            display: 'flex',
                            flex: 1,
                            alignContent: 'center',
                            flexDirection: 'column',
                        } }, { children: [(0, jsx_runtime_1.jsx)(DialogTitle_1.default, __assign({ style: { fontSize: 32, textAlign: 'center' } }, { children: "Delete Event" })), (0, jsx_runtime_1.jsxs)(material_1.Typography, __assign({ variant: "h5" }, { children: ["Are you sure you want to delete event \"", data.events[0].name, "\"?"] })), (0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                                    display: 'flex',
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginTop: '5%',
                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, __assign({ variant: "contained", color: "error", onClick: function () {
                                            deleteEvent({ variables: { id: data.events[0].id } });
                                            setOpenDelEvt(false);
                                        } }, { children: "Delete" })), (0, jsx_runtime_1.jsx)(material_1.Button, __assign({ variant: "contained", color: "primary", onClick: function () { return setOpenDelEvt(false); } }, { children: "Cancel" }))] }))] })) })), (0, jsx_runtime_1.jsx)(material_1.Paper, __assign({ style: { height: '90vh' } }, { children: (0, jsx_runtime_1.jsxs)(material_1.Container, __assign({ style: { marginTop: '2%', marginBottom: '2%' } }, { children: [(0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                                    display: 'flex',
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ style: { marginBottom: '1%' }, variant: "h3" }, { children: data.events[0].name })), (0, jsx_runtime_1.jsx)(material_1.Button, __assign({ color: "error", variant: "contained", size: "large", onClick: function () { return setOpenDelEvt(true); } }, { children: "Delete Event" }))] })), (0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: '.5%',
                                    alignItems: 'end',
                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ style: { color: '#444545' }, variant: "h4" }, { children: data.events[0].description })), (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ style: { color: '#afafae' }, variant: "h5" }, { children: completeTimeString }))] })), (0, jsx_runtime_1.jsx)(material_1.Divider, {}), (0, jsx_runtime_1.jsxs)("div", __assign({ style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    height: '100%',
                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Container, __assign({ style: { marginTop: '5%', marginBottom: '2%' } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ align: "center", variant: "h4" }, { children: "Attendees" })) })), (0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: '5px',
                                        } }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ style: { display: 'flex', flex: 1, justifyContent: 'center' } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ align: "justify", variant: "subtitle1" }, { children: "Name" })) })), (0, jsx_runtime_1.jsx)("span", __assign({ style: { display: 'flex', flex: 1, justifyContent: 'center' } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ align: "justify", variant: "subtitle1" }, { children: "Invitation Status" })) })), (0, jsx_runtime_1.jsx)(Email_1.default, { style: { display: 'flex', flex: 1 }, color: "primary" }), (0, jsx_runtime_1.jsx)(Phone_1.default, { style: { display: 'flex', flex: 1 }, color: "primary" })] })), (0, jsx_runtime_1.jsx)(material_1.Divider, { variant: "middle" }), (0, jsx_runtime_1.jsx)(material_1.Stack, __assign({ spacing: 2 }, { children: data.events[0].attendees.map(function (attendee, index) {
                                            return ((0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignContent: 'center',
                                                } }, { children: [(0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                                                            display: 'flex',
                                                            flex: 1,
                                                            justifyContent: 'space-between',
                                                            alignContent: 'center',
                                                        } }, { children: [(0, jsx_runtime_1.jsx)("span", __assign({ style: { alignSelf: 'flex-start' } }, { children: (0, jsx_runtime_1.jsx)(Tooltip_1.default, __assign({ title: "Delete" }, { children: (0, jsx_runtime_1.jsx)(IconButton_1.default, __assign({ onClick: function () { return openDelModal(index); } }, { children: (0, jsx_runtime_1.jsx)(Delete_1.default, { color: "error" }) })) })) })), (0, jsx_runtime_1.jsx)("span", __assign({ style: { alignSelf: 'flex-start' } }, { children: (0, jsx_runtime_1.jsx)(Tooltip_1.default, __assign({ title: "Edit" }, { children: (0, jsx_runtime_1.jsx)(IconButton_1.default, __assign({ onClick: function () { return openUpdateModal(index); } }, { children: (0, jsx_runtime_1.jsx)(Edit_1.default, { color: "success" }) })) })) })), (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ align: "justify", variant: "subtitle1" }, { children: "".concat(attendee.firstName, " ").concat(attendee.lastName) })), (0, jsx_runtime_1.jsx)("span", { style: { width: '40px' } }), (0, jsx_runtime_1.jsx)("span", { style: { width: '40px' } })] })), (0, jsx_runtime_1.jsx)("span", __assign({ style: {
                                                            display: 'flex',
                                                            flex: 1,
                                                            justifyContent: 'center',
                                                        } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ align: "justify", variant: "subtitle1" }, { children: "".concat(inviteStatus(attendee)) })) })), (0, jsx_runtime_1.jsx)("span", __assign({ style: {
                                                            display: 'flex',
                                                            flex: 1,
                                                            justifyContent: 'center',
                                                        } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ align: "justify", variant: "subtitle1" }, { children: "".concat(attendee.email) })) })), (0, jsx_runtime_1.jsx)("span", __assign({ style: {
                                                            display: 'flex',
                                                            flex: 1,
                                                            justifyContent: 'center',
                                                        } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ align: "justify", variant: "subtitle1" }, { children: "".concat(attendee.phoneNumber) })) }))] }), attendee.id));
                                        }) })), (0, jsx_runtime_1.jsx)("span", __assign({ style: { display: 'flex', flex: 1, justifyContent: 'center' } }, { children: (0, jsx_runtime_1.jsx)(material_1.Button, __assign({ color: "primary", variant: "contained", size: "large", style: { marginTop: '2%', width: '30%' }, onClick: function () { return setOpenNewAttendee(true); } }, { children: "Add new attendee" })) }))] }))] })) }))] })));
    }
}
exports.EventDisplay = EventDisplay;
