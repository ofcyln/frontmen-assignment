# Frontmen Assignment

Frontmen Assignment - Chuck Norris jokes app assignment solution authored by Osman Fikret Ceylan.

## Usage

### Using the project on live environment
The final app hosted on `Google Firebase` server with the `live environment`.
 
Live demo:  [https://frontmen-chuck-norris-jokes.firebaseapp.com/](https://frontmen-chuck-norris-jokes.firebaseapp.com/){:target="_blank"}

To see website in action please `activate unsafe scripts` from the `address bar` -it gives warning because the API serves from HTTP protocol

* Test username is `admin` or `niek.heezemans@frontmen.nl`
* Test password is `xyzaabb`

Login control made with mock backend server interceptor. Interceptor simulates backend server response when POST request made through `login` url. It returns with a login response which includes `token`.

### Using the project with Stackblitz

Simply go to this URL: [https://stackblitz.com/github/ofcyln/frontmen-assignment](https://stackblitz.com/github/ofcyln/frontmen-assignment){:target="_blank"}

Stackblitz can only show you the visible UI of the project without cloning it to your local environment. Please not that, for security reasons `Stackblitz` doesn't show images, fonts or font icons that used on the project.

### Using the project on your local environment

Run these commands in the terminal to run the app on your local environment

    git clone https://github.com/ofcyln/frontmen-assignment.git

    npm install

    npm start

or if you use yarn as package manager

    git clone https://github.com/ofcyln/frontmen-assignment.git

    yarn

    yarn start

#### Development server

Run `npm start` or `yarn start` for a dev server to initialize. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Running scripts 

To build the app in `Ahead-Of-Time compilation` you need to run `yarn build:prod` or `npm run build:prod`

To run linter and check the code over tslint rules simply run `yarn lint` or `npm run lint`


#### Code scaffolding

Run `ng generate component component-name` to generate a new component. If you don't have `@angular/cli` as a global package on your system, you can run `npx ng generate component component-name`. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `yarn build:prod` or `npm run build:prod` to build the project. 
The build artifacts will be stored in the `dist/` directory.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

