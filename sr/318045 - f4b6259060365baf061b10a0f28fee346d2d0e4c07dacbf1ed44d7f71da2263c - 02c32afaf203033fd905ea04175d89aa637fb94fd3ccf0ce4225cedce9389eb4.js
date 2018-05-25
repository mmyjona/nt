'use strict';var AnswerContract=function(){LocalContractStorage.defineMapProperty(this,"questionRandom");LocalContractStorage.defineMapProperty(this,"integral");LocalContractStorage.defineMapProperty(this,"startTimes");LocalContractStorage.defineMapProperty(this,"timeCost");LocalContractStorage.defineProperty(this,"questionBank");LocalContractStorage.defineProperty(this,"author");LocalContractStorage.defineProperty(this,"addrs")};function toNas(value){return new BigNumber(value).mul(1e-18)}function toWei(value){return new BigNumber(value).mul(1e+18).toNumber()}Array.prototype.contains=function(obj){var i=this.length;while(i--){if(this[i]===obj){return true}}return false};AnswerContract.prototype={init:function(){var from=Blockchain.transaction.from;this.author=from;this.questionBank=[];this.addrs=""},saveItemBank:function(questionStr){var from=Blockchain.transaction.from;if(from!=this.author){throw new Error("Unable to enter the question bank");}try{this.questionBank=questionStr}catch(e){throw new Error("json parse error.");}},sign:function(){var from=Blockchain.transaction.from;var value=new BigNumber(Blockchain.transaction.value);var user=this.questionRandom.get(from);if(user){throw new Error("Already participated in the current event."+from);}else{if(toNas(value).greaterThanOrEqualTo(1)){var lengths=this.questionBank.length;var arr=[];var numArr=[];for(;arr.length<10;){var num;do{num=Math.floor(Math.random()*lengths)}while(numArr.contains(num));var q=this.questionBank[num];var obj={num:num,question:q.Question,option:q.Option.split('%')};arr.push(obj);numArr.push(num)}this.questionRandom.put(from,arr);this.startTimes.put(from,Date.now());return from}else{throw new Error("Amount is less than the amount of the competition.");}}},getQ:function(){var from=Blockchain.transaction.from;return this.questionRandom.get(from)},submitAnswer:function(alist){var from=Blockchain.transaction.from;var sce=this.integral.get(from);if(!sce&&sce!=0){var time=this.startTimes.get(from);var timeCost=Date.now()-time;var allList=this.questionBank;var rdList=this.questionRandom.get(from);var score=0;rdList.forEach(function(q1){alist.forEach(function(q2){if(q1.num==q2.num&&q2.answer.toLowerCase()==allList[q1.num].Answer.toLowerCase()){score+=10}})});this.integral.put(from,score);this.timeCost.put(from,timeCost);this.addrs+=from+",";var addrArr=this.addrs.split(",");if(addrArr.length>10){var arr=[];for(var i=0;i<this.addrs.length;i++){if(addrArr[i]){var json={score:this.integral.get(from),cost:this.timeCost.get(from),addr:addrArr[i]};arr.push(json)}}arr.sort(function(obj1,obj2){if(obj1.score>obj1.score){return-1}else if(obj1.score==obj2.score){if(obj1.cost>=obj2.cost){return-1}else{return 1}}else{return 1}});var nasProp=[5,3,1.5];var result="Result";for(var i=0;i<proportion.length;i++){result=Blockchain.transfer(arr[i].addr,toWei(nasProp[i]))}for(var i=0;i<addrArr[i].length;i++){var tempAddr=addrArr[i];if(tempAddr){this.questionRandom.delete(tempAddr);this.integral.delete(tempAddr);this.startTimes.delete(tempAddr);this.timeCost.delete(tempAddr)}}this.addrs="";return score}return score}else{throw new Error("At present, the application has been completed and the answer can not be repeated.");}},query:function(){var from=Blockchain.transaction.from;return this.integral.get(from)},antiLock:function(value){var from=Blockchain.transaction.from;if(from==this.author){var result=Blockchain.transfer(from,value);return result}},queryAddrs:function(){return this.addrs}};module.exports=AnswerContract;