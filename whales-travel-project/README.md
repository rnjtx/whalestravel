# Whales Travel — Website

A simple, lightweight, premium tourism landing page for **Whales Travel & Tourism Services** (Sharm El Sheikh, Egypt).

## Project structure

```
whales-travel-project/
├── index.html          ← the page itself (content/structure)
├── css/
│   └── style.css       ← all styling (colors, layout, animations)
├── js/
│   └── main.js         ← navbar, booking modal, scroll effects
├── assets/
│   ├── logo.png         ← your real logo (cropped from the file you sent)
│   └── img/             ← illustrated cover images for hero/packages/gallery
└── README.md
```

## How to open it

1. Unzip this folder anywhere on your computer.
2. Open the folder in **VS Code** (`File → Open Folder…`).
3. Right‑click `index.html` → **"Open with Live Server"** (install the free "Live Server" extension if you don't have it) — this gives you auto‑refresh while you edit.
   - Or simply double‑click `index.html` to open it directly in your browser (also works fine, just without auto‑refresh).

## The most common edits

### 1. Change the booking destination email
Open `js/main.js`, first line of real code:
```js
const BOOKING_DESTINATION_EMAIL = "info@whalestravel.com";
```
Change the address, save — that's the only place it needs to change.

> Currently, "sending" a booking request opens the customer's own email app with the message pre‑filled (name, phone, package, timestamp) addressed to this email — there's no backend, no payment, exactly as requested. If you later want it to send automatically without opening the customer's mail app, swap the inside of the `sendBookingRequest()` function in `js/main.js` for a call to a form service (e.g. Formspree, EmailJS) or your own backend — nothing else in the site needs to change.

### 2. Change contact details
In `index.html`, search for the `<footer>` section — update the `mailto:` and `tel:` links and social icons `href="#"`.

### 3. Replace the illustrations with real photos
The hero background and all 4 package images currently use custom illustrations (`assets/img/*.svg`) instead of real photos. This was a deliberate choice to keep the site 100% self-contained with zero external network calls — but if you have real photos of your boats, jeep, divers, etc., replacing them is easy:

1. Drop your photo (e.g. `boat-trip.jpg`) into `assets/img/`.
2. In `index.html`, find the matching `<img src="assets/img/boat-trip.svg" ...>` and change the `src` to your new filename.
3. Do the same for the hero background: open `css/style.css`, search for `.hero{` and change the `url('assets/img/hero-scene.svg')` to your photo's path.

### 4. Edit text
All the wording (headings, package descriptions, About text) lives directly in `index.html` — just search for the text you want to change.

### 5. Colors
All colors are defined once at the top of `css/style.css` under `:root{...}` as CSS variables (`--navy-900`, `--cyan-400`, etc.) — change a variable there and it updates everywhere it's used.

## Notes

- No build tools, no npm install, no framework — plain HTML/CSS/JS on purpose, so it stays simple and fast.
- No online payment and no account creation, as requested — booking is just a request.
- Fully responsive: 4 package cards on desktop, 2 on tablet, 1 on mobile.
