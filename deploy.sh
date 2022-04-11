# #!/bin/sh
# export REGISTRY=gitlab.binauraldev.com:5050

# export PROJECT=/binaural/proyectos/frontend/spa/angular/amblema---backoffice

# docker login ${REGISTRY} -u fidel.alejos -p 5038322180892

# docker pull ${REGISTRY}${PROJECT}/app:latest

# docker rm -f amblema-backoffice

# docker run -d --name amblema-backoffice -p 10502:10502 ${REGISTRY}${PROJECT}/app


# !/bin/bash
export REPOSITORY=devbinaural/build_amblema-backoffice-app
export USER=devbinaural
export TOKEN=Garden.86

echo "${TOKEN}" | docker login -u ${USER} --password-stdin

docker pull ${REPOSITORY}:latest

docker rm -f amblema-backoffice

docker run -d --name amblema-backoffice -p 10502:10502 ${REPOSITORY}
