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
    // const playerCanvasEl = document.getElementById('players-canvas');
    // const playerCtx = playerCanvasEl.getContext('2d')
    // const gameView = new GameView(ele, gameCtx, playerCtx);
    const gameView = new GameView(ele, gameCtx, gameCanvasEl);
    gameView.start();
    gameView.handleEvents();
    
  })
  
  
  // canvasEl.width = window.innerWidth
  // canvasEl.height = window.innerHeight