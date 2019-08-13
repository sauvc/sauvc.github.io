(function(){
  window.addEventListener('load', function(){
    populateRegisteredTeams();
    populateShortListedTeams();
    populateFinalTeams();
  });

  function populateRegisteredTeams() {
    if ('content' in document.createElement('template')) {
      var template = document.querySelector('#team-template');
      var regTeamsTable = document.querySelector('#reg-teams');

      fetch('data/registered-teams.json').then(response => {
        response.json().then (regTeams => {
          regTeams.forEach(team => {
            var clone = document.importNode(template.content, true);
            var td = clone.querySelectorAll('td');
            var flagspan = clone.querySelectorAll('span');

            var location = (team.city ? team.city + ', ' : '') + team.country;
            td[0].textContent = team['id'];
            td[1].append(linkedEntry(team['url'], team['name']));
            td[2].append(linkedEntry(team['institute-url'], team['institute']));
            td[3].append(location);
            flagspan[0].textContent = team.flag;
            regTeamsTable.appendChild(clone);
          });
        });
      });
    }
  }

  function populateShortListedTeams() {
    if ('content' in document.createElement('template')) {
      var template = document.querySelector('#team-template');
      var regTeamsTable = document.querySelector('#short-teams');

      fetch('data/shortlisted-teams.json').then(response => {
        response.json().then (regTeams => {
          regTeams.forEach(team => {
            var clone = document.importNode(template.content, true);
            var td = clone.querySelectorAll('td');
            var flagspan = clone.querySelectorAll('span');

            var location = (team.city ? team.city + ', ' : '') + team.country;
            td[0].textContent = team['id'];
            td[1].append(linkedEntry(team['url'], team['name']));
            td[2].append(linkedEntry(team['institute-url'], team['institute']));
            td[3].append(location);
            flagspan[0].textContent = team.flag;
            regTeamsTable.appendChild(clone);
          });
        });
      });
    }
  }

  function populateFinalTeams() {
    if ('content' in document.createElement('template')) {
      var template = document.querySelector('#final-team-template');
      var regTeamsTable = document.querySelector('#final-teams');

      fetch('data/final-teams.json').then(response => {
        response.json().then (regTeams => {
          regTeams.sort((a,b) => {
            if (isNaN(a.rank)) return 1;
            if (isNaN(b.rank)) return -1;
            return a.rank - b.rank;
          }).forEach(team => {
            var clone = document.importNode(template.content, true);
            var td = clone.querySelectorAll('td');
            var flagspan = clone.querySelectorAll('span');

            var location = (team.city ? team.city + ', ' : '') + team.country;
            td[0].textContent = team['rank'];
            td[1].textContent = team['id'];
            td[2].append(linkedEntry(team['url'], team['name']));
            td[3].append(linkedEntry(team['institute-url'], team['institute']));
            td[4].append(location);
            td[5].textContent = isNaN(team['qrank']) ? '-' : 17-parseInt(team['qrank']);
            flagspan[0].textContent = team.flag;
            regTeamsTable.appendChild(clone);
          });
        });
      });
    }
  }

  function linkedEntry(url, name){
    if (!url){
      return name;
    }
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.innerHTML = name;
    return anchor;
  }

}());
