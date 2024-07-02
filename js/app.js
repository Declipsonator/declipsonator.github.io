async function swapInitials(){
  const img = document.getElementById('initials');
  let initialScrolling = true
  while(initialScrolling) {
    img.src = '/img/initials/' + randomIntFromInterval(0, 56) + '.png';
    await new Promise(r => setTimeout(r, 333));
  }
}

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


swapInitials();

