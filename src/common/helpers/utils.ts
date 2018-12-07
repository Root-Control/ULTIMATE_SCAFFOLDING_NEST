function isEmptyObject(value) {
    for(var key in value) {
        if(value.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

export {
	isEmptyObject
}

