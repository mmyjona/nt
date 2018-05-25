"use strict";

var User = function (obj) {
    this.user = {};
    this.parse(obj);
}

User.prototype = {
    toString: function () {
        return JSON.stringify(this.user);
    },

    parse: function (obj) {
        if (typeof obj != "undefined") {
            var data = JSON.parse(obj);
            for (var key in data) {
                this.user[key] =data[key];
            }
        }
    },

    get: function (key) {
        return this.user[key];
    },

    set: function (key, value) {
        this.user[key] = value;
    }
}

var HabitContract = function () {
    LocalContractStorage.defineProperties(this, {
        _owner: null,
    })
    LocalContractStorage.defineProperty(this, "user_size");

    LocalContractStorage.defineMapProperties(this, {
        "users": {
            parse: function (value) {
                return new User(value);
            },
            stringify: function (o) {
                return o.toString();
            }
        }
    });
    LocalContractStorage.defineMapProperty(this, "dataMap");

    LocalContractStorage.defineMapProperty(this, "userArray");
};

HabitContract.prototype = {
    init: function () {
        this.user_size = 0;
        var from = Blockchain.transaction.from;
        this._owner = from; 
    },



    getUser(){
        var from = Blockchain.transaction.from; 
        var user = this.users.get(from) || new User();
        return user.toString()
    },

    getUserByAddress(address){
        if(!this._isOwner()){
            return;
        }
        var user = this.users.get(address) || new User();
        return user.toString()
    },

    lenUser:function(){
        if(!this._isOwner()){
            return 0;
        }
        return this.user_size;
    },

    forEachUser: function(offset, limit){
        if(!this._isOwner()){
            return;
        }

        var size = this.user_size;

        limit = parseInt(limit);
        offset = parseInt(offset);
        if(offset>size){
           throw new Error("offset is not valid");
        }
        var number = offset+limit;
        if(number > size){
          number = size;
        }
        var result  = [];
        for(var i=offset;i<number;i++){
            var key = this.userArray.get(i);
            var object = this.users.get(key);
            result.push(object);
        }
        return result;
    },

    get: function (index) {
        return this._get(Blockchain.transaction.from, index)
    },

    getByAddress: function(addr, index){
        if(!this._isOwner()){
            return;
        }
  
        return this._get(addr, index)
    },

    _get: function (addr, index) {
        var user = this.users.get(addr)  || new User();
        
        var address = user.get("address");
        if (address != addr){
          return ;
        }

        var key = address+"_"+index

        return this.dataMap.get(key)
    },

    putWithAddress: function(to, value){

        if(!this._isOwner()){
            throw new Error("from must be owner");
            return;
        }

        this._put(to, value)
    },

    put: function (value) {
        this._put(Blockchain.transaction.from, value)
    },

    _put: function(address, value){
        var user = this.users.get(address) || new User();
        
        var addr = user.get("address") ;
        if (addr != address){
            user.set("address", address);
            user.set("size", 0);
          
            var index = this.user_size;
            this.userArray.set(index, address);

            this.user_size +=1; 
        }
  
        var size = user.get("size");
        user.set("size", size+1);

        var key = address+"_"+size
        this.dataMap.set(key, value);
        this.users.set(address, user.toString())
    },

    lenByAddress:function(addr){
        if(!this._isOwner()){
            return;
        }
        var user = this.users.get(addr)  || new User();
        var address = user.get("address");
        if (address != addr){
          return 0;
        }
        return  user.get("size");
    },

    len:function(){
        var user = this.users.get(Blockchain.transaction.from)  || new User();
        var address = user.get("address");
        if (address != Blockchain.transaction.from){
          return 0;
        }
        return  user.get("size");
    },

   forEachByAddress : function(address, offset, limit){
        if(!this._isOwner()){
            return;
        }

        return this._forEach(address, offset, limit)
    },

    forEach: function(offset, limit){

        return this._forEach(Blockchain.transaction.from, offset, limit)
    },

    _forEach: function(addr, offset, limit){

        var user = this.users.get(addr) || new User();
        
        var address = user.get("address");
        if (address != addr){
          return [address, addr];
        }
        var size = user.get("size");

        limit = parseInt(limit);
        offset = parseInt(offset);
        if(offset>=size || offset<0){
           throw new Error("offset is not valid");
        }
        var number = offset+limit;
        if(number > size){
          number = size;
        }
        var result  = [];

        for(var i=offset;i<number;i++){
            var key = address+"_"+i;
            var object = this.dataMap.get(key);
            result.push(object);
        }
        return result;
    },
    _isOwner:function(){
        return Blockchain.transaction.from != this._owner?falseL:true;
    }
};

module.exports = HabitContract;