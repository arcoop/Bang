// import Player from './player.js'
const Game = require('./game.js')
const GameView = require('./gameview.js')
const Deck = require('./deck.js')
const GameObject = require('./game_object.js')
const Player = require('./player.js')

document.addEventListener("DOMContentLoaded", () => {
    const ele = document.querySelector('.game-board')
    // const submit = document.getElementById('submit-button')
    let player1Name = "player1"
    let player2Name = "player2"
    // const game = new Game(player1Name, player2Name)
    const gameView = new GameView(ele, player1Name, player2Name);
    gameView.start()
    // submit.addEventListener("click", (e) => {
      // e.preventDefault();
      // const player1TextInput = document.getElementById('player-1-name')
      // const player2TextInput = document.getElementById('player-2-name')
      // if (player1TextInput.value === "") {
      //   player1Name = "Player 1"
      // } else {
      //   player1Name = player1TextInput.value[0].toUpperCase()+player1TextInput.value.slice(1)
      // }
      // if (player2TextInput.value === "") {
      //   player2Name = "Player 2"
      // } else {
      //   player2Name = player2TextInput.value[0].toUpperCase()+player2TextInput.value.slice(1)
      // }
      // const aside = document.getElementById('welcome-screen')
      // aside.classList.toggle("hidden")
      // window.gameCtx = gameCtx
      // gameView.start();
    // })
    

    
  })
  
  // canvasEl.width = window.innerWidth
  // canvasEl.height = window.innerHeight