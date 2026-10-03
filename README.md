# Discorbit website

Website for Discorbit. The site is plain HTML, CSS and JavaScript. It runs as-is on GitHub Pages, and it also runs as a Node.js app (Hostinger) through the small Express server in `server.js`.

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
package.json          Node.js app definition (start script: `npm start`)
server.js             small Express server that serves the site files
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

## Hostinger e (Node.js app hishebe) deploy

Ei repository te `package.json` ar start script (`npm start`) ache, tai Hostinger er Node.js web app e GitHub theke shorashori import kora jay.

1. Hostinger e **Node.js web app** add korun, **Import Git repository** theke ei repository (branch `main`) select korun.
2. Settings jodi nije theke na bhore:
   - Framework: **Express** (na thakle **Other**)
   - Install command: `npm install`
   - Start command: `npm start`
   - Entry file: `server.js`
   - Build command / output directory: khali rakhun (kono build nei)
3. Deploy korun. Server ta `PORT` environment variable e chole (na thakle 3000).

Nijer computer e chalate: `npm install`, tarpor `npm start`, browser e `http://localhost:3000`.

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
