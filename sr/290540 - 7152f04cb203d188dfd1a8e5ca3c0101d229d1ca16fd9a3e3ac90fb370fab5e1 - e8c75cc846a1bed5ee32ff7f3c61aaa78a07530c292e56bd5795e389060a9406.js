"use strict";

var RankItem = function(text) {
    if (text) {
        var obj = JSON.parse(text);
		this.desc = obj.desc;
        this.name = obj.name;
        this.projectItems = obj.projectItems;
        this.voters = obj.voters;
        this.maxVoter = obj.maxVoter;
        this.vote = obj.vote;
	} else {
        this.desc = "";
        this.name = "";
		this.projectItems = "";        
		this.voters = "";        
		this.maxVoter = "";        
	    this.vote = "";
	}
};

RankItem.prototype = {
    toString: function () {
		return JSON.stringify(this);
	}
};

var ProjectItem = function(text) {
	if (text) {
		var obj = JSON.parse(text);
		this.key = obj.key;
		this.name = obj.name;
		this.desc = obj.desc;
		this.data = obj.data;
		this.author = obj.author;
	} else {
        this.key = "";
        this.name = "";
		this.desc = "";        
	    this.author = "";
	    this.data = "";
	}
};

ProjectItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var NofishRanking = function () {
    LocalContractStorage.defineMapProperty(this, "ProjectItemsMap", {
        parse: function (text) {
            return new ProjectItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
    LocalContractStorage.defineMapProperty(this, "RankItemsMap", {
        parse: function (text) {
            return new RankItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

NofishRanking.prototype = {

     /**
     * 是否是json对象
     * @param val
     * @returns {boolean}
     * @private
     */
    _isObject: function (val) {
        return val != null && typeof val === 'object' && Array.isArray(val) === false;
    },

    /**
     * json转数组
     * @param json
     * @returns {Array}
     * @private
     */
    _json2array: function (json) {
        var arr = [];
        if (this._isObject(json)) {
            for (var i in json) {
                arr[i] = json[i];
            }
        }
        return arr;
    },

    /**
     * 数组转json
     * @param arr
     * @private
     */
    _array2json: function (arr) {
        var json = {};
        if (Array.isArray(arr)) {
            for (var i in arr) {
                json[i] = arr[i];
            }
        }
        return json;
    },

    /**
     * 返回元素在数组中的索引
     * @param array
     * @param val
     * @returns {number}
     * @private
     */
    _indexOf: function (array, val) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] == val) return i;
        }
        return -1;
    },
    
    /**
     * 删除数组中的元素
     * @param array
     * @param val
     * @private
     */
    _remove: function (array, val) {
        var index = this._indexOf(array, val);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    },

    init: function () {
        LocalContractStorage.set("ProjectItems", {});
        LocalContractStorage.set("RankItems", {});
    },
    
    getProjects: function (limit, offset) {
        let from = Blockchain.transaction.from;
        limit = parseInt(limit);
        offset = parseInt(offset);
        let ProjectItems = LocalContractStorage.get("ProjectItems");
        let ProjectItemsArr = this._json2array(ProjectItems);
        if (offset > ProjectItemsArr.length) {
            throw new Error("offset 数值太大");
        }
        let number = offset + limit;
        if (number > ProjectItemsArr.length) {
            number = ProjectItemsArr.length;
        }
        let result = [];
        for (var i = offset; i < number; i++) {
            result.push(this.ProjectItemsMap.get(ProjectItems[i]));
        }
        return result;
    },

    addProject: function (key, name, desc, data) {

        key = key.trim();
        value = value.trim();
        if (key === "" || value === ""){
            throw new Error("empty key / value");
        }
        if (name.length > 64 || key.length > 64){
            throw new Error("key / value exceed limit length")
        }

        var from = Blockchain.transaction.from;

        if (this.ProjectItemsMap.get(key)) {
            throw new Error("该项已存在");
        } 

        projItem = new ProjectItem();
        projItem.key = key;
        projItem.name = name;
        projItem.desc = desc;
        projItem.data = data;

        this.ProjectItemsMap.set(key, projItem);
        let ProjectItems = LocalContractStorage.get("ProjectItems");
        let ProjectItemsArr = this._json2array(ProjectItems);
        ProjectItemsArr.push(key);
        ProjectItems = this._array2json(ProjectItemsArr);
        LocalContractStorage.set("ProjectItems", ProjectItems);
        return '{"result":"1"}';
    },
    
    getRanksInfo: function () {
        let RankItems = LocalContractStorage.get("RankItems");
        let RankItemsArr = this._json2array(RankItems);
        let result = [];
        // disable pagination
        for (var i = 0; i < RankItemsArr.length; i++) {
            result.push(this.RankItemsMap.get(RankItems[i]));
        }
        return result;
    }, 
    getRankInfo: function (name) {
        if(!name){
            throw new Error("名称不能为空");
        }
        return this.RankItemsMap.get(name);
    },
    createRank: function (param) {
        // name, desc, items, maxVoter
        if(!param){
            throw new Error("参数格式错误");
        } 
        var paramArray = this._json2array(param);
        var name = paramArray['name'];
        var desc = paramArray['desc'];
        var items = paramArray['items'];
        var maxVoter = parseInt(paramArray['max_voter']);
        var bannerUrl = paramArray['banner_url'];
        

        if (this.RankItemsMap.get(name)) {
            throw new Error("已经存在名为\""+name+"\""+"的排行");//itemid已经存在
        }else{
            let RankItems = LocalContractStorage.get("RankItems");
            let RankItemsArr = this._json2array(RankItems);
            // let id = RankItemsArr.length;
            RankItemsArr.push(name);
            RankItems = this._array2json(RankItemsArr);
            LocalContractStorage.set("RankItems", RankItems);
            
            let rankItem = new RankItem();
            // rankItem.id = id;
            rankItem.name = name;
            rankItem.desc = desc;
            rankItem.items = items;
            rankItem.maxVoter = maxVoter;
            rankItem.bannerUrl = bannerUrl;

            this.RankItemsMap.put(name, rankItem);
        }
    },
    vote: function () {
    },
    inviteVoter: function () {
    },
    getVoteInfo: function () {
    }

};
module.exports = NofishRanking;