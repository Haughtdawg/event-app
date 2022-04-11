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
function Sidebar(props) {
    console.log('sidebar props:', props);
    var events = props.events;
    console.log('props is', props);
    console.log('events is', props.events);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: {
            display: 'flex',
            borderWidth: '1px',
            borderRight: 'black',
            flex: 1,
        } }, { children: events.map(function (event) {
            return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { display: 'flex', flexDirection: 'column' } }, { children: [(0, jsx_runtime_1.jsx)("p", { children: event.name }), (0, jsx_runtime_1.jsx)("p", { children: event.description }), (0, jsx_runtime_1.jsx)("p", { children: event.date }), (0, jsx_runtime_1.jsx)("p", { children: event.time === null ? 'All Day' : event.time }), (0, jsx_runtime_1.jsxs)("p", { children: [event.attendeeCount, " Attendees"] })] }), event.id));
        }) })));
}
exports.Sidebar = Sidebar;
