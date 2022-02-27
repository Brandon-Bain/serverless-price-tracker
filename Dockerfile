FROM node:16.14.0-alpine3.15

WORKDIR /app

COPY . /app
RUN npm ci && npm cache clean --force
RUN npm install puppeteer

CMD ["npm", "run", "offline-start"]

EXPOSE 4000