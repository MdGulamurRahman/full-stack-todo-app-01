//dependencies
const bcrypt = require('bcrypt');

async function hashStr (str){
    try {
        return hash = await bcrypt.hash(str, 8);
    } catch (error) {
        throw error
    }
};

module.exports = {hashStr};