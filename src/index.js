// import Player from './player.js'
const Game = require('./game.js')
const GameView = require('./gameview.js')
const Deck = require('./deck.js')
const GameObject = require('./game_object.js')
const Player = require('./player.js')

document.addEventListener("DOMContentLoaded", () => {
    const ele = document.querySelector('.game-board')
    const gameCanvasEl = document.getElementById('game-canvas');
    const gameCtx = gameCanvasEl.getContext('2d');

    const gameView = new GameView(ele, gameCtx, gameCanvasEl);
    window.gameCtx = gameCtx;

    // const newPlayers = document.createElement("div")
    // ele.appendChild(newPlayers)
    // const input1 = document.createElement("input")
    // input1.setAttribute("type", "text")
    // input1.setAttribute("name", "Player 1 Name:")
    // input1.id = "player-1-name"
    // newPlayers.append(input1)

    

    // ele.appendChild
    // gameView.renderstartPage();
    gameView.start();
    // gameView.handleEvents();
    
  })
  
  // canvasEl.width = window.innerWidth
  // canvasEl.height = window.innerHeight