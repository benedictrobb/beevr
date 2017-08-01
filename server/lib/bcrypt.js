const bcrypt = require('bcrypt');

//auto-gen a salt and hash:
function hashPassword(password, callback) {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, callback);
}
//check passwords:
function comparePassword(password, hash, callback) {
    bcrypt.compare(password, hash, callback);
}

module.exports = {
    hashPassword: hashPassword,
    comparePassword: comparePassword,
};
