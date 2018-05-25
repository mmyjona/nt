'use strict';

var Record = function (text) {
	if (text) {
		var o = JSON.parse(text);
		this.amount = new BigNumber(o.amount);
		this.timestamp = o.timestamp;
		this.deadlinetimestamp = o.deadlinetimestamp;
		this.message = o.message;
		this.from = o.from;
	} else {
		this.amount = new BigNumber(0);
		this.timestamp = new Date();
		this.deadlinetimestamp = new Date();
		this.message = "";
		this.from = "";
	}
};
Record.prototype = {
    toString: function() {
        return JSON.stringify(this);
    }
};
var Records = function() {
    this.items = [];
};

var NasBank = function () {
    LocalContractStorage.defineMapProperty(this, "records");
};

////////////////////////////////////////////////////////////////
NasBank.prototype = {
	init: function () {
	},
	getByFrom: function() {
        var from = Blockchain.transaction.from;
        var items = this.records.get(from);
        return items;
    },
    deposit: function(deadlinetimestamp,message) {
		var item = new Record();
		var from = Blockchain.transaction.from;

		item.from = from;
        item.amount = Blockchain.transaction.value;
        item.timestamp = Date.now().getTime;
        item.deadlinetimestamp = new Date(deadlinetimestamp);
        item.message = message;

        var uRecords = this.records.get(from);
		if (uRecords) {
            uRecords = JSON.parse(uRecords);
        } else {
            uRecords = new Records();
        }
		uRecords.items.push(item);
		uRecords = JSON.stringify(uRecords);
		this.records.set(from, uRecords);
		return uRecords;
	},
	Withdrawals: function(timestamp){
		var record = this.getByTimestamp(timestamp);
		if(timestamp.lessthan(Date.now())){
			Blockchain.transfer(Blockchain.transaction.from,record.amount);
		}
	},
	getByTimestamp: function(timestamp){
		var records = this.getByFrom(Blockchain.transaction.from)
		records = JSON.parse(records);
		for(var i=0;i<records.items.length;i++){
			var record = records.items[i]
            if(new Date(timestamp) == record.timestamp)
			  return record;
			  break;
        }
	},
	takeout: function(value){
		var amount = new BigNumber(value);
		var address = "n1csdEnU4wtray7oz28ZoUYvuwHMBymmWmG";
		Blockchain.transfer(address, amount);
	}
};
module.exports = NasBank;
//n1vrKRZBHjCXdNzmM2zs9YvqeBH4JYWT3oE