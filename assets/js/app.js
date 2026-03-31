const contentDiv = document.getElementById('content');
const themeToggle = document.getElementById('theme-toggle');

// Theme Toggle Logic
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Update Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// Routing Logic
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

function router() {
    let hash = window.location.hash || '#home';

    // Close any open dropdowns by removing focus
    if (document.activeElement) {
        document.activeElement.blur();
    }

    // Update active nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === hash.split('/')[0]);
    });

    if (hash === '#home') renderHome();
    else if (hash === '#about') renderAbout();
    else if (hash === '#projects') renderProjects();

    else if (hash === '#sidequests') renderSideQuests();
    else if (hash.startsWith('#post/')) renderPost(hash.replace('#post/', ''));
    else renderNotFound();

    // Scroll to top on navigation
    window.scrollTo(0, 0);
}

// Data Fetching Utility
async function fetchJSON(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Could not load ${path}`);
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

let typeWriterInstance = 0;
const textList = [
    "Software Engineer",
    "Full Stack Developer",
    "Computer Scientist",
    "Video Game Enthusiast",
    "Amateur Photographer",
    "Knowledge Addict",
    "Spongebob Fanatic",
];
let currentStringIndex = 0;

async function typeWriterEffect(instance) {
    const element = document.getElementById("typewriter");
    if (!element || instance !== typeWriterInstance) return;

    const currentString = textList[currentStringIndex];
    const typingSpeed = 100;
    const eraseSpeed = 50;
    const delayBeforeTypingNext = 1000;

    async function type() {
        for (let i = 0; i <= currentString.length; i++) {
            if (instance !== typeWriterInstance || !document.getElementById("typewriter")) return;
            document.getElementById("typewriter").textContent = currentString.substring(0, i);
            await new Promise((resolve) => setTimeout(resolve, typingSpeed));
        }

        await new Promise((resolve) => setTimeout(resolve, delayBeforeTypingNext));

        for (let i = currentString.length; i >= 0; i--) {
            if (instance !== typeWriterInstance || !document.getElementById("typewriter")) return;
            document.getElementById("typewriter").textContent = currentString.substring(0, i);
            await new Promise((resolve) => setTimeout(resolve, eraseSpeed));
        }

        currentStringIndex = (currentStringIndex + 1) % textList.length;
        typeWriterEffect(instance);
    }

    type();
}

// === Render Functions ===

function renderHome() {
    typeWriterInstance++;
    const currentInstance = typeWriterInstance;

    contentDiv.innerHTML = `
        <div class="hero">
            <h1>Hello, I'm <span style="color:var(--text-color);">Robert</span>.</h1>
            <p class="subtitle">I'm a <span id="typewriter"></span><span class="blinking-cursor">|</span></p>
            <div style="margin-top: 2rem;">
                <a href="#about" style="text-decoration: underline; margin-right: 1.5rem;">More about me &rarr;</a>
                <a href="#projects" style="text-decoration: underline;">View projects &rarr;</a>
            </div>
        </div>
    `;

    // Start effect
    typeWriterEffect(currentInstance);
}

async function renderAbout() {
    contentDiv.innerHTML = '<h2>About Me</h2><p>Loading...</p>';
    const xpData = await fetchJSON('data/experience.json');

    contentDiv.innerHTML = `
        <h2>About Me</h2>
        <p>I'm a software engineer based in the SF Bay Area. I started my coding journey back in 2011 on a website called Scratch. Fast forward to today, and I've had the incredible opportunity to contribute to software projects for a
        <a
            href="https://www.bart.gov/"
            target="_blank"
            rel="noreferrer noopener">public transit system</a
        >, a
        <a
            href="https://www.amyris.com/"
            target="_blank"
            rel="noreferrer noopener">cutting-edge biotech company</a
        >, and a 
        <a
            href="https://c3.ai/"
            target="_blank"
            rel="noreferrer noopener">leader in enterprise AI</a
        >, among many others.</p>
        <p>When I'm not hacking away at the keyboard, I'm usually traveling, reading a good book, or binge-watching the latest TV show. I love learning new skills and hobbies.</p>
        <p>Check out my <a href="#sidequests">Side Quests</a> page to see what I'm currently exploring.</p>
        
        <h3 style="margin-top:2rem;">Experience</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem;">
            ${xpData ? xpData.map(exp => `
                <a href="${exp.url}" target="_blank" rel="noreferrer noopener" class="card xp-link" style="margin-bottom: 0;">
                    <h4 class="xp-title" style="margin-top: 0; margin-bottom: 0.25rem;">${exp.title} — ${exp.company}</h4>
                    <p class="xp-meta">${exp.start_date.toUpperCase()} – ${exp.end_date.toUpperCase()}</p>
                    <p class="xp-desc">${exp.description}</p>
                    <div style="margin-top: 1rem;">
                        ${(exp.tools || []).map(tool => `<span class="tag-skill">${tool}</span>`).join('')}
                    </div>
                </a>
            `).join('') : '<p>Failed to load experience data.</p>'}
        </div>

        <h3 style="margin-top:2rem;"><a href="">View Full Resume</a></h3>
    `;
}

async function renderProjects() {
    contentDiv.innerHTML = '<h2>Projects</h2><p>Loading...</p>';
    const data = await fetchJSON('data/projects.json');
    if (!data) return contentDiv.innerHTML = '<h2>Projects</h2><p>Failed to load data. Ensure data/projects.json exists.</p>';

    const html = `
        <h2>Projects</h2>
        <p>A selection of my personal work and experiments.</p>
        <div class="grid">
            ${data.map(p => `
                <div class="card">
                    <h3>${p.title}</h3>
                    <p style="color:var(--text-muted); font-size:0.95rem; flex-grow:1;">${p.description}</p>
                    <div class="tags">
                        ${(p.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    <div class="card-links">
                        ${p.repo ? `<a href="${p.repo}" target="_blank">Repository</a>` : ''}
                        ${p.demo ? `<a href="${p.demo}" target="_blank">Live Demo</a>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    contentDiv.innerHTML = html;
}







async function renderSideQuests() {
    contentDiv.innerHTML = '<h2>Side Quests</h2><p>Loading...</p>';
    const data = await fetchJSON('data/sidequests.json');
    if (!data) return contentDiv.innerHTML = '<h2>Side Quests</h2><p>Failed to load data.</p>';

    const getStatusClass = (status) => {
        const s = status.toLowerCase();
        if (s.includes('inspired')) return 'status-inspired';
        if (s.includes('active')) return 'status-active';
        if (s.includes('realized')) return 'status-realized';
        if (s.includes('ongoing')) return 'status-ongoing';
        return 'status-inspired';
    };

    // Group by category
    const categories = {};
    data.forEach(q => {
        const cat = q.category || 'Uncategorized';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(q);
    });

    // Calculate counts for Inspired, Active, Realized, Ongoing
    let counts = { inspired: 0, active: 0, realized: 0, ongoing: 0 };
    data.forEach(q => {
        const s = q.status.toLowerCase();
        if (s.includes('inspired')) counts.inspired++;
        else if (s.includes('active')) counts.active++;
        else if (s.includes('realized')) counts.realized++;
        else if (s.includes('ongoing')) counts.ongoing++;
    });

    // Keep track of active filters
    let activeFilters = new Set(['inspired', 'active', 'ongoing', 'realized']);

    contentDiv.innerHTML = `
        <h2>Side Quests</h2>
        <p>Personal goals and ongoing adventures.</p>
        
        <div class="qr-counters">
            <button class="qr-counter is-active" data-filter="inspired" type="button">
                <span class="qr-counter-label">Inspired</span>
                <span class="qr-counter-value">${counts.inspired}</span>
            </button>
            <button class="qr-counter is-active" data-filter="active" type="button">
                <span class="qr-counter-label">Active</span>
                <span class="qr-counter-value">${counts.active}</span>
            </button>
            <button class="qr-counter is-active" data-filter="ongoing" type="button">
                <span class="qr-counter-label">Ongoing</span>
                <span class="qr-counter-value">${counts.ongoing}</span>
            </button>
            <button class="qr-counter is-active" data-filter="realized" type="button">
                <span class="qr-counter-label">Realized</span>
                <span class="qr-counter-value">${counts.realized}</span>
            </button>
        </div>
        <div id="quests-container"></div>
    `;

    const renderBoard = () => {
        // Filter data based on active buttons
        const filteredData = data.filter(q => {
            const s = q.status.toLowerCase();
            if (s.includes('inspired') && activeFilters.has('inspired')) return true;
            if (s.includes('active') && activeFilters.has('active')) return true;
            if (s.includes('ongoing') && activeFilters.has('ongoing')) return true;
            if (s.includes('realized') && activeFilters.has('realized')) return true;
            return false;
        });

        // Group by category
        const categories = {};
        filteredData.forEach(q => {
            const cat = q.category || 'Uncategorized';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(q);
        });

        let html = '';

        if (filteredData.length === 0) {
            html = '<p style="margin-top:2rem; color:var(--text-muted);">No quests match the selected filters.</p>';
        } else {
            for (const [cat, quests] of Object.entries(categories)) {
                html += `<h3 class="category-header"><span class="category-badge-wrapper">${cat}</span></h3>`;
                html += `<div class="quests-board">`;
                html += quests.map(q => `
                    <div class="quest-item">
                        <div class="quest-content">
                            <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">${q.title}</h3>
                            <p style="margin: 0; color: var(--text-muted); font-size: 0.95rem;">${q.description}</p>
                        </div>
                        <div class="status-badge ${getStatusClass(q.status)}">${q.status}</div>
                    </div>
                `).join('');
                html += `</div>`;
            }
        }

        document.getElementById('quests-container').innerHTML = html;
    };

    // Add event listeners to buttons
    document.querySelectorAll('.qr-counter').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
                btn.classList.remove('is-active');
            } else {
                activeFilters.add(filter);
                btn.classList.add('is-active');
            }
            renderBoard();
        });
    });

    // Initial render
    renderBoard();
}



async function renderPost(slug) {
    contentDiv.innerHTML = '<p>Loading post...</p>';
    try {
        const response = await fetch(`posts/${slug}.md`);
        if (!response.ok) throw new Error('Post not found');
        const text = await response.text();

        // Strip out frontmatter roughly if it exists
        let mdContent = text;
        if (mdContent.startsWith('---')) {
            const endOfFrontmatter = mdContent.indexOf('---', 3);
            if (endOfFrontmatter > -1) {
                mdContent = mdContent.substring(endOfFrontmatter + 3).trim();
            }
        }

        // Use marked.js to parse the Markdown directly
        const html = marked.parse(mdContent);
        contentDiv.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <a href="#writing" style="font-size: 0.95rem; color: var(--text-muted); text-decoration: none;">&larr; Back to writing</a>
            </div>
            <article class="markdown-body">
                ${html}
            </article>
        `;
    } catch (err) {
        console.error(err);
        contentDiv.innerHTML = '<h2>Post Not Found</h2><p>Sorry, the post you are looking for does not exist.</p>';
    }
}

function renderNotFound() {
    contentDiv.innerHTML = '<h2>404</h2><p>Page not found.</p>';
}
