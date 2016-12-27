var   pongHitSound = new Audio("resources/PongHit.ogg"),
      wallHitSound = new Audio("resources/WallHit.ogg"),
      playerWallHit = new Audio("resources/PlayerWallHit.wav"),
      computerWallHit = new Audio("resources/ComputerWallHit.wav"),

pong = {
  playerName: "Player",
  gameWidth: window.innerWidth,
  gameHeight: window.innerHeight,
  VK_UPArrow: 38, VK_DownArrow: 40,
  VK_Minus: 173, VK_Add: 61,
  canvas: null, context: null, keystate: null,

  player: {
    score: 0,
    x: null, y: null,
    width: 20, height: 100,
    movementSpeed: null,

    update: function() {
      if((keystate[pong.VK_UPArrow]) && (this.y > 0)) this.y -= this.movementSpeed;
      if((keystate[pong.VK_DownArrow]) && this.y < (pong.gameHeight - this.height)) this.y += this.movementSpeed;
      if(keystate[pong.VK_Add]) this.movementSpeed *= 1.05;
      if(keystate[pong.VK_Minus]) this.movementSpeed -= (this.movementSpeed * 0.05);
    },

    draw: function() {
      pong.context.fillRect(this.x, this.y, this.width, this.height);
    }

  },

  computer: {
  score: 0,
  x: null,
  y: null,
  width: 20,
  height: 100,

  update: function() {
    var destination = pong.puck.y - (this.height - pong.puck.size) * 1;
    this.y = destination;
  },

  draw: function() {
    pong.context.fillRect(this.x, this.y, this.width, this.height);
  }

  },

  puck: {
    x: null, y: null,
    size: 20,
    velocity: null, speed: null,

    update: function() {
      this.y += this.velocity.y;
      this.x += this.velocity.x;

      var puckCollision = function(ax, ay, awidth, aheight, bx, by, bwidth, bheight) {
        return(ax < bx + bwidth && ax + awidth > bx && ay < by + bheight && ay + aheight > by);
      }

      var CollidableObject = this.velocity.x > 0 ? CollidableObject = pong.computer : CollidableObject = pong.player;

      if(puckCollision(CollidableObject.x, CollidableObject.y, CollidableObject.width, CollidableObject.height, this.x, this.y, this.size, this.size)) {
        pongHitSound.play();
        var partOfCollidable = (this.y + this.size - CollidableObject.y)/(CollidableObject.height + this.size);
        var returnAngle = (0.25 * Math.PI * (2 * partOfCollidable - 1));
        var goodHit = (Math.abs(returnAngle) > 0.2 * Math.PI ? 1.5 : 1);
        this.velocity.y = 1*(goodHit * ((this.speed * Math.sin(returnAngle))));
        this.velocity.x *= goodHit * (-1);
      }

      if((this.y < 0) || (this.y + this.size > pong.gameHeight)) {
        this.velocity.y *= -1;
        wallHitSound.play();
      }

      if(this.x < 0) {
        playerWallHit.play();
        pong.computer.score++;
        this.restore(-10);
      }

      if(this.x > pong.gameWidth + this.size) {
        computerWallHit.play();
        pong.player.score++;
        this.restore(10);
      }

    },

    restore: function(directionalSpeed) {
      this.speed = directionalSpeed;
      this.x = (pong.gameWidth) / 2;
      this.y = (pong.gameHeight) / 2;
      this.velocity = { x: this.speed, y: this.velocity.y };
    },

    draw: function() {
      pong.context.fillRect(this.x, this.y, this.size, this.size);
    }

  },

  startGame: function() {
    this.playerName = prompt("Enter a player name: ");
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.gameWidth;
    this.canvas.height = this.gameHeight;
    this.context = this.canvas.getContext("2d");
    (document).body.appendChild(this.canvas);
    keystate = {};

    document.addEventListener("keydown", function(evt){ keystate[evt.keyCode] = true; });

    document.addEventListener("keyup", function(evt){ delete keystate[evt.keyCode]; });

    this.init();

    var loop = function() {
      pong.update();
      pong.draw();
      window.requestAnimationFrame(loop, this.canvase);
    }

    window.requestAnimationFrame(loop, this.canvase);

  },

  init: function() {
    this.player.x = this.player.width;
    this.player.y = (this.gameHeight - this.player.height) / 2;
    this.computer.x = this.gameWidth - (this.player.width + this.computer.width);
    this.computer.y = (this.gameHeight - this.computer.height) / 2;
    this.player.movementSpeed = (this.gameHeight * 0.01);
    this.puck.velocity = { x: 10, y: 0 };

    Math.random() >= 0.5 ? this.puck.restore(-10) : this.puck.restore(10);

  },

  update: function() {
    this.player.update();
    this.computer.update();
    this.puck.update();
    this.context.fillText(pong.player.score, ((pong.gameWidth * 0.25) - (this.context.measureText(pong.player.score).width / 2)), 150);
    this.context.fillText(pong.computer.score, ((pong.gameWidth * 0.75) - (this.context.measureText(pong.computer.score).width / 2)), 150);

  },
  draw: function() {
    pong.context.fillRect(0, 0, this.gameWidth, this.gameHeight);
    pong.context.save();
    pong.context.fillStyle = "#ffffff";
    pong.context.font = "50px munro";
    pong.context.fillText(pong.playerName, ((pong.gameWidth * 0.25) - (pong.context.measureText(pong.playerName)).width / 2), 70);
    pong.context.fillText("Computer", ((pong.gameWidth * 0.75) - (pong.context.measureText("Computer")).width / 2), 70);
    pong.context.font = "80px munro";
    pong.context.fillText(pong.player.score, ((pong.gameWidth * 0.25) - (pong.context.measureText(pong.player.score).width / 2)), 150);
    pong.context.fillText(pong.computer.score, ((pong.gameWidth * 0.75) - (pong.context.measureText(pong.computer.score).width / 2)), 150);
    this.player.draw();
    this.computer.draw();
    this.puck.draw();
    pong.context.fillStyle = "#666666";
    for(var i = 0; i <= pong.gameHeight; i++) if(i % 20 === 0) pong.context.fillRect((pong.gameWidth / 2) - 4, i, 8, 10);
    pong.context.fillStyle = "#ffffff";
    pong.context.font = "20px munro";
    var text = "GitHub: @XuansonOn | Website: http://www.xuansonon.com";
    pong.context.fillText(text, ((pong.gameWidth * 0.5) - (pong.context.measureText(text).width / 2)), this.gameHeight - 10);
    pong.context.restore();
  }
};
pong.startGame();
