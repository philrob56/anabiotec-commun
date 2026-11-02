# anabiotec-commun

Code commun du site **BTSa ANABIOTEC** (LEGTA Le Gros Chêne, Pontivy) :
https://sites.google.com/view/anabioteclegroschene

Ce dépôt contient le code partagé par toutes les pages-outils du site Google Sites.
Une modification ici s'applique à **toutes les pages d'un coup**, sans retoucher le site.

---

## Les fichiers

| Fichier | Rôle |
|---|---|
| `anb-commun.js` | Le code commun, chargé par chaque page : bandeau, impression, messages, sauvegarde des saisies. |
| `stockage.html` | Petite page invisible qui garde les données des élèves (saisies, nom, classe). **Ne pas supprimer ni renommer.** |
| `README.md` | Ce mode d'emploi. |

Adresses publiques (GitHub Pages) :
- https://philrob56.github.io/anabiotec-commun/anb-commun.js
- https://philrob56.github.io/anabiotec-commun/stockage.html

---

## Comment les pages chargent le code commun

Dans chaque bloc « Intégrer » du site, en haut du code, se trouve cette ligne :

```html
<!-- anb-commun --><script src="https://philrob56.github.io/anabiotec-commun/anb-commun.js"></script><!-- /anb-commun -->
```

Pour une **nouvelle page-outil**, il suffit de copier cette ligne dans son `<head>`, et de reprendre le bandeau
(le bloc `<div class="anb-head">…</div>` placé au début du `<body>` d'une page existante, en changeant le fil d'Ariane).

48 pages utilisent ce fichier. Les deux pages d'étalonnage des micropipettes (« Étalonnage des micropipettes »
et « … — TP ») gardent leur propre charte et leur propre compte rendu : elles ne prennent au fichier commun
que les messages (module 3) et le stockage.

Certaines pages contiennent aussi des blocs `<!-- anb-fix -->` : ce sont des corrections propres à la page, à conserver.

---

## Ce que fait `anb-commun.js` (6 modules)

1. **Charte graphique** — polices (Outfit, Inter) et style du bandeau vert (`.anb-head`).
2. **Impression** — fonction `anbPrint()` appelée par le bouton « Imprimer / PDF » du bandeau.
   Elle ouvre une version imprimable dans un nouvel onglet, avec les champs **Nom et prénom / Classe**
   (pré-remplis avec les derniers saisis) et refuse d'imprimer si le nom est vide.
   *Pourquoi un nouvel onglet ? Google Sites bloque `window.print()` dans les blocs intégrés.*
3. **Messages** — remplace `alert()` et `confirm()`, eux aussi bloqués par Google Sites :
   les avertissements s'affichent en rouge sous le bouton cliqué ; une confirmation demande
   un second clic sur le même bouton (bandeau orange).
4. **Sauvegarde automatique des saisies** — les valeurs tapées par l'élève sont gardées sur son appareil
   et restaurées quand il revient (message « Vos saisies précédentes ont été restaurées »).
   Bouton « Effacer mes saisies » dans le bandeau.
   - Seuls les champs qui ont un identifiant (`id`) sont sauvegardés.
   - Les listes à lignes ajoutées (zone `values-container` : Grubbs, Dixon, Normalité) sont gérées.
   - Pour **exclure une page**, ajouter son titre exact (balise `<title>` du code intégré) à la liste
     `ANB_SANS_SAUVEGARDE` en haut du module 4.
5. **Stockage durable** (`anbStore`) — Google Sites change l'adresse du code intégré à chaque chargement,
   ce qui vide le stockage du navigateur. Les données passent donc par `stockage.html`, dont l'adresse est fixe.
   `stockage.html` n'accepte que les demandes venant du site et ne garde que des clés commençant par `anb-`.
6. **Mesure de hauteur** — outil de maintenance invisible pour les élèves (répond à un message `{anbMesure: 1}`).

Données enregistrées dans le navigateur de l'élève :
- `anb-saisies:<titre de la page>` — les saisies d'une page ;
- `anb-nom` et `anb-classe` — pour la version imprimable.

⚠️ Changer le `<title>` d'une page fait repartir ses saisies enregistrées de zéro (la clé change).

---

## Modifier le code

1. Ouvrir `anb-commun.js` sur GitHub, cliquer sur le crayon (**Edit**).
2. Faire la modification, puis **Commit changes…** → **Commit changes**.
3. Attendre : GitHub Pages publie en 1 à 2 minutes, puis les navigateurs gardent l'ancienne version
   en cache jusqu'à **10 minutes**. Compter un quart d'heure avant de conclure qu'une modification ne marche pas.

Conseils :
- Une erreur de syntaxe dans `anb-commun.js` casse le bandeau, l'impression et la sauvegarde sur **tout le site**
  (les outils eux-mêmes continuent de fonctionner). Modifier par petites touches et tester sur une page.
- Pour vérifier la syntaxe avant de publier, on peut coller le code dans la console du navigateur (F12).

### Revenir à une version précédente

Sur la page de `anb-commun.js` : **History** → choisir une version → bouton **⋯** → **View file** → **Raw**,
copier tout le contenu, puis le recoller dans l'éditeur du fichier et faire **Commit changes**.

---

## Limites connues

- Les saisies restent sur l'appareil et le navigateur de l'élève (pas de synchronisation entre appareils).
- Si le navigateur bloque les cookies tiers, la sauvegarde ne se fait pas (les outils marchent quand même).
- Pesée & gamme d'étalons : les valeurs des étalons sont restaurées, mais pas leur nombre s'il a été modifié.
- Les pages sont intégrées en « pleine page » : la hauteur du bloc suit la fenêtre, un contenu long défile à l'intérieur.

---

## Historique

- **v1** — regroupement de la charte, de l'impression et des messages (novembre 2026).
- **v2** — version imprimable avec champs Nom / Classe.
- **v3–v4** — sauvegarde des saisies ; stockage durable via `stockage.html`.
- **v5–v6** — sauvegarde étendue à toutes les pages ; référence = état de la page après chargement.
- **v7** — listes de valeurs (Grubbs, Dixon, Normalité) ; mesure de hauteur.
