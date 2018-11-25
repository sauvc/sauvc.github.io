var fs = require('fs');

const flags = require('./flags.json');
const teams = require('./registered.json');

teams.forEach((team) => {
	let found = flags.find((flag) => {
		return team.country === flag.name
	});

	if (found) team.flag = found.emoji;
	// console.log(team.country,team.flag);
})

fs.writeFile('registered-teams.json',  JSON.stringify(teams), 'utf8', function(){});


