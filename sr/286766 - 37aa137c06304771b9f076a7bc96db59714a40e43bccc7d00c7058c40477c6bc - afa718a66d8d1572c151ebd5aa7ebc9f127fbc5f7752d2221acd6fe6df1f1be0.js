"use strict";

const VehicleInformation = function (payload) {
    this.payload = payload;
};

VehicleInformation.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

const VehicleInformationContract = function () {
    LocalContractStorage.defineMapProperty(this, "vehicleInformations");
};

VehicleInformationContract.prototype = {
    init: function () {
        //TODO:
    },
    add: function (text) {
        const obj = text ? JSON.parse(text) : {};
        if (!obj.vin) {
            throw new Error("Vin is required");
        }
        this.vehicleInformations[obj.vin] = this.vehicleInformations[obj.vin] || [];
        this.vehicleInformations[obj.vin].push(new VehicleInformation(obj));
    },

    get: function (vin) {
        return JSON.stringify(this.vehicleInformations[vin]);
    },

    getByWallet: function (wallet) {
        wallet = wallet || Blockchain.transaction.from;
        let vehicleInformationIds = this.vehicleInformations.get(wallet);
        if (!vehicleInformationIds) {
            throw new Error(`Wallet = ${vehicleInformationIds} does not have any tasks `);
        }

        let result = [];
        for (const id of vehicleInformationIds) {
            let info = this.vehicleInformations.get(id);
            if (info) {
                result.push(info);
            }
        }
        return result;
    }
};

module.exports = VehicleInformationContract;