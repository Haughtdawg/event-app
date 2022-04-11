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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var client_1 = require("@apollo/client");
var react_1 = require("react");
var eventQueries_1 = require("../Utilities/GraphQLQueries/eventQueries");
var EventDisplay_1 = require("./EventDisplay");
var Sidebar_1 = require("./Sidebar/Sidebar");
require("@fontsource/roboto/300.css");
require("@fontsource/roboto/400.css");
require("@fontsource/roboto/500.css");
require("@fontsource/roboto/700.css");
function App() {
    var _a = (0, client_1.useQuery)(eventQueries_1.GET_EVENTS), loading = _a.loading, error = _a.error, data = _a.data, refetch = _a.refetch;
    var _b = (0, react_1.useState)([]), events = _b[0], setEvents = _b[1];
    var _c = (0, react_1.useState)(0), selectedEventIdx = _c[0], setSelectedEventIdx = _c[1];
    var handleClickedEvent = function (idx) {
        setSelectedEventIdx(idx);
    };
    (0, react_1.useEffect)(function () {
        if (data) {
            var _events = __spreadArray([], data.events, true);
            for (var i in _events) {
                _events[i] = __assign({}, _events[i]);
                _events[i].attendeeCount =
                    _events[i].attendees_aggregate.aggregate.count;
            }
            setEvents(_events);
        }
    }, [data]);
    if (loading)
        return (0, jsx_runtime_1.jsx)("p", { children: "Loading..." });
    if (error) {
        console.error(error);
        return (0, jsx_runtime_1.jsx)("p", { children: "Error!" });
    }
    if (events.length > 0) {
        return ((0, jsx_runtime_1.jsxs)("div", __assign({ style: { display: 'flex', flex: 1, flexDirection: 'row' } }, { children: [(0, jsx_runtime_1.jsx)(Sidebar_1.Sidebar, { events: events, handleClickedEvent: handleClickedEvent, selectedEventIdx: selectedEventIdx, refetch: refetch }), (0, jsx_runtime_1.jsx)(EventDisplay_1.EventDisplay, { eventId: events[selectedEventIdx].id, refetch: refetch })] })));
    }
}
exports.default = App;
