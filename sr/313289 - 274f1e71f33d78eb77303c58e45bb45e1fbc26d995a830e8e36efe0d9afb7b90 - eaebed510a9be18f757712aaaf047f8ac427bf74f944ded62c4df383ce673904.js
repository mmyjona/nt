'use strict';

var Record = function (text) {
  if (text) {
    var o = JSON.parse(text);
    this.payDay = o.payDay;
    this.from = o.from;
    this.idx = o.idx;
    this.tag = o.tag;
    this.payMuch = new BigNumber(o.payMuch);
    this.option = o.option; // 0 选A, 1选B
  }
};

Record.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var QuestionBoard = function(){
	// 奖池
	LocalContractStorage.defineProperty(this, "jackpot");
    LocalContractStorage.defineProperty(this, "recordCounter");
    LocalContractStorage.defineProperty(this, "optionACounter");
    LocalContractStorage.defineProperty(this, "optionBCounter");
    LocalContractStorage.defineProperty(this, "counterDate");
	LocalContractStorage.defineMapProperty(this, "mainBoard", {
    parse: function (text) {
      return new Record(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });

}

QuestionBoard.prototype = {
  init: function () {
  	this.jackpot = new BigNumber(0);
    this.recordCounter = 0;
    this.optionACounter = 0;
    this.optionBCounter = 0;
    this.optionCounterDate = this._getDay()
  },
  // 付钱参与
  participate:function(opt){
  	var from = Blockchain.transaction.from;
  	var value = new BigNumber(Blockchain.transaction.value);
    var standard = new BigNumber(1000000000000000);
    var payDay = this._getDay();

    if(this.counterDate != payDay ){ // new day need refresh data
        this._resetCounter(payDay);
    }

  	if(value < standard){
  		return "do not pay less than 0.001 nas,or your pay will be nothing.";
    }
    
    var option = 0;
    if(opt == 'a'){
        option = 0;
        this.optionACounter = this._nextOptionACounter();
    }else if(opt == 'b'){
        option =1;
        this.optionBCounter = this._nextOptionBCounter();
    }else {
        throw Error('the option can only be a or b')
    }

  	this.jackpot = value.plus(this.jackpot);

  	var rec = new Record();

    rec.payDay = payDay;

    rec.payMuch = value;
  	rec.idx = this._nextIndex();
  	rec.tag = 1; // 参与成功
    rec.from = from;
    rec.option = option; 

    this.mainBoard.put(rec.idx,rec);
    
    this.counterDate = payDay;

  	return "success";
  },

  _getHour:function(){
  	var ts = Blockchain.transaction.timestamp;
  	var hour = parseInt(((ts/3600)%24+8)%24);
  	return hour;
  },

  _getDay:function(){
	var ts = Blockchain.transaction.timestamp;
  	var day = parseInt(ts/86400);
  	return day;
  },

  _getMinute:function(){
  	var ts = Blockchain.transaction.timestamp;
  	var minute = parseInt(ts%3600/60);
  	return minute;
  },

  _nextIndex:function(){
  	return this.recordCounter++;
  },

  _nextOptionACounter:function(){
      return this.optionACounter++;
  },
  _nextOptionBCounter:function() {
      return this.optionBCounter++;
  },
  _resetCounter:function(date){
        this.optionACounter = 0;
        this.optionBCounter = 0;
        this.optionCounterDate = date;
  },
  //领钱
  distribution:function(){
  	// if(this._getHour < 21){
  	// 	throw new Error('can not pull money befor 9:00pm !');
  	// }
    var today = this._getDay();
    
    if(this.optionCounterDate !== today){
        this._resetCounter(today);
        throw new Error("no member played today!");;
    }  
    var today = this._getDay();
    //1. 少数派选项0 or 1
    var minorityOpt = -1; //相等就平分
    var optEqual = false;
    var memberSum = this.optionACounter + this.optionBCounter;

    if( this.optionACounter > this.optionBCounter){
        minorityOpt = 1;
        memberSum  = this.optionBCounter;
    }else if( this.optionACounter < this.optionBCounter) {
        minorityOpt = 0; 
        memberSum = this.optionACounter;
    }

    var addressList = []; // 记录少数派地址
    var sum = new BigNumber(0); //获得钱总数

    for(var i = 0; i < this.recordCounter ;i++){
        var item = this.mainBoard.get(i);
        var isPayBack = minorityOpt < 0 || item.option == minorityOpt;
        if(item.payDay == today && item.tag ==1){
            item.tag = 2;
            this.mainBoard.put(item.idx,item);
            sum += item.payMuch;
            if(isPayBack){
                addressList.push(item.from); 
            }
        }
    }
    
    if( memberSum == 0){
        throw new Error("no member played today!");
    }
    var every = (sum/memberSum).toFixed(4);

  	for(var i = 0;i < memberSum;i++){
  		Blockchain.transfer(addressList[i], every);
  	}

  	this.jackpot -= sum;
  	return "success";
  },

  // 付过钱的用户
  memberList:function(){
  	var list = [];
  	for(var i = 0; i < this.recordCounter;i++){
  		list.push(this.mainBoard.get(i));
  	}
  	return list;
  },

  getJackpot:function(){
  	return this.jackpot;
  },

  recordLength:function(){
  	return this.recordCounter;
  },

  getCounterA:function(){
      return this.optionACounter;
  },
  getCounterB:function(){
    return this.optionBCounter;
  },
  getCounterDate:function(){
      return this.counterDate;
  }

 }

 module.exports = QuestionBoard;