var a = document.getElementById("a");
var img = document.getElementById("img");
var fig = document.getElementById("fig");

a.addEventListener('mouseover', (event) => {
  var event = event.target;
  event = showImg();
});

a.addEventListener('mouseout', (event) => {
  var event = event.target;
  event = hideImg();
  reset();
  
});

function showImg() {
  img.style.filter = "brightness(100%) blur(0)";
  img.style.transform = "scale(1)";
  fig.style.top = "100%";
  fig.style.transform = "translateX(-50%)";
}

function hideImg() { 
  img.style.filter = "brightness(70%) blur(8px)";
  img.style.transform = "scale(1.5)";
  fig.style.top = "50%";
  fig.style.transform = "translate(-50%, -50%)";
}

function reset() {
  img.removeAttribute('style');
  fig.removeAttribute('style');
}