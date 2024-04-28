# Use uma imagem base do Node.js
FROM node:latest

# Configure o diretório de trabalho
WORKDIR /app

# Copie os arquivos do projeto para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do projeto
RUN yarn install

# Copie o restante dos arquivos para o diretório de trabalho
COPY . .

# Construa o aplicativo React
RUN yarn build

# Exponha a porta 3000 para o contêiner
EXPOSE 3000

# Comando para executar a aplicação quando o contêiner for iniciado
CMD ["yarn", "start"]


# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json (se existir) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta em que o aplicativo está sendo executado
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "server.js"]
