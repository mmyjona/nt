"use strict";

class Project {
    constructor(text) {
        let obj = text ? JSON.parse(text) : {};
        this.id = obj.id || 0;
        this.owner = obj.owner;
        this.added = obj.added;
        this.title = obj.title;
        this.shortDescription = obj.shortDescription;
        this.fullDescription = obj.fullDescription;
        this.goal = obj.goal || 0;
        this.collected = obj.collected || 0;
        this.preview = obj.preview;
        this.image1 = obj.image1;
        this.image2 = obj.image2;
        this.image3 = obj.image3;
        this.additional = obj.additional;
    }

    toString() {
        return JSON.stringify(this);
    }
}

class ProjectContract {
    constructor() {
        LocalContractStorage.defineProperty(this, "count");
        LocalContractStorage.defineMapProperty(this, "userFavorites");
        LocalContractStorage.defineMapProperty(this, "userSupported");
        LocalContractStorage.defineMapProperty(this, "userProjects");
        LocalContractStorage.defineMapProperty(this, "projects", {
            parse: function (text) {
                return new Project(text);
            },
            stringify: function (o) {
                return o.toString();
            }
        });
    }

    init() {
        this.count = new BigNumber(1);
    }

    total() {
        return new BigNumber(this.count).minus(1).toNumber();
    }

    create(projectJson) {
        let wallet = Blockchain.transaction.from;
        let index = this.count;

        let project = new Project(projectJson);
        project.owner = wallet;
        project.id = index;
        this.projects.put(new BigNumber(index).toNumber(), project);

        //save user projects
        let userProjects = this.userProjects.get(wallet) || [];
        userProjects.push(index);
        this.userProjects.put(wallet, userProjects);

        this.count = new BigNumber(index).plus(1);
    }

    get(limit, offset) {
        let arr = [];
        offset = new BigNumber(offset);
        limit = new BigNumber(limit);

        for (let i = offset; i.lessThan(offset.plus(limit)); i = i.plus(1)) {
            let index = i.toNumber();
            let project = this.projects.get(index);
            if (project) {
                arr.push(project);
            }
        }

        return arr;
    }

    getById(id) {
        let project = this.projects.get(id);
        if (!project) {
            throw new Error(`Project with Id = ${id} not found`);
        }

        return project;
    }

    getByWallet(wallet) {
        wallet = wallet || Blockchain.transaction.from;
        let projectIds = this.userProjects.get(wallet);
        if (!projectIds) {
            throw new Error(`Wallet = ${wallet} does not have any projects `);
        }

        return this._getProjectsByids(projectIds); 
    }

    addToFavorites(projectId) {
        let wallet = Blockchain.transaction.from;
        let project = this.projects.get(projectId);
        if(!project) {
            throw new Error(`Project with Id = ${projectId} not found`);
        }

        let userFavoritesIds = this.userFavorites.get(wallet) || [];
        if(!userFavoritesIds.includes(projectId)) {
            userFavoritesIds.push(projectId);
            this.userFavorites.put(wallet, userFavoritesIds);
        }
        else {
            throw new Error(`Project with Id = ${projectId} already in your favorites`);
        }
    }

    removeFromFavorites(projectId) {
        let wallet = Blockchain.transaction.from;
        let project = this.projects.get(projectId);
        if(!project) {
            throw new Error(`Project with Id = ${projectId} not found`);
        }

        let userFavoritesIds = this.userFavorites.get(wallet) || [];
        if(userFavoritesIds.includes(projectId)) {
            let index = userFavoritesIds.indexOf(projectId);
            userFavoritesIds.splice(index, 1);
            this.userFavorites.put(wallet, userFavoritesIds);
        }
        else {
            throw new Error(`Project with Id = ${projectId} not in your favorites`);
        }
    }

    getFavorites() {
        let wallet = Blockchain.transaction.from;
        let userFavoritesIds = this.userFavorites.get(wallet) || [];
        return this._getProjectsByids(userFavoritesIds);    
    }

    support(projectId) {
        let wallet = Blockchain.transaction.from;
        let amount = Blockchain.transaction.value;
        if(amount == 0) {
            throw new Error(`Support amount must be more than 0`);
        }

        let project = this.projects.get(projectId);
        if(!project) {
            throw new Error(`Project with Id = ${projectId} not found`);
        }

        let userSupportedIds = this.userSupported.get(wallet) || [];
        if(!userSupportedIds.includes(projectId)) {
            userSupportedIds.push(projectId);
            this.userSupported.put(wallet, userSupportedIds);
        }

        let result = Blockchain.transfer(project.owner, amount);  
        if (!result) {
			throw new Error("support failed");
        }

        project.collected = new BigNumber(project.collected).plus(amount);
        this.projects.put(projectId, project);
        
        //save supported
        let userSupported = this.userSupported.get(wallet) || [];
        if(!userSupported.includes(projectId)) {
            userSupported.push(projectId);
            this.userSupported.put(wallet, userSupported);
        }

		Event.Trigger("ProjectSupport", {
			Transfer: {
				from: Blockchain.transaction.to,
				to: project.owner,
				value: amount.toString()
			}
        });      
    }

    getSupported() {
        let wallet = Blockchain.transaction.from;
        let userSupportedIds = this.userSupported.get(wallet) || [];
        return this._getProjectsByids(userSupportedIds);   
    }

    _getProjectsByids(ids) {
        if(!ids) {
            return;
        }

        let arr = [];
        for (const id of ids) {
            let project = this.projects.get(id);
            if(project) {
                arr.push(project);
            }            
        } 

        return arr;
    }
}

module.exports = ProjectContract;
