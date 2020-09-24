'use strict';
var path = require('path'),
    server = require(path.resolve('server/server.js')),
    constants = require(path.resolve('server/shared/constants')),
    modelService = require(path.resolve('server/shared/services/modelService')),
    sessionHelper = require(path.resolve('server/shared/sessionHelper')),
    uuid = require('node-uuid');

module.exports = function (Idusers) {

    // var excludedProperties = [
    //     'realm',
    //     'verificationToken',
    //     'credentials',
    //     'challenges',
    //     'status',
    //     'created',
    //     'lastUpdated'
    //     ];

    //      // Remove the properties from base User model that doesn't have mapped columns
    //      excludedProperties.forEach(function (p) {
    //        delete Idmusers.definition.rawProperties[p];
    //        delete Idmusers.definition.properties[p];
    //        delete Idmusers.prototype[p];
    //      });


    //  Idmusers.validatesPresenceOf('fullname', 'email', 'phonenumber');
    //Idmusers.validatesLengthOf('password', {min: 4, message: {min: constants.MESSAGES.ERROR.MINIMUM_PASSWORD_LENGTH}});
    Idusers.validatesLengthOf('password', { min: 4, message: { min: 'too weak' } });
    //Idmusers.validatesUniquenessOf('email', {message: constants.MESSAGES.ERROR.EMAIL_NOT_UNIQUE});

    //  Idusers.on('dataSourceAttached', function() {
    //    delete Idusers.validations.email; //delete MyModel.app.models.User.validations.email;
    //  });
    Idusers.observe("before save", function (ctx, next) {
        var Roles = server.models.UserRoles;
        if (ctx.isNewInstance) {
            var data = ctx.instance;
            data.created = new Date();
            var filter = {
                where: {
                    name: ctx.instance.role//constants.USER_ROLES.EMPLOYEE
                }
            };
            var userId = uuid.v1();
            modelService.getOneInstance(Roles, filter).then(function (role) {
                data.userroleid = role.id;
                data.id = userId;
                next();
            }).fail(function (err) {
                //    console.log('Error in getting role before save', err);
                next(err);
            });
        } else {
            next();
        }
    });

    // Get notifications for the user
    Idusers.beforeRemote('find', function (context, modelInstance, next) {

        // TODO: do not allow anonymous users
  

        var UserRoles = server.models.UserRoles,
            filter = {
                where: {
                    name: constants.USER_ROLES.EMPLOYEE
                }
            };

        modelService.getOneInstance(UserRoles, filter).then(function (role) {
            if (role) {
                var filter = {
                    where: {
                        userroleid: role.id
                    },
                    order: 'created DESC'
                };

                context.args.filter = filter;
                next();
            } else {
                //TODO: handle error
            }
        }).fail(function (err) {
            //TODO: handle error
        });
    });

};
