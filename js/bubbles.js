(function(){
  window.addEventListener('load', function(){

    // Constants
    const MAX_GAIN = 0.5;
    const FADE_TIME = 2;

    var action = document.getElementById('action');
    var bubblesaudio = document.getElementById('bubbles-audio');

    // WebAudio Stuff
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var ac = new AudioContext();

    var gain = ac.createGain();
    var source = ac.createMediaElementSource(bubblesaudio);

    var fadingIn = false;
    var fadingOut = false;
    var playing = false;

    gain.gain.value = 0.0;

    source.connect(gain);
    gain.connect(ac.destination);
    unlockAudioContext(ac, () => {
      bubblesaudio.play();
      playing = true;
    })

    if (isElementInViewport(action)){
      fadeIn();
    }

    window.addEventListener('scroll', function() {
      if (isElementInViewport(action)){
        fadeIn();
      }else{
        fadeOut();
      }
    });

    document.addEventListener('visibilitychange', function(){
      if (document.visibilityState == 'visible' && isElementInViewport(action)){
        fadeIn();
      }else if (document.visibilityState == 'hidden' || document.visibilityState == 'unloaded' ){
        fadeOut();
      }
    });

    function unlockAudioContext(context, cb) {
      if (context.state !== "suspended") return;
      const b = document.body;
      const events = ["touchstart", "touchend", "mousedown", "keydown"];
      events.forEach(e => b.addEventListener(e, unlock, false));
      function unlock() {context.resume().then(() => {
        clean();
        cb();
      });}
      function clean() {events.forEach(e => b.removeEventListener(e, unlock));}
  }

    function fadeIn(){
      if (!playing) return;
      if (!fadingIn){
        // console.log("fading in")
        gain.gain.linearRampToValueAtTime(MAX_GAIN,ac.currentTime+FADE_TIME);
        fadingIn = true;
        fadingOut = false;
      }
    }

    function fadeOut(){
      if (!playing) return;
      if (!fadingOut){
        // console.log("fading out")
        gain.gain.linearRampToValueAtTime(0,ac.currentTime+FADE_TIME);
        fadingOut = true;
        fadingIn = false;
      }
    }

    function isElementInViewport (el) {
      var rect = el.getBoundingClientRect();
      var screenHeight = window.innerHeight || document.documentElement.clientHeight;
      return (rect.top >= 0 && rect.top <= screenHeight) || (rect.bottom >= 0 && rect.bottom <= screenHeight);
    }

  });

  // Make bubble graphics
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
}());
