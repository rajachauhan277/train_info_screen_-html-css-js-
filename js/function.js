/* 
author : Raja Chauhan 
git profile : https://github.com/rajachauhan277 
do give start if you like this project
*/


var demo = document.getElementById("demo"),
    matrix = document.getElementById("matrix"),
    base = document.getElementById("base"),
    mat = new Array(),
    rotationL = 0,
    rotationR = 0;

// Positioning Base
var parWidth = window.getComputedStyle(base.parentNode).width;
parWidth = parWidth.slice(0, parWidth.length-2);
var baseWidth = window.getComputedStyle(base).width;
baseWidth = baseWidth.slice(0, baseWidth.length-2);
// base.style.left = (parWidth/2) - (baseWidth/2)  + "px";

// Filling matrix
function newLine(){
  var line = new Array();
  for (var i = 0; i < 25; i++){
    var led = document.createElement("div");
    led.onclick = function(){onOff(this)};
    led.className = "led off";
    matrix.appendChild(led);
    line[i] = led;
  }
  return line;
}
for (var i = 0; i < 7; i++)
  mat[i] = newLine();

// Tturning on/off
function onOff (led) {
  if (led.className == "led off")
    led.className = "led";
  else 
    led.className = "led off"
}

function write (arr) {
  var i = 0;
  while (i < arr.length){
    mat[arr[i++]][arr[i++]].className = "led";
  }
}

var ons = new Array(0,1,0,2,0,3,0,7,0,8,0,10,0,11,0,18,0,21,0,22,0,23,1,2,1,6,1,7,1,8,1,9,1,10,1,11,1,12,1,18,1,20,1,24,2,2,2,6,2,7,2,8,2,9,2,10,2,11,2,12,2,18,2,20,3,2,3,6,3,7,3,8,3,9,3,10,3,11,3,12,3,18,3,21,3,22,3,23,4,2,4,7,4,8,4,9,4,10,4,11,4,14,4,18,4,24,5,2,5,8,5,9,5,10,5,14,5,18,5,20,5,24,6,1,6,2,6,3,6,9,6,15,6,16,6,17,6,21,6,22,6,23);
write (ons);


function getCoords () {
  var coords = new Array(); 
  for ( var i = 0; i < mat.length; i++) 
    for ( var j = 0; j < mat[i].length; j++) 
      if (mat[i][j].className == "led") {
        coords.push(i);
        coords.push(j);
      }
  demo.innerHTML = coords;
}

function stop () {
  clearInterval(rotationL);
  clearInterval(rotationR);
  rotationL = 0;
  rotationR = 0;
}

function rotate(dir) {
    if (dir == "left" && rotationL == 0){
      rotationL =  setInterval(function(){moveLeft()},250);
      clearInterval(rotationR);
      rotationR = 0;
    }
    else if (dir == "right" && rotationR == 0){
      rotationR =  setInterval(function(){moveRight()},250);
      clearInterval(rotationL);
      rotationL = 0;
    }
}

function moveLeft(){
  for (var i = 0; i < mat.length; i++){
    var first = mat[i][0].className;
    for ( var j = 0; j < mat[i].length-1; j++) 
      mat[i][j].className = mat[i][j+1].className;
    mat[i][mat[i].length-1].className = first;
  }
}

function moveRight(){
  console.log(`mat `,mat)

  for (var i = 0; i < mat.length; i++){
    var last = mat[i][mat[i].length-1].className;
    for (var j = mat[i].length-1; j > 0; j--) 
      mat[i][j].className = mat[i][j-1].className;
    mat[i][0].className = last;
  }
}

function clearM() {
  for ( var i = 0; i < mat.length; i++) 
    for ( var j = 0; j < mat[i].length; j++) 
      mat[i][j].className = "led off";
}

function fill() {
    for ( var i = 0; i < mat.length; i++) 
    for ( var j = 0; j < mat[i].length; j++) 
      mat[i][j].className = "led";
}