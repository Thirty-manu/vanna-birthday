# Yovanna's Rainbow Birthday 🌈

A tiny, magical, interactive storybook website made for **Yovanna Neema Mandelah's** 4th birthday — built by Kemboi.

Yovanna taps her way through a pastel world of hand-drawn rainbows, clouds, flowers, bubbles, and friendly creatures, finds five hidden rainbow doodles, and ends on a big birthday reveal signed **Kemboi ♥**.

> **Important name note:** the correct spelling is **Yovanna Neema Mandelah**. The opening screen shows "Hi Yovanna 🌈"; the birthday message, final reveal, and memory section use the full name "Yovanna Neema Mandelah". No other spelling is used anywhere in the project.

This site is **photo-free and backend-free**: no images, no database, no accounts, no external APIs, and no paid services. Every illustration (rainbows, clouds, sun, flowers, butterflies, a unicorn, a bunny) is hand-coded as inline SVG with a hand-drawn "sketchy" filter, styled with plain CSS.

---

## Project structure

```
yovanna-birthday/
├── index.html                    # page structure, SVG illustrations, all sections
├── style.css                     # storybook look, layout, animations, responsive rules
├── script.js                     # opening transition, audio, bubbles, wishes, discoveries
├── favicon.svg                   # small rainbow favicon
├── README.md                     # this file
└── assets/
    └── audio/
        └── birthday-song.mp3     # you add this file yourself (see below)
```

No build step, no `node_modules`, no package manager needed to run the site — it is plain HTML/CSS/JS.

---

## 1. Add the birthday song

Because this project uses only local files (no YouTube, no external audio services), you need to place your own MP3 at exactly this path:

```
assets/audio/birthday-song.mp3
```

Steps:

1. Pick any birthday-song MP3 you have the rights to use.
2. Rename it to `birthday-song.mp3`.
3. Copy it into the `assets/audio/` folder so the final path is `assets/audio/birthday-song.mp3`.

If the file is missing, the site still works perfectly — the music button simply won't produce sound, and no errors are thrown (playback failures are handled gracefully in `script.js`).

---

## 2. Run it locally on Fedora Linux

Open a terminal in the project folder and start Python's built-in web server:

```bash
cd yovanna-birthday
python3 -m http.server 8000
```

Then open in your browser:

```
http://localhost:8000
```

(You can also just double-click `index.html` to open it directly in a browser, but serving it with `http.server` is recommended so the audio file and relative paths load exactly the way they will on GitHub Pages.)

To stop the server, press `Ctrl+C` in the terminal.

---

## 3. Validate the JavaScript

Before deploying, double-check there are no syntax errors:

```bash
node --check script.js
```

A clean run prints nothing and exits with no error.

---

## 4. Put the project under Git

From inside the `yovanna-birthday` folder:

```bash
git init
git add .
git commit -m "Yovanna's rainbow birthday website"
```

---

## 5. Push to GitHub

Create a new, empty repository on GitHub first (no README/license added there), then run:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and repository name.

---

## 6. Turn on GitHub Pages

1. On GitHub, open your repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose **main** and folder **/ (root)**, then click **Save**.
5. Wait a minute or two, then GitHub will show your live URL, typically:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
   ```
6. Open that link on Yovanna's phone or tablet for the birthday surprise. 🎉

---

## What's inside the experience

- **Opening screen** — "Hi Yovanna 🌈 / Come and see something magical… / Let's go! ✨". Tapping the button hides the opening scene, reveals the magical world, and attempts to start the birthday song (if the browser blocks autoplay, a visible music button lets her start it with one tap).
- **Birthday message** — "Happy 4th Birthday, Yovanna Neema Mandelah! 🎂🌈" with "A special birthday surprise from Kemboi ❤️".
- **Yovanna's Rainbow** — a large wiggling hand-drawn rainbow with clouds and bubbles.
- **Wish Garden** — three tappable flowers, each blooming a different wish message.
- **Bubble Time** — tap the wand to release bubbles, tap bubbles to pop them with a gentle "POP! ✨", and popping enough bubbles reveals "Yovanna is a bubble champion! 🫧🌈" plus a burst of rainbow bubbles.
- **Choose a Birthday Friend** — Butterfly 🦋, Unicorn 🦄, and Bunny 🐰, each with its own friendly greeting.
- **Five hidden rainbow doodles** scattered through the pages, tracked by a small counter at the top of the screen; finding all five shows "Yovanna found all the rainbows! 🌈✨".
- **Final surprise** — a gentle confetti-and-rainbow reveal: "YOVANNA IS 4! 🎉🌈", her full name "Yovanna Neema Mandelah", a short rhyme, and a large handwritten-style signature: **Kemboi ♥**.
- **Yovanna's Little Rainbow** — a calm closing memory card with a smaller rainbow and the same signature, **Kemboi ♥**.

Everything is built with large, touch-friendly buttons, high-contrast text, and no hover-only interactions, so it works well on a phone or tablet in small hands.
