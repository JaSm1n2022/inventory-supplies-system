const Constant = require('./constants');
module.exports.getPortalMessageId = () => {
    const user = this.getUser();
    const inboxId = `${'portal-inbox'}-${user._id}`;
    return inboxId;
}
module.exports.getLocalMessageStorage = () => {
    const user = this.getUser();
    const inboxId = this.getPortalMessageId();
    let portal = localStorage.getItem(inboxId) ? JSON.parse(localStorage.getItem(inboxId)) : undefined;
    
    if (!portal) {
        portal = {

            userInfo: {
                name: user.name,
                email: user.email
            },
            ids: [{
                id: '',
                cnt: 0
            }]
        };
    } else {
        
        portal.userInfo = {
            name: user.name,
            email: user.email
        };
    }
    localStorage.setItem(inboxId, JSON.stringify(portal));
   
    return JSON.parse(localStorage.getItem(inboxId));

}
module.exports.getLocalStorage = () => {
    const user = this.getUser();
    const portalStorageId = this.getId();
    let portal = localStorage.getItem(portalStorageId) ? JSON.parse(localStorage.getItem(portalStorageId)) : undefined;
    if (!portal) { // move old to new portal attributes
        const headersArriveTable = localStorage.getItem(Constant.LOCAL_STORAGE_IDS.headersArriveTable) || '';
        const viewProfile = localStorage.getItem(Constant.LOCAL_STORAGE_IDS.viewProfile) ? JSON.parse(localStorage.getItem(Constant.LOCAL_STORAGE_IDS.viewProfile)) : '';
        const columnsHeaderProfile = localStorage.getItem(Constant.LOCAL_STORAGE_IDS.columnsHeaderProfile) ? JSON.parse(localStorage.getItem(Constant.LOCAL_STORAGE_IDS.columnsHeaderProfile)) : '';
        const usedLocation = localStorage.getItem(Constant.LOCAL_STORAGE_IDS.usedLocation) ? JSON.parse(localStorage.getItem(Constant.LOCAL_STORAGE_IDS.usedLocation)) : '';
        const usedPerson = localStorage.getItem(Constant.LOCAL_STORAGE_IDS.usedPerson) ? JSON.parse(localStorage.getItem(Constant.LOCAL_STORAGE_IDS.usedPerson)) : '';
        const reference = localStorage.getItem(Constant.LOCAL_STORAGE_IDS.reference) ? localStorage.getItem(Constant.LOCAL_STORAGE_IDS.reference) : '';
        const queryFilter = localStorage.getItem(Constant.LOCAL_STORAGE_IDS.queryFilter) ? JSON.parse(localStorage.getItem(Constant.LOCAL_STORAGE_IDS.queryFilter)) : '';
        const cwRangeGap = localStorage.getItem(Constant.LOCAL_STORAGE_IDS.cwRangeGap) ? JSON.parse(localStorage.getItem(Constant.LOCAL_STORAGE_IDS.cwRangeGap)) : '';
        const payload = {
            'headersArriveTable': headersArriveTable,
            'viewProfile': viewProfile,
            'columnsHeaderProfile': columnsHeaderProfile,
            'usedLocation': usedLocation,
            'usedPerson': usedPerson,
            'userInfo': {
                name: user.name,
                email: user.email
            },
            'reference': reference,
            'queryFilter': queryFilter,
            'cwRangeGap': cwRangeGap
        };
        localStorage.setItem(portalStorageId, JSON.stringify(payload));
    } else {
        const currentUser = this.getUser();
        portal.userInfo = {
            name: currentUser.name,
            email: currentUser.email
        };
        localStorage.setItem(portalStorageId, JSON.stringify(portal));
    }
    return JSON.parse(localStorage.getItem(portalStorageId));
}
module.exports.getId = () => {
    const user = this.getUser();
    const portalStorageId = `${'portal-query'}-${user._id}`;
    return portalStorageId;
}
module.exports.getPortal = () => {
    const myPortal = JSON.parse(localStorage.getItem(this.getId()));
    return myPortal;
}

module.exports.getColumnsHeaderProfile = () => {
    return this.getPortal().columnsHeaderProfile;
}
module.exports.getHeaderArriveTableStorage = () => {

    return this.getPortal().headersArriveTable;
}
module.exports.getViewProfile = () => {
    return this.getPortal().viewProfile;
}
module.exports.getUsedLocation = () => {
    return this.getPortal().usedLocation;
}
module.exports.getUsedPerson = () => {
    return this.getPortal().usedPerson;
}
module.exports.getUserInfo = () => {
    return this.getPortal().userInfo;
}
module.exports.getReference = () => {
    return this.getPortal().reference;
}
module.exports.getUser = () => {
    return JSON.parse(localStorage.getItem(Constant.LOCAL_STORAGE_IDS.user));
}
module.exports.getQueryFilter = () => {
    return this.getPortal().queryFilter;
}
module.exports.getCWRangeGap = () => {
    return this.getPortal().cwRangeGap;
}
module.exports.getUsedProperty = (property) => {
    if (property === Constant.LOCAL_STORAGE_IDS.usedLocation) {
        return this.getUsedLocation();
    } else if (property === Constant.LOCAL_STORAGE_IDS.usedPerson) {
        return this.getUsedPerson();
    } else {
        return [];
    }
}
module.exports.setLocalStorage = (key, value) => {
    const portalStorage = this.getPortal();
    if (key === Constant.LOCAL_STORAGE_IDS.headersArriveTable) {
        portalStorage.headersArriveTable = value;
    } else if (key === Constant.LOCAL_STORAGE_IDS.viewProfile) {
        portalStorage.viewProfile = value;
    } else if (key === Constant.LOCAL_STORAGE_IDS.columnsHeaderProfile) {
        portalStorage.columnsHeaderProfile = value;
    } else if (key === Constant.LOCAL_STORAGE_IDS.usedLocation) {
        portalStorage.usedLocation = value;
    } else if (key === Constant.LOCAL_STORAGE_IDS.usedPerson) {
        portalStorage.usedPerson = value;
    } else if (key === Constant.LOCAL_STORAGE_IDS.reference) {
        portalStorage.reference = value;
    } else if (key === Constant.LOCAL_STORAGE_IDS.queryFilter) {
        portalStorage.queryFilter = value;
    } else if (key === Constant.LOCAL_STORAGE_IDS.cwRangeGap) {
        portalStorage.cwRangeGap = value;
    }
    localStorage.setItem(this.getId(), JSON.stringify(portalStorage));
}
module.exports.removeColumnsHeaderProfile = () => {
    const portalStorage = this.getPortal();
    portalStorage.columnsHeaderProfile = undefined;
    localStorage.setItem(this.getId(), JSON.stringify(portalStorage));
}
module.exports.removeUser = () => {
    localStorage.removeItem(Constant.LOCAL_STORAGE_IDS.user);

}
module.exports.setUser = (usr) => {
    localStorage.setItem(Constant.LOCAL_STORAGE_IDS.user, JSON.stringify(usr));
}
module.exports.removeToken = () => {
    localStorage.removeItem(Constant.LOCAL_STORAGE_IDS.token);
}
module.exports.removeExpirationDt = () => {
    localStorage.removeItem(Constant.LOCAL_STORAGE_IDS.expirationDate);
}
module.exports.removeUserId = () => {
    localStorage.removeItem(Constant.LOCAL_STORAGE_IDS.userId);
}
module.exports.setToken = (token) => {
    localStorage.setItem(Constant.LOCAL_STORAGE_IDS.token, token);
}
module.exports.setExpirationDt = (expirationDate) => {
    localStorage.setItem(Constant.LOCAL_STORAGE_IDS.expirationDate, expirationDate);

}
module.exports.getToken = () => {
    return localStorage.getItem(Constant.LOCAL_STORAGE_IDS.token);
}

module.exports.getExpirationDt = () => {
    return localStorage.getItem(Constant.LOCAL_STORAGE_IDS.expirationDate);
}
module.exports.getUserId = () => {
    return localStorage.getItem(Constant.LOCAL_STORAGE_IDS.userId);
}
module.exports.removeDExist = () => {
    localStorage.removeItem(Constant.LOCAL_STORAGE_IDS.dExists);
};
module.exports.setDExists = (exists) => {
    localStorage.setItem(Constant.LOCAL_STORAGE_IDS.dExists, exists);
};
module.exports.getDExist = () => {
    return localStorage.getItem(Constant.LOCAL_STORAGE_IDS.dExists);
}
module.exports.setInbox = (id, cnt) => {
    const inboxPayload = this.getLocalMessageStorage();
    inboxPayload.ids.push({ id: id, cnt: cnt });
    localStorage.setItem(this.getPortalMessageId(), JSON.stringify(inboxPayload));
}
module.exports.getInbox = (msgId) => {
    const inboxPayload = this.getLocalMessageStorage();
    const ids = inboxPayload.ids;
    const id = ids.filter(i => i.id.toString() === msgId.toString());
    if (id && id.length) {
        return id[0];
    } else {
        return '';
    }
}