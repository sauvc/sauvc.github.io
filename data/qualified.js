var fs = require('fs');

const teams = require('./registered-teams.json');
const qualified = require('./qualified.json');

var qualifiedTeams = qualified.map((team) => {
	const id = team['Team ID'];
	const f = teams.find(t => t.id == id);
	if (!f) console.log('Unknown Team ID: ' + id);
	return f;
});

qualifiedTeams = qualifiedTeams.sort( (a, b) => a.id.localeCompare(b.id));

fs.writeFile('qualified-teams.json',  JSON.stringify(qualifiedTeams), 'utf8', function(){});


