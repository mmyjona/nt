"use strict";

function SortDesc(player_a, player_b) {
	if (player_a["score"] > player_b["score"]) {
		return 1;
	} else if (player_a["score"] === player_b["score"]) {
		if (player_a["timestamp"] < player_b["timestamp"]) {
			return -1;
		}else if (player_a["timestamp"] === player_b["timestamp"]) {
			return 0;
		}else {
			return 1;
		}
	}else {
		return -1;
	}
};

function CompareScore(player_a, player_b) {
	if (player_a["score"] < player_b["score"]) {
		return 1;
	} else if (player_a["score"] === player_b["score"]) {
		return 0;
	}else {
		return -1;
	}
};

function IsDigit(str) {
	if (!str) {
		return false;
	}
	
	var type = typeof(str);
	if (type === "number") {
		return true;
	}
	
	var digits = [];
	var dpoints = [];
	
	for (var i = 0; i < str.length; i++) {
		if (str[i] >= 0 && str[i] <= 9) {
			digits.push(i);
			continue;
		}else if (str[i] === ".") {
			dpoints.push(i);
		}else {
			return false;
		}
	}
	
	if (digits.length < 1) {
		return false;
	}
	
	if (dpoints.length > 1) {
		return false;
	}
	
    return true;
};

function NAS2GAS(bonus) {
	return bonus * Math.pow(10,18);
};

function GAS2NAS(bonus) {
	return bonus / Math.pow(10,18);
};

var ChallengeContract = function() {
	LocalContractStorage.defineMapProperty(this, "challenge_records");
	LocalContractStorage.defineMapProperty(this, "highest_socre_records", null);
	LocalContractStorage.defineProperty(this, "record_count", null);	
	
	LocalContractStorage.defineMapProperty(this, "challenge_rounds");
	LocalContractStorage.defineMapProperty(this, "id_challenge_round");
	LocalContractStorage.defineProperty(this, "round_count", null);
	
	LocalContractStorage.defineProperty(this, "round_amount", null);
	LocalContractStorage.defineProperty(this, "round_id", null);
	LocalContractStorage.defineProperty(this, "admin", null);
};

ChallengeContract.prototype = {
	init: function(round_amount) {
		if (round_amount) {
			this.round_amount = round_amount;
		}else {
			this.round_amount = 0.0001;
		}
		
		this.round_id = "";
		this.record_count = 0;
		this.round_count = 0;
		this.admin = Blockchain.transaction.from;
	},
	
	_getPlayerList: function(round_id) {
		console.log("_getPlayerList() -- 1:" + round_id);	
		if (!round_id || round_id.trim() === "") {
			throw new Error("Parameter Error!");
		}
		
		var challenge_round_info = this.challenge_rounds.get(round_id);
		if (!challenge_round_info) {
			throw new Error("Challenge Error!");
		}
		console.log("_getPlayerList() -- 2:" + challenge_round_info["rid"] + " === " + challenge_round_info["records"].join(","));
		
		var player_list = [];
		var records = challenge_round_info["records"];
		
		for (var idx = 0; idx < records.length; idx++) {
			var record = this.challenge_records.get(records[idx]);
			console.log("_getPlayerList() -- 3:" + idx + "," + records[idx] + "," + record["rid"] + "," + record["player"] + "," + record["startTime"] + "," + record["score"]);
			
			player_list.push(record);
		}
		
		return player_list;
	},
	
	_getPlayer: function(player, records) {
		for(var idx = 0; idx < records.length; idx++) {
			var record = this.challenge_records.get(records[idx]);
			if (player === record["player"]) {
				return records[idx];
			}
		}
		
		return 0;
	},
	
	_getPlayerDetail: function(player, records) {
		for(var idx = 0; idx < records.length; idx++) {
			var record = this.challenge_records.get(records[idx]);
			if (player === record["player"]) {
				return record;
			}
		}
		
		return null;
	},
	
	beginChallenge: function(round_id, begin_end_time) {
		console.log("beginChallenge() -- 1:" + round_id + ", " + begin_end_time);
		
		if (!round_id || round_id.trim() === "" 
		|| !begin_end_time || begin_end_time.trim() === "") {
			throw new Error("Parameter Error!");
		}
		
		var challenge_round_info = this.challenge_rounds.get(round_id);
		if (challenge_round_info) {
			throw new Error("round_id existed!");
		}
		this.round_id = round_id;
					
		challenge_round_info = {"rid": round_id, "bgEdTime": begin_end_time, "bonus": 0, "records": []};
		this.challenge_rounds.set(round_id, challenge_round_info);
		console.log("beginChallenge() -- 2:" + challenge_round_info["rid"] + ", " + challenge_round_info["bgEdTime"] + ", " + challenge_round_info["bonus"]);		
		
		var round_count = new BigNumber(this.round_count).plus(1);
		this.round_count = round_count;	
		this.id_challenge_round.set(round_count, round_id);
		console.log("beginChallenge() -- 3:" + this.round_count);
	},
	
	getCurrentChallengeInfo: function() {
		var challenge_round_info = this.challenge_rounds.get(this.round_id);
		if (!challenge_round_info) {
			return {"rid": "", "bgEdTime": "", "playeNum": 0, "bonus": 0};
		} 
		console.log("getCurrentChallengeInfo():" + challenge_round_info["rid"] + ", " + challenge_round_info["bgEdTime"] + ", " + challenge_round_info["bonus"] + " === " + challenge_round_info["records"].join(","));
		
		var bonus = GAS2NAS(challenge_round_info["bonus"]);
		var playeNum = challenge_round_info["records"].length;
		
		return {"rid": challenge_round_info["rid"], "bgEdTime": challenge_round_info["bgEdTime"], "playeNum": playeNum, "bonus": bonus};
	},
	
	getRoudList: function(count) {
		console.log("getRoudList() -- 1:" + count);
		if (!IsDigit(count)) {
			throw new Error("Parameter Error!");
		}
		
		var round_count = this.round_count;
		if (count > round_count - 1) {
			count = round_count - 1;
		}
		console.log("getRoudList() -- 2:" + count);
			
		var roud_list = [];
		for (var idx = round_count - 1; idx > 0 && count > 0; idx--, count--) {
			var round_id = this.id_challenge_round.get(idx);
			console.log("getRoudList() -- 3:" + idx + " === " + round_id);
			roud_list.push(round_id);
		}
		
		return roud_list;
	},
	
	getRoundTopN: function(round_id, count) {
		console.log("getRoundTopN() -- 1:" + round_id + ", " + count);
		var player_list = this._getPlayerList(round_id);
		player_list.sort(SortDesc);
		
		var challenge_round_info = this.challenge_rounds.get(round_id);
		if (!challenge_round_info) {
			throw new Error("Challenge Error!");
		}
		
		var length = player_list.length;
		if (count > length) {
			count = length;
		}
		console.log("getRoundTopN() -- 2:" + round_id + ", " + count);
		
		var TopNList = [];
		for (var idx = 0; idx < count; idx++) {
			TopNList.push(player_list[idx]);
		}
		
		return {"playeNum": length, "bonus": GAS2NAS(challenge_round_info["bonus"]), "topN": TopNList};
	},
	
	joinChallenge: function(startTime) {
		console.log("joinChallenge() -- 1:" + startTime);
		
		if (!startTime || startTime.trim() === "") {
			throw new Error("Parameter Error!");
		}
		
		console.log("joinChallenge() -- xxx:" + Blockchain.transaction.value);		
		var bonus = parseFloat(Blockchain.transaction.value);
		if (GAS2NAS(bonus) < this.round_amount) {
			throw new Error("Bonus Error!");
		}	
		console.log("joinChallenge() -- xxx:" + bonus);
			
		var challenge_round_info = this.challenge_rounds.get(this.round_id);
		if (!challenge_round_info) {
			throw new Error("Challenge Error!");
		}
		console.log("joinChallenge() -- 2:" + this.round_id + ", " + challenge_round_info["bonus"]);
		
		var bgEdTimeArr = challenge_round_info["bgEdTime"].split("-");
		var lnBeginTime = parseInt(bgEdTimeArr[0]);
		var lnEndTime = parseInt(bgEdTimeArr[1]);
		var lnJoinTime = parseInt(startTime);
		if (lnJoinTime < lnBeginTime || lnJoinTime > lnEndTime) {
			throw new Error("Parameter Error!");
		}
		
		var records = challenge_round_info["records"];
		var player = Blockchain.transaction.from;
		console.log("joinChallenge() -- 3:" + player + " === " + records.join(","));
		
		var record_count = new BigNumber(this.record_count).plus(1);
		this.record_count = record_count;
		var timestamp = Blockchain.transfer.timestamp;
		var record = {"rid": this.round_id, "player": player, "startTime": startTime, "bonus": bonus, "timestamp": timestamp};
		this.challenge_records.set(record_count, record);
		console.log("joinChallenge() -- 4:" + record["rid"] + ", " + record["player"] + ", " + record["startTime"] + ", " + record["bonus"]);
		
		records.push(record_count);
		challenge_round_info["records"] = records;
		console.log("joinChallenge() -- 5:" + record_count + " === " + records.join(",") + " === " + challenge_round_info["records"].join(","));
		
		var bonus_pool_value = parseFloat(challenge_round_info["bonus"]);
		console.log("joinChallenge() -- xxx:" + bonus_pool_value);
		bonus_pool_value += bonus;
		challenge_round_info["bonus"] = bonus_pool_value;
		console.log("joinChallenge() -- xxx:" + bonus_pool_value);
		
		this.challenge_rounds.set(this.round_id, challenge_round_info);
		console.log("joinChallenge() -- 6:" + challenge_round_info["rid"] + ", " + challenge_round_info["bonus"] + " === " + challenge_round_info["records"].join(","));
	},
	
	updateChallenge: function(round_id, score) {
		console.log("updateChallenge() -- 1:" + round_id + ", " + score);
		if (!round_id || round_id.trim() === "") {
			throw new Error("Parameter Error!");
		}
		
		if (!IsDigit(score)) {
			throw new Error("Parameter Error!");
		}
		score = parseInt(score);
		
		var challenge_round_info = this.challenge_rounds.get(this.round_id);
		if (!challenge_round_info) {
			throw new Error("Challenge Error!");
		}
		console.log("updateChallenge() -- 2:" + challenge_round_info["id"]);
		
		var player = Blockchain.transaction.from;
		var current_socre_record = {"rid": round_id, "highestScore": score};
		var highest_socre_record = this.highest_socre_records.get(player);
		if (highest_socre_record) {
			if (CompareScore(current_socre_record, highest_socre_record) > 0) {
				this.highest_socre_records.set(player, current_socre_record);
			}
		} else {
			this.highest_socre_records.set(player, current_socre_record);
		}
		
		var records = challenge_round_info["records"];
		var player = Blockchain.transaction.from;
		var record_id = this._getPlayer(player, records);
		if (record_id <= 0) {
			throw new Error("Not joined!");
		}
		console.log("updateChallenge() -- 3:" + player + ", " + record_id + " === " + records.join(","));
		
		var record = this.challenge_records.get(record_id);
		if (!record) {
			throw new Error("Inner error, don't found record!");
		}
		console.log("updateChallenge() -- 4:" + record["rid"] + ", " + record["player"] + ", " + record["startTime"] + ", " + record["bonus"]);
		
		record["score"] = score;
		this.challenge_records.set(record_id, record);	
		console.log("updateChallenge() -- 5:" + record["rid"] + ", " + record["player"] + ", " + record["startTime"] + ", " + record["bonus"] + ", " + record["score"]);
	},
	
	finishChallenge: function(round_id) {
		console.log("finishChallenge() -- 1:" + round_id);
		if (!round_id || round_id.trim() === "") {
			throw new Error("Parameter Error!");
		}

		var challenge_round_info = this.challenge_rounds.get(this.round_id);
		if (!challenge_round_info) {
			throw new Error("Challenge Error!");
		}
		console.log("finishChallenge() -- 2:" + challenge_round_info["bgEdTime"] + ", " + challenge_round_info["bonus"] + " === " + challenge_round_info["records"].join(","));
		
		var bonus_pool_value = challenge_round_info["bonus"];
		if (!bonus_pool_value) {
			console.log("finishChallenge() -- 3: No bonus!");
			return false;
		}
		
		var records = challenge_round_info["records"];
		if (records.length < 1) {
			throw new Error("No players!");
		}
		
		var player_list = [];
		for (var idx = 0; idx < records.length; idx++) {
			var record = this.challenge_records.get(records[idx]);
			console.log("finishChallenge() -- 4:" + idx + "," + records[idx] + "," + record["score"]);
			
			player_list.push(record["player"]);
		}
		
		var amount = bonus_pool_value;
		if (player_list.length > 0) {
			player_list.sort(SortDesc);
			
			amount = amount * 0.8;
			var player = player_list[0];
			var res = Blockchain.transfer(player, amount);
			if (!res) {
				throw new Error("transfer to winner's wallet failed:" + player + "," + amount);
			}
			console.log("finishChallenge() -- 5:" + player + "," + amount);
			
			amount = bonus_pool_value - amount;
		}
       
        var result = Blockchain.transfer(this.admin, amount);
		if (!result) {
			throw new Error("transfer to admin's wallet failed:" + this.admin + "," + amount);
		}
        console.log("finishChallenge() -- 6:" + this.admin + "," + amount);   
	},
	
	getWinner: function(round_id) {
		var player_list = this._getPlayerList(round_id);
		
		player_list.sort(SortDesc);
		
		return player_list[0];
	},
	
	getPlayerRoundDetail: function(round_id) {
		console.log("getPlayerRoundDetail() -- 1:" + round_id);	
		var challenge_round_info = this.challenge_rounds.get(round_id);
		if (!challenge_round_info) {
			throw new Error("round_id Error!");
		}
				
		var records = challenge_round_info["records"];
		var player = Blockchain.transaction.from;
		console.log("getPlayerRoundDetail() -- 2:" + player + " === " + records.join(","));
		
		return this._getPlayerDetail(player, records);
	},
	
	getPlayHighestDetail: function() {
		var player = Blockchain.transaction.from;
		return this.highest_socre_records.get(player);
	},
};

module.exports = ChallengeContract;