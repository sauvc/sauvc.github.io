const csv=require('csvtojson');
const YAML = require('yamljs');
var args = process.argv.slice(2);
const csvFilePath=args[0];

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
		jsonObj = jsonObj.map(t => {
			t.seq = parseInt(t.seq);
			t.institute = t.institute;
			if (!t.flag) t.flag = t.id.slice(6,8).toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397) );
			return t;
		});
		console.log('visibility: true\nteams:');
    console.log(YAML.stringify(jsonObj, 4));
});
