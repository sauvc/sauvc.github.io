(function(){
  window.addEventListener('load', function(){
    populateRegisteredTeams();
    populateQualifiedTeams();
    populateOrgTeam();
    makeBubbleGraphics();
  });

  function makeBubbleGraphics(){
    var heroDiv = document.querySelector('.hero');

    // Settings
    var min_bubble_count = 5, // Minimum number of bubbles
        max_bubble_count = 5, // Variance in numbers(px)
        min_bubble_size = 3, // Smallest possible bubble diameter (px)
        max_bubble_size = 12; // Variance in bubble size(px)

    // Calculate a random number of bubbles based on our min/max
    var bubbleCount = min_bubble_count + Math.floor(Math.random() * (max_bubble_count + 1));

    var containerDivsList = [];
    var bubbleDivsList = [];

    // Create the bubbles
    for (var i = 0; i < bubbleCount; i++) {
      var containerDiv = document.createElement('div');
      containerDiv.classList.add('bubble-container');


      var bubbleDiv = document.createElement('div');
      bubbleDiv.classList.add('bubble');

      containerDiv.append(bubbleDiv);
      heroDiv.append(containerDiv);

      containerDivsList.push(containerDiv);
      bubbleDivsList.push(bubbleDiv);
    }

    // Now randomise the various bubble elements
    containerDivsList.forEach(function(divEl, index){

      // Randomise the bubble positions (0 - 100%)
      var pos_rand = Math.floor(Math.random() * 101);

      // Randomise their size
      var size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size + 1));

      // Randomise the time they start rising (0-15s)
      var delay_rand = Math.floor(Math.random() * 16);

      // Randomise their speed (3-8s)
      var speed_rand = 3 + Math.floor(Math.random() * 9);

      // Random blur
      var blur_rand = 1+Math.floor(Math.random() * 3);

      // Apply the new styles
      var styleOpt = {
        'left' : pos_rand + '%',

        '-webkit-animation-duration' : speed_rand + 's',
        '-moz-animation-duration' : speed_rand + 's',
        '-ms-animation-duration' : speed_rand + 's',
        'animation-duration' : speed_rand + 's',

        '-webkit-animation-delay' : delay_rand + 's',
        '-moz-animation-delay' : delay_rand + 's',
        '-ms-animation-delay' : delay_rand + 's',
        'animation-delay' : delay_rand + 's',

        '-webkit-filter' : 'blur(' + blur_rand  + 'px)',
        '-moz-filter' : 'blur(' + blur_rand  + 'px)',
        '-ms-filter' : 'blur(' + blur_rand  + 'px)',
        'filter' : 'blur(' + blur_rand  + 'px)',
      };

      for (var key in styleOpt) {
        if (styleOpt.hasOwnProperty(key)) {
          divEl.style[key] = styleOpt[key];
        }
      }

      bubbleDivsList[index].style.width = size_rand + 'px';
      bubbleDivsList[index].style.height = size_rand + 'px';
    });
  }

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

  function populateQualifiedTeams() {
    if ('content' in document.createElement('template')) {
      var template = document.querySelector('#team-template');
      var regTeamsTable = document.querySelector('#qual-teams');

      fetch('data/qualified-teams.json').then(response => {
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

  function populateOrgTeam() {
    if ('content' in document.createElement('template')) {
      var template = document.querySelector('#org-template');
      var regTeamsTable = document.querySelector('#org-list');

      fetch('data/org-team.json').then(response => {
        response.json().then (regTeams => {
          regTeams.forEach(org => {
            var clone = document.importNode(template.content, true);
            var img = clone.querySelector('img');
            var name = clone.querySelector('.team-name');
            var role = clone.querySelector('.team-role');
            img.src = org.img;
            img.alt = org.Committee;

            name.innerHTML = org.Committee;
            role.innerHTML = org.Role;

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
