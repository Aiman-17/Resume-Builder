class ProjectManager {
    constructor() {
        this.projects = [];
        this.storageKey = 'myProjects';
        this.loadProjects();
        this.setupEventListeners();
        this.renderProjects();
    }
    setupEventListeners() {
        const form = document.getElementById('projectForm');
        form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const nameInput = form.elements.namedItem('projectName');
        const descriptionInput = form.elements.namedItem('projectDescription');
        const imageInput = form.elements.namedItem('projectImage');
        if (nameInput && descriptionInput && imageInput && imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                const project = {
                    name: nameInput.value,
                    description: descriptionInput.value,
                    image: (_a = e.target) === null || _a === void 0 ? void 0 : _a.result
                };
                this.addProject(project);
                form.reset();
            };
            reader.readAsDataURL(imageInput.files[0]);
        }
    }
    addProject(project) {
        this.projects.push(project);
        this.saveProjects();
        this.renderProjects();
    }
    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (projectsGrid) {
            projectsGrid.innerHTML = '';
            this.projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <img src="${project.image}" alt="${project.name}">
                `;
                projectsGrid.appendChild(projectCard);
            });
        }
    }
    saveProjects() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
    }
    loadProjects() {
        const savedProjects = localStorage.getItem(this.storageKey);
        if (savedProjects) {
            this.projects = JSON.parse(savedProjects);
        }
    }
}
// Initialize the ProjectManager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectManager();
});

