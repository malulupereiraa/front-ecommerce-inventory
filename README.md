# FRONT-ECOMMERCE-INVENTORY

## Requirements

- Node (v 20.9.0)
- Angular CLI 17.3.4

## Quick Start
Clone this repo and run the content locally:
```bash
$ npm install
$ ng s
```

## Folder Structure

The folder structure is somewhat simplified and flatter compared to John Papa's [Gulp Patterns](https://github.com/johnpapa/gulp-patterns) project. The description below includes reasons for some of my customizations.

### Source Folder Structure

```
/src
    /app
      /@core
        /directives
        /guard
        /interceptor
        /models
        /services
      /icons
      /layout
        /default-layout
          /default-footer
          /default-header
          /_nav.ts
          /default-layout.component.html
          /default-layout.component.scss
          /default-layout.component.ts
        /index.ts
      /views
        /home
        /inventario
        /login
      /app.component.spec.ts
      /app.component.ts
      /app.config.ts
      /app.routes.ts
    /assets
    /environments
    /scss
    /index.html
```

The `src` folder contains only the source for the AngularJS client application. 

Below this level you will find various folders that arrange the application's functionality into logical modules.

- `app:` Contains all of the folders with the project structure. Below this level you will find the following folders:

- `@core:` Contains functionality that is shared across the application and will probably need customization for a specific application. This includes directives, interceptors, guard, models and services to the entire application.

- `layout:` Contains all the base components to structure the layout of the application.

- `views:` Contains all the components of the application. 

### Building Production Code

- `ng build`.

### Testing Production Code

- `ng test`.

## Credits
This project was developed by Maria Luiza Pereira
