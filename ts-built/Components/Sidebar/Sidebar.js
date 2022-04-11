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
exports.Sidebar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var NewEventModal_1 = require("./NewEventModal");
var useWindowDimensions_1 = require("../../Hooks/useWindowDimensions");
var timestamptzToDate_1 = require("../../Utilities/timestamptzToDate");
var material_1 = require("@mui/material");
var Stack_1 = require("@mui/material/Stack");
function Sidebar(props) {
    var height = (0, useWindowDimensions_1.default)().height;
    var events = props.events, handleClickedEvent = props.handleClickedEvent, selectedEventIdx = props.selectedEventIdx, refetch = props.refetch;
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: {
            display: 'flex',
            borderRight: '1px',
            borderRightColor: '#e6e6e4',
            borderRightStyle: 'solid',
            flex: 4,
            height: height,
            marginLeft: '4%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            scrollBehavior: 'smooth',
        } }, { children: [(0, jsx_runtime_1.jsx)(NewEventModal_1.default, { refetch: refetch }), (0, jsx_runtime_1.jsx)(Stack_1.default, __assign({ spacing: 0 }, { children: events.map(function (event, index) {
                    return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: index === selectedEventIdx
                            ? {
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                borderBottom: '1px',
                                borderBottomStyle: 'solid',
                                borderBottomColor: '#e6e6e4',
                                backgroundColor: '#fbdf8b',
                            }
                            : {
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                borderBottom: '1px',
                                borderBottomStyle: 'solid',
                                borderBottomColor: '#e6e6e4',
                            }, onClick: function () { return handleClickedEvent(index); } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ variant: "h3", style: { marginBottom: 0 } }, { children: event.name })), (0, jsx_runtime_1.jsxs)("span", __assign({ style: {
                                    display: 'flex',
                                    flexDirection: 'row',
                                } }, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ variant: "subtitle1", style: { color: '#afafae' } }, { children: (0, timestamptzToDate_1.default)(event.time).toLocaleDateString() })), (0, jsx_runtime_1.jsx)("span", { style: {
                                            backgroundColor: '#afafae',
                                            height: 3,
                                            width: 3,
                                            borderRadius: 1.5,
                                            alignSelf: 'center',
                                            margin: '2%',
                                        } }), (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ variant: "subtitle1", style: { color: '#afafae' } }, { children: event.isAllDay
                                            ? 'All Day'
                                            : (0, timestamptzToDate_1.default)(event.time).toLocaleTimeString([], {
                                                timeStyle: 'short',
                                            }) })), (0, jsx_runtime_1.jsx)("span", { style: {
                                            backgroundColor: '#afafae',
                                            height: 3,
                                            width: 3,
                                            borderRadius: 1.5,
                                            alignSelf: 'center',
                                            margin: '2%',
                                        } }), (0, jsx_runtime_1.jsx)(material_1.Typography, __assign({ variant: "subtitle1", style: { color: '#afafae' } }, { children: event.attendeeCount + ' Attendees' }))] }))] }), event.id));
                }) }))] })));
}
exports.Sidebar = Sidebar;
