var canvas, ctx;
var divInfo1, divInfo2, divInfo3, divInfo4;
var h, w;
var mouse = { x: 0, y: 0 };
var initTime = Date.now();
var lastUpdateTime = initTime;
var frames = 0;
var fps;
const sevenSeg = new FontFace("sevenSeg","url(./sevenSegment.ttf)");
var actFreq = 172.000
var standbyFreq = 146.000
var buttonPressed = false
var scrollPos = 0;
let scrollingTimer;

window.onload = function () {
  initDomElements();
  initListeners();
  resize();
  animate();
};

function initDomElements() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  divInfo1 = document.getElementById("info1");
  divInfo1.innerHTML = "Mouse";
  divInfo2 = document.getElementById("info2");
  divInfo3 = document.getElementById("info3");
  divInfo3.innerHTML = "Key";
  divInfo4 = document.getElementById("info4");
}

function initListeners() {
  window.onresize = resize;
  window.onkeydown = keyDown;
  window.onkeyup = keyUp;
  window.onmousedown = mouseDown;
  window.onmouseup = mouseUp;
  window.onmousemove = mouseMove;
}

function resize() {
  w = canvas.width = window.innerWidth - canvas.offsetLeft * 2;
  h = canvas.height = window.innerHeight - canvas.offsetTop - 47;
  divInfo2.innerHTML = "Width: " + w + "<br>Height: " + h;
}

function keyDown(e) {
  divInfo3.innerHTML = "KeyDown: " + e.key + "<br>Code: " + e.code;
}

function keyUp(e) {
  divInfo3.innerHTML = "KeyUp: " + e.key + "<br>Code: " + e.code;
}

function mouseDown(e) {
  mouse.x = e.clientX - canvas.offsetLeft;
  mouse.y = e.clientY - canvas.offsetTop;
  divInfo1.innerHTML = "Mouse: Down" + ((e.buttons == 0) ? "" : " - " + e.buttons) + "<br>X: " + e.clientX + "<br>Y: " + e.clientY;
}

function mouseUp(e) {
  mouse.x = e.clientX - canvas.offsetLeft;
  mouse.y = e.clientY - canvas.offsetTop;
  divInfo1.innerHTML = "Mouse: Up" + ((e.buttons == 0) ? "" : " - " + e.buttons) + "<br>Mouse X: " + mouse.x + "<br>Mouse Y: " + mouse.y;
}

function mouseMove(e) {
  mouse.x = e.clientX - canvas.offsetLeft;
  mouse.y = e.clientY - canvas.offsetTop;
  divInfo1.innerHTML = "Mouse" + ((e.buttons == 0) ? "" : " - " + e.buttons) + "<br>Mouse X: " + mouse.x + "<br>Mouse Y: " + mouse.y;
}


function animate() {
  frames++;
  lastUpdateTime = Date.now();
  fps = Math.round(frames / ((lastUpdateTime - initTime) / 1000));
  draw();
  requestAnimationFrame(animate);
}


function formatFreq(freq) {
  console.log("Frequency before formatting:", freq);
  freq = parseFloat(freq);
  let formattedFreq = freq.toFixed(3);
  if (!formattedFreq.includes('.')) {
    formattedFreq += '.000';
  } else {
    while (formattedFreq.length - formattedFreq.indexOf('.') < 4) {
      formattedFreq += '0';
    }
  }
  return formattedFreq;
}

function draw() {
  divInfo4.innerHTML = "FPS: " + fps + "<br>Time: " + Math.trunc((lastUpdateTime - initTime) / 1000) + " s";
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  ctx.arc(500,250,50,0,2*Math.PI);
  ctx.rect(50,40,250,70);
  ctx.font = "80px sevenSeg";
  if(buttonPressed == false) {
    ctx.fillStyle = "#00ff00";
  }
  else if(buttonPressed == true) {
    ctx.fillStyle = "#000000";
  };

  onmousedown = (event) => {buttonPressed = true};
  onmouseup = (event) => {buttonPressed = false};
  window.onwheel = function(event) {
    clearTimeout(scrollingTimer);
    scrollingTimer = setTimeout(function() {
      let deltaY = event.deltaY;
      let newFreq;
  
      // Update the frequency based on scrolling direction
      if (deltaY > 0) {
        newFreq = parseFloat(standbyFreq) - 0.001;
      } else if (deltaY < 0) {
        newFreq = parseFloat(standbyFreq) + 0.001;
      }
      
      // Check if the new frequency is within the desired range
      if (newFreq < 5) {
        standbyFreq = 5; // Set to minimum value if below 5
      } else if (newFreq > 999.999) {
        standbyFreq = 999.999; // Set to maximum value if above 999.999
      } else {
        standbyFreq = newFreq; // Set to the new frequency if within range
      }
      
      // Format the frequency and redraw
      standbyFreq = formatFreq(standbyFreq);
      draw(); 
    }, 10);
  };
  
  

  let standbyFreqString = formatFreq(standbyFreq);
  let actFreqString = formatFreq(actFreq);

  ctx.fillText(actFreqString, 60, 103);
  ctx.fillText(standbyFreqString, 510, 103);
  ctx.rect(350,50,100,50);
  ctx.rect(500,40,250,70);
  ctx.closePath()
  ctx.stroke();
  ctx.beginPath();
  ctx.lineTo(350+10,50+25);
  //correct
  ctx.lineTo(350+40,50+40);
  //correct
  ctx.lineTo(350+40,50+30);
  //correct
  ctx.lineTo(350+60,50+30);
  //correct
  ctx.lineTo(350+60,50+40);
  //correct
  ctx.lineTo(350+90,50+25);
  //correct
  ctx.lineTo(350+60,50+10);
  //correct
  ctx.lineTo(350+60,50+20);
  //correct
  ctx.lineTo(350+40,50+20);
  //correct
  ctx.lineTo(350+40,50+10);
  ctx.fill()
  ctx.closePath();
  ctx.stroke();
}