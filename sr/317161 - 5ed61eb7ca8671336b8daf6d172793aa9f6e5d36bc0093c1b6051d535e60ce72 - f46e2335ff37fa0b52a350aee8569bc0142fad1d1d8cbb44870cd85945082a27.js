/**
 * Created by yinchensan on 2018/5/23.
 */
"use strict";

var FileVaultItem = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.author = obj.author;
        this.fileHash = obj.fileHash;
        this.signature = obj.signature;
        this.filename = obj.filename;
        this.date = obj.date;
        this.content = obj.content;
    } else {

        this.author = '';
        this.fileHash = '';
        this.signature = '';
        this.filename = '';
        this.date = '';
        this.content = '';
    }
};

FileVaultItem.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var FileVault = function () {
    LocalContractStorage.defineMapProperty(this, "fileVault", {
        parse: function (text) {
            return new FileVaultItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};
var ErrorMessage = function (errNo, errMsg) {
    if (!errNo || !errMsg) {
        this.errNo = 0;
        this.errMsg = 'succeed';
    } else {
        this.errNo = errNo;
        this.errMsg = errMsg;
    }
}
ErrorMessage.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
}

FileVault.prototype = {
    init: function () {
        // ignore
    },
    register: function (fileHash = '', filename = '', signature = '', content = '') {

        fileHash = fileHash.trim();
        signature = signature.trim();
        content = content.trim();
        filename = filename.trim();
        var date = new Date().getTime();

        if (fileHash == "") {
            throw new Error((new ErrorMessage(-1, "invalid file hash")).toString());

        }

        var item = this.fileVault.get(fileHash);
        if (item) {
            throw new Error((new ErrorMessage(1, "file hash been regsiter by " + JSON.stringify(item))).toString());
        }
        do {
            if (fileHash.length > 50) {
                throw new Error((new ErrorMessage(2, "file hash is too long")).toString());
            }
            if (content.length > 200) {
                throw new Error((new ErrorMessage(3, "content is too long")).toString());
            }
            if (signature.length > 50) {
                throw new Error((new ErrorMessage(4, "signature is too long")).toString());
            }
            if (filename.length > 100) {
                throw new Error((new ErrorMessage(5, "filename is too long")).toString());
            }
        } while (false);
        var from = Blockchain.transaction.from;
        item = new FileVaultItem();
        item.author = from;
        item.fileHash = fileHash;
        item.signature = signature;
        item.date = date;
        item.content = content;
        item.filename = filename;

        this.fileVault.put(fileHash, item);
    },
    search: function (fileHash = '') {
        fileHash = fileHash.trim();
        if (fileHash == "") {
            throw new Error((new ErrorMessage(-1, "invalid search file hash")).toString());
        }
        return this.fileVault.get(fileHash);
    }
}
module.exports = FileVault;