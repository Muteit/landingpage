let d = document;
let audio = d.querySelector('#audio');
let tap = d.querySelector('.tap');
let buttons = d.querySelectorAll('.btn.control');
let headerButton = d.querySelector('.header-control .control');
let player = d.querySelector('.player');

const playAudio = (obj) => {
  let stopAttempt = setInterval(() => {
    let promise = obj.play();

    if (promise) {
      promise.then(() => {
        clearInterval(stopAttempt);
      }).catch(console.log);
    }
  }, 100);
}

const control = (e) => {
  if (audio.paused) {
    playAudio(audio);
  } else {
    audio.pause();
  }

  [tap, ...buttons].forEach(btn => {
    btn.classList.toggle('play');
  });

  e.preventDefault();
}

buttons.forEach(btn => {
  btn.addEventListener('click', control);
  btn.addEventListener('touchstart', control);
});



const isInViewport = (el) => {
  const rect = el.getBoundingClientRect();

  return (
      -1 * rect.top <= rect.height &&
      -1 * rect.left <= rect.width
  );
}

const isMobile = () => {
  let reg = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
  return reg.test(window.navigator.userAgent);
}

setTimeout(() => {
  player.classList.remove('d-none');
}, 300);

window.addEventListener('scroll', function() {
  if (isInViewport(headerButton)) {
    player.classList.remove('visible');
  } else {
    if (!player.classList.contains('visible') && (!isMobile() || tap.classList.contains('play'))) {
      player.classList.add('visible');
    }
  }
}, {
  passive: true
});
