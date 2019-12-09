const csv=require('csvtojson');
const YAML = require('yamljs');
var args = process.argv.slice(2);
const csvFilePath=args[0]

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(YAML.stringify(jsonObj, 4));
});
