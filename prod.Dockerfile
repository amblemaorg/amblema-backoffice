# Development stage
FROM devbinaural/angular:8.0.0 AS dev

RUN node -v && npm -v

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./

# COPY ./package-lock.json ./

#RUN apt update && \
#    apt install -y git openssh-client curl

RUN npm install

CMD ["npm", "start"]

# Build stage
FROM dev AS build

COPY ./ ./

RUN ng build --prod --build-optimizer --aot

RUN usermod -u 1018 node && \
    chown -R node:node node_modules/ && \
    chown -R node:node dist/

# Production app stage
FROM devbinaural/nginx AS prod

COPY --from=build /app/dist/browser/ /usr/share/nginx/html/Amblema-BackOffice/

# SERVER FILES CONFIGURATION
COPY --from=build /app/server/ /etc/nginx/

EXPOSE 80 10502

# command is used from the base NGINX image
