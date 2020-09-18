#!/bin/bash
export REGISTRY=dev.binaural.com.ve:5050

export PROJECT=/binaural/proyectos/frontend/spa/angular/amblema---backoffice

docker login ${REGISTRY} -u joseaguerrero -p password

docker build \
  -f prod.Dockerfile \
  --target prod \
  -t ${REGISTRY}${PROJECT}/app .

docker push ${REGISTRY}${PROJECT}/app

docker rmi -f ${REGISTRY}${PROJECT}/app
