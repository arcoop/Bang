// import Player from './player.js'
const Game = require('./game.js')
const GameView = require('./gameview.js')
const Deck = require('./deck.js')
const GameObject = require('./game_object.js')
const Player = require('./player.js')

document.addEventListener("DOMContentLoaded", () => {
    const ele = document.querySelector('.game-board')
    // const canvasEl = document.getElementById('game-canvas');
    // canvasEl.width = window.innerWidth
    // canvasEl.height = window.innerHeight
    // const ctx = canvasEl.getContext('2d');
    const gameView = new GameView(ele);
    gameView.start();

  })

