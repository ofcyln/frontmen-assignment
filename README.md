# Frontmen Assignment

Frontmen Assignment - Chuck Norris jokes app assignment solution authored by Osman Fikret Ceylan.

## Usage

### Using the project on live environment
The final app hosted on `Google Firebase` server with the `live environment`.
 
Live demo:  [https://frontmen-chuck-norris-jokes.firebaseapp.com/](https://frontmen-chuck-norris-jokes.firebaseapp.com/)

To see website in action please `activate unsafe scripts` from the `address bar` -it gives warning because the API serves from HTTP protocol

* Test username is `admin` or `niek.heezemans@frontmen.nl`
* Test password is `xyzaabb`

Login control made with mock backend server interceptor. Interceptor simulates backend server response when POST request made through `login` url. It returns with a login response which includes `token`.

### Using the project with Stackblitz

Simply go to this URL: [https://stackblitz.com/github/ofcyln/frontmen-assignment](https://stackblitz.com/github/ofcyln/frontmen-assignment)

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

## App's Architecture
* Used latest Angular version 7

* Used code scaffolding for effective working and clean development environment. Specialized `build`, `deploy`, `lint`, `pre-commit` scripts added to package.json.

* `lint-staged` script cleans and checks the `TypeScript`, `SCSS` codes before committing any changes to the repository. `Prettier` and `tslint` plugins run in this script.

* Frontmen Assignment - Chuck Norris jokes app project has 3 core components. Namely; `Alert Component` - to inform users for success and error messages on the page efficiently, `Header Component` and the wildcard routing redirection component `Not Found Component` - 404 page.

* The other main components are `Jokes Component` and `Favorites Component`.

* Used `SCSS` as a CSS preprocessor to write efficient CSS codes.

* Used new generation `JavaScript (ES6)` with `TypeScript`.

* Used `Angular Services` for sharing app state and data-binding within injected components.

* Used `Interceptors` to simulate backend-less login functionality while using HTTP request. Integrated `JWT interceptor` to send `token` for necessary request when needed.

* Used readonly private properties to prevent magic numbers and strings in the project where it needed into the methods.

* Used latest `Bootstrap v4.1.3` version to integrate powerful responsive design powered by CSS FlexBox model.

* Used `semantic` HTML tags and elements with semantic class names.

* Instead of using images for icons, font icons are integrated into the project with `Fontello` icon package. `Fontello` just includes preferred icons, this helps to balance the file size of the icon package. Created special Chuck Norris SVG font-icon for the project.

* The app has multiple icons for various Android, IOS devices.

* App designed from scratch with the inspiration of the material design principles.

* The fonts `Open Sans Light` is used as `web font`, specified different formats for browser support.

* Modular components created for reusing components elsewhere to improve modularity in the app.

## Motivation of Choices on Implementation

* The form immediately responses to user interactions with its `validation` checkers. Used Angular Reactive Forms to validate password field with custom validator methods and RegExp pattern for requirements of the assignment. User have to complete the validation rules to submit the form. These rules are:
    * Passwords must include one increasing straight of at least three letters, like ‘abc’, ‘cde’, ‘fgh’, and so on, up to ‘xyz’. They cannot skip letters so e.g. ‘acd’ doesn't count. So at least one increasing straight letters sequence need to be entered.
    * Passwords may not contain the letters ‘i‘, ‘O‘, or ‘l‘, as these letters can be mistaken for other characters and are therefore confusing.
    * Passwords must contain at least two non-overlapping pairs of letters, like ‘aa‘, ‘bb‘, or ‘cc‘.
    * Passwords cannot be longer than 32 characters.
    * Additionally, passwords cannot be longer less than 7 characters.

* `tabindex` values added for form elements in a numeric order to complete the form just with the use of keyboard for accessibility.

* In case of navigating to a page which doesn't exist in the app, a `wildcard route (404)` is integrated to the project. It redirects users to the `Not Found` page. 

* If a user doesn't authenticate, page routing redirects users to the `Login` page to be authenticated. After authorization, with the help of the routerSnapshot queryParams, the user can continue to browsing.

* Form data is sent asynchronously by `HTTP POST request` with `RxJS` observables. The `HTTP POST request` posts the form data to URL `./login`. I also created an interface for a hypothetical response from the server for this request. A refactor must be done when a backend is ready to make it work in a live environment.

* Login method requests handled with `MockBackendServerInterceptor`. This interceptor checks the user credentials - username and password then if there is a match it returns `HTTP 200 OK response` with a `token`. This will get the user in the app with an authentication. This `MockBackendServerInterceptor` is hypothetical.

* An authentication service - `AuthGuardService` created to protect routes against unauthorized users. If a `token` exist in the `localStorage`, the user can use the app and reach to the protected routes.

* Used `localStorage` to store user's favorite jokes with a key:value pair namely `favoriteJokes` and an array of favorites joke objects. Also, localStorage used to store `token`.

* Whenever a user enters to the `Jokes` page, an asynchronous `HTTP GET request` runs for `http://api.icndb.com/jokes/random/AMOUNT` API. I added a `refresh jokes button` for showing to the user a new set of jokes - ten at a time. The joke response from API was including `&quot;` text nodes instead of `'` sign. When I get jokes from API, I passed the response to map method for replacing `&quot;` text node to `'`.

* There is an option to add/remove joke to the `Favorites` page. Used an empty and a full heart font-icon button to handle this interaction. To handle the state of the heart icons, I extended JokeResponse interface with `active: boolean` property. With this state, I integrated a custom made CSS3 tooltip to show a user the state of the joke -add/remove. 

* Whenever the favorite jokes amount reaches to the 10, `AlertService` shows an error to the user and redirects the user to the `Favorites` page to improve UX. The user needs to remove some jokes from favorite `Jokes` page before adding new ones. 

* `Favorites` page has a `fill switch button` which adds one joke at every five seconds to the favorite jokes. It also checks duplications of the random jokes before adding to the favorite jokes. If there is a duplication, this request reruns again in five seconds to add a new joke.

* There is control if favorite jokes number reaches to ten. When favorite jokes amount reaches to the `maximum allowed number` it throws an error a message and closes fill switch button with `unsubscribe method` from interval `Observable` of fetching joke. 

* Added `Logout` button to the app which redirects the user to the `Login` page. When user routes to the `Login` page, user token is getting removed from localStorage and the user is being unauthorized. 

* I didn't have time to run a unit test with the configuration for `TestBed` and `Jasmine`.

* `Angular production build configuration` is used for optimizing bundle, using tree-shaking, aot compilation, compression.

* The total bundle size of the app is `~250KB` including all CSS, JS, IMG, FONT and HTML files.
