const fs = require('fs')
const path = require("path");
function saveData(data) {
    if (fs.existsSync(path.join(process.cwd(),"database.json"))) {
        if (Array.isArray(data)) {
            fs.writeFileSync(path.join(process.cwd(), "database.json"), JSON.stringify(data, null, 2))
            return 0
        } else {
            // let temp = [];
            const savedata = fs.readFileSync(path.join(process.cwd(),"database.json"))
            const jsonDataFormat = JSON.parse(savedata.toString())
            jsonDataFormat.push(data)
            // for (let i = 0; i < jsonDataFormat.length; i++) {
            //     temp.push(jsonDataFormat[i])
            // }
            // temp.push(data)
            fs.writeFileSync(path.join(process.cwd(), "database.json"), JSON.stringify(jsonDataFormat, null, 2))
            return 0
        }
    } else {
        fs.writeFileSync(path.join(process.cwd(), "database.json"), JSON.stringify([data], null, 2))
        return 0
    }
}
function loadData() {
    if (fs.existsSync(path.join(process.cwd(), "database.json"))) {
        const dataRaw = fs.readFileSync(path.join(process.cwd(), "database.json"))
        return JSON.parse(dataRaw.toString())
    } else {
        return null
    }
}
function deleteData(target) {
    if (fs.existsSync(path.join(process.cwd(), "database.json"))) {
        const dataRaw = fs.readFileSync(path.join(process.cwd(), "database.json"))
        const jsonParse = JSON.parse(dataRaw.toString())
        for (let i = 0; i < jsonParse.length; i++) {
            if (jsonParse[i].nama.toLowerCase() === target.toLowerCase()) {
                jsonParse.splice(i,1)
            }
        }
        fs.writeFileSync(path.join(process.cwd(), "database.json"), JSON.stringify(jsonParse, null, 2))
        return 0
    } else {
        return null
    }
}
module.exports.saveData = saveData
module.exports.loadData = loadData
module.exports.deleteData = deleteData