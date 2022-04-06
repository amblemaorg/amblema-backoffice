# #!/bin/bash
# export REGISTRY=gitlab.binauraldev.com:5050

# export PROJECT=/binaural/proyectos/frontend/spa/angular/amblema---backoffice

# docker login ${REGISTRY} -u fidel.alejos -p 5038322180892

# docker build \
#   -f prod.Dockerfile \
#   --target prod \
#   -t ${REGISTRY}${PROJECT}/app .

# docker push ${REGISTRY}${PROJECT}/app

# docker rmi -f ${REGISTRY}${PROJECT}/app

# !/bin/bash
export REPOSITORY=push devbinaural/build_amblema-backoffice-app
export USER=devbinaural
export TOKEN=Garden.86

echo "${TOKEN}" | docker login -u ${USER} --password-stdin

docker build \
  -f prod.Dockerfile \
  --target prod \
  -t ${REPOSITORY} .

docker push ${REPOSITORY}

docker rmi -f ${REPOSITORY}

