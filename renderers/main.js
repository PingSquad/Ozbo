// https://github.com/kittykatattack/learningPixi#installingpixiwithnodeandgulp

const electron = require('electron');
var PIXI = require('pixi.js');

// var pixiApp = new PIXI.Application();

// get the window size
var remote = electron.remote;
var browserWindow = remote.getCurrentWindow();

// var canClickThrough = false;
// browserWindow.setIgnoreMouseEvents(canClickThrough);

var eScreen = electron.screen;
var workAreaSize = electron.eScreen.getPrimaryDisplay().workAreaSize;

var screen = document.getElementById('screen');
// set screen canvas w/h
screen.width = workAreaSize.width;
screen.height = workAreaSize.height;

var renderer = PIXI.autoDetectRenderer(
  screen.width, screen.height,
  {antialias: false, transparent: true, resolution: 1}
);
screen.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
  .add("../pets/cookieman.gif")
  .load(setup);

function setup() {
  var cman = new PIXI.Sprite(
    PIXI.loader.resources["../pets/cookieman.gif"].texture
  );

  stage.addChild(cman);

  renderer.render(stage);
}

/**
 * Returns a random value from the array given
 *
 * @param {*[]} list - array of things to choose from
 *
 * @return {*} random item from list
 */
function randChoice(list) {
  return list[list.length * Math.random() | 0]
}

