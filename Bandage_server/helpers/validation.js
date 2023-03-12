
exports.validateEmail = async (email) => {
    var regx=/^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
    if(!(email.match(regx))) return false;
    return true;
};

