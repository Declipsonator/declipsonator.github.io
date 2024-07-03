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

// Replace with your GitHub username
const username = 'declipsonator';

// GitHub API endpoint for user repositories
const apiUrl = `https://api.github.com/users/${username}/repos`;

// Function to fetch data from GitHub API
async function fetchProjects() {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}

// Function to filter out forks with fewer than 5 stars
function filterProjects(projects) {
  return projects.filter(project => {
    return !project.fork || project.stargazers_count >= 5;
  });
}

// Function to populate HTML with project details
async function populateProjects() {
  const projectsOne = document.getElementById('projectsOne');
  const projectsTwo = document.getElementById('projectsTwo');
  const projectsThree = document.getElementById('projectsThree');
  const projectsFour = document.getElementById('projectsFour');
  let projects = await fetchProjects();
  projects = filterProjects(projects);

  const quarterLength = Math.ceil(projects.length / 4);

  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    // const response = await fetch(project.html_url);

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.setAttribute('onclick', `window.open('${project.html_url}', '_blank');`);

    const projectImage = document.createElement('img');
    projectImage.src = "https://github-readme-stats.vercel.app/api/pin/?username=" + username + "&repo=" + project.name + "&theme=aura_dark";
    projectImage.alt = 'Project';
    projectImage.height = 130;
    projectImage.classList.add('projectImage');
    projectDiv.appendChild(projectImage);


    if (index < quarterLength) {
      projectsOne.appendChild(projectDiv);
    } else if(index < quarterLength * 2) {
      projectsTwo.appendChild(projectDiv);
    } else if(index < quarterLength * 3) {
      projectsThree.appendChild(projectDiv);
    } else {
      projectsFour.appendChild(projectDiv);

    }
  }
}

// Populate projects on page load


swapInitials();
marqueeStuff();
async function marqueeStuff() {
  await populateProjects();

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
    const repetitions = Math.floor(screenWidth / 500);
    for (let i = 0; i < repetitions + 1; i++) {
      additionalContent += marquee.innerHTML;
    }
    marquee.innerHTML += additionalContent;


  }
}




document.getElementById('aboutButton').addEventListener('click', function() {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('projectButton').addEventListener('click', function() {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('newsButton').addEventListener('click', function() {
  document.getElementById('news').scrollIntoView({ behavior: 'smooth' });
})
