var fs = require('fs');

const teams = require('./registered-teams.json');
const qualified = require('./qualified.json');

const qualifiedTeams = qualified.map((team) => {
	const id = team['Team ID'];
	const f = teams.find(t => {
		console.log('Checking Team ID ' + t.id + ' :: ' +id);
		return t.id == id;
	});
	if (!f) {
		console.log('Unknown Team ID: ' + id);
	}else {
		console.log('Found team ' + f.id);
	}
	return f;
});

fs.writeFile('qualified-teams.json',  JSON.stringify(qualifiedTeams), 'utf8', function(){});


