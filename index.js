const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({position}) {
    this.position = position;
    this.width = 40;
    this.height = 40;
  }

  draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Player {
  constructor({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

const boundaries = [];
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0
  }
});

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
};

let lastKey = '';

const map = [
  ['-', '-', '-', '-', '-', '-', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', '-', ' ', '-', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', '-', ' ', '-', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', '-', '-', '-', '-', '-', '-']
];
map.forEach((row, rowIdx) => {
  row.forEach((sym, symIdx) => {
    switch (sym) {
      case '-':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * symIdx,
            y: Boundary.height * rowIdx
          }
        }));
        break;

      default:
        break;
    }
  });
});

function circleCollidesWithRectangle({ circle, rectangle }) {
  return (circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width);
}

function animate() {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player movement
  // player.velocity.y = 0;
  // player.velocity.x = 0;
  for (let i = 0; i < boundaries.length; i++) {
    const boundary = boundaries[i];
    if (keys.w.pressed && lastKey === 'w') {
      if (circleCollidesWithRectangle({
        circle: {...player, velocity: {
          x: 0,
          y: -5
        }},
        rectangle: boundary
      })) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = -5;
      }
    } else if (keys.a.pressed && lastKey === 'a') {
      if (circleCollidesWithRectangle({
        circle: {...player, velocity: {
          x: -5,
          y: 0
        }},
        rectangle: boundary
      })) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = -5;
      }
    } else if (keys.s.pressed && lastKey === 's') {
      if (circleCollidesWithRectangle({
        circle: {...player, velocity: {
          x: 0,
          y: 5
        }},
        rectangle: boundary
      })) {
        player.velocity.y = 0;
        break;
      } else {
        player.velocity.y = 5;
      }
    } else if (keys.d.pressed && lastKey === 'd') {
      if (circleCollidesWithRectangle({
        circle: {...player, velocity: {
          x: 5,
          y: 0
        }},
        rectangle: boundary
      })) {
        player.velocity.x = 0;
        break;
      } else {
        player.velocity.x = 5;
      }
    }
  }

  boundaries.forEach((boundary) => {
    boundary.draw();

    // Player - boundary collision
    if (circleCollidesWithRectangle({
      circle: player,
      rectangle: boundary
    })) {
        player.velocity.x = 0;
        player.velocity.y = 0;
    }
  });
  player.update();
}

animate();

window.addEventListener('keydown', ({ key }) => {
  console.log(key);
  switch (key) {
    case 'w':
      keys.w.pressed = true;
      lastKey = 'w';
      break;

    case 's':
      keys.s.pressed = true;
      lastKey = 's';
      break;

    case 'a':
      keys.a.pressed = true;
      lastKey = 'a';
      break;

    case 'd':
      keys.d.pressed = true;
      lastKey = 'd';
      break;

    default:
      break;
  }
});

window.addEventListener('keyup', ({ key }) => {
  console.log(key);
  switch (key) {
    case 'w':
      keys.w.pressed = false;
      break;

    case 's':
      keys.s.pressed = false;
      break;

    case 'a':
      keys.a.pressed = false;
      break;

    case 'd':
      keys.d.pressed = false;
      break;

    default:
      break;
  }
});