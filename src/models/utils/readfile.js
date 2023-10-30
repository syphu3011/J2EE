const fs = require("fs");
async function readFile(dir) {
    const data = fs.readFileSync(dir, 'utf-8')
    return data;
}
module.exports = {
    readFile
}