var ContractItem = function(text){
    if(text){
       var obj = JSON.parse(text);
       this.id = obj.id;
       this.date = obj.date;
       this.author = obj.author;
       this.content = obj.content;
       this.otherManList = obj.otherManList;
    }
};


ContractItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var ContractItems = function () {   
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new ContractItem(text);
        },
        stringify: function (o) {
            return JSON.stringify(o);
        }
    });
};

size = new Date().getTime();  

ContractItems.prototype ={
    init:function(){
    },

    add:function(date,content){
        if(!content){
            throw new Error("内容不能为空")
        }

        var from = Blockchain.transaction.from;
        
        // var contractItem = this.data.get(date);
    
        var newContractItem = {};
        newContractItem.otherManList = [];

        var id = size
        newContractItem.id = size;
        newContractItem.date = date;
        newContractItem.author = from;
        newContractItem.content = content;

        newContractItem.otherManList.push(from);

        this.data.put(id,newContractItem);

        size += 1

        return size
    },

    get:function(id){
        if(!id){
            throw new Error("empty id")
        }
        return this.data.get(id);
    },

    addOther:function(id){
        var from = Blockchain.transaction.from;
        var contractItem = this.data.get(id);
        if(contractItem){
            for(var i = 0; i < contractItem.length; i++){
                if(contractItem.otherManList[i] === from){
                    return;
                }
            }

            contractItem.otherManList.push(from);
            this.data.put(id,contractItem);
        }
    },

    getInfo:function(){
        var info = " info: ";
        for(var i = 0; i < 1; i++){
            info += " i:" + i + " content:" + this.data.get(i).content
        }
        return info;
    }

}

module.exports = ContractItems;