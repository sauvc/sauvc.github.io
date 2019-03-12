var fs = require('fs');

const teams = require('./registered-teams.json');
const qualified = require('./final.json');

var qualifiedTeams = qualified.map((team) => {
	const id = team['Team ID'];
	const f = teams.find(t => t.id == id);
	if (!f) console.log('Unknown Team ID: ' + id);
	else {
		f.qrank = team['Qualified Rank'];
		f.rank = team['Rank'];
	}
	return f;
});

qualifiedTeams = qualifiedTeams.sort( (a, b) => a.id.localeCompare(b.id));

fs.writeFile('final-teams.json',  JSON.stringify(qualifiedTeams), 'utf8', function(){});


