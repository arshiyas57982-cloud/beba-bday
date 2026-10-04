
/* =====================================
   JUST BEBA - BIRTHDAY WEBSITE
   ===================================== */

// PAGE NAVIGATION

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function showSurprise(name) {
  showPage(name + '-page');
}


// PAGE 1: PASSWORD

const correctPassword = '2909';

let enteredPassword = '';

const digits = document.querySelectorAll('.digit');
const passwordMessage = document.getElementById('password-message');

function updatePasswordDisplay() {
  digits.forEach((digit, index) => {
    digit.textContent = enteredPassword[index] ? '●' : '';
  });
}

function checkPassword() {
  if (enteredPassword === correctPassword) {
    passwordMessage.textContent = 'Correct! Welcome, Beba ❤️';

    setTimeout(() => {
      enteredPassword = '';
      updatePasswordDisplay();
      showPage('page2');
    }, 700);

  } else if (enteredPassword.length === 4) {
    passwordMessage.textContent = 'Oops! Try again, birthday boy 💗';

    enteredPassword = '';
    updatePasswordDisplay();
  }
}

document.querySelectorAll('.keypad button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.num;

    if (value === 'clear') {
      enteredPassword = '';
    } else if (value === 'delete') {
      enteredPassword = enteredPassword.slice(0, -1);
    } else if (enteredPassword.length < 4) {
      enteredPassword += value;
    }

    updatePasswordDisplay();

    if (enteredPassword.length === 4) {
      checkPassword();
    }
  });
});


// PAGE 2: POPPING CAT

const catButton = document.getElementById('cat-button');

catButton.addEventListener('click', () => {
  if (catButton.classList.contains('pop')) return;

  catButton.classList.add('pop');

  createHearts(20);
  createConfetti(30);

  setTimeout(() => {
    showPage('page3');
  }, 900);
});


// PAGE 3: GIFT BOX

const giftButton = document.getElementById('gift-button');
const giftMessage = document.getElementById('gift-message');

giftButton.addEventListener('click', () => {
  if (giftButton.classList.contains('open')) return;

  giftButton.classList.add('open');

  createHearts(35);
  createConfetti(45);
  createBalloons(12);

  giftMessage.textContent = 'Your gift is full of love! ❤️';

  setTimeout(() => {
    giftButton.classList.remove('open');
  }, 1000);
});


// NO BUTTON: A LITTLE FUN

const noButton = document.getElementById('no-button');

noButton.addEventListener('click', () => {
  noButton.style.position = 'relative';

  const x = (Math.random() - 0.5) * 180;
  const y = (Math.random() - 0.5) * 100;

  noButton.style.transform =
    `translate(${x}px, ${y}px)`;

  giftMessage.textContent =
    'Hehe, try the YES button, Beba! 😂❤️';
});


// YES BUTTON: SHOW THE CAKE

document.getElementById('yes-button')
  .addEventListener('click', () => {

    createHearts(40);
    createConfetti(60);
    createBalloons(15);

    setTimeout(() => {
      showPage('page4');
    }, 500);
  });


// PAGE 4: BLOW OUT CANDLES

const candles = document.querySelectorAll('.candle');
const nextButton = document.getElementById('next-button');
const candleMessage = document.getElementById('candle-message');

candles.forEach(candle => {
  candle.addEventListener('click', () => {
    if (candle.classList.contains('blown')) return;

    candle.classList.add('blown');

    createHearts(5);

    const remaining = document.querySelectorAll(
      '.candle:not(.blown)'
    ).length;

    if (remaining === 0) {
      candleMessage.textContent =
        'Yayyy! All your candles are blown! Make a wish! ❤️';

      createConfetti(80);
      createBalloons(15);

      nextButton.disabled = false;
      nextButton.textContent = 'NEXT ➜';
    } else {
      candleMessage.textContent =
        `${remaining} candle(s) left! Keep going, Beba! 🕯️`;
    }
  });
});

nextButton.addEventListener('click', () => {
  if (!nextButton.disabled) {
    showPage('page5');
  }
});


// PAGE 5: CHOOSE A SURPRISE

document.querySelectorAll('.surprise-card')
  .forEach(card => {

    card.addEventListener('click', () => {
      const surprise = card.dataset.surprise;

      if (surprise === 'camera') {
        showSurprise('camera');
      }

      if (surprise === 'bottle') {
        showSurprise('bottle');
      }

      if (surprise === 'star') {
        showSurprise('star');
      }
    });
  });


// BACK BUTTONS

document.querySelectorAll('.back-btn')
  .forEach(button => {

    button.addEventListener('click', () => {

      // Pause the video when leaving its page
      const video = document.getElementById('funny-video');

      if (video) {
        video.pause();
      }

      showPage('page5');
    });
  });


// CAMERA: LOAD YOUR SELECTED PHOTOS

const portraitGallery =
  document.getElementById('portrait-gallery');

// Change these filenames to your own photos.
// Put all of them inside the images folder.

const memories = [
  {
    image: 'images/beba-cover.jpg',
    caption: 'My favorite person ❤️'
  },
  {
    image: 'images/memory1.jpg',
    caption: 'A little moment, a big smile'
  },
  {
    image: 'images/memory2.jpg',
    caption: 'My handsome birthday boy'
  },
  {
    image: 'images/memory3.jpg',
    caption: 'Forever my favorite'
  },
  {
    image: 'images/memory4.jpg',
    caption: 'One of a million reasons to smile'
  },
  {
    image: 'images/memory5.jpg',
    caption: 'Just Beba ✨'
  }
];

memories.forEach(memory => {
  const frame = document.createElement('div');
  frame.className = 'portrait';

  const image = document.createElement('img');
  image.src = memory.image;
  image.alt = memory.caption;

  image.onerror = () => {
    image.style.display = 'none';
    frame.style.background = '#fff8ef';
    frame.style.color = '#a00000';
    frame.style.padding = '35px 10px';
    frame.textContent = 'Add your photo: ' +
      memory.image.split('/').pop();
  };

  const caption = document.createElement('p');
  caption.textContent = memory.caption;

  frame.appendChild(image);
  frame.appendChild(caption);

  portraitGallery.appendChild(frame);
});


// BOTTLE: OPEN THE LOVE LETTER

const bottleButton = document.getElementById('bottle-button');
const loveLetter = document.getElementById('love-letter');

bottleButton.addEventListener('click', () => {
  bottleButton.style.display = 'none';

  loveLetter.classList.add('show');

  createHearts(40);
  createConfetti(35);
});


// STAR: FUNNY VIDEO

const funnyVideo = document.getElementById('funny-video');

// The video plays when Beba presses its play button.
// Put your selected video at:
// videos/funny-video.mp4


// FLOATING HEARTS

function createHearts(count = 15) {
  const container = document.getElementById('floating-hearts');

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');

    heart.className = 'floating-heart';

    const hearts = ['❤️', '💕', '💗', '💖', '💘'];

    heart.textContent =
      hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (18 + Math.random() * 25) + 'px';
    heart.style.animationDuration = (3 + Math.random() * 3) + 's';

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 6500);
  }
}


// CONFETTI

function createConfetti(count = 40) {
  const container =
    document.getElementById('confetti-container');

  const colors = [
    '#ffeb3b',
    '#ffffff',
    '#ff80ab',
    '#80deea',
    '#ffb74d'
  ];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('span');

    piece.className = 'confetti';
    piece.textContent = ['★', '♥', '✦', '🎉'][
      Math.floor(Math.random() * 4)
    ];

    piece.style.left = Math.random() * 100 + '%';
    piece.style.color =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.fontSize = (12 + Math.random() * 20) + 'px';
    piece.style.animationDelay = Math.random() + 's';

    container.appendChild(piece);

    setTimeout(() => piece.remove(), 4500);
  }
}


// BALLOONS

function createBalloons(count = 10) {
  const container = document.getElementById('floating-hearts');

  for (let i = 0; i < count; i++) {
    const balloon = document.createElement('span');

    balloon.className = 'floating-heart';
    balloon.textContent = '🎈';

    balloon.style.left = Math.random() * 100 + '%';
    balloon.style.fontSize = (30 + Math.random() * 25) + 'px';
    balloon.style.animationDuration = (4 + Math.random() * 3) + 's';

    container.appendChild(balloon);

    setTimeout(() => balloon.remove(), 7500);
  }
}