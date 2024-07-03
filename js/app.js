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
  let projects = await fetchProjects();
  projects = filterProjects(projects);

  const halfLength = Math.ceil(projects.length / 2);

  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    // const response = await fetch(project.html_url);

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    projectDiv.setAttribute('onclick', `window.open('${project.html_url}', '_blank');`);

    const projectImage = document.createElement('img');
    projectImage.src = project.owner.avatar_url; // Assuming you want to use owner's avatar as preview image
    projectImage.alt = 'Project';
    projectImage.classList.add('projectImage');
    projectDiv.appendChild(projectImage);

    const initialsDiv = document.createElement('div');
    initialsDiv.classList.add('initials');

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = project.name;
    initialsDiv.appendChild(titleHeading);

    const descriptionPara = document.createElement('p');
    descriptionPara.textContent = project.description || 'No description provided';
    initialsDiv.appendChild(descriptionPara);

    projectDiv.appendChild(initialsDiv);

    if (index < halfLength) {
      projectsOne.appendChild(projectDiv);
    } else {
      projectsTwo.appendChild(projectDiv);
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
    const repetitions = Math.floor(screenWidth / 1000);
    for (let i = 0; i < repetitions + 1; i++) {
      additionalContent += marquee.innerHTML;
    }
    marquee.innerHTML += additionalContent;


  }
}




document.getElementById('aboutButton').addEventListener('click', function() {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});
