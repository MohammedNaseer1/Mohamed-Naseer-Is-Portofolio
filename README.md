# Mohamed Naseer — Data Science Portfolio

A single-page portfolio: dark, data-forward, no build tools needed.

## Run it in VS Code
1. Open this folder in VS Code.
2. Install the **Live Server** extension (if you don't have it).
3. Right-click `index.html` → **Open with Live Server**.

## Where things live
- **Text content**: edit directly inside `index.html` (about me, project, courses, links).
- **Colors/fonts**: all in one place at the top of `css/style.css`, under `:root`.
- **Photo & screenshots**: in `assets/` — swap the files to update, keep the same filenames or update the `src` in `index.html`.
- **Adding a new project**: duplicate the `<article class="project project-featured">` block.
- **Adding a new course**: duplicate a `.course-card` div inside the Courses section.

## Deploy for free
Push this folder to a GitHub repo, then in the repo settings enable **GitHub Pages**
(branch: `main`, folder: `/root`). Your site will be live at
`https://<username>.github.io/<repo-name>/`.
