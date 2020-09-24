/**
 * Script for inserting roles and admin user
 */

"use strict";
var path = require("path"),
    app = require(path.resolve("server/server.js")),
    constants = require(path.resolve('server/shared/constants'));


// var adminRoleId = '860e7ddb-fccd-4b49-a7a9-e3a9f5148378';
var insertRoles = function (callback) {
    var UserRoles = app.models.UserRoles;
    var roles = [
        {
            id: '860e7ddb-fccd-4b49-a7a9-e3a9f5148378',
            name: constants.USER_ROLES.ADMIN

        }, {
            id: '12159ec0-6371-4538-96d9-ee3f2e937b17',
            name: constants.USER_ROLES.EMPLOYEE
        }];
    // console.log(roles);
    UserRoles.create(roles, callback);

};

var insertAdminUser = function (callback) {
    var Users = app.models.IdUsers;
    var user = {
        "email": "admin@mailinator.com",
        "password": "12345678",
        "firstName": "John",
        "lastName": "Doe",
        "role": constants.USER_ROLES.ADMIN
    };

    console.log(user);
    Users.create(user, callback);
};


insertRoles(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('>>> Roles inserted successfully. Creating admin user...');
        insertAdminUser(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('>>> Admin inserted successfully');
            }
            process.exit(0);
        });
    }
});

