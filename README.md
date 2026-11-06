# Ruta Suiza

Site bilingue ES/FR (Next.js 14, App Router, pages statiques + régénération quotidienne).

## Lancer en local
```bash
npm install
npm run dev        # http://localhost:3000 → /es
npm run build && npm start
```

## Structure
- `app/[lang]/…` : une vraie URL par page (`/es/paises/co`, `/fr/guias/visa`, `/fr/instalados/seguro`…), avec hreflang, canonical, sitemap et robots.
- `lib/site.js` : contenus et rendus (généré depuis le prototype par `npm run gen`, voir `scripts/gen_site.py`). Pour modifier un texte, édite `lib/site.js` directement.
- `components/Enhance.jsx` : interactivité (outil « Mi ruta », onglets, modale, filtres News).
- `components/Header.jsx` : menu + bascule ES/FR.

## Variables d'environnement
- `NEXT_PUBLIC_SITE_URL` : domaine final (par défaut `https://www.rutasuiza.com`).

## Déployer sur Vercel
1. Pousser ce dossier sur un repo GitHub.
2. vercel.com → Add New → Project → importer le repo (Framework : Next.js, rien à changer).
3. Ajouter `NEXT_PUBLIC_SITE_URL` puis Deploy.
4. Domains → ajouter le domaine et suivre les DNS indiqués.

## À faire avant d'encaisser
- Paiement (Stripe avec TWINT), prise de rendez-vous (Cal.com), WhatsApp Business : boutons `.buy`, `.unlock`, `.ask` dans `Enhance.jsx` (fonction `openModal`).
- Mentions légales : identité et adresse de l'exploitant (obligatoire en Suisse avant toute vente), e-mail de contact, durées de conservation.
- Formulaire de contact : brancher un envoi réel (`bindContact` dans `lib/site.js`).
