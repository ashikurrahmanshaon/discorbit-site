# Discorbit website

Static website for Discorbit. No build step, no framework: plain HTML, CSS and JavaScript, ready for GitHub Pages.

## Files

```
index.html            the whole site (one page)
404.html              "page not found" page
assets/css/style.css  all styles (colours are near the top of the file)
assets/fonts/         Sora, Instrument Serif, Manrope, JetBrains Mono (self-hosted, open licence)
assets/js/main.js     animations, mobile menu, portfolio filter, contact form
assets/img/           logo, favicon, app icons, social share image
site.webmanifest      app name and icons for phones
robots.txt, sitemap.xml   for search engines
.nojekyll             tells GitHub Pages to serve the files as they are
```

## GitHub e live korar niyom

1. github.com e login kore **New repository** banan (jemon `discorbit-site`), **Public** rakhun.
2. Ei folder er **bhitorer shob file** repository te upload korun (`index.html` jeno ekdom root e thake, kono sub-folder er bhitore na).
   - Browser diye: repository page e **Add file > Upload files**, shob file ar `assets` folder drag kore din, tarpor **Commit changes**.
   - Ba git diye:
     ```
     git init
     git add .
     git commit -m "Discorbit website"
     git branch -M main
     git remote add origin https://github.com/YOUR-USERNAME/discorbit-site.git
     git push -u origin main
     ```
3. Repository te **Settings > Pages** e jan. **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)** select kore **Save** din.
4. 1-2 minute por site live hobe: `https://YOUR-USERNAME.github.io/discorbit-site/`

Note: browser diye upload korle `.nojekyll` file ta (naam dot diye shuru) kokhono dekha jay na. Na uthleo site cholbe, tai chinta nei.

## Nijer domain (discorbit.com) lagate chaile

1. **Settings > Pages > Custom domain** e `discorbit.com` likhe Save din (GitHub nijei ekta `CNAME` file banabe).
2. Domain provider er DNS e ei record gulo din:
   - `A` record (host `@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record (host `www`): `YOUR-USERNAME.github.io`
3. DNS thik hole **Enforce HTTPS** tick din.

Site er bhitore `https://discorbit.com/` address ta already boshano ache (`index.html` er `canonical` o `og:` tag, `robots.txt`, `sitemap.xml`). Onno domain use korle oi jayga gulo bodle din.

## Ki ki edit korte hobe

Shob lekha `index.html` e ache; section gulo comment diye alada kora (`<!-- ===== Work ===== -->` er moto).

- **Portfolio:** `Work` section. Protita project ekta `<article class="work-card">`. Notun project add korte ekta card copy kore lekha bodlan. `data-cat` hobe `game`, `software` ba `commerce` (filter button er jonno).
- **"Concept" label deya 3 ta card** real client project na, shudhu namuna. Ashol kaj hole oi card gulo bodle din ba muche din.
- **Services, FAQ, "Tools we work with":** apnar ashol service, policy ar technology onujayi miliye nin.
- **Email:** `info@discorbit.com` (`index.html` e koyek jaygay, ar `assets/js/main.js` er `CONTACT_EMAIL`).
- **Rong:** `assets/css/style.css` er shuru te `:root` er bhitore.

## Contact form

Form ta kono server use kore na. "Send brief" chaple visitor er email app khule jay, message ta `info@discorbit.com` e pathanor jonno ready thake. Tai kono backend ba third-party service lagbe na.
