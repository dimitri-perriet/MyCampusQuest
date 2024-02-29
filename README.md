## Déploiement

L'application est déployée sur [Vercel](https://vercel.com/) et est accessible à l'adresse [mcq.perriet.fr](https://mcq.perriet.fr).

# MyCampusQuest

MyCampusQuest est une application de chasse au trésor pour les campus. Elle permet de découvrir des lieux et des histoires de manière ludique.

Ce projet est basé sur [Next.js](https://nextjs.org/), un framework React populaire pour le développement d'applications web.

## Prérequis

- Node.js
- npm

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante avec l'option --force :

```bash
npm install --force
```

## Développement

Pour lancer le serveur de développement, exécutez la commande suivante :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## Construction

Pour construire l'application pour la production, exécutez la commande suivante :

```bash
npm run build
```

## Authentification

L'authentification dans cette application est gérée par [Clerk](https://clerk.dev/).

## Mode hors ligne

MyCampusQuest prend en charge le mode hors ligne. Si vous êtes déconnecté, vous pouvez toujours valider les quêtes. Les validations de quêtes effectuées hors ligne sont mises en cache et seront synchronisées avec le serveur une fois la connexion rétablie.

## Localisation des quêtes

Les quêtes sont localisées sur le campus. Vous devez être à proximité de la localisation d'une quête pour pouvoir la valider.

## Outrepasser la localisation en mode hors ligne

En mode hors ligne, la vérification de la localisation est désactivée. Cela signifie que vous pouvez valider une quête même si vous n'êtes pas à proximité de sa localisation. Cela peut être utile si vous ne pouvez pas vous rendre sur le campus.
