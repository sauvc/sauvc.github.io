var fs = require('fs');

const teams = require('./registered-teams.json');
const shortlisted = require('./shortlisted.json');

var shortListedTeams = shortlisted.map((team) => {
	const id = team['Team ID'];
	const f = teams.find(t => t.id == id);
	if (!f) console.log('Unknown Team ID: ' + id);
	return f;
});

shortListedTeams = shortListedTeams.sort( (a, b) => a.id.localeCompare(b.id));

fs.writeFile('shortlisted-teams.json',  JSON.stringify(shortListedTeams), 'utf8', function(){});


