"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_ATTENDEE = exports.UPDATE_ATTENDEE = exports.DELETE_ATTENDEE = void 0;
var client_1 = require("@apollo/client");
exports.DELETE_ATTENDEE = (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation DeleteAttendee($id: Int) {\n    delete_attendees(where: { id: { _eq: $id } }) {\n      affected_rows\n    }\n  }\n"], ["\n  mutation DeleteAttendee($id: Int) {\n    delete_attendees(where: { id: { _eq: $id } }) {\n      affected_rows\n    }\n  }\n"])));
exports.UPDATE_ATTENDEE = (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  mutation UpdateAttendee(\n    $id: Int\n    $firstName: String\n    $lastName: String\n    $phoneNumber: String\n    $email: String\n  ) {\n    update_attendees(\n      where: { id: { _eq: $id } }\n      _set: {\n        firstName: $firstName\n        lastName: $lastName\n        phoneNumber: $phoneNumber\n        email: $email\n      }\n    ) {\n      affected_rows\n    }\n  }\n"], ["\n  mutation UpdateAttendee(\n    $id: Int\n    $firstName: String\n    $lastName: String\n    $phoneNumber: String\n    $email: String\n  ) {\n    update_attendees(\n      where: { id: { _eq: $id } }\n      _set: {\n        firstName: $firstName\n        lastName: $lastName\n        phoneNumber: $phoneNumber\n        email: $email\n      }\n    ) {\n      affected_rows\n    }\n  }\n"])));
exports.CREATE_ATTENDEE = (0, client_1.gql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  mutation CreateAttendee(\n    $firstName: String\n    $lastName: String\n    $phoneNumber: String\n    $email: String\n    $eventId: Int\n  ) {\n    insert_attendees_one(\n      object: {\n        firstName: $firstName\n        lastName: $lastName\n        phoneNumber: $phoneNumber\n        email: $email\n        eventId: $eventId\n      }\n    ) {\n      id\n    }\n  }\n"], ["\n  mutation CreateAttendee(\n    $firstName: String\n    $lastName: String\n    $phoneNumber: String\n    $email: String\n    $eventId: Int\n  ) {\n    insert_attendees_one(\n      object: {\n        firstName: $firstName\n        lastName: $lastName\n        phoneNumber: $phoneNumber\n        email: $email\n        eventId: $eventId\n      }\n    ) {\n      id\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;
