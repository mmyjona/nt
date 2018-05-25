"use strict";

var history = function() {
  LocalContractStorage.defineMapProperty(this, "answers");
  LocalContractStorage.defineProperty(this, "answer_cnt", null);
};

history.prototype = {
  init: function() {
    this.answer_cnt = 0;
  },

  historyin: function(total_num, right_num) {
	if(right_num > total_num) {
		throw new Error("arameter error, right_num is not greater than total_num!");
	}
	
	var userfrom = Blockchain.transaction.from;
	var timestamps = Blockchain.transaction.timestamp;
	
	var answer_info = { "from": userfrom, "timestamps": timestamps, "total_num": total_num, "right_num": right_num };
    
	var answer_cnt = new BigNumber(this.answer_cnt).plus(1);
    this.answer_cnt = answer_cnt;
	this.answers.set(answer_cnt, answer_info);

    return true;
  },
  
  historyout: function(count) {
	var userfrom = Blockchain.transaction.from;
	
	var answer_info_arr = [];
	
	var answer_cnt = +this.answer_cnt;

    if (!count) {
		count = 50;
	}
	
	if (count > answer_cnt) {
		count = answer_cnt;
	}
 
    for (var idx = answer_cnt; idx >= 1 && count > 0; idx--, count--) {
		var answer_info = this.answers.get(idx);
		if (answer_info["from"] === userfrom) {
			answer_info_arr.push(answer_info);
		}
    }
	
	return answer_info_arr;
  },
  
};

module.exports = history;