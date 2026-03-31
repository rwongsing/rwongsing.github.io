# Minimalist Vanilla Portfolio

A lightning-fast, zero-dependency, static, single-page portfolio built strictly with HTML, CSS, and Vanilla JavaScript. Everything works right out of the box when opened in a browser or served via GitHub Pages.

## Core Features
1. **No Build Step**: No node, no npm, no bundlers. Just open `index.html`.
2. **Hash Routing**: Navigation uses hash paths (`#projects`, `#blog`). Meaning no annoying 404s when loading subpages directly from a GitHub Pages relative URL.
3. **JSON Data Layer**: Dynamic sections (Movies, Projects, Quests) pull content cleanly from the `data/` folder, avoiding messy HTML strings.
4. **Markdown Blog**: Write posts as Markdown files, cleanly stripped of frontmatter and parsed natively in browser using the `marked.js` CDN.
5. **Dark Mode**: Comes with a lightweight toggle that saves preference to local storage.

---

## 🛠 How to Manage & Edit Data

This site is designed to be fully updated *without touching core code*. Simply edit the `.json` and `.md` files!

### 1. 💼 Projects
Open `data/projects.json`. To add a new project card, append a new object.
```json
{
  "title": "New Awesome Tool",
  "description": "What it does.",
  "tags": ["React", "Python"],
  "repo": "https://github.com/...",
  "demo": "https://live-link.com"
}
```

### 2. 📸 Photography
1. Place a new image inside the `assets/photos/` folder.
2. Open `data/photos.json` and append the location reference:
```json
{
  "src": "assets/photos/my-photo.jpg",
  "caption": "A cool picture of a mountain."
}
```

### 3. 🍿 Rankings (Movies, TV Shows, Books)
Media lists populate the `#rankings` page.
- **Movies**: Edit `data/movies.json`
- **TV Shows**: Edit `data/tvshows.json`
- **Books**: Edit `data/books.json`

Example for `movies.json`:
```json
{
  "title": "Interstellar",
  "year": 2014,
  "genre": "Sci-Fi",
  "rating": 5
}
```

### 4. ⚔️ Side Quests
Open `data/sidequests.json` and track your goals. 
Supported statuses: `"Not Started"`, `"In Progress"`, `"Done"` (matching is case-insensitive).
```json
{
  "title": "Learn French",
  "description": "Play Duolingo every day for a year.",
  "status": "In Progress"
}
```

### 5. 📝 Writing (Blog & Recipes)
1. Create a newly named markdown file in the `posts/` folder (e.g. `making-bread.md`).
2. Include YAML-style frontmatter at the top (optional, but good practice):
   ```yaml
   ---
   title: Making Sourdough
   date: 2024-03-01
   tags: ["recipe", "baking"]
   ---
   # My Bread Journey...
   ```
3. Open the index tracker at `data/posts-index.json` and add the catalog reference using the identical slug prefix:
```json
{
  "slug": "making-bread",
  "title": "Making Sourdough",
  "date": "2024-03-01",
  "tags": ["recipe", "baking"]
}
```

## Setup & Deployment

1. Make sure all your data references are complete.
2. Push everything to the main branch of a GitHub repository.
3. Go to the repo's **Settings > Pages**.
4. Set source to **Deploy from a branch** and select `main / root`.
5. After it builds, it's live!
