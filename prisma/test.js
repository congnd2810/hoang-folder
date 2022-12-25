"use strict";
exports.__esModule = true;
var falso_1 = require("@ngneat/falso");
var user = { email: (0, falso_1.randEmail)(), name: (0, falso_1.randFullName)() };
var emails = (0, falso_1.randEmail)({ length: 10 });
var address = (0, falso_1.randAddress)();
console.log(address);
console.log(user);
