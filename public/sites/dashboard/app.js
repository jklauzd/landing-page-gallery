/**
 * Aether Nexus Dashboard Logic
 * Tab Handling, Chart Initialization, Realtime Simulation & Dynamic Modals
 */

// Initial Simulated Data
const initialData = {
    revenue: 142850,
    activeProjectsCount: 18,
    maxProjectsCount: 24,
    csat: 4.9,
    efficiency: 94.2,
    
    projects: [
        {
            id: 'aeroflow',
            title: 'AeroFlow Mobile App',
            category: 'mobile',
            description: 'Redesign completo da interface de controle aeroespacial da AeroFlow, com foco em usabilidade e performance em tempo real.',
            completion: 85,
            budget: 48000,
            stars: 4.9,
            deadline: '15 Set 2026',
            tech: ['React Native', 'TypeScript', 'WebSockets'],
            team: ['Luiza', 'Vitor', 'Thiago'],
            tasks: [
                { id: 't1', text: 'Desenvolvimento do Design System Mobile', done: true },
                { id: 't2', text: 'Integração de WebSockets com API de Telemetria', done: true },
                { id: 't3', text: 'Otimização de Renderização de Gráficos em Tempo Real', done: false },
                { id: 't4', text: 'Testes de Carga de Rede e Simulação', done: false }
            ]
        },
        {
            id: 'novaportal',
            title: 'E-commerce Nova Portal',
            category: 'web',
            description: 'Plataforma web de e-commerce corporativa de alta performance com design moderno e integração com múltiplos gateways de pagamento.',
            completion: 74,
            budget: 62000,
            stars: 4.8,
            deadline: '02 Out 2026',
            tech: ['Next.js', 'Tailwind', 'Stripe', 'PostgreSQL'],
            team: ['Mariana', 'Vitor'],
            tasks: [
                { id: 't1', text: 'Design UI/UX aprovado', done: true },
                { id: 't2', text: 'Desenvolvimento do Front-end das Páginas de Produto', done: true },
                { id: 't3', text: 'Integração do Stripe Checkout', done: false },
                { id: 't4', text: 'Pipeline de Deploy em Nuvem', done: false }
            ]
        },
        {
            id: 'cybersec',
            title: 'CyberSec Landing Page',
            category: 'design',
            description: 'Identidade visual e landing page com animações avançadas em WebGL para empresa líder em segurança digital.',
            completion: 42,
            budget: 18500,
            stars: 5.0,
            deadline: '20 Ago 2026',
            tech: ['Figma', 'Three.js', 'GSAP', 'HTML5/CSS3'],
            team: ['Felipe', 'Mariana'],
            tasks: [
                { id: 't1', text: 'Concepção de Identidade Visual e Logotipo', done: true },
                { id: 't2', text: 'Criação de Protótipo no Figma', done: true },
                { id: 't3', text: 'Implementação de Efeitos 3D WebGL', done: false },
                { id: 't4', text: 'Otimização de SEO e Acessibilidade', done: false }
            ]
        },
        {
            id: 'quantumnucleus',
            title: 'Quantum Ledger Smart Contract',
            category: 'ai',
            description: 'Auditoria de segurança e desenvolvimento de contratos inteligentes escaláveis de finanças descentralizadas na rede Ethereum.',
            completion: 91,
            budget: 95000,
            stars: 4.9,
            deadline: '28 Jul 2026',
            tech: ['Solidity', 'Hardhat', 'Web3.js', 'Ethers'],
            team: ['Thiago', 'Felipe'],
            tasks: [
                { id: 't1', text: 'Modelagem do Tokenomics do Contrato', done: true },
                { id: 't2', text: 'Escrita do Código do Contrato Inteligente', done: true },
                { id: 't3', text: 'Testes Unitários de Funções de Transferência', done: true },
                { id: 't4', text: 'Auditoria Externa de Vulnerabilidades', done: false }
            ]
        },
        {
            id: 'nexusdesign',
            title: 'Manual de Identidade Nexus Studio',
            category: 'design',
            description: 'Manual de marca definitivo com diretrizes tipográficas, paletas de cores e assets gráficos para a expansão do Nexus Group.',
            completion: 100,
            budget: 25000,
            stars: 4.7,
            deadline: 'Concluído',
            tech: ['Illustrator', 'InDesign', 'Brand Guidelines'],
            team: ['Luiza', 'Felipe'],
            tasks: [
                { id: 't1', text: 'Pesquisa de Concorrentes e Brand Archetype', done: true },
                { id: 't2', text: 'Desenvolvimento do Logotipo Conceito', done: true },
                { id: 't3', text: 'Paleta de Cores e Tipografias', done: true },
                { id: 't4', text: 'Exportação de Assets e Guias do Desenvolvedor', done: true }
            ]
        },
        {
            id: 'aianalytics',
            title: 'Aether Insight AI Platform',
            category: 'ai',
            description: 'Interface de painel com integração OpenAI para análise preditiva automatizada de dados corporativos complexos.',
            completion: 30,
            budget: 110000,
            stars: 5.0,
            deadline: '10 Nov 2026',
            tech: ['Python', 'FastAPI', 'React', 'OpenAI API'],
            team: ['Thiago', 'Mariana', 'Luiza'],
            tasks: [
                { id: 't1', text: 'Definição da Arquitetura do Modelo Preditivo', done: true },
                { id: 't2', text: 'Desenvolvimento de APIs em FastAPI', done: false },
                { id: 't3', text: 'Painel Visual de Analytics em React', done: false },
                { id: 't4', text: 'Integração de LLMs e Geração de Relatórios', done: false }
            ]
        }
    ],

    team: [
        { name: 'Luiza', role: 'UI/UX Designer', status: 'available', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', skills: ['Figma', 'Prototipagem', 'Design System'], workload: 65, tasksCount: 3 },
        { name: 'Vitor', role: 'Full Stack Dev', status: 'busy', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', skills: ['Node.js', 'React', 'PostgreSQL'], workload: 85, tasksCount: 5 },
        { name: 'Thiago', role: 'Blockchain & AI Lead', status: 'busy', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80', skills: ['Solidity', 'Python', 'OpenAI'], workload: 90, tasksCount: 6 },
        { name: 'Mariana', role: 'Front-end Specialist', status: 'available', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', skills: ['Next.js', 'Tailwind', 'GSAP'], workload: 70, tasksCount: 4 },
        { name: 'Felipe', role: 'Creative Director', status: 'available', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', skills: ['Branding', 'WebGL', 'User Research'], workload: 50, tasksCount: 2 }
    ],

    feedbacks: [
        { client: 'AeroFlow Labs', project: 'AeroFlow Mobile App', rating: 5, comment: 'Entrega rápida e design que superou nossas expectativas de performance.', date: '05 Jul 2026', status: 'Concluído' },
        { client: 'Grupo Nova Portal', project: 'E-commerce Nova Portal', rating: 4, comment: 'Equipe altamente técnica, o progresso está muito consistente.', date: '01 Jul 2026', status: 'Em andamento' },
        { client: 'CyberSec Inc.', project: 'CyberSec Landing Page', rating: 5, comment: 'Os efeitos 3D ficaram fantásticos. Ótima comunicação.', date: '28 Jun 2026', status: 'Em andamento' },
        { client: 'Quantum Venture', project: 'Quantum Ledger Smart Contract', rating: 5, comment: 'Competência extraordinária no desenvolvimento do Smart Contract DeFi.', date: '20 Jun 2026', status: 'Concluído' }
    ],

    activities: [
        { text: 'Projeto <strong>Aether Insight</strong> iniciado no estúdio por Thiago.', time: 'Há 12 minutos', icon: 'play-circle', type: 'start' },
        { text: 'Luiza atualizou o Design System do <strong>AeroFlow App</strong>.', time: 'Há 1 hora', icon: 'edit-3', type: 'update' },
        { text: 'Nova avaliação de 5 estrelas recebida da <strong>CyberSec Inc.</strong>', time: 'Há 3 horas', icon: 'star', type: 'success' },
        { text: 'Deploy de homologação concluído para <strong>Quantum Contract</strong>.', time: 'Ontem', icon: 'server', type: 'success' }
    ]
};

class DashboardApp {
    constructor() {
        this.data = JSON.parse(JSON.stringify(initialData));
        this.charts = {};
        this.activeTab = 'overview';
        this.selectedProject = null;
        this.simulationTimer = null;
        
        // Settings State
        this.settings = {
            accentColor: 'indigo',
            glassmorphism: true,
            realtimeActive: true,
            volatility: 5
        };

        this.init();
    }

    init() {
        // Render Initial Data
        this.renderTime();
        this.renderOverviewKPIs();
        this.renderActivities();
        this.renderHealthChecks();
        this.renderPortfolio();
        this.renderFeedbacksTable();
        this.renderTeam();
        
        // Setup Theme & Charts
        this.setupTheme();
        this.initCharts();
        
        // Setup Event Listeners
        this.setupEventListeners();
        
        // Start Timers
        setInterval(() => this.renderTime(), 1000);
        this.startRealtimeSimulation();

        // Render Icons
        lucide.createIcons();
    }

    // --- Core Layout & Navigation ---
    switchTab(tabId) {
        // Update nav UI
        document.querySelectorAll('.sidebar-nav li').forEach(li => {
            if (li.getAttribute('data-tab') === tabId) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });

        // Update content pane visibility
        document.querySelectorAll('.tab-pane').forEach(pane => {
            if (pane.id === `${tabId}-pane`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });

        this.activeTab = tabId;

        // Force chart resize/renders if entering charts tabs
        if (tabId === 'overview') {
            this.charts.performance?.resize();
            this.charts.status?.resize();
        } else if (tabId === 'analytics') {
            this.charts.traffic?.resize();
            this.charts.funnel?.resize();
            this.charts.satisfaction?.resize();
        }
    }

    renderTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString('pt-BR');
        }
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeButtonIcon();
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeButtonIcon();
        
        // Re-render charts with new theme colors
        this.updateChartThemes();
    }

    updateThemeButtonIcon() {
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            themeBtn.setAttribute('title', currentTheme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro');
        }
    }

    // --- Dynamic Content Rendering ---
    renderOverviewKPIs() {
        document.getElementById('kpi-revenue').textContent = `R$ ${this.data.revenue.toLocaleString('pt-BR')}`;
        document.getElementById('kpi-projects').textContent = `${this.data.activeProjectsCount} / ${this.data.maxProjectsCount}`;
        document.getElementById('kpi-csat').textContent = `${this.data.csat.toFixed(1)} / 5.0`;
        document.getElementById('kpi-efficiency').textContent = `${this.data.efficiency.toFixed(1)}%`;
    }

    renderActivities() {
        const list = document.getElementById('recent-activities-list');
        if (!list) return;

        list.innerHTML = this.data.activities.map(act => {
            let iconClass = 'info';
            if (act.type === 'start') iconClass = 'accent-indigo';
            if (act.type === 'success') iconClass = 'accent-green';
            if (act.type === 'update') iconClass = 'accent-cyan';

            return `
                <div class="activity-item">
                    <div class="activity-icon-wrap ${iconClass}">
                        <i data-lucide="${act.icon}"></i>
                    </div>
                    <div class="activity-info">
                        <p>${act.text}</p>
                        <span class="activity-time">${act.time}</span>
                    </div>
                </div>
            `;
        }).join('');
        lucide.createIcons();
    }

    renderHealthChecks() {
        const container = document.getElementById('health-checks-container');
        if (!container) return;

        // Take first 4 projects for overview health dashboard
        const items = this.data.projects.slice(0, 4);
        container.innerHTML = items.map(proj => {
            let healthStatus = 'good';
            let healthText = 'Saudável';
            if (proj.completion < 50) {
                healthStatus = 'critical';
                healthText = 'Risco Atraso';
            } else if (proj.completion < 80) {
                healthStatus = 'warning';
                healthText = 'Sob Alerta';
            }

            return `
                <div class="health-item ${healthStatus}">
                    <div class="health-meta">
                        <span class="health-name">${proj.title}</span>
                        <span class="health-val">${proj.completion}% ${healthText}</span>
                    </div>
                    <div class="progress-bar-sm">
                        <div class="progress-fill" style="width: ${proj.completion}%"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderPortfolio(filter = 'all', searchQuery = '') {
        const grid = document.getElementById('projects-grid-container');
        if (!grid) return;

        let filtered = this.data.projects;

        if (filter !== 'all') {
            filtered = filtered.filter(p => p.category === filter);
        }

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query) || 
                p.tech.some(t => t.toLowerCase().includes(query))
            );
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                    <i data-lucide="folder-open" style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.5;"></i>
                    <p>Nenhum projeto encontrado correspondente aos filtros.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        grid.innerHTML = filtered.map(p => {
            const avatars = p.team.map(name => {
                const member = this.data.team.find(t => t.name === name);
                return `<img src="${member?.avatar || ''}" alt="${name}" title="${name}" class="team-avatar-stack">`;
            }).join('');

            const techBadges = p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

            return `
                <div class="project-card" onclick="app.openProjectDetail('${p.id}')">
                    <div class="project-card-header">
                        <span class="project-category">${p.category}</span>
                        <span class="project-stars"><i data-lucide="star"></i> ${p.stars.toFixed(1)}</span>
                    </div>
                    <div class="project-card-body">
                        <h3>${p.title}</h3>
                        <p>${p.description}</p>
                    </div>
                    <div class="project-progress-area">
                        <div class="project-progress-meta">
                            <span class="project-progress-text">Progresso</span>
                            <span class="project-progress-percentage">${p.completion}%</span>
                        </div>
                        <div class="progress-bar-lg">
                            <div class="progress-fill" style="width: ${p.completion}%"></div>
                        </div>
                    </div>
                    <div class="project-card-footer">
                        <div class="project-stack">
                            ${techBadges}
                        </div>
                        <div class="project-card-team">
                            ${avatars}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        lucide.createIcons();
    }

    renderFeedbacksTable() {
        const body = document.getElementById('feedbacks-table-body');
        if (!body) return;

        body.innerHTML = this.data.feedbacks.map(f => {
            const stars = Array(f.rating).fill('<i data-lucide="star"></i>').join('');
            const statusClass = f.status === 'Concluído' ? 'success' : 'info';

            return `
                <tr>
                    <td><strong>${f.client}</strong></td>
                    <td>${f.project}</td>
                    <td><div class="star-rating">${stars}</div></td>
                    <td>"${f.comment}"</td>
                    <td>${f.date}</td>
                    <td><span class="table-badge ${statusClass}">${f.status}</span></td>
                </tr>
            `;
        }).join('');
        lucide.createIcons();
    }

    renderTeam(searchQuery = '') {
        const container = document.getElementById('team-cards-container');
        if (!container) return;

        let filtered = this.data.team;
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(t => 
                t.name.toLowerCase().includes(query) || 
                t.role.toLowerCase().includes(query) || 
                t.skills.some(s => s.toLowerCase().includes(query))
            );
        }

        container.innerHTML = filtered.map(t => {
            const statusLabel = t.status === 'available' ? 'Livre' : t.status === 'busy' ? 'Ocupado' : 'Offline';
            const skillsBadges = t.skills.map(s => `<span class="tech-badge">${s}</span>`).join('');

            return `
                <div class="team-card">
                    <div class="team-card-header">
                        <img src="${t.avatar}" alt="${t.name}" class="team-avatar-lg">
                        <span class="team-status-badge ${t.status}" title="Status: ${statusLabel}"></span>
                    </div>
                    <div class="team-card-info">
                        <h3>${t.name}</h3>
                        <p>${t.role}</p>
                    </div>
                    <div class="team-skills-container">
                        ${skillsBadges}
                    </div>
                    <div class="team-card-workload">
                        <div class="workload-meta">
                            <span>Carga Semanal</span>
                            <span class="workload-percentage">${t.workload}%</span>
                        </div>
                        <div class="progress-bar-sm">
                            <div class="progress-fill" style="width: ${t.workload}%; background-color: ${t.workload > 80 ? 'var(--warning)' : 'var(--accent-color)'}"></div>
                        </div>
                    </div>
                    <button class="team-action-btn" onclick="app.simulateContactTeam('${t.name}')">Contatar</button>
                </div>
            `;
        }).join('');
    }

    // --- Modal Control ---
    openProjectDetail(projectId) {
        const proj = this.data.projects.find(p => p.id === projectId);
        if (!proj) return;

        this.selectedProject = proj;

        // Set text items
        document.getElementById('modal-project-category').textContent = proj.category.toUpperCase();
        document.getElementById('modal-project-title').textContent = proj.title;
        document.getElementById('modal-project-description').textContent = proj.description;
        document.getElementById('modal-project-budget').textContent = `R$ ${proj.budget.toLocaleString('pt-BR')}`;
        document.getElementById('modal-project-completion').textContent = `${proj.completion}%`;
        document.getElementById('modal-project-deadline').textContent = proj.deadline;

        // Set Tech list
        const techBox = document.getElementById('modal-project-tech');
        techBox.innerHTML = proj.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

        // Set Team list
        const teamBox = document.getElementById('modal-project-team-list');
        teamBox.innerHTML = proj.team.map(name => {
            const member = this.data.team.find(t => t.name === name);
            return `
                <div class="modal-team-member">
                    <img src="${member?.avatar}" alt="${name}">
                    <span>${name}</span>
                </div>
            `;
        }).join('');

        // Render checklist with toggle capabilities
        this.renderModalChecklist();

        // Update progress circle indicator
        this.updateModalProgressCircle(proj.completion);

        // Open Modal
        document.getElementById('project-detail-modal').classList.add('active');
    }

    closeProjectDetail() {
        document.getElementById('project-detail-modal').classList.remove('active');
        this.selectedProject = null;
        
        // Re-render dashboards to save any task completion edits
        this.renderPortfolio();
        this.renderHealthChecks();
        this.updateProjectStatusChart();
    }

    toggleProjectTask(taskId) {
        if (!this.selectedProject) return;

        const task = this.selectedProject.tasks.find(t => t.id === taskId);
        if (task) {
            task.done = !task.done;
        }

        // Re-calculate project completion percent
        const doneCount = this.selectedProject.tasks.filter(t => t.done).length;
        const totalCount = this.selectedProject.tasks.length;
        const newPct = Math.round((doneCount / totalCount) * 100);
        this.selectedProject.completion = newPct;

        // Update modal UI
        document.getElementById('modal-project-completion').textContent = `${newPct}%`;
        this.updateModalProgressCircle(newPct);
        this.renderModalChecklist();
    }

    renderModalChecklist() {
        const list = document.getElementById('modal-project-tasks');
        if (!list || !this.selectedProject) return;

        list.innerHTML = this.selectedProject.tasks.map(t => {
            return `
                <div class="checklist-item ${t.done ? 'done' : ''}" onclick="app.toggleProjectTask('${t.id}')">
                    <div class="checklist-checkbox">
                        <i data-lucide="check"></i>
                    </div>
                    <span>${t.text}</span>
                </div>
            `;
        }).join('');
        lucide.createIcons();
    }

    updateModalProgressCircle(percentage) {
        const circle = document.getElementById('modal-progress-circle');
        if (!circle) return;

        // Circle circumference is 2 * PI * r = 2 * 3.14159 * 20 = 125.66
        const circumference = 125.6;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    // --- ChartJS Integration ---
    getChartColors() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
        const textColor = isDark ? '#94a3b8' : '#64748b';
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim();
        const accentRGB = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();

        return { gridColor, textColor, accent, accentRGB };
    }

    initCharts() {
        const colors = this.getChartColors();

        // 1. Overview: Financial & Deliveries Performance
        const perfCtx = document.getElementById('performanceChart')?.getContext('2d');
        if (perfCtx) {
            this.charts.performance = new Chart(perfCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [
                        {
                            label: 'Faturamento (x1000 R$)',
                            data: [85, 98, 110, 115, 128, 142.8],
                            borderColor: colors.accent,
                            backgroundColor: `rgba(${colors.accentRGB}, 0.1)`,
                            fill: true,
                            tension: 0.4,
                            borderWidth: 3,
                            pointBackgroundColor: colors.accent,
                            pointBorderColor: '#ffffff',
                            pointHoverRadius: 7
                        },
                        {
                            label: 'Custos Operacionais (x1000 R$)',
                            data: [60, 68, 72, 70, 78, 82],
                            borderColor: 'rgba(244, 63, 94, 0.8)',
                            backgroundColor: 'transparent',
                            fill: false,
                            tension: 0.3,
                            borderWidth: 2,
                            pointBackgroundColor: 'rgba(244, 63, 94, 0.8)',
                            pointHoverRadius: 5
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: { color: colors.textColor, font: { family: 'Inter', size: 11 } }
                        }
                    },
                    scales: {
                        x: {
                            grid: { color: colors.gridColor },
                            ticks: { color: colors.textColor, font: { family: 'Inter' } }
                        },
                        y: {
                            grid: { color: colors.gridColor },
                            ticks: { color: colors.textColor, font: { family: 'Inter' } }
                        }
                    }
                }
            });
        }

        // 2. Overview: Project Status Breakdown
        const statusCtx = document.getElementById('projectStatusChart')?.getContext('2d');
        if (statusCtx) {
            const dataCounts = this.getProjectStatusCounts();
            this.charts.status = new Chart(statusCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Concluídos', 'Em andamento', 'Sob Revisão', 'Atrasados'],
                    datasets: [{
                        data: dataCounts,
                        backgroundColor: [
                            '#10b981', // green
                            colors.accent, // accent
                            '#9333ea', // purple
                            '#ef4444'  // red
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: colors.textColor, font: { family: 'Inter', size: 11 }, padding: 15 }
                        }
                    },
                    cutout: '75%'
                }
            });
        }

        // 3. Analytics: Traffic Sources
        const trafficCtx = document.getElementById('trafficSourcesChart')?.getContext('2d');
        if (trafficCtx) {
            this.charts.traffic = new Chart(trafficCtx, {
                type: 'bar',
                data: {
                    labels: ['Orgânico', 'Indicações', 'Mídias Sociais', 'Direto', 'Anúncios'],
                    datasets: [{
                        label: 'Leads Captados',
                        data: [120, 185, 95, 60, 140],
                        backgroundColor: colors.accent,
                        borderRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { color: colors.textColor, font: { family: 'Inter' } }
                        },
                        y: {
                            grid: { color: colors.gridColor },
                            ticks: { color: colors.textColor }
                        }
                    }
                }
            });
        }

        // 4. Analytics: Conversion Funnel
        const funnelCtx = document.getElementById('conversionFunnelChart')?.getContext('2d');
        if (funnelCtx) {
            this.charts.funnel = new Chart(funnelCtx, {
                type: 'bar',
                data: {
                    labels: ['Contatos (600)', 'Reuniões (340)', 'Propostas (120)', 'Fechados (45)'],
                    datasets: [{
                        label: 'Conversão',
                        data: [100, 56.6, 20, 7.5], // percentage rates
                        backgroundColor: [
                            'rgba(6, 182, 212, 0.8)',
                            'rgba(80, 70, 229, 0.8)',
                            'rgba(147, 51, 234, 0.8)',
                            'rgba(16, 185, 129, 0.8)'
                        ],
                        borderRadius: 6,
                        barThickness: 32
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: {
                            grid: { color: colors.gridColor },
                            ticks: { color: colors.textColor, callback: value => `${value}%` }
                        },
                        y: {
                            grid: { display: false },
                            ticks: { color: colors.textColor, font: { family: 'Inter', weight: 'bold' } }
                        }
                    }
                }
            });
        }

        // 5. Analytics: NPS Trend
        const satisfactionCtx = document.getElementById('customerSatisfactionChart')?.getContext('2d');
        if (satisfactionCtx) {
            this.charts.satisfaction = new Chart(satisfactionCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Nota de Satisfação (NPS)',
                        data: [4.4, 4.6, 4.5, 4.7, 4.8, 4.9],
                        borderColor: '#10b981',
                        backgroundColor: 'transparent',
                        borderWidth: 4,
                        tension: 0.3,
                        pointBackgroundColor: '#10b981',
                        pointHoverRadius: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        x: {
                            grid: { color: colors.gridColor },
                            ticks: { color: colors.textColor }
                        },
                        y: {
                            grid: { color: colors.gridColor },
                            ticks: { color: colors.textColor },
                            min: 4.0,
                            max: 5.0
                        }
                    }
                }
            });
        }
    }

    getProjectStatusCounts() {
        let completed = 0;
        let ongoing = 0;
        let review = 0;
        let delayed = 0;

        this.data.projects.forEach(p => {
            if (p.completion === 100) completed++;
            else if (p.completion < 50) delayed++;
            else if (p.completion >= 80) review++;
            else ongoing++;
        });

        return [completed, ongoing, review, delayed];
    }

    updateProjectStatusChart() {
        if (this.charts.status) {
            this.charts.status.data.datasets[0].data = this.getProjectStatusCounts();
            this.charts.status.update();
        }
    }

    updateChartThemes() {
        const colors = this.getChartColors();

        Object.keys(this.charts).forEach(key => {
            const chart = this.charts[key];
            if (!chart) return;

            // Update axes grid and ticks colors
            if (chart.options.scales) {
                if (chart.options.scales.x) {
                    if (chart.options.scales.x.grid) chart.options.scales.x.grid.color = colors.gridColor;
                    if (chart.options.scales.x.ticks) chart.options.scales.x.ticks.color = colors.textColor;
                }
                if (chart.options.scales.y) {
                    if (chart.options.scales.y.grid) chart.options.scales.y.grid.color = colors.gridColor;
                    if (chart.options.scales.y.ticks) chart.options.scales.y.ticks.color = colors.textColor;
                }
            }

            // Update legends color
            if (chart.options.plugins && chart.options.plugins.legend && chart.options.plugins.legend.labels) {
                chart.options.plugins.legend.labels.color = colors.textColor;
            }

            // Update specific dataset colors matching accent choices
            if (key === 'performance') {
                chart.data.datasets[0].borderColor = colors.accent;
                chart.data.datasets[0].backgroundColor = `rgba(${colors.accentRGB}, 0.1)`;
                chart.data.datasets[0].pointBackgroundColor = colors.accent;
            }
            if (key === 'status') {
                chart.data.datasets[0].backgroundColor[1] = colors.accent;
            }
            if (key === 'traffic') {
                chart.data.datasets[0].backgroundColor = colors.accent;
            }

            chart.update();
        });
    }

    // --- Interactive simulated processes ---
    startRealtimeSimulation() {
        if (this.simulationTimer) clearInterval(this.simulationTimer);

        if (!this.settings.realtimeActive) return;

        this.simulationTimer = setInterval(() => {
            // Apply minor volatile metric updates
            const speedFactor = this.settings.volatility / 5; // Normalize speed
            
            // 1. Update revenue (+/- minor drift)
            const driftPercent = (Math.random() - 0.4) * 0.005 * speedFactor; // slight upward drift
            this.data.revenue = Math.round(this.data.revenue * (1 + driftPercent));

            // 2. Randomly adjust project progress by +1%
            if (Math.random() > 0.6) {
                const ongoingProjects = this.data.projects.filter(p => p.completion < 100);
                if (ongoingProjects.length > 0) {
                    const randomProj = ongoingProjects[Math.floor(Math.random() * ongoingProjects.length)];
                    randomProj.completion = Math.min(100, randomProj.completion + 1);
                    this.renderHealthChecks();
                    this.updateProjectStatusChart();
                }
            }

            // 3. Random efficiency adjustments
            const efficiencyDrift = (Math.random() - 0.5) * 0.4 * speedFactor;
            this.data.efficiency = Math.min(100, Math.max(80, this.data.efficiency + efficiencyDrift));

            // 4. Client satisfaction adjustments
            if (Math.random() > 0.8) {
                const csatDrift = (Math.random() - 0.3) * 0.05 * speedFactor;
                this.data.csat = Math.min(5.0, Math.max(4.0, this.data.csat + csatDrift));
            }

            // Re-render Overview KPIs
            this.renderOverviewKPIs();

            // Symmetrically update chart values slowly
            if (this.charts.performance && Math.random() > 0.7) {
                const performanceData = this.charts.performance.data.datasets[0].data;
                performanceData[performanceData.length - 1] = Number((this.data.revenue / 1000).toFixed(1));
                this.charts.performance.update();
            }

        }, 10000);
    }

    simulateNewEvent() {
        const events = [
            { text: 'Novo lead qualificado cadastrado via formulário orgânico.', type: 'update', icon: 'user-plus' },
            { text: 'Equipe do <strong>Nova Portal</strong> iniciou sprint de homologação de pagamentos.', type: 'start', icon: 'play' },
            { text: 'Feedback excepcional coletado da <strong>AeroFlow Labs</strong>.', type: 'success', icon: 'award' },
            { text: 'Prazo estendido do projeto <strong>CyberSec Landing Page</strong> a pedido do cliente.', type: 'update', icon: 'calendar' }
        ];

        const chosen = events[Math.floor(Math.random() * events.length)];
        
        // Add to activities list at index 0
        this.data.activities.unshift({
            text: chosen.text,
            time: 'Agora mesmo',
            icon: chosen.icon,
            type: chosen.type
        });

        // Limit activities stack to 6
        if (this.data.activities.length > 6) {
            this.data.activities.pop();
        }

        // Create animation feedback
        this.renderActivities();

        // Increment notifications count
        const badge = document.querySelector('.notification-btn .badge');
        if (badge) {
            const current = parseInt(badge.textContent) || 0;
            badge.textContent = current + 1;
            badge.style.display = 'flex';
        }

        // Add to notification dropdown list
        const notifContainer = document.getElementById('notification-list-container');
        if (notifContainer) {
            const div = document.createElement('div');
            div.className = 'notification-item unread';
            
            let iconColor = 'info';
            if (chosen.type === 'start') iconColor = 'info';
            if (chosen.type === 'success') iconColor = 'success';
            if (chosen.type === 'update') iconColor = 'warning';

            div.innerHTML = `
                <div class="notif-icon ${iconColor}"><i data-lucide="${chosen.icon}"></i></div>
                <div class="notif-content">
                    <p>${chosen.text}</p>
                    <span>Agora</span>
                </div>
            `;
            notifContainer.insertBefore(div, notifContainer.firstChild);
            lucide.createIcons();
        }
    }

    simulateContactTeam(memberName) {
        alert(`Simulação: Canal Slack/E-mail aberto com ${memberName}. Uma nova janela de chat seria iniciada.`);
    }

    updateProfile() {
        const nameInput = document.getElementById('user-name-input').value;
        const roleInput = document.getElementById('user-role-input').value;
        const avatarInput = document.getElementById('user-avatar-input').value;

        // Apply changes locally
        document.getElementById('sidebar-name').textContent = nameInput;
        document.getElementById('sidebar-role').textContent = roleInput;
        document.getElementById('greeting-name').textContent = nameInput.split(' ')[0];
        document.getElementById('sidebar-avatar').setAttribute('src', avatarInput);

        alert('Perfil atualizado com sucesso no painel demonstrativo!');
    }

    // --- Settings handlers ---
    setAccentColor(colorName) {
        const swatches = document.querySelectorAll('#accent-color-picker .color-swatch');
        swatches.forEach(swatch => {
            if (swatch.getAttribute('data-color') === colorName) {
                swatch.classList.add('active');
            } else {
                swatch.classList.remove('active');
            }
        });

        // Set CSS variables
        const root = document.documentElement;
        const mainColor = getComputedStyle(root).getPropertyValue(`--accent-${colorName}`).trim();
        const rgbColor = getComputedStyle(root).getPropertyValue(`--accent-${colorName}-rgb`).trim();

        root.style.setProperty('--accent-color', mainColor);
        root.style.setProperty('--accent-rgb', rgbColor);

        this.settings.accentColor = colorName;

        // Update active logo shadows & charts
        document.querySelector('.brand-logo').style.boxShadow = `0 4px 15px rgba(${rgbColor}, 0.3)`;
        this.updateChartThemes();
    }

    setGlassmorphism(enabled) {
        if (enabled) {
            document.body.classList.add('glassmorphism-enabled');
        } else {
            document.body.classList.remove('glassmorphism-enabled');
        }
        this.settings.glassmorphism = enabled;
    }

    setSidebarOpen(open) {
        const toggle = document.getElementById('mobile-menu-toggle');
        document.body.classList.toggle('sidebar-open', open);
        if (toggle) {
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        }
    }

    // --- Setup Listeners ---
    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.sidebar-nav li').forEach(li => {
            li.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = li.getAttribute('data-tab');
                this.switchTab(tab);
                this.setSidebarOpen(false);
            });
        });

        // Mobile drawer
        document.getElementById('mobile-menu-toggle')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.setSidebarOpen(!document.body.classList.contains('sidebar-open'));
        });
        document.getElementById('sidebar-backdrop')?.addEventListener('click', () => {
            this.setSidebarOpen(false);
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) this.setSidebarOpen(false);
        });

        // Home button redirect inside Welcome view
        document.getElementById('btn-goto-projects')?.addEventListener('click', () => {
            this.switchTab('portfolio');
        });

        // Theme trigger
        document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Notification popup toggle
        const notifTrigger = document.getElementById('notification-trigger');
        const notifMenu = document.getElementById('notification-menu');
        
        notifTrigger?.addEventListener('click', (e) => {
            e.stopPropagation();
            notifMenu.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            notifMenu?.classList.remove('active');
        });

        // Clear notification badges
        document.getElementById('clear-notif-btn')?.addEventListener('click', () => {
            const list = document.getElementById('notification-list-container');
            if (list) list.innerHTML = `<div style="text-align:center; padding: 20px; color:var(--text-muted)">Sem notificações</div>`;
            const badge = document.querySelector('.notification-btn .badge');
            if (badge) badge.style.display = 'none';
        });

        // Global search filter (handles project & team searches simultaneously)
        document.getElementById('global-search')?.addEventListener('input', (e) => {
            const query = e.target.value;
            this.renderPortfolio('all', query);
            this.renderTeam(query);
        });

        // Category Portfolio filters
        document.querySelectorAll('#portfolio-category-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#portfolio-category-filters .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const cat = btn.getAttribute('data-filter');
                this.renderPortfolio(cat);
            });
        });

        // Team custom search
        document.getElementById('team-search-input')?.addEventListener('input', (e) => {
            this.renderTeam(e.target.value);
        });

        // Settings inputs
        document.querySelectorAll('#accent-color-picker .color-swatch').forEach(swatch => {
            swatch.addEventListener('click', () => {
                const color = swatch.getAttribute('data-color');
                this.setAccentColor(color);
            });
        });

        const glassToggle = document.getElementById('glassmorphism-toggle');
        if (glassToggle) {
            // Apply initial setting state
            this.setGlassmorphism(glassToggle.checked);
            glassToggle.addEventListener('change', (e) => {
                this.setGlassmorphism(e.target.checked);
            });
        }

        const rtToggle = document.getElementById('realtime-toggle');
        rtToggle?.addEventListener('change', (e) => {
            this.settings.realtimeActive = e.target.checked;
            this.startRealtimeSimulation();
        });

        const simSpeed = document.getElementById('simulation-speed');
        simSpeed?.addEventListener('input', (e) => {
            this.settings.volatility = parseInt(e.target.value);
            this.startRealtimeSimulation();
        });

        // Simulate event btn
        document.getElementById('simulate-event-btn')?.addEventListener('click', () => {
            this.simulateNewEvent();
        });

        // Modal triggers
        document.getElementById('modal-close-btn')?.addEventListener('click', () => {
            this.closeProjectDetail();
        });

        // Close modal clicking outside the modal box
        document.getElementById('project-detail-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'project-detail-modal') {
                this.closeProjectDetail();
            }
        });

        // Profile Form Submit
        document.getElementById('settings-profile-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateProfile();
        });
    }
}

// Instantiate dashboard application
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new DashboardApp();
});
