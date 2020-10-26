FROM alpine:3.10

RUN mkdir /front
COPY . /front
WORKDIR /front

RUN apk add npm
RUN apk add git

RUN npm update
RUN npm install

EXPOSE 8080

RUN npm run build
CMD ["npm", "run", "serve"]
