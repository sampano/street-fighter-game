let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')


const updateGame = (p1, p2, gameState) => {

  p1NameDiv.innerText = p1.name;
  p2NameDiv.innerText = p2.name;
  p1HealthDiv.innerText = p1.health;
  p2HealthDiv.innerText = p2.health;
  //console.log(p2.health)


  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver
    game.declareWinner(game.isOver, p1, p2)
    return gameState
  }

}

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDamage = attackDamage;
  }

  strike(player, enemy, attackDmg) {

    let damageAmount = Math.floor(Math.random() * attackDmg)
    enemy.health -= damageAmount
    updateGame(p1, p2, game.over)
    console.log(`${player.name} attacks ${enemy.name} for ${damageAmount}`)

  }

  heal(player) {

    let hpAmount = Math.floor(Math.random() * 5);
    player.health += hpAmount
    updateGame(p1, p2, game.over)
    //console.log(`${player.name} heals for ${hpAmount} HP!`)
  }
}


class Game {
  constructor() {
    this.isOver = false;
  }
//thsda
  declareWinner(isOver, p1, p2) {
    let message;

    if (isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`;
      resultDiv.innerText = message;

    }

    else if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`;
      resultDiv.innerText = message;

    }

    document.getElementById('victory').play()


  }

  reset(p1, p2) {
    p1.health = 100;
    p2.health = 100;
    this.isOver = false;
    updateGame(p1, p2)
    resultDiv.innerText = '';

  }


  play(p1, p2) {

    this.reset(p1, p2);

    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDamage)
      p2.heal(p2)
      p2.strike(p2, p1, p2.attackDamage);
      p1.heal(p1)
    }
    return this.declareWinner(this.isOver, p1, p2);

  }

}


let p1 = new Player('Ryu', 100, 10);
let p2 = new Player('Ken', 100, 10);

let game = new Game();
let gameState = game.isOver

updateGame(p1, p2, game.over)




document.addEventListener('keydown', function(e) {
  if (e.key == "q" && p1.health > 0 && game.isOver == false) {
    p1.strike(p1, p2, p1.attackDamage)
    document.getElementById('p1attack').play()

  } else if (e.key == "p" && p1.health > 0 && game.isOver == false) {
    p2.strike(p2, p1, p2.attackDamage)

    document.getElementById('p2attack').play()

  } else if (e.key == "a" && p1.health > 0 && game.isOver == false) {
    p1.heal(p1)

    document.getElementById('p1heal').play()

  } else if (e.key == "l" && p1.health > 0 && game.isOver == false) {
    p2.heal(p2)

    document.getElementById('p2heal').play()

  } else { console.log("wrong key") }


});

playButton.onclick = () => game.play(p1, p2);

