FROM node:16-alpine3.11

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3003
RUN apk update && apk add bash
CMD bash