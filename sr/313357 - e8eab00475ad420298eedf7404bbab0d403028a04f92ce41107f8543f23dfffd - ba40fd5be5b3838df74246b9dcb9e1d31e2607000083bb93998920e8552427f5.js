var DecentralizedRNGContract = function() {
  // Data stored by the smart contract
  LocalContractStorage.defineMapProperty(this, "hash_to_rng") // Max, Number, Data, Date
}

DecentralizedRNGContract.prototype = {
  // init is called once, when the contract is deployed.
  init: function() { },

  requestNumber: function (max, data) {
    if(Blockchain.transaction.value != 0) { // Users only pay the gas fee.
        throw new Error("I don't want your money.");
    }
    if(isNaN(max) || max < 1) {
      throw new Error("max is not a number.");
    }
    
    var number = Math.floor(Math.random() * max);
    this.hash_to_rng.put(Blockchain.transaction.hash, {max, number, data, date: Date.now()});
  },

  getNumber: function (hash) {
    return this.hash_to_rng.get(hash);
  },
}

module.exports = DecentralizedRNGContract
