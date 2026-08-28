# #Dishra — Birthday Website

A 7-page birthday story for Disha, made by Rachit.

## Files
- `index.html` — all pages/content
- `style.css` — responsive design + animations
- `script.js` — page navigation, floating hearts, confetti-style burst, ambient Web Audio
- `assets/` — supplied images

## Run locally
Just open `index.html` in Chrome/Edge/Firefox. No build step is required.

For the best result, use a small local server:
- VS Code + Live Server, or
- Python: `python -m http.server 8000`

Then open `http://localhost:8000`.

## GitHub Pages
1. Create a new GitHub repository, e.g. `dishra-birthday`.
2. Upload `index.html`, `style.css`, `script.js`, and the entire `assets` folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then save.
6. Wait for the Pages deployment to finish.
7. GitHub will show the live URL, typically:
   `https://YOUR-USERNAME.github.io/dishra-birthday/`

Important:
- Keep the `assets` folder name and image filenames unchanged.
- The repository must contain `index.html` at its root.
- If you later add a music file, put it in `assets/` and update `script.js`; the current version uses a browser-generated ambient tone and needs no music file.
