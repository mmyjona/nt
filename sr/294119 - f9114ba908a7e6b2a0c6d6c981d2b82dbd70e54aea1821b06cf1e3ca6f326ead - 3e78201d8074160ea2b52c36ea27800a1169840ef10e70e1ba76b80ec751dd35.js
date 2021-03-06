"use strict";

var Guess = function () {
    LocalContractStorage.defineProperty(this, "nas");
};

Guess.prototype = {
    init: function () {
        this.nas = 0;
    },
    guess: function () {
        var from = Blockchain.transaction.from;
        var value = Blockchain.transaction.value;
        // if(this.nas < value * 10){
        //     throw new Error('合约中余额不足无法完成竞猜，请减少竞猜额度。');
        // }
        var guessNum = parseInt((value+'').substr((value+'').length-1), 1);
        var rnd = Math.floor(Math.random() * 9 + 1);
        // if(guessNum === rnd){
        //     Blockchain.transfer(from, value*8.8);
        // }
        var result = Blockchain.transfer(from, value*0.9);
        if (!result) {
            throw new Error("transfer failed.");
        }
        Event.Trigger("transfer", {
            Transfer: {
                from: Blockchain.transaction.to,
                to: from,
                value: value*0.9
            }
        });
    },
    donate: function () {
        var from = Blockchain.transaction.from;
        var value = Blockchain.transaction.value;
        this.nas += value;
    }
};
module.exports = Guess;