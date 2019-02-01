'use strict'
const fs = require("fs");
module.exports = ()=>{
    try {
        if(process.argv[2]){
            let fileUrl = process.cwd()+"\\src\\store\\index.js";
            if(process.argv[3] != "exit"){
                fileUrl = process.cwd() + process.argv[3];
            }
            let storeData = fs.readFileSync(fileUrl,'utf8');
            eval(`storeData = ${storeData.replace(/export\s*default\s\{/i,"{")}`);
            storeData.appType = process.argv[2];
            fs.writeFileSync(fileUrl, "export default "+JSON.stringify(storeData,null,4));
            if(process.argv[3] == "exit"){
                process.exit();
            }
        }
    }catch (e){}
}