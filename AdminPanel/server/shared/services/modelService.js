var q = require('q'),
  path = require('path'),
  server = require(path.resolve('server/server.js')),
  mogodb = server.dataSources.mogodb;

  /**
   * Create new passing model instance.
   *
   * @param {Object} model - Model Instance
   * @param {Object} payload - payload
   * @returns {*|promise}
   */
  createInstance = function (model, payload) {
    var deferred = q.defer();
    model.create(payload, function (err, obj) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(obj);
    });
    return deferred.promise;
  },

  /**
   * Get passing model object.
   *
   * @param {Object} model - Model Instance
   * @param {Object} filter - filter
   * @returns {*|promise}
   */
  getInstance = function (model, filter) {
    var deferred = q.defer();
    model.find(filter, function (err, obj) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(obj);
    });
    return deferred.promise;
  },
  /**
   * Get passing model object by id.
   *
   * @param {Object} model - Model Instance
   * @param {Object} id - id
   * @returns {*|promise}
   */
  getInstanceById = function (model, id) {
    var deferred = q.defer();
    model.findById(id, function (err, obj) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(obj);
    });
    return deferred.promise;
  },
  /**
   * Get one passing model instance.
   *
   * @param {Object} model - Model Instance
   * @param {Object} filter - filter
   * @returns {*|promise}
   */
  getOneInstance = function (model, filter) {
    var deferred = q.defer();
    model.findOne(filter, function (err, obj) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(obj);
    });
    return deferred.promise;
  },
  /**
   * Execute native query.
   *
   * @param {Object} query - query to execute
   * @param {Object} params - params
   * @returns {*|promise}
   */
  executeQuery = function (query, params) {
    var deferred = q.defer();
    params = typeof params  !== 'undefined' ? params : [];
    mogodb.connector.execute(query, params, function (err, obj) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(obj);
    });
    return deferred.promise;
  },
  //TODO: Check if this method is actually needed. Try to implement it in the getInstanceById method itself with a default filter parameter.
  /**
   * Get passing model object by id with filter.
   *
   * @param {Object} model - Model Instance
   * @param {Object} id - id
   * @param {Object} filter - filter
   * @returns {*|promise}
   */
  getInstanceByIdWithFilter = function (model, id, filter) {
    var deferred = q.defer();
    model.findById(id, filter, function (err, obj) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(obj);
    });
    return deferred.promise;
  },
  /**
   * Update instance by id.
   *
   * @param {number} model - Model Instance
   * @param {number} id - id
   * @param {Object} payload - payload
   * @returns {*|promise}
   */
  updateInstanceById = function (model, id, payload) {
    var deferred = q.defer();
    model.updateAll(
      {
        "id": id
      },
      payload,
      function (err, info) {
        if (err) {
          deferred.reject(err);
          return;
        }
        deferred.resolve(info);
      });
    return deferred.promise;
  };

/**
 * Update instance
 *
 * @param model {Model} - Model Instance
 * @param filter {Object}
 * @param payload {object}
 * @returns {*|promise}
 */
var updateInstance = function (model, filter, payload) {
  var deferred = q.defer();
  model.upsertWithWhere(filter, payload, function (err, info) {
    if(err){
      deferred.reject(err);
      return;
    }
    deferred.resolve(info)
  });
  return deferred.promise;
};

/**
 * Update multiple instances that match the filter
 *
 * @param {number} model - Model Instance
 * @param filter {Object}
 * @param {Object} payload - payload
 * @returns {*|promise}
 */
updateInstancesByFilter = function (model, filter, payload) {
  var deferred = q.defer();
  model.updateAll(filter, payload,
    function (err, info) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(info);
    });
  return deferred.promise;
};

/**
 * Delete multiple instances that match the filter
 *
 * @param {number} model - Model Instance
 * @param filter {Object}
 * @returns {*|promise}
 */
deleteInstancesByFilter = function (model, filter) {
  var deferred = q.defer();
  model.destroyAll(filter,
    function (err, info) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(info);
    });
  return deferred.promise;
};

/**
 * Find an instance, if not exist, create new instance
 *
 * @param {number} model - Model Instance
 * @param filter {Object}
 * @param payload - data to insert if filter object not found
 *
 * @returns {*|promise}
 */
findOrCreate = function (model, filter, payload) {
  var deferred = q.defer();
  model.findOrCreate(filter, payload,
    function (err, info) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(info);
    });
  return deferred.promise;
};

deleteInstancesById = function (model, id) {
  var deferred = q.defer();
  model.deleteAll(
    {
      "id": id
    },
    function (err, info) {
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(info);
    });
  return deferred.promise;
};


/**
 * Find an instance, if not exist, create new instance, if exist update instance.
 *
 * @param {number} model - Model Instance
 * @param condition {Object}
 * @param payload - data to insert if filter object not found
 *
 * @returns {*|promise}
 */
upsertWithWhere = function (model, condition, payload) {
  var deferred = q.defer();
  model.upsertWithWhere(condition, payload,
    function (err, info) {  
      
      if (err) {
        deferred.reject(err);
        return;
      }
      deferred.resolve(info);
    });
  return deferred.promise;
};


module.exports = {
  createInstance : createInstance,
  getInstance : getInstance,
  getInstanceById : getInstanceById,
  getOneInstance : getOneInstance,
  executeQuery : executeQuery,
  getInstanceByIdWithFilter : getInstanceByIdWithFilter,
  updateInstanceById: updateInstanceById,
  updateInstance: updateInstance,
  updateInstancesByFilter: updateInstancesByFilter,
  deleteInstancesByFilter: deleteInstancesByFilter,
  findOrCreate: findOrCreate,
  upsertWithWhere: upsertWithWhere,
  deleteInstancesById: deleteInstancesById
};
