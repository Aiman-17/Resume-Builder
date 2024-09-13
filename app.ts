interface Project {
    name: string;
    description: string;
    image: string;
}

class ProjectManager {
    private projects: Project[] = [];
    private storageKey = 'myProjects';

    constructor() {
        this.loadProjects();
        this.setupEventListeners();
        this.renderProjects();
    }

    private setupEventListeners(): void {
        const form = document.getElementById('projectForm') as HTMLFormElement;
        form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    private handleFormSubmit(event: Event): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const nameInput = form.elements.namedItem('projectName') as HTMLInputElement;
        const descriptionInput = form.elements.namedItem('projectDescription') as HTMLTextAreaElement;
        const imageInput = form.elements.namedItem('projectImage') as HTMLInputElement;

        if (nameInput && descriptionInput && imageInput && imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const project: Project = {
                    name: nameInput.value,
                    description: descriptionInput.value,
                    image: e.target?.result as string
                };
                this.addProject(project);
                form.reset();
            };
            reader.readAsDataURL(imageInput.files[0]);
        }
    }

    private addProject(project: Project): void {
        this.projects.push(project);
        this.saveProjects();
        this.renderProjects();
    }

    private renderProjects(): void {
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

    private saveProjects(): void {
        localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
    }

    private loadProjects(): void {
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