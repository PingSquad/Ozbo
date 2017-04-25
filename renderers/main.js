// https://github.com/kittykatattack/learningPixi#installingpixiwithnodeandgulp

const electron = require('electron');
var PIXI = require('pixi.js');
const filesystem = require('graceful-fs');
const sizeOf = require('image-size');

// gather sprites
var sptriteSheet = gatherSpritePaths('assets/sprites')

// var pixiApp = new PIXI.Application();

// get the window size
var remote = electron.remote;
var browserWindow = remote.getCurrentWindow();

// var canClickThrough = false;
// browserWindow.setIgnoreMouseEvents(canClickThrough);

var workAreaSize = electron.screen.getPrimaryDisplay().workAreaSize;

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
 * Given a base directory to look through, returns object of format
 * {
 *   "cookieman": {
 *     width:  50,
 *     height: 50,
 *     frames: [
 *       "cookieman-000.png",
 *       "cookieman-001.png"
 *     ]
 *   },
 *   "Dinnerb0ne": {...}
 * }
 * *Only checks for .png atm
 * *Assumes images are the same size
 * @param  {String} basepath - base filepath to look through for sprite folders
 * @return {Object}            object describing sprites in the given basepath
 */
function gatherSpritePaths(basepath) {
  sprites = {}
  filesystem.readdirSync(basepath).forEach( (file) => {
    if (file.includes('.')) {
      return;
    }
    sprites[file] = {
      width: 0,
      height: 0,
      frames: []
    };
    dir_path = basepath + '/' + file;
    filesystem.readdirSync(dir_path).forEach( (img_file) => {
      if (!img_file.endsWith('.png')) {
        return;
      }
      path = dir_path+'/'+img_file;
      if (!sprites[file].frames.length) {
        dims = sizeOf(path);
        sprites[file].width = dims.width
        sprites[file].height = dims.height
        /*
        // async
        sizeOf(path, function(err, dims) {
          sprites[file].width = dims.width
          sprites[file].height = dims.height
        });*/
      }
      sprites[file].frames.push(path)
    });
  });
  console.log(sprites);
  return sprites
}


/**
 * Returns a random value from the array given
 * @param  {*[]} list - array of things to choose from
 * @return {*}          random item from list
 */
function randChoice(list) {
  return list[list.length * Math.random() | 0]
}

