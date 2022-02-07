var colorPicker = new window.iro.ColorPicker('#iro-color-picker', {
  width: 100,
  height: 100,
  color: "#fff",
  display: "block"
});
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
const circleBtn = document.getElementById('circle-brush');
const squareBtn = document.getElementById('square-brush');
const eraserBtn = document.getElementById('eraser');
const pencilBtn = document.getElementById('pencil');
const redBtn = document.getElementById('red');
const greenBtn = document.getElementById('green');
const blueBtn = document.getElementById('blue');
const blackBtn = document.getElementById('black');
const whiteBtn = document.getElementById('white');
const buttons = document.querySelectorAll('button');
const sizeUpBtn = document.querySelector('#size-up');
const sizeDownBtn = document.querySelector('#size-down');
const buttonsContainer = document.getElementById('buttons-container');
const size = document.getElementById('size');
const dToolsContainer = document.getElementById('d-tools-container');
const colorsContainer = document.getElementById('color-options');
const pickerBtn = document.getElementById('picker-btn');
const colorPopup = document.getElementById('iro-color-picker');
const currentColor = document.getElementById('current-color');
const toolContainer = document.getElementById('tool-container');

const buttonsArray = Array.from(buttons);

const dTools = dToolsContainer.querySelectorAll('button');
const dToolsArray = Array.from(dTools);

const colorBtns = colorsContainer.querySelectorAll('button');
const colorsArray = Array.from(colorBtns);

let isDrawing = false;
let drawingTool = 'pencil';
let x = 0;
let y = 0;
let x2 = 0;
let y2 = 0;
let color = 'rgb(0, 0, 0)';
let scaleRatio = 1;
let sizeDisplay = 1;
currentColor.style.backgroundColor = "#000";

canvas.style.cursor = 'url(images/other-pencil-4.png), auto';

function draw(ctx, x1, y1, xTo, yTo) {
  ctx.fillStyle = color;
  switch (drawingTool) {
    case 'pencil':
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2 * scaleRatio;
      ctx.moveTo(x1, y1 + 35);
      ctx.lineTo(xTo, yTo + 35);
      ctx.stroke();
      ctx.closePath();
      break;
    case 'circle':
      ctx.beginPath();
      console.log('desktop');
      ctx.arc(x1 + 4.5 * scaleRatio, y1 + 4.8 * scaleRatio, 5 * scaleRatio, 0, Math.PI * 2);
      ctx.fill();
      break;
    case 'square':
      ctx.beginPath();
      ctx.fillRect(x1, y1, 10 * scaleRatio, 10 * scaleRatio);
      break;
    case 'eraser':
      ctx.clearRect(x1, y1, 10 * scaleRatio, 10 * scaleRatio);
  }
}

function changeCursor() {

  let toolSize = Math.floor(10 * scaleRatio);
  toolSize = Math.floor(10 * scaleRatio);
  console.log(drawingTool);

  if (drawingTool === 'square' || drawingTool === 'eraser') {
    canvas.style.cursor = `url(images/square-${toolSize}px.png), auto`;
  } else if (drawingTool === 'pencil') {
    canvas.style.cursor = 'url(images/other-pencil-4.png), auto';
  } else if (drawingTool === 'circle') {
    canvas.style.cursor = `url(images/circle-${toolSize}px.png), auto`;
  }

}

function showColors() {
  if (colorPopup.style.display === "block") {
    hideColors();
  } else {
    colorPopup.style.display = "block";
  }
}

function hideColors() {
  colorPopup.style.display = "none";
}

function updateColor() {
  currentColor.style.backgroundColor = color;
}

//***  Desktop Logic  ***//
if (window.innerWidth > 770) {
  canvas.addEventListener('mousedown', (event) => {
    x = event.offsetX + 0.2 * scaleRatio;
    y = event.offsetY + 0.1 * scaleRatio;
    isDrawing = true;
    hideColors();
  });

  canvas.addEventListener('mouseup', (event) => {
    if (isDrawing === true) {
      draw(ctx, x, y, event.offsetX, event.offsetY);
      x = 0;
      y = 0;
      isDrawing = false;
    }
  });

  canvas.addEventListener('mousemove', (event) => {
    // Interesting Effect //
    // ctx.strokeRect(event.offsetX - 25, event.offsetY - 25, 50, 50);
    // // ctx.clearRect(event.offsetX - 25, event.offsetY - 25, 50, 50);
      
    if (isDrawing === true) {
      draw(ctx, x, y, event.offsetX, event.offsetY);
      x = event.offsetX;
      y = event.offsetY;
    }
    if (x > canvas.width || y > canvas.height) {
      isDrawing = false;
    }
    if (isDrawing === true) {
      if (x < 0 || y < 0) {
        isDrawing = false;
      } else {
        isDrawing = true;
      }
    }
  });
}


colorPicker.on('color:change', function(clr) {
  color = clr.rgbString;
  updateColor();
});

dToolsContainer.addEventListener('click', (event) => {
  dToolsArray.forEach((button) => {
    if (button === event.target) {
      button.style.backgroundColor = "rgb(90, 90, 90)";
    } else {
      button.style.backgroundColor = "rgb(46, 46, 46)";
    }
  })
});

colorsContainer.addEventListener('click', (event) => {
  colorsArray.forEach((button) => {
    if (button === event.target) {
      button.style.border = "1px solid rgb(200, 200, 200)";
    } else {
      button.style.border = "1px solid black";
    }
  })
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
});

circleBtn.addEventListener('click', () => {
  drawingTool = 'circle';
  changeCursor();
});

squareBtn.addEventListener('click', () => {
  drawingTool = 'square';
  changeCursor();
});

pencilBtn.addEventListener('click', () => {
  drawingTool = 'pencil';
  console.log(drawingTool);
  changeCursor();
});

eraserBtn.addEventListener('click', () => {
  drawingTool = 'eraser';
  changeCursor();
});

redBtn.addEventListener('click', () => {
  color = 'rgb(216, 21, 21)';
  updateColor();
});

greenBtn.addEventListener('click', () => {
  color = 'rgb(9, 128, 9)';
  updateColor();
});

blueBtn.addEventListener('click', () => {
  color = 'rgb(0, 49, 184)';
  updateColor();
});

blackBtn.addEventListener('click', () => {
  color = 'rgb(0, 0, 0)';
  updateColor();
});

whiteBtn.addEventListener('click', () => {
  color = 'rgb(255, 255, 255)';
  updateColor();
});

sizeUpBtn.addEventListener('click', () => {
  if (sizeDisplay >= 1 && sizeDisplay <= 9) {
    scaleRatio += 0.5;
    sizeDisplay++;
    changeCursor();
    size.textContent = sizeDisplay;
  }
});

sizeDownBtn.addEventListener('click', () => {
  if (sizeDisplay >= 2 && sizeDisplay <= 10) {
    scaleRatio -= 0.5;
    sizeDisplay--;
    changeCursor();
    size.textContent = sizeDisplay;
  }
});

pickerBtn.addEventListener('click', showColors);

window.addEventListener('mousemove', (event) => {
  if (isDrawing === true) {
    if (event.target !== canvas) {
      isDrawing = false;
    }
  }
});

window.addEventListener('resize', () => {

  if (window.innerWidth < 770) {
    canvas.width = window.innerWidth * 0.90;
    canvas.height = canvas.width;
  } 

});

window.addEventListener('load', () => {
  if (window.innerWidth < 770) {
    canvas.width = window.innerWidth * 0.90;
    canvas.height = canvas.width;
  }
});

window.addEventListener('click', (e) => {
  if (colorPopup.style.display === "block" && e.target !== pickerBtn) {
    if (e.target === toolContainer) {
      hideColors();
    } else if (buttonsArray.includes(e.target)) {
      hideColors();
    }
  }
});

window.addEventListener('touchstart', (e) => {
  if (colorPopup.style.display === "block" && e.target !== pickerBtn) {
    if (e.target === toolContainer) {
      hideColors();
    } else if (buttonsArray.includes(e.target)) {
      hideColors();
    }
  }
});


//***  Touch Logic   ***//
if (window.innerWidth < 770) {

  function draw(ctx, x1, y1, xTo, yTo) {
    ctx.fillStyle = color;
    switch (drawingTool) {
      case 'pencil':
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 * scaleRatio;
        ctx.moveTo(x1, y1);
        ctx.lineTo(xTo, yTo);
        ctx.stroke();
        ctx.closePath();
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(x1, y1, 5 * scaleRatio, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.beginPath();
        ctx.fillRect(x1 - 5 * scaleRatio, y1 - 5 * scaleRatio, 10 * scaleRatio, 10 * scaleRatio);
        break;
      case 'eraser':
        ctx.clearRect(x1 - 5 * scaleRatio, y1 - 5 * scaleRatio, 10 * scaleRatio, 10 * scaleRatio);
    }
  }


  canvas.addEventListener('touchstart', (event) => {
    x = event.targetTouches[0].clientX - 20;
    y = event.targetTouches[0].clientY - 40;
    isDrawing = true;
    hideColors();
  });
  
  canvas.addEventListener('touchend', (event) => {
    if (isDrawing === true) {
      draw(ctx, x, y, x, y);
      x = 0;
      y = 0;
      x2 = 0;
      y2 = 0;
      isDrawing = false;
    }
  });
  
  canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    
  if (isDrawing === true) {
    x2 = event.targetTouches[0].clientX - 20;
    y2 = event.targetTouches[0].clientY - 40;

    draw(ctx, x, y, x2, y2);

    x = event.targetTouches[0].clientX - 20;
    y = event.targetTouches[0].clientY - 40;
    return;
  } 
  if (x > canvas.width || y > canvas.height) {
    isDrawing = false;
  }
  if (isDrawing === true) {
    if (x < 0 || y < 0) {
      isDrawing = false;
    } else {
      isDrawing = true;
    }
  }
  });
}


