const testFolder = './data/';
const fs = require('fs');
LineReaderSync = require("line-reader-sync")


let data = {};
let data2 = {};

fs.readdir(testFolder, async (err, files) => {
    await files.forEach(async (file) => {

        data[file] = {};
        let lrs = new LineReaderSync(testFolder + file)
        let line = "";
        while (line = lrs.readline()) {

            let lineJson = JSON.parse(line);
            let user = 'un';
            let message = lineJson.message;
            if (lineJson.user) {
                user = lineJson.user;
            }
            if (lineJson.username) {
                user = lineJson.username;
            }

            if (!data[file][user]) {
                data[file][user] = { c: 0, messages: {}, devices:{} };
            }
            data[file][user].c++;

            if (!data[file][user].messages[message]) {
                data[file][user].messages[message] = 0;
            }
            data[file][user].messages[message]++;


            if (!data2[user]) {
                data2[user] = { c: 0, messages: {}, devices:{} };
            }
            data2[user].c++;
            if (!data2[user].messages[message]) {
                data2[user].messages[message] = 0;
            }
            data2[user].messages[message]++;

            if(lineJson.deviceId){
                if (!data[file][user].devices[lineJson.deviceId]) {
                    data[file][user].devices[lineJson.deviceId] = 0;
                }
                data[file][user].devices[lineJson.deviceId]++;

                if (!data2[user].devices[lineJson.deviceId]) {
                    data2[user].devices[lineJson.deviceId] = 0;
                }
                data2[user].devices[lineJson.deviceId]++;

            }

        }


    });
    let keys = Object.keys(data2)
    for(let i=0;i<keys.length;i++){
        data2[keys[i]].devCount = Object.keys(data2[keys[i]].devices).length;
    }
    //console.log(JSON.stringify(data));
    console.log(JSON.stringify(data2));
});