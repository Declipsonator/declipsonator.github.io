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

document.addEventListener('DOMContentLoaded', function() {
  const marquees = document.querySelectorAll('.marquee');
  const screenWidth = window.innerWidth;

  const marqueeInsides = document.querySelectorAll('.marqueeInside');
  for (let marqueeInside of marqueeInsides) {
    marqueeInside.style.setProperty('--rand', randomIntFromInterval(5, 20) + 's');
  }


  for(let marquee of marquees) {
    if (randomIntFromInterval(0, 1) === 0) {
      marquee.className = 'marqueeOpposite';
    }



    let additionalContent = '';
    const repetitions = Math.floor(screenWidth / 1000);
    for (let i = 0; i < repetitions + 1; i++) {
      additionalContent += marquee.innerHTML;
    }
    marquee.innerHTML += additionalContent;



  }
});


document.getElementById('aboutButton').addEventListener('click', function() {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});
