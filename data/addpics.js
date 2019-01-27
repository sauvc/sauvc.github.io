var fs = require('fs');

const orgs = require('./org.json');
const orgTeam = [];

orgs.forEach(org => {
	var imgname = org.Committee.trim().replace(/ /g, '').toLowerCase();
	fs.stat('../img/team/' + imgname + '.jpg', (err) => {
		if(err) org.img = 'img/team/generic-male.png';
		else org.img = 'img/team/' + imgname + '.jpg';
		orgTeam.push(org);
		if (orgTeam.length == orgs.length){
			fs.writeFile('org-team.json',  JSON.stringify(orgTeam), 'utf8', function(){});
		}
	});
});


