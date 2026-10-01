# Legal pages (/privacy, /terms)

| File | Served at |
|---|---|
| `public/privacy.html` | https://pepalign.app/privacy |
| `public/terms.html` | https://pepalign.app/terms |
| `public/legal.css` | shared Pepalign dark theme for both pages |

Each page is a small **Pepalign shell** wrapped around a **Termly HTML export**. The styling lives
only in `public/legal.css`, so you can replace the Termly part freely without losing it.

## The shell (keep this)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy | PepAlign</title>   <!-- "Terms of Service | PepAlign" on terms.html -->
    <link rel="stylesheet" href="/legal.css">
</head>
<body class="legal-page">
    <a href="/" class="legal-back">&larr; Back to Home</a>

    <!-- ▼ Termly export goes here ▼ -->

    <footer class="legal-footer">
        &copy; 2026 PepAlign. All rights reserved.
    </footer>
</body>
</html>
```

`class="legal-page"` on `<body>` is what turns the theme on — don't drop it.

## Dropping in a fresh Termly export

1. In Termly, export the policy as **HTML**. The export is: a `<style>` block, then
   `<div data-custom-class="body"> … </div>`, then a second small `<style>` block (list styles).
2. In the page, replace **everything between the "Back to Home" link and `<footer>`** with the
   whole export, including Termly's own `<style>` blocks. `legal.css` overrides them.
3. Don't add Tailwind, inline colors, or a per-page `<style>` — change `public/legal.css` instead.
4. Re-apply the link fix (next section), then check the page (last section).

## Re-applying the link fix

Termly has rendered website URLs as Markdown — on the page you see
`[https://pepalign.app](https://pepalign.app)` and the link's `href` is broken too. Best fix is at the
source: in Termly, enter website URLs as plain `https://…` (no `[ ](…)`), then re-export.

If an export still has them, run this from the repo root (safe to run more than once):

```bash
perl -0pi -e 's{\[<a ([^>]*?)href="(https?://[^"\]\s]+)\]\(\2\)">\2\]\(\2\)</a>}{<a $1href="$2">$2</a>}g' public/privacy.html public/terms.html
```

It turns `[<a href="URL](URL)">URL](URL)</a>` into `<a href="URL">URL</a>` — the visible text
becomes the plain URL; no wording changes. Confirm none are left (both counts should be 0):

```bash
grep -c '](' public/privacy.html public/terms.html
```

## Checking the page

Run `npm run dev` and open `/privacy.html` and `/terms.html` (phone width too). You should see:

- near-black background, off-white body text, **bold white headings**
- teal links and "← Back to Home" — no default blue anywhere
- no `[…](…)` text, and the Privacy tables fitting the screen on a phone

## If the styling ever breaks after an export

`legal.css` targets Termly's `data-custom-class` hooks (`body`, `title`, `subtitle`, `heading_1`,
`heading_2`, `body_text`, `link`) plus plain `h1`–`h3`, `a`, lists and tables. If Termly renames
those hooks, update the selectors in `legal.css` — not the pages.

To give another legal page (e.g. `eula.html`, `cookies.html`) the same look, wrap it in the same
shell.
