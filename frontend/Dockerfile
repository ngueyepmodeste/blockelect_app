# Utilisez une image de base officielle
FROM node:16

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Supprimez le répertoire node_modules et le fichier package-lock.json si présents
RUN rm -rf node_modules && rm -f package-lock.json

# Installez les dépendances
RUN npm install

# Copiez le reste de votre application
COPY . .

# Exposez le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer votre application
CMD ["npm", "start"]
