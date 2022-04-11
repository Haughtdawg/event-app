"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_EVENT = exports.CREATE_EVENT = exports.GET_THIS_EVENT = exports.GET_EVENTS = void 0;
var client_1 = require("@apollo/client");
exports.GET_EVENTS = (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query GetEvents {\n    events {\n      id\n      name\n      time\n      description\n      attendees_aggregate {\n        aggregate {\n          count\n        }\n      }\n    }\n  }\n"], ["\n  query GetEvents {\n    events {\n      id\n      name\n      time\n      description\n      attendees_aggregate {\n        aggregate {\n          count\n        }\n      }\n    }\n  }\n"])));
exports.GET_THIS_EVENT = (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query GetThisEvent($eventId: Int) {\n    events(where: { id: { _eq: $eventId } }) {\n      id\n      name\n      description\n      time\n      attendees {\n        id\n        firstName\n        lastName\n        phoneNumber\n        email\n        canAttend\n      }\n    }\n  }\n"], ["\n  query GetThisEvent($eventId: Int) {\n    events(where: { id: { _eq: $eventId } }) {\n      id\n      name\n      description\n      time\n      attendees {\n        id\n        firstName\n        lastName\n        phoneNumber\n        email\n        canAttend\n      }\n    }\n  }\n"])));
exports.CREATE_EVENT = (0, client_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  mutation MyMutation(\n    $name: String\n    $description: String\n    $date: String\n    $time: timestamptz\n  ) {\n    insert_events_one(\n      object: { name: $name, description: $description, time: $time }\n    ) {\n      id\n    }\n  }\n"], ["\n  mutation MyMutation(\n    $name: String\n    $description: String\n    $date: String\n    $time: timestamptz\n  ) {\n    insert_events_one(\n      object: { name: $name, description: $description, time: $time }\n    ) {\n      id\n    }\n  }\n"])));
exports.DELETE_EVENT = (0, client_1.gql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  mutation DeleteEvent($id: Int) {\n    delete_attendees(where: { eventId: { _eq: $id } }) {\n      affected_rows\n    }\n    delete_events(where: { id: { _eq: $id } }) {\n      affected_rows\n    }\n  }\n"], ["\n  mutation DeleteEvent($id: Int) {\n    delete_attendees(where: { eventId: { _eq: $id } }) {\n      affected_rows\n    }\n    delete_events(where: { id: { _eq: $id } }) {\n      affected_rows\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
