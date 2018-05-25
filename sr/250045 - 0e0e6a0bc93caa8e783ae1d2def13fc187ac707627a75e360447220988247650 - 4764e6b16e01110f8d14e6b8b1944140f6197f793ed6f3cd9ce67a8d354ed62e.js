"use strict";

// Better NRC-20 template.

// First, let's define some basic configuration for token, which will be used in code below.
var tokenConfig = {
  "name": { // Setting up default values for token name
    "value": "Default Token", // Token name value.
    "minLength": 2, // Minimum length.
    "maxLength": 128 // Maximum length.
  },
  "symbol": { // Setting up default values for token symbol
    "value": "DEFAULT", // Token symbol value.
    "minLength": 1, // Minimum length.
    "maxLength": 16 // Maximum length.
  },
  "decimals": {
    "value": 12, // 12 should be enough for most cases. You might want decrease it to 6, if you are issuing a lot of tokens.
    "minimum": 0,
    "maximum": 18
  },
  "description": { // Setting up default values for token description. Do not forget to put important key words here for better indexing! Description should be text only.
    "value": "The description should help the end user to decide, whether your application is suitable for her. You can use <b>HTML</b> for better user experience too.",
    "minLength": 16, // Minimum length for description, it should be meaningfull...
    "maxLength": 4096 // Maximum length for description
  },
  "help": { // Setting up default values for token help information.
    "value": "Here you can also use some <b>HTML</b>, even you can put some inline images, like this: <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAg5JREFUeNrEV4uNgzAMpegGyAgZgQ3KBscIjMAGx03QEdqbgG5AOwG3AWwAnSCXqLZkuUkwhfYsvaLm5xc7sZ1dIhdtUVjsLZRFTvp+LSaLq8UZ/s+KMSbZCcY5RV9E4QQKHG7QtgeCGv4PFt8WpzkCcztu3TiL0eJgkQmsVFn0MK+LzYkRKEGpG1GDyZdKRdaolhAoJewXnJsO1jtKCFDlChZAFxyJj2PnBRU20KZg7oMlOAENijpi8hwmGkKkZW2GzONtVLA/DxHAhTO2I7MCVBSQ6nGDlEBJDhyVYiUBHXBxzQm0wE4FzPYsGs856dA9SAAP2oENzFYqR6iAFQpHIAUzO/nxnOgthF/lM3w/3U8KYXTwxG/1IgIulF+wPQUXDMl75UoJZIHstRWpaGb8IGYqwBoKlG/lgpzoUEBoj50p8QtVrmHgaaXyC/H3BFC+e9kGFlCB0CtBF7FifQ8D9zjQQHj0pdOM3F1pUBoFKdxtqkMClScHJCSDlSxhHSNRT5K+FaZnHglrz+AGoxZLKNLYH6s3CkkuyJlp58wviZ4PuSCWDXl5hmjZtxcSCGbDUD3gK7EMOZBLCETrgVBF5K0lI5bIZ0wfrYh8NWHIAiNTPHpuTOKpCes1VTFaiNaFdGwPfdmaqlj6LmjJbgoSSfUW74K3voz+/W0oIeB7HWu2s+dfx3N+eLX8CTAAwUmKjK/dHS4AAAAASUVORK5CYII=\">.<br>All instructions, the user might need for interacting with your application must be provided here.", // String, representing the page with information on how to use your application.
    "maxLength": 1048576 // Maximum length for help, including images.
  },
  "tags": { // Setting up default token tags for search availability.
    "value": ["your", "tags", "here"],
    "maxLength": 64, // What is the maximum tag length in characters
    "maxCount": 8 // How many tags you can add at most.
  },
  "userInterface": { // Setting up default values for smart-contract interface.
    "value": "Here you can also use some <b>HTML</b>, even you can put some inline images, like this: <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAg5JREFUeNrEV4uNgzAMpegGyAgZgQ3KBscIjMAGx03QEdqbgG5AOwG3AWwAnSCXqLZkuUkwhfYsvaLm5xc7sZ1dIhdtUVjsLZRFTvp+LSaLq8UZ/s+KMSbZCcY5RV9E4QQKHG7QtgeCGv4PFt8WpzkCcztu3TiL0eJgkQmsVFn0MK+LzYkRKEGpG1GDyZdKRdaolhAoJewXnJsO1jtKCFDlChZAFxyJj2PnBRU20KZg7oMlOAENijpi8hwmGkKkZW2GzONtVLA/DxHAhTO2I7MCVBSQ6nGDlEBJDhyVYiUBHXBxzQm0wE4FzPYsGs856dA9SAAP2oENzFYqR6iAFQpHIAUzO/nxnOgthF/lM3w/3U8KYXTwxG/1IgIulF+wPQUXDMl75UoJZIHstRWpaGb8IGYqwBoKlG/lgpzoUEBoj50p8QtVrmHgaaXyC/H3BFC+e9kGFlCB0CtBF7FifQ8D9zjQQHj0pdOM3F1pUBoFKdxtqkMClScHJCSDlSxhHSNRT5K+FaZnHglrz+AGoxZLKNLYH6s3CkkuyJlp58wviZ4PuSCWDXl5hmjZtxcSCGbDUD3gK7EMOZBLCETrgVBF5K0lI5bIZ0wfrYh8NWHIAiNTPHpuTOKpCes1VTFaiNaFdGwPfdmaqlj6LmjJbgoSSfUW74K3voz+/W0oIeB7HWu2s+dfx3N+eLX8CTAAwUmKjK/dHS4AAAAASUVORK5CYII=\">.<br>All instructions, the user might need for interacting with your application must be provided here.", // String, representing the page with information on how to use your application.
    "maxLength": 4194304 // Maximum length for help, including images.
  },
};

var otherConfig = {
  "allowanceSymbol": "|" // Symbol to use when delimeting allowance addresses. You probably don't want to change it.
};

var StandardToken = function () {
  // We will use convenient method of maping keys and collection of the keys to app properties.
  // We can achieve more flexibility, by using LocalContractStorage methods 'get', 'set', 'del'.

  // Here we define keys, we can access in functions by calling "this._owner" for "_owner" key. Think about it as variables.
  LocalContractStorage.defineProperties(this, {
     // Name of the token. We implement limitation on it, so it will be not longer, than 128 characters, pretty long name, huh?
    "_name": {
      // If we want to do some preprocessing, postprocessing or validation checks, then we have to create two functions.
      // "parse" is a postprocessing function, it receives raw string value from LocalContractStorage.
      // As name is also string, we do not need any postprocessing.
      parse: function (value) {
        return value;
      },
      // "stringify" is preprocessing function, it receives javascript object, number, string, whatever is provided by user when calling the contract.
      // We want to do some checks, before writing it to blockchain.
      stringify: function (valueString) {
        // Make sure, we received a string...
        if (typeof (valueString) !== "string"){
          throw new Error("Token name must be a String");
        }
        // Also we want to make sure, that string is not greater, than given length.
        else if (valueString.length > tokenConfig.name.maxLength){
          throw new Error("Token name should not exceed " + tokenConfig.name.maxLength + " characters");
        }
        // Or not smaller than minimal...
        else if (valueString.length < tokenConfig.name.minLength){
          throw new Error("Token name should be larger than " + tokenConfig.name.minLength + " characters");
        }
        // If everything is OK, just return the string.
        else {
          return valueString;
        }
      }
    },
    // Token short symbol, you know symbols BTC, ETH, NEO... Why not create your own? Everything is similar to the "_name" property, as both are strings.
    "_symbol": {
      parse: function (value) {
        return value;
      },
      stringify: function (valueString) {
        if (typeof (valueString) !== "string"){
          throw new Error("Token symbol must be a String");
        }
        else if (valueString.length < tokenConfig.symbol.minLength){
          throw new Error("Token symbol should be larger than " + tokenConfig.symbol.maxLength + " characters");
        }
        else if (valueString.length > tokenConfig.symbol.maxLength){
          throw new Error("Token symbol should not exceed " + tokenConfig.symbol.maxLength + " characters");
        }
        else {
          return valueString;
        }
      }
    },
    // Token description. Will be indexed by search engines and application marketplaces.
    "_description": {
      parse: function (value) {
        return value;
      },
      stringify: function (valueString) {
        if (typeof (valueString) !== "string"){
          throw new Error("Description must be a String");
        }
        else if (valueString.length < tokenConfig.description.minLength){
          throw new Error("Description should be more than " + tokenConfig.description.minLength + " characters");
        }
        else if (valueString.length > tokenConfig.description.maxLength){
          throw new Error("Description should be smaller than " + tokenConfig.description.maxLength + " characters");
        }
        else {
          return valueString;
        }
      }
    },
    // Token user help information. It shouldn't be indexed, and can be show as a special page in application interface. It can be emplty, though.
    "_help": {
      parse: function (value) {
        return value;
      },
      stringify: function (valueString) {
        if (typeof (valueString) !== "string"){
          throw new Error("Help instructions must be a String");
        }
        else if (valueString.length > tokenConfig.help.maxLength){
          throw new Error("Help instructions should be smaller than " + tokenConfig.help.maxLength + " characters");
        }
        else {
          return valueString;
        }
      }
    },
    // Token user interface, to use within core application.
    "_userInterface": {
      parse: function (value) {
        return value;
      },
      stringify: function (valueString) {
        if (typeof (valueString) !== "string"){
          throw new Error("User interface must be a String");
        }
        else if (valueString.length > tokenConfig.userInterface.maxLength){
          throw new Error("User interface must be smaller than " + tokenConfig.userInterface.maxLength + " characters");
        }
        else {
          return valueString;
        }
      }
    },

    // By default, JSON.parse and JSON.stringify are used for returning data.
    // Tags must be array of strings, so we need to define custom descriptors. If validation would not be required, we could just define the propery like '_tags': null, and it will work.
    "_tags": {
      // We just parse stored value and return it.
      parse: function (stringifiedArray) {
        return JSON.parse(stringifiedArray);
      },
      // User must send array of strings, after checking we serialize them to store in blockchain
      stringify: function (arrayOfStrings) {
        if (!Array.isArray(arrayOfStrings)){
          throw new Error("Tags should be provided as array");
        }
        else if (arrayOfStrings.length > tokenConfig.tags.maxCount){
          throw new Error("There must be less than " + tokenConfig.tags.maxCount + " tags");
        }

        for (var arrayIndex = 0; arrayIndex !== arrayOfStrings.length; arrayIndex++){
          if (typeof (arrayOfStrings[arrayIndex]) !== "string"){
            throw new Error("All provided tags must be strings");
          }
          else if (arrayOfStrings[arrayIndex].length > tokenConfig.tags.maxLength){
            throw new Error("Each tag lentgh should be smaller than " + tokenConfig.tags.maxLength + " characters");
          }
        }

        // All sanity checks done here... Just serialize data.
        return JSON.stringify(arrayOfStrings);
      }
    },

    // For decimals, we can guarantee, that they will be a number. So we can store this value as an integer.
    "_decimals": {
      parse: function (storedIntegerString) {
        return new BigNumber(storedIntegerString);
      },
      stringify: function (receivedInteger) {
        let number = new BigNumber(receivedInteger);
        // Check that value is Integer, as it must be.
        if (!number.isInteger()){
          throw new Error("Decimals must be specified as Integer number");
        }
        // It must be non-negative.
        else if (number.lt(0)){
          throw new Error("Decimals must be non-negative");
        }
        else {
          // Just store it in database as String.
          return number.toString(10);
        }
      }
    },

    // Total Supply can be a very large number, so we must use BigNumber to work with it.
    "_totalSupply": {
      parse: function (numberString) {
        return new BigNumber(numberString);
      },
      stringify: function (bigNumberObject) {
        return bigNumberObject.toString(10);
      }
    },

    // Contract has an owner, who is able to update some contract settings.
    "_owner": {
      // Owner address is stored as String, so no need to do anything.
      parse: function (storedAddress) {
        return storedAddress;
      },
      // Owner should be valid blockchain address, we have a special method for checking this.
      stringify: function (newAddress) {
        if (Blockchain.verifyAddress(newAddress)){
          return newAddress;
        }
        else {
          throw new Error("Owner should be valid wallet address");
        }
      }
    },

    // We store transaction hash value, so it can be provided to everyone, who is interested to see source code
    "_hash": null // No checks necessary here
  });

  // Now we are using defineMapProperties to set up key-value pairs, we can access them by calling "this.balances.set(key, value)" and "this.balances.get(key)" for "balances" key set here.
  LocalContractStorage.defineMapProperties(this, {
    // Here we store amount of tokens, the user has on his address.
    "balances": {
      parse: function (numberString) {
        return new BigNumber(numberString);
      },
      stringify: function (bigNumberObject) {
        return bigNumberObject.toString(10);
      }
    },
    // Here we store amount of tokens, the user has allowed to other user to spend on his behalf.
    "allowed": {
      parse: function (numberString) {
        return new BigNumber(numberString);
      },
      stringify: function (bigNumberObject) {
        return bigNumberObject.toString(10);
      }
    }
  });

  // Non-standart properties for this particulare contract implementation. MUST be removed when publishing NRC-20 standart.

  LocalContractStorage.defineProperties(this, {
    // Administrator is a person, who can update contract dynamic data (prices), but is not an owner.
    "_admin": {
      parse: function (storedAddress) {
        return storedAddress;
      },
      stringify: function (newAddress) {
        if (Blockchain.verifyAddress(newAddress)){
          return newAddress;
        }
        else {
          throw new Error("Admin should be valid wallet address");
        }
      }
    },

    // fees
    "_depositFee": { // Fee for buying GOLD (depositing NAS). It should be a share, from 0 to 1, rounded to 5 decimals
      parse: function (storedNumberString) {
        return new BigNumber(storedNumberString);
      },
      stringify: function (receivedNumber) {
        let number = new BigNumber(receivedNumber);
        if (number.isNaN()){
          throw new Error("Deposit fee must be specified as number");
        }
        else if (number.lt(0) || number.gt(1)){
          throw new Error("Deposit fee value should be between 0 and 1");
        }
        else {
          return number.toString(10);
        }
      }
    },
    "_withdrawalFee": {  // Fee for selling GOLD (withdrawing NAS). It should be a share, from 0 to 1, rounded to 5 decimals
      parse: function (storedNumberString) {
        return new BigNumber(storedNumberString);
      },
      stringify: function (receivedNumber) {
        let number = new BigNumber(receivedNumber);
        if (number.isNaN()){
          throw new Error("Withdrawal fee must be specified as number");
        }
        else if (number.lt(0) || number.gt(1)){
          throw new Error("Withdrawal fee value should be between 0 and 1");
        }
        else {
          return number.toString(10);
        }
      }
    },
    "_holidayFee": {  // Fee for operations on holidays (or when no fresh market prices are available). It should be a share, from 0 to 1, rounded to 5 decimals
      parse: function (storedNumberString) {
        return new BigNumber(storedNumberString);
      },
      stringify: function (receivedNumber) {
        let number = new BigNumber(receivedNumber);
        if (number.isNaN()){
          throw new Error("Holiday fee must be specified as number");
        }
        else if (number.lt(0) || number.gt(1)){
          throw new Error("Holiday fee value should be between 0 and 1");
        }
        else {
          return number.toString(10);
        }
      }
    },
    "_isHoliday": {  // This flag determines, whether we have fresh market price from reliable source (should be false), or not (should be true). Boolean.
      parse: function (storedBooleanString) {
        return storedBooleanString === "1";
      },
      stringify: function (receivedBoolean) {
        if (
          receivedBoolean === "false" ||
          receivedBoolean === "no" ||
          receivedBoolean === "0" ||
          receivedBoolean === undefined ||
          receivedBoolean === null || 
          receivedBoolean === false || 
          receivedBoolean === 0
        ){
          return "0";
        }
        else {
          return "1";
        }
      }
    },
    "_isClosed": {  // This flag determines, whether we are processing transactions, or no. Boolean.
      parse: function (storedBooleanString) {
        return storedBooleanString === "1";
      },
      stringify: function (receivedBoolean) {
        if (
          receivedBoolean === "false" ||
          receivedBoolean === "no" ||
          receivedBoolean === "0" ||
          receivedBoolean === undefined ||
          receivedBoolean === null || 
          receivedBoolean === false || 
          receivedBoolean === 0
        ){
          return "0";
        }
        else {
          return "1";
        }
      }
    },
    
    
    // commodity prices in USD
    "goldPrice": { // Gold price in USD per 1 gramm, we can just store it
      parse: function (storedNumberString) {
        return new BigNumber(storedNumberString);
      },
      stringify: function (receivedNumber) {
        let number = new BigNumber(receivedNumber);
        if (number.isNaN()){
          throw new Error("Gold price must be number");
        }
        else if (number.lt(0) || number.gt(1000000)){
          throw new Error("Please provide gold price in United States Dollars");
        }
        else {
          return number.toString(10);
        }
      }
    },
    "goldPriceUpdatedBlock": null,
    // NAS token price in usd price as integer
    "nasPrice": {
      parse: function (storedNumberString) {
        return new BigNumber(storedNumberString);
      },
      stringify: function (receivedNumber) {
        let number = new BigNumber(receivedNumber);
        if (number.isNaN()){
          throw new Error("NAS token price must be number");
        }
        else if (number.lt(0) || number.gt(1000000)){
          throw new Error("Please provide NAS token price in United States Dollars");
        }
        else {
          return number.toString(10);
        }
      }
    },
    "nasPriceUpdatedBlock": null,
    
    // Caching values for buy and sell 
    "buyPrice": { // How much NAS a user should send to buy 1 token.
      parse: function (storedNumberString) {
        return new BigNumber(storedNumberString);
      },
      stringify: function (receivedNumber) {
        return number.toString(10);
      }
    },
    "sellPrice": { // How much NAS a user will receiveif he sells 1 token.
      parse: function (storedNumberString) {
        return new BigNumber(storedNumberString);
      },
      stringify: function (receivedNumber) {
        return number.toString(10);
      }
    },
    "pricesRecalculatedBlock": null,
    
    // Bookkeeping of earned fees.
    // totalEarnings counts all fees, paid by customers in NAS native tokens.
    "_totalEarnings": {
      parse: function (numberString) {
        return new BigNumber(numberString);
      },
      stringify: function (bigNumberObject) {
        return bigNumberObject.toString(10);
      }
    },
    // contractAssets is an amount of NAS, the contract has right now. Unfortunately, there is no method for smartcontract, to retrieve it right now, i will have to upload the number manually.
    // It must be non-negative, actually...
    "_contractBalance": {
      parse: function (numberString) {
        return new BigNumber(numberString);
      },
      stringify: function (bigNumberObject) {
        if (bigNumberObject.lt(0)){
          throw new Error("Contract balance must be non-negative!");
        }
        else {
          return bigNumberObject.toString(10);
        }
      }
    },
    
  });
};

// Implementing standart NRC-20 methods.

StandardToken.prototype = {
  // This is the most important method, which is called once during contract creation.
  // The person, who send the transaction automatically becomes contract owner, who can update some contract settings.
  init: function (name, symbol, decimals, totalSupply, description, help, tags, userInterface) {
    // Setting contract creator as contract owner
    var contractCreator = Blockchain.transaction.from;
    this._owner = contractCreator;

    // Saving contract transaction for future reference.
    var contractTransaction = Blockchain.transaction.hash;
    this._hash = contractTransaction;

    // Setting name, if passed, otherwise use default value
    this._name = name || tokenConfig.name.value;

    // Setting symbol, if passed, otherwise use default value
    this._symbol = symbol || tokenConfig.symbol.value;
    
    // Setting decimals, if passed, otherwise use default value
    this._decimals = new BigNumber(decimals || tokenConfig.decimals.value);

    // Setting totalSupply... it should be defined together with decimals, otherwise we set totalSupply to 0, it is dynamic.
    if (
      !Number.isInteger(decimals) || // If decimals are not an integer
      decimals < tokenConfig.decimals.minimum || // or less than minimum
      decimals > tokenConfig.decimals.maximum || // or greater then maximum.
      !totalSupply // Or totalSupply is not provided
    ){
      this._totalSupply = new BigNumber(0);
    }
    // Otherwise, we store total supply with the necessary precision.
    else {
      var checkTotalSupply = new BigNumber(totalSupply);
      if (checkTotalSupply.lt(0)){
        throw new Error("Total token supply must be non-negative");
      }
      this._totalSupply = checkTotalSupply.mul(new BigNumber(10).pow(decimals));
    }

    // Now we are giving all issued tokens to contract creator.
    this.balances.set(contractCreator, this._totalSupply);

    // Setting additional text fields, if any.
    // Tags for sear
    this._tags = tags || tokenConfig.tags.value;
    this._description = description || tokenConfig.description.value;
    this._help = help || tokenConfig.help.value;
    this._userInterface = userInterface || tokenConfig.userInterface.value;
    
    // And we must notify everyone about it.
    this._notify("transfer", {
      "from": contractCreator,
      "to": contractCreator,
      "value": this._totalSupply
    });

    // And we must notify everyone about it.
    this._notify("contract", {
      "owner": this._owner,
      "hash": this._hash,
      "name": this._name,
      "symbol": this._symbol,
      "tags": this._tags,
      "decimals": this._decimals.toString(10),
      "totalSupply": this._totalSupply.toString(10),
      "description": this._description,
      "help": this._help,
      "userInterface": this._userInterface
    });
  },

  // Check owner of contract. This method starts from '_', so it is private in Nebulas. So you can use in any methods 'this._isOwner()' to check, whether this request comes from contract owner.
  _isOwner: function (){
    // We use transaction property, to determine, which address sent the request.
    var senderAddress = Blockchain.transaction.from;
    var owner = this._owner;
    if (owner === senderAddress){
      return true;
    }
    else {
      return false;
    }
  },

  // Notify everyone, that something happened in your smart contract.
  _notify: function (eventType, eventData){
    var eventObject = {};
    eventObject.type = eventType;
    eventObject[eventType] = eventData;
    return Event.Trigger(this._hash, eventObject);
  },


  // Some common getters methods.


  // Returns hash of transaction, which created smart-contract
  hash: function () {
    return this._hash;
  },

  // Returns the name of the token String
  name: function () {
    return this._name;
  },

  // Returns the symbol of the token String
  symbol: function () {
    return this._symbol;
  },

  // Returns the description of the token String with HTML
  description: function () {
    return this._description;
  },

  // Returns the help information about the token String with HTML and embedded data
  help: function () {
    return this._help;
  },

  // Returns token tags Array of Strings
  tags: function () {
    return this._tags;
  },
  
  // Returns user Interface, to embed into Core application
  userInterface: function () {
    return this._userInterface;
  },

  // Returns all static token data for convenience
  tokenData: function () {
    return {
      "name": this._name,
      "symbol": this._symbol,
      "hash": this._hash,
      "decimals": this._decimals.toString(10),
      "totalSupply": this._totalSupply.toString(10)
    };
  },
  
  // Returns all possibly long strings for token
  tokenStrings: function () {
    return {
      "description": this._description,
      "help": this._help,
      "tags": this._tags,
      "userInterface": this._userInterface
    };
  },

  // Returns the number of decimals the token uses. Positive Integer
  decimals: function () {
    return this._decimals.toString(10);
  },

  // Returns total supply BigNumber string
  totalSupply: function () {
    return this._totalSupply.toString(10);
  },

  // Returns balance on given wallet. BigNumber string
  balanceOf: function (walletAddress) {
    // You can check any wallet online.
    if (walletAddress && !Blockchain.verifyAddress(walletAddress)){
      throw new Error("Specified wallet address is not valid");
    }

    // If not wallet specified, we will return requester balance...
    var walletToCheck = walletAddress || Blockchain.transaction.from;
    var balance = this.balances.get(walletToCheck) || new BigNumber(0);
    return balance.toString(10);
  },

  // Returns allowance limit. How much Owner allowed to Spender BigNumber string
  allowance: function (senderAddress, spenderAddress) {
    if (!Blockchain.verifyAddress(senderAddress)){
      throw new Error("Sender address is not valid");
    }
    else if (!Blockchain.verifyAddress(spenderAddress)){
      throw new Error("Spender address is not valid");
    }

    // This is spender allowance on sender balance. How much tokens SENDER allows to send by SPENDER request.
    var allowanceString = senderAddress + otherConfig.allowanceSymbol + spenderAddress;
    var allowedBalance = this.allowed.get(allowanceString) || new BigNumber(0);
    return allowedBalance.toString(10);
  },

  // User functions, which can be invoked by calling.

  // Transfer tokens to other wallet.
  transfer: function (receiverAddress, tokensAmount) {
    // First of all, we check, that address is valid.
    if (!Blockchain.verifyAddress(receiverAddress)){
      throw new Error("Receiver address is not valid");
    }

    // We work with potentially huge numbers using BigNumber.
    var value = new BigNumber(tokensAmount);

    // Check for non-negative.
    if (value.lt(0)) {
      throw new Error("Negative transfer values are not allowed");
    }

    // Check for enough token balance on senders wallet
    var senderAddress = Blockchain.transaction.from;
    var senderBalance = this.balances.get(senderAddress) || new BigNumber(0);

    // Is there enough funds for transfer?
    if (senderBalance.lt(value)) {
      throw new Error("Insufficient balance");
    }

    // Decreasing senders balance and increasing receivers balance.
    this.balances.set(senderAddress, senderBalance.sub(value));

    // Getting receivers balance... We must do it after balance decrease, otherwise transfers to same wallet will work incorrectly.
    var receiverBalance = this.balances.get(receiverAddress) || new BigNumber(0);
    this.balances.set(receiverAddress, receiverBalance.add(value));

    this._notify("transfer", {
      "from": senderAddress,
      "to": receiverAddress,
      "value": value
    });
  },

  // Transfer tokens on behalf of someone else, who allowed us to transfer.
  transferFrom: function (senderAddress, receiverAddress, tokensAmount) {
    // First of all, we want to make sure, that we received valid addresses, to mitigate any possible attacks.
    if (!Blockchain.verifyAddress(senderAddress)){
      throw new Error("Sender address is not valid");
    }
    else if (!Blockchain.verifyAddress(receiverAddress)){
      throw new Error("Receiver address is not valid");
    }

    // We work with potentially huge numbers using BigNumber.
    var value = new BigNumber(tokensAmount);

    // This is the spender address.
    var spenderAddress = Blockchain.transaction.from;

    // This is sender balance.
    var senderBalance = this.balances.get(senderAddress) || new BigNumber(0);

    // This is spender allowance on sender balance. How much tokens SENDER allows to send by SPENDER request.
    var allowanceString = senderAddress + otherConfig.allowanceSymbol + spenderAddress;

    var allowedBalance = this.allowed.get(allowanceString) || new BigNumber(0);

    if (value.lt(0)){ // Transfer must be non-negative
      throw new Error("Transfer value must be non-negative");
    }
    else if (allowedBalance.lt(value)){ // Allowance is enough
      throw new Error("Spender allowance is not enough");
    }
    else if (senderBalance.lt(value)){ // Sender has enough funds
      throw new Error("Sender balance is not enough");
    }
    else { // No errors here!
      // Decreasing senders balance and increasing receivers balance, decreasing spender allowance.
      this.balances.set(senderAddress, senderBalance.sub(value));
      this.allowed.set(allowanceString, allowedBalance.sub(value));

      // Retrieve receivers balance
      var receiverBalance = this.balances.get(receiverAddress) || new BigNumber(0);
      // increasing receivers balance
      this.balances.set(receiverAddress, receiverBalance.add(value));

      this._notify("transfer", {
        "from": senderAddress,
        "to": receiverAddress,
        "spender": spenderAddress,
        "value": value
      });
    }
  },

  // Set allowance limit for Spender. For security reasons, you always must provide previous value of allowance, which can be requested via 'allowance' method.
  approve: function (spenderAddress, previousValue, newValue) {
    var senderAddress = Blockchain.transaction.from;

    if (!Blockchain.verifyAddress(spenderAddress)){
      throw new Error("Spender address is not valid");
    } else if (spenderAddress === senderAddress){
      throw new Error("You cannot approve your own spending");
    }

    // We check provided value and the one we have on blockchaih for equality, they must match.
    var previousStoredValue = new BigNumber(this.allowance(senderAddress, spenderAddress));
    var previousReceivedValue = new BigNumber(previousValue);
    if (previousStoredValue.comparedTo(previousReceivedValue) !== 0) {
      throw new Error("Please provide valid current value of allowance");
    }

    // Now we must not allow larger to set larger allowance, then current user balance.
    var senderBalance = new BigNumber(this.balanceOf(senderAddress));
    var value = new BigNumber(newValue);
    if (value.lt(0)){ // Transfer must be non-negative
      throw new Error("Allowance value must be non-negative");
    }
    else if (senderBalance.lt(value)){ // Sender must have enough money
      throw new Error("Sender balance should be more than allowance");
    }
    else { // No errors here!
      // Finally, we are saving allowance
      var allowanceString = senderAddress + otherConfig.allowanceSymbol + spenderAddress;
      var allowedBalance = this.allowed.set(allowanceString, value);

      this._notify("approve", {
        "owner": senderAddress,
        "spender": spenderAddress,
        "value": value
      });
    }
  },

  // Contract owner can make some changes to contract configuration, calling this method.
  edit: function (settingsObject){
    if (!this._isOwner()){
      throw new Error("Only " + this._owner + " can make changes to contract configuration");
    }
    else if (typeof (settingsObject) !== "object"){
      throw new Error("Please provide settings object with key-value pairs for settings to change");
    }

    for (var setting in settingsObject){
      var newValue = settingsObject[setting];
      var previousValue = null;

      if (setting === "name"){
        previousValue = this._name;
        this._name = newValue || "";
      }
      else if (setting === "symbol"){
        previousValue = this._symbol;
        this._symbol = newValue || "";
      }
      else if (setting === "description"){
        previousValue = this._description;
        this._description = newValue || "";
      }
      else if (setting === "help"){
        previousValue = this._help;
        this._help = newValue || "";
      }
      else if (setting === "userInterface"){
        previousValue = this._userInterface;
        this._userInterface = newValue || "";
      }
      else if (setting === "tags"){
        previousValue = this._tags;
        this._tags = newValue || [];
      }
      else if (setting === "owner"){
        previousValue = this._owner;
        this._owner = newValue || "";
      }
      else {
        throw new Error("Unknown setting value \"" + setting + "\"");
      }

      this._notify("config", {
        "setting": setting,
        "previousValue": previousValue,
        "value": newValue
      });
    }
  }
};

// My Custom methods. MUST be removed from NRC-20 standart

// Check admin of contract.
StandardToken.prototype._isAdmin = function (){
  var senderAddress = Blockchain.transaction.from;
  var admin = this._admin;
  if (admin === senderAddress){
    return true;
  }
  else {
    return false;
  }
};

// Change contract settings.
StandardToken.prototype.config = function (settingsObject){
  if (!this._isOwner()){
    throw new Error("Only " + this._owner + " can make changes to configuration");
  } else if (typeof (settingsObject) !== "object"){
    throw new Error("Please provide settings object with key-value pairs for settings to change");
  }

  for (var setting in settingsObject){
    var newValue = settingsObject[setting];
    var previousValue = null;

    if (setting === "admin"){
      previousValue = this._admin;
      this._admin = newValue || "";
    }
    else if (setting === "depositFee"){
      previousValue = this._depositFee;
      this._depositFee = newValue || 0;
    }
    else if (setting === "withdrawalFee"){
      previousValue = this._withdrawalFee;
      this._withdrawalFee = newValue || 0;
    }
    else if (setting === "holidayFee"){
      previousValue = this._holidayFee;
      this._holidayFee = newValue || 0;
    }
    else if (dataItem === "isClosed"){
      previousValue = this._isClosed;
      this._isClosed = newValue;
    }
    else {
      throw new Error("Unknown setting value \"" + setting + "\"");
    }

    this._notify("config", {
      "setting": setting,
      "previousValue": previousValue,
      "value": newValue
    });
  }
};

// Change data values
StandardToken.prototype.update = function (dataObject){

  if (!this._isOwner() && !this._isAdmin()){
    throw new Error("Only " + this._owner + " or " + this._admin + " can update data");
  } else if (typeof (dataObject) !== "object"){
    throw new Error("Please provide data object with key-value pairs for data to update");
  }

  for (var dataItem in dataObject){
    var newValue = dataObject[dataItem];
    var previousValue = null;

    if (dataItem === "goldPrice"){ // Can be provided with decimals, we will save 5 decimals.
      previousValue = this.goldPrice;
      this.goldPrice = newValue;
      this.goldPriceUpdatedBlock = Blockchain.block.height;
    }
    else if (dataItem === "nasPrice"){ // Can be provided with decimals, we will save 9 decimals.
      previousValue = this.nasPrice;
      this.nasPrice = newValue;
      this.nasPriceUpdatedBlock = Blockchain.block.height;
    }
    else if (dataItem === "contractBalance"){
      previousValue = this._contractBalance;
      this._contractBalance = newValue;
    }
    else if (dataItem === "isHoliday"){ // Should be 0 or 1
      previousValue = this._isHoliday;
      this._isHoliday = newValue;
    }
    else {
      throw new Error("Unknown data value \"" + dataItem + "\"");
    }
    
    this.recalculatePrices();
    
    this._notify("update", {
      "data": dataItem,
      "previousValue": previousValue,
      "value": newValue
    });
  }
};

StandardToken.prototype.recalculatePrices = function () {
  
  // Here we must recalculate the new buy and sell price for clients, taking into consideration bunch of numbers.
  // this._totalSupply BigNumber - This is how much tokens we issued. One token is 1 gramm of gold.
  // this._decimals BigNumber - This is how much zeroes must be removed from totalSupply to get real amount of tokens.
  // this.goldPrice BigNumber - price of 1 gram of gold in US Dollars.
  // this.nasPrice BigNumber - price of 1 NAS native token in US Dollars.
  // this._contractBalance BigNumber - How much NAS smartcontract have available.
  // this._depositFee BigNumber - Fee for buying from us.
  // this._withdrawalFee BigNumber - Fee for selling to us
  // this._holidayFee BigNumber - Fee when it is holidays...
  
  // We need some conversions to BigNumber types...
  let numberTen = new BigNumber(10);
  
  // First, let's determine price of one gram of gold in NAS.
  let goldPriceNAS = this.goldPrice.div(this.nasPrice);
  // new BigNumber(this.nasPrice ? this.goldPrice / this.nasPrice : 1); // We just make it safer here, later we must check, that all prices were set, before writing final number.
  
  // Next, let's calculate, how much money we have, for buying out all the tokens. We should divide this._totalSupply by decimals and multiply by goldPriceNAS.
  let totalSupplyNAS = this._totalSupply.div(numberTen.pow(this._decimals)).mul(goldPriceNAS);
  
  // Now we need to know, if we have enough funds, to cover all issued tokens at current price...
  let supplyCoverage = this._contractBalance.div(totalSupplyNAS); // A number from 0 to ... If it is above 1, it is ok.
  // totalSupplyNAS.isZero() ? this._contractBalance.div(totalSupplyNAS) : 1;
  
  // Now we should calculate buy and sell price, i.e. deposit and withdraw NAS to our contract.
  // Buy price should be greater than fair price. We should increase it on 
  let buyPrice = goldPriceNAS.mul(this._depositFee.add(this._isHoliday ? this._holidayFee : 0).add(1));
  
  // Sell price should be less, than fairPrice
  // Also, in case we don't have enough funds for everyone, we reduce sell price to tha amount...
  let sellPrice = goldPriceNAS.mul(this._withdrawalFee.add(this._isHoliday ? this._holidayFee : 0).negated().add(1)).mul(supplyCoverage.lt(1) ? supplyCoverage : 1);
  
  // Now just save them into ourselves.
  this.buyPrice = buyPrice;
  this.sellPrice = sellPrice;
  this.pricesRecalculatedBlock = Blockchain.block.height;
  
  // That's all, probably.

};

// Return purchase fees
StandardToken.prototype.fees = function () {
  return {
    "depositFee": this._depositFee,
    "withdrawalFee": this._withdrawalFee,
    "holidayFee": this._holidayFee,
    "isHoliday": this._isHoliday
  };
};

// Return prices for gold and NAS native tokens.
StandardToken.prototype.prices = function () {
  
  return {
    "goldPrice": this.goldPrice,
    "goldPriceUpdatedBlocksAgo": Blockchain.block.height - this.goldPriceUpdatedBlock,
    "nasPrice": this.nasPrice,
    "nasPriceUpdatedBlocksAgo": Blockchain.block.height - this.nasPriceUpdatedBlock,
    "buyPrice": this.buyPrice,
    "sellPrice": this.sellPrice,
    "pricesUpdatedBlocksAgo": Blockchain.block.height - this.pricesRecalculatedBlock,
  };
};

module.exports = StandardToken;