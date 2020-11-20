#!/bin/sh
export REGISTRY=dev.binaural.com.ve:5050

export PROJECT=/binaural/proyectos/frontend/spa/angular/amblema---backoffice

docker login ${REGISTRY} -u fidel.alejos -p 5038322180892

docker pull ${REGISTRY}${PROJECT}/app:latest

docker rm -f amblema-backoffice

docker run -d --name amblema-backoffice -p 10502:10502 ${REGISTRY}${PROJECT}/app
