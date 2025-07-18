// fire base config
const firebaseConfig = {
  apiKey: "AIzaSyCc5CrQYoQQW_tkIwmbw30-4C_hm4W0yeI",
  authDomain: "my-portfolio-projects-ab8c7.firebaseapp.com",
  projectId: "my-portfolio-projects-ab8c7",
  storageBucket: "my-portfolio-projects-ab8c7.firebasestorage.app",
  messagingSenderId: "752289067710",
  appId: "1:752289067710:web:58aa77cb2a4bd8176ea4ef"
};







// Define Firebase funcitons
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Read all documents from "users" collection
db.collection("users").get().then((querySnapshot) => {
querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
});
}).catch((error) => {
    console.error("Error reading documents: ", error);
});


// Define project data
const projects = [
    {
        id: 'e-commerce-store',
        title: 'E-commerce Store',
        image: 'https://placehold.co/400x250/000000/FFFFFF?text=E-commerce',
        shortDescription: 'A full-featured e-commerce platform built with modern web technologies.',
        longDescription: 'This project is a comprehensive e-commerce solution built from scratch. It includes user authentication, product catalog management, shopping cart functionality, secure payment gateway integration, and order tracking. The backend is designed with scalability in mind, while the frontend provides a smooth and intuitive user experience. Key features include product search, filtering, user reviews, and an admin dashboard for managing orders and products.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'Stripe API']
    },
    {
        id: 'task-management-app',
        title: 'Task Management App',
        image: 'https://placehold.co/400x250/000000/FFFFFF?text=Task+App',
        shortDescription: 'An intuitive web-based task organizer to boost productivity.',
        longDescription: 'A web-based task management application designed to help users organize their daily tasks efficiently. Features include task creation, categorization, due dates, priority levels, and completion tracking. The application uses local storage to persist data, offering a seamless experience without server-side dependencies. It also includes a drag-and-drop interface for reordering tasks and a simple search functionality.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Local Storage', 'Drag & Drop API']
    },
    {
        id: 'weather-dashboard',
        title: 'Weather Dashboard',
        image: 'https://placehold.co/400x250/000000/FFFFFF?text=Weather+App',
        shortDescription: 'Real-time weather updates and 5-day forecasts for any city.',
        longDescription: 'This project is a dynamic weather dashboard that fetches real-time weather data from a third-party API (e.g., OpenWeatherMap). Users can search for weather conditions in any city, view current temperature, humidity, wind speed, and a 5-day forecast. The interface is designed to be clean and responsive, providing essential weather information at a glance. It also includes error handling for invalid city names and a loading indicator.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Fetch API', 'OpenWeatherMap API']
    },
    {
        id: 'recipe-finder',
        title: 'Recipe Finder',
        image: 'https://placehold.co/400x250/000000/FFFFFF?text=Recipes',
        shortDescription: 'Discover new recipes based on available ingredients.',
        longDescription: 'A web application that allows users to find recipes by searching for ingredients they have on hand. It integrates with a recipe API to fetch detailed information, including ingredients, instructions, and nutritional facts. Users can also save their favorite recipes and filter by cuisine type. The design is focused on ease of use and visual appeal, making cooking more enjoyable.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Recipe API', 'Local Storage']
    },
    {
        id: 'quiz-application',
        title: 'Quiz Application',
        image: 'https://placehold.co/400x250/000000/FFFFFF?text=Quiz+App',
        shortDescription: 'An interactive quiz app with multiple categories and difficulty levels.',
        longDescription: 'This project is a fun and engaging quiz application where users can test their knowledge on various topics. It features multiple-choice questions, a timer, score tracking, and a results summary. Questions are loaded dynamically, and the app provides instant feedback on answers. It\'s designed to be highly customizable, allowing for easy addition of new questions and categories.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'JSON Data']
    }
];

// Get main sections and project details section
const mainContent = document.getElementById('main-content');
const projectDetailsSection = document.getElementById('project-details-section');
const projectDetailsContent = document.getElementById('project-details-content');
const mainNavLinks = document.getElementById('main-nav-links');
const projectNavLinks = document.getElementById('project-nav-links');
const logoLink = document.getElementById('logo-link');
const heroViewWorkBtn = document.getElementById('hero-view-work-btn');

// Back to home buttons
const backToHomeBtnSection = document.getElementById('back-to-home-btn-section');
const backToHomeBtnNav = document.getElementById('back-to-home-btn-nav');

// Define the approximate height of the fixed navigation bar for scrolling offset
const NAV_HEIGHT = 80; // Adjust this value if your nav bar height changes significantly

/**
 * Smoothly scrolls the window to a target element or to the top.
 * Uses an easeOutCubic easing function for a dampened effect.
 * @param {HTMLElement|null} targetElement The element to scroll to. If null, scrolls to top.
 * @param {number} duration The duration of the scroll animation in milliseconds.
 */
function smoothScrollTo(targetElement, duration = 800) {
    const startY = window.scrollY;
    let targetY = 0;

    if (targetElement) {
        // Calculate target position, accounting for fixed nav bar
        targetY = targetElement.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
        // Ensure targetY is not negative (don't scroll above 0)
        targetY = Math.max(0, targetY);
    } else {
        // If no target element, scroll to top (0)
        targetY = 0;
    }

    const distance = targetY - startY;
    let startTime = null;

    function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function: easeOutCubic (for dampened effect)
        // f(t) = 1 - (1 - t)^3
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startY + distance * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

// Function to show the main content and hide project details
function showMainContent() {
    mainContent.classList.remove('hidden-section');
    projectDetailsSection.classList.add('hidden-section');
    mainNavLinks.classList.remove('hidden');
    projectNavLinks.classList.add('hidden');
    smoothScrollTo(null); // Smooth scroll to top of main content
}

// Function to show project details and hide main content
function showProjectDetails(projectId) {
    const project = projects.find(p => p.id === projectId);

    if (project) {
        projectDetailsContent.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover mb-6 shadow-md">
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">${project.title}</h1>
            <p class="text-gray-700 text-lg mb-6 leading-relaxed">${project.longDescription}</p>
            <div class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-3">Technologies Used:</h2>
                <ul class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `<li class="bg-indigo-100 text-indigo-800 px-3 py-1 text-sm font-medium rounded-none">${tech}</li>`).join('')}
                </ul>
            </div>
        `;
        mainContent.classList.add('hidden-section');
        projectDetailsSection.classList.remove('hidden-section');
        mainNavLinks.classList.add('hidden');
        projectNavLinks.classList.remove('hidden');
        smoothScrollTo(null); // Smooth scroll to top of details section
    } else {
        projectDetailsContent.innerHTML = '<p class="text-center text-red-500">Project details not found.</p>';
        mainContent.classList.add('hidden-section');
        projectDetailsSection.classList.remove('hidden-section');
        mainNavLinks.classList.add('hidden');
        projectNavLinks.classList.remove('hidden');
        smoothScrollTo(null);
    }
}

// Function to render project cards
function renderProjectCards() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = ''; // Clear existing content

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        // Removed rounded-md from projectCard
        projectCard.className = 'bg-white shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer btn-solid-shadow';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">${project.title}</h3>
                <p class="text-gray-600 text-sm mb-4">${project.shortDescription}</p>
                <button data-project-id="${project.id}"
                        class="view-details-btn bg-indigo-500 text-white font-medium py-2 px-4 hover:bg-indigo-600 transition duration-300 btn-solid-shadow">
                    View Details
                </button>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });

    // Add event listeners to "View Details" buttons
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const projectId = event.target.dataset.projectId;
            showProjectDetails(projectId);
        });
    });
}

// Event listeners for "Back to Home" buttons
backToHomeBtnSection.addEventListener('click', showMainContent);
backToHomeBtnNav.addEventListener('click', showMainContent);

// Event listener for the logo link
logoLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior (page reload)
    showMainContent(); // Show main content and smooth scroll to top
});

// Event listener for the "View My Work" button in the Hero section
heroViewWorkBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior (page reload)
    const targetElement = document.getElementById('projects');
    if (targetElement) {
        // Ensure main content is visible before scrolling
        if (mainContent.classList.contains('hidden-section')) {
            showMainContent();
            setTimeout(() => {
                smoothScrollTo(targetElement);
            }, 100); // Small delay for smooth transition
        } else {
            smoothScrollTo(targetElement);
        }
    }
});

// Initial render when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    renderProjectCards();

    // Handle direct navigation to sections from URL hash (e.g., #contact)
    // This ensures main content is shown if someone lands on a specific section
    if (window.location.hash && window.location.hash !== '#projects-details-section') {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            showMainContent();
            setTimeout(() => {
                smoothScrollTo(targetElement);
            }, 100); // Small delay for smooth transition
        }
    }
    // If no hash or a non-project details hash, ensure main content is visible
    if (!window.location.hash || (window.location.hash && !window.location.hash.includes('project-details'))) {
        showMainContent();
    }
});

// Ensure main navigation links always prevent default and scroll smoothly
document.querySelectorAll('#main-nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior (page reload)

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // If project details section is currently visible, first switch to main content
            if (!projectDetailsSection.classList.contains('hidden-section')) {
                showMainContent();
                // Add a small delay to allow the main content to become visible before scrolling
                setTimeout(() => {
                    smoothScrollTo(targetElement);
                }, 100);
            } else {
                // If main content is already visible, just scroll to the target section
                smoothScrollTo(targetElement);
            }
        }
    });
});