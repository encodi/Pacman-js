const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Boundary {
  static width = 40;
  static height = 40;
  constructor({position, image}) {
    this.position = position;
    this.width = 40;
    this.height = 40;
    this.image = image;
  }

  draw() {
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.drawImage(this.image, this.position.x, this.position.y);
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
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
  ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

function createImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

map.forEach((row, i) => {
  row.forEach((sym, j) => {
    switch (sym) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeHorizontal.png')
          })
        );
        break;
      case '|':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeVertical.png')
          })
        );
        break;
      case '1':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner1.png')
          })
        );
        break;
      case '2':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner2.png')
          })
        );
        break;
      case '3':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner3.png')
          })
        );
        break;
      case '4':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner4.png')
          })
        );
        break;
      case 'b':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/block.png')
          })
        );
        break;
      case '[':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capLeft.png')
          })
        );
        break;
      case ']':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capRight.png')
          })
        );
        break;
      case '_':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capBottom.png')
          })
        );
        break;
      case '^':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/capTop.png')
          })
        );
        break;
      case '+':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/pipeCross.png')
          })
        );
        break;
      case '5':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorTop.png')
          })
        );
        break;
      case '6':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorRight.png')
          })
        );
        break;
      case '7':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            color: 'blue',
            image: createImage('./img/pipeConnectorBottom.png')
          })
        );
        break;
      case '8':
        boundaries.push(
          new Boundary({
            position: {
              x: j * Boundary.width,
              y: i * Boundary.height
            },
            image: createImage('./img/pipeConnectorLeft.png')
          })
        );
        break;
      case '.':
        // pellets.push(
        //   new Pellet({
        //     position: {
        //       x: j * Boundary.width + Boundary.width / 2,
        //       y: i * Boundary.height + Boundary.height / 2
        //     }
        //   })
        // )
        // break
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