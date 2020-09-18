# Amblema BackOffice

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 8.3.20.

## Despliegue a producción

### Build docker images

1. Verificar que las variables en el archivo `src/environments/environmets.prod.ts` son las correctas para producción

2. Agregar credenciales de un usuario gitlab en el comando `docker login` en el archivo `build.sh` para poder subir imagenes al container registry del repositorio

3. Ejecutar el script `build.sh`

  NOTA: El paso 2 se puede reimplementar a través de variables de CI/CD y un pipeline

### Deploy

1. Agregar credenciales de un usuario gitlab en el comando `docker login` en el archivo `build.sh` para poder subir imagenes al container registry del repositorio

2. Ejecutar el script `deploy.sh` en el servidor para recrear los contenedores

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
