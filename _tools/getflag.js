const fs = require('fs');
var args = process.argv.slice(2);


fs.readFile(args[0], 'utf8', (err, data) => {
	if(err) return;
	data.split('\n').forEach( l => {
		let code = l.slice(6,8);
		let flg = code.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397) );
		console.log(flg);
	});
});
