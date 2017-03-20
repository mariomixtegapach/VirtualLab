var Dao = require('../dbo/modules_v2/Dbo');
var Model = require('../models/Compuestos.json');
var common = require('../dbo/modules_v2/Dbo.common');
var q = require('q');
var ObjectId = require('mongodb').ObjectID;
var _ = require('underscore');
var CryptoJS = require("crypto-js");
var collections = require('./../dbo/collections');

var dao = null;



var CompuestosService = function(config){
    dao = new Dao({
        model : Model,
        collection : collections.Users
    });
    
    return {
        GetCompuestoById : function(compuestoId){
            var defer = q.defer();
            dao.get({ _id : new ObjectId(compuestoId)}).then(function(compuesto){
                defer.resolve(compuesto);
            }, function(err){
                defer.reject(err);
            });
            
            
            return defer.promise;
        },
        UpdateCompuestoById: function(compuestoId, state){
            var defer = q.defer();
            dao.update({ _id: new ObjectId(compuestoId) },{locked : state}).then(function(compuestos){
              defer.resolve(compuestos);
            }, function(err){
                defer.reject(err);
            });
            
            return defer.promise;
        },
        GetUnlockedCompuestos :function(){
            var defer = q.defer();
            dao.get({
                locked : true
            }).then(function(compuestos){
                defer.resolve(compuestos);
            }, function(err){
                console.log(err);
                defer.reject(err);
            });
            
            return defer.promise;  
        },
        GetIsLocked :function(compuestoId){
            var defer = q.defer();
            dao.get({ _id : new ObjectId(compuestoId)}).then(function(compuesto){
                defer.resolve(compuesto.result[0].locked);
            }, function(err){
                defer.reject(err);
            });
            return defer.promise;  
        }
    };
};



module.exports = CompuestosService;