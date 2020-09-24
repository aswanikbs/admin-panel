function getUserId(req) {

    var loopBackContext = require('loopback-context'),
        loopbackContext = loopBackContext.getCurrentContext(),
        userId = null;
    if (loopbackContext.get('currentUser')) {

        userId = loopbackContext.get('currentUser').userId || null;
    }

    return userId;
}

module.exports = {
    getUserId: getUserId
};