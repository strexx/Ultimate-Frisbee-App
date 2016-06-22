# Ultimate Frisbee App (UFA)
The Ultimate Frisbee App started as a school assignment for the Amsterdam University of Applied Sciences, at the study of Communication and Multimedia Design. This app is a web app, built in the popular platform Node.js. It's currently designed to show the latest matches for the Windmill Tournaments, which is a yearly event. The app uses the Leaguevine API for getting the scores and updating the score.

When using the app it will allow you to post scores to the app in real-time, which other users are able to see live without ever refreshing the page. That is just one of the many strenghts of this web app...

## Live demo
[https://www.meesterproef.directzichtbaar.nl](http://www.meesterproef.directzichtbaar.nl)

## Main functionalities
- Node.js
- MongoDB
- Socket.io
- Gulp

## The structure of the app
```
├── connections                                 // Folder with database and socket.io connections setup
|    ├── database.js                            // Database connection setup
|    ├── socket.js                              // Web Sockets connection setup
├── lib                                         // Library folder
|    ├── mongodb.js                             // General database calls
|    ├── socket-io.js                           // Socket listeners with functionality
├── modules                                     // General modules setup
|    ├── formatDigits.js                        // Time formatting
|    ├── multiRequest.js                        // Multiple HTTP-requests handler
|    ├── uniqueKeys.js                          // Get unique values from an array
├── node_modules                                // Node modules
├── public                                      // Client side folder
|    ├── src                                    // Source folder
|    |    |── css                               // Styling for the application
|    |    |   ├── reset.css                     // Styling reset
|    |    |   ├── styles.css                    // Styling main file
|    |    ├── images                            // All images used in the application
|    |    ├── js                                // All client-side JavaScript logic
|    |    |   ├── appLauncher.js                // Main js file for launching app flow
|    |    |   ├── fontFaceObserver.js           // Font Face Observer functionality
|    |    |   ├── pages.js                      // Pages functionality
|    |    |   ├── router.js                     // Router functionality
|    |    |   ├── scores.js                     // Scores functionality
|    |    |   ├── serverWorker.js               // Service Worker functionality
|    |    |   ├── tools.js                      // Tools functionality
|    |    |   ├── ux.js                         // Ux behaviour functionality
|    |    ├── lib                               // Library folder
|    |    |   ├── fontfaceobserver.min.js       // Font Face Observer library
|    |    |   ├── modernizr.js                  // Modernizr library
|    |    |   ├── socket.io.min.js              // Socket.io library
|    ├── index.html                             // Basic HTML file for critical css
|    ├── sw.js                                  // Main Service Worker file
├── routes                                      // Routes folder
|    ├── api.js                                 // Servers api file with requests and database storage
|    ├── index.js                               // Page routing, rendering and data logic
├── scripts                                     // Scripts folder
|    ├── deploy                                 // Jenkins deploy bash script for server deployment
├── sessions                                    // All sessions stored when user logging in
├── views                                       // All views of the application, rendered with handlebars.
|    ├── partials                               // Partials
|    |    |── content                           // Partials content
|    |    |   ├── content_matches.hbs
|    |    |   ├── content_ranking.hbs
|    |    ├── footer                            // Partials footer
|    |    |   ├── footer_login.hbs
|    |    |   ├── footer_matches.hbs
|    |    |   ├── footer_tournaments.hbs
|    |    ├── header                            // Partials header
|    |    |   ├── header_login.hbs
|    |    |   ├── header_match.hbs
|    |    |   ├── header_matches.hbs
|    |    |   ├── header_tournament.hbs
|    |    |   ├── header_tournaments.hbs
|    |    ├── loader.hbs
|    |    ├── scripts.hbs
|    |    ├── splash.hbs
├── .gitignore                                  // Git ignore file
├── app.js                                      // Application bootstrap
├── gulpfile.js                                 // Gulp task managing configuration file
├── package.js                                  // Node.js installation file with dependencies
├── readme.md                                   // This readme file
```

## How to install
A small tutorial how to install the Node application on your own local machine.

**Git repository**:
[https://github.com/strexx/Ultimate-Frisbee-App.git](https://github.com/strexx/Ultimate-Frisbee-App.git)

### 1 - Clone the repository
```
git clone https://github.com/strexx/Ultimate-Frisbee-App.git
```

### 2 - Navigate to the cloned repository

```
cd <path/to/file>
```

### 3 - Install the node modules and packages
```
npm install
```

### 3 - Start Gulp to create a dist folder with concatenated and minified files

```
gulp
```

### 4 - Start the application
```
npm start
```

### 5 - View the app in the browser
The app will be listening to port 3010. Open the browser and go to either ``http://127.0.0.1:3010`` or ``http://localhost:3010``


## How to develop
- Changes to the server side files can be modified in the folders of the root.
- Changes to the client side CSS and JS can be made in the public folder.
- HTML can be changed in the views folder

### 1 - Use gulp watch to let Gulp watch for any changes
```
gulp watch
```

### 1 - Use nodemon to automatically refresh the page on any changes

```
nodemon app.js
```

Open your browser and go to ``http://localhost:3010``


## Overview App
See below an overview op the used NPM packages and features.

### NPM packages
Overview of NPM packages / dependencies used to run the application.

Name                 | Version | Description
:------------------- | :------ | :----------
body-parser          | 1.15.0  | Body parsing middleware for node.js
dateformat        	 | 1.0.12  | Date formatting for node.js
express              | 4.13.4  | Fast, unopinionated, minimalist web framework
express-session      | 1.13.0  | Session middleware for Express
gsap 					 | 4.0.0   | Animation library
hbs      				 | 2.2.3   | Express.js template engine plugin for Handlebars
jsonfile             | 1.1.2   | Easily read/write JSON files.
mongodb              | 2.1.21  | The official MongoDB driver for node.js
password-hash        | 1.2.2   | Password hashing and verification for node.js
path          		 | 0.12.7  | Provides utilities for working with file and directory paths
request              | 2.72.0  | Simplified HTTP request client.
session-file-store   | 0.2.0   | Session file store is a provision for storing session data in the session
socket.io            | 1.4.6   | Node.js realtime framework server


## Feature list

### Per course
1. CSS to the rescue	
2. Web App From Scratch
3. Performance Matters
4. Real Time Web
5. Browser Technologies
6. EXTRA: Server Side

### Overview
| Feature                           | Course        |
| --------------------------------- | ------------- |
| Score functionality               | 2, 4, 5, 6    |
| Progressive Enhancement           | 5             |
| Tabs                              | 1, 2, 6       |
| MongoDB database                  | 2, 6          |
| User accounts (scorekeepers)      | 6             |
| CSS Animations and Transitions    | 1, 3, 5       |
| Real Time using socket.io         | 2, 4          |
| Service Worker                    | 2, 3, 5       |
| API                               | 2, 6          |
| Font Face Observer                | 3             |
| Critical CSS                      | 3             |
| LoadCSS                           | 3             |
| First meaningful render           | 3             |
| Login                             | 5, 6          |
| Feedback login (error page)       | 1, 2, 6       |
| Logout                            | 6             |
| User sessions                     | 6             |
| Tournament page                   | 1, 2, 6       |
| Menu design pattern               | 1             |
| Responsive                        | 1             |
| Gulp                              | 3             |
| Partials                          | 2             |
| Handlebars                        | 2, 4          |
| Feature detection                 | 2, 5          |
| Progressive Web App               | 6             |
| Multirequest                      | 2, 6          |
| Modules                           | 2, 3          |
| Jenkins                           | 3, 6          |
| FlexBox                           | 1, 5          |
| Modernizr                         | 1, 5          |
| BEM                               | 1, 3          |
| Checkbox                          | 1             |

### Future feature wishlist
- User type related content
- Cachebuster with gulp
- Add team color
- Comments and likes on matches
- Touch events
- Overview of games per field
- Current ranking on live results tab

## Tasks per week

[!Trello-board](readme/screenshots/trello.png)

Things I've done to contribute to this project:

#### Week 1

- Briefing meeting with client (Christian Schaffner)
- Created sitemap for the application
- Sketch iterations of pages we need
- Converted sketches to wireframes
- Created Design Brief deliverable
- Created a debriefing
- Created repository
- Created Trello board with cards
- Created Google Drive for file sharing
- Presented wireframes and first concept to Christian

#### Week 2

- Node server setup
- Research for realtime techniques (socket.io)
- Research for libraries and packages
- Create application bootstrap (HTML + CSS)
- Seperated files into modules
- First socket.io test
- Request to API to fetch data
- Render data from API to views (client-side)
- Loader spinner
- Research and testing at Windmill Tournament
- Present first demo to Christian

#### Week 3

- Progress meeting for feedback with teachers
- Setup MoSCow featurelist
- Implement featurelist in Trello
- Setup Harvest for logging work hours
- Research for useful gulp plugins to support workflow
- Setup gulp and it's plugins
- Research mongoDB and setup database

#### Week 4

- Take out unnecessary libraries like Routie
- Added server-side rendering
- Tab-toggle switch for server-side rendering instead of client-side
- Help setup database synchronization on remote server
- Created user collection
- Used express-session package to store sessions
- Created login page with functionality
- Created feedback for login page
- Used password-hash package to secure login
- Added font face observer
- Implemented designs for scorepage
- Progressive enhanced implementation of scorepage
- Implement real time functionality on scorepage
- Logic for dynamic API times
- User testing
- Javascript bugs and errors check on every page 

#### Week 5

- Design poster for presentation
- Real time scores update on live page
- Added logic for showing feedback after submitting as scorekeeper
- Created function to update one match from API
- Fade-in / out animation for menu tabs
- Created matches in Leaguevine API for testing
- Created readme for this project

#### Weekly tasks

- Update process report with new material
- Update Harvest with working hours
- Update trello board with tasks (MoSCow)

## Used techniques from courses in minor

Things I've done to contribute to this project:

### CSS to the rescue

#### Flexbox
I have worked with Flexbox to create layouts and position elements. We also created a fallback file to servefor older browsers that don't support flexbox. This file is located in ``/public/src/css/flexboxfallback.css``.

#### Mobile First approach
I've developed all my features working on a small mobile-screen in my browser. Using this approach you will think in core features and content first to implement. This really helped me to decide on some different and difficult design choices.

#### Vendor prefixes
Edited and used gulp autoprefixer to check for more browser support.

#### Block Element Modifier (BEM) notation
Minimized the amount of selectors for structure logic by using BEM notation.

#### Animations
Menu fade-in/out animation with transitions for smoother UX.

#### Specific CSS features

- Reusable classifications on elements.
- Custom checkbox as explained in Lea Verou's book: CSS Secrets.
- Helped with CSS3 ``::after`` psuedo class for menu active.

### Web App From Scratch

#### IFFE and Namespaces
Made use of IIFE's (Immediately Invoked Function Expression). Only the relevant parts that will be used outside of the scope will be returned. We also used namespacing to ensure that if the namespace that we used already exists, the code will be joined. If the current namespace doesn't exist, it will be created.

``var UFA = UFA || {};``

#### Strict mode
Used strict mode to write valid javascript notation.

``"use strict"``

#### Client-side routing
Setup client-side hash routing with ``window.addEventlistener("hashchange")``event handling.

#### Functional animations
Created functional loader spinner animation while fetching data.

#### Templating engine
- Setup handlebars templating engine for dynamic views.
- Setup handlebars partials handler.

#### Client-side rendering with HTTP requests
- Setup GET and POST http request handling using XHR (XML HTTP REQUEST) including promises.
- Manipulate data from API and present into views.

#### Array functions
- Manipulate arrays with underscore functions like ``._filter`` and ``._map``.

#### Ecmascript5 with Babel
- Setup gulp-babel plugin to support ECMAscript 5.


###Performance Matters

#### Font face observer
Font Face Observer is a small @font-face loader and monitor compatible with any web font service. For this project I've setup font face observer to show fonts when they are loaded. We use **Lato** and **Roboto Slab** from the Google Fonts library in our project.

#### Block Element Modifier (BEM) notation
When working alone on a single project, organizing styles usually isn't a big concern. Because we work on a large, more complex project, we used BEM to organize our code. According to a lot of developers this is key to efficiency. Not only in how much time it takes, but also in how much code you write, and how much a browser has to load.

#### Specific performance features
- Write semantic HTML and CSS in whole project.
- Used of gulp plugins and edited file when needed.
- Created loader spinner to support the progressive web app concept.

###Real Time Web

#### SocketIO
We decided to use the SocketIO real time engine because it works on every platform, browser or device, focusing equally on reliability and speed. SocketIO listens to events fired from client-side. I've setup and used this for live data results on match pages.

[!Socket.IO](readme/logos/socket-io.svg)

#### MongoDB
Along with Senny, I've implemented and setup MongoDB on local machine and remote server. The reason we used MongoDB is because it's highly scalable and we had never worked with MongoDB on a Node Server. So this was a challenge for us. We spent a lot of time with this because we wanted this to work on a remote database. We created a droplet on Digital Ocean and tried to install this from multiple web tutorials. However this wasn't as easy as we thought and struggled with this for a couple of days. We were happy when we finally set this up.

[!MongoDB](readme/logos/mongodb.svg)

#### Collections
When using MongoDB you need to work with collections. Therefore we created user, matches and tournaments collections where we store data requested from the API.

### Browser Technologies

#### Progressive enhancement
Made the application's core functionality available without JavaScript. The user gets a better experience with extra functionalities if JavaScript is turned on or the browser supports it. For the scorepage I've created the core functionality by showing input fields instead of plus and min buttons to add scores.

#### Accessibility


#### Browser and device compatability
The application was tested on a multitude of devices and browsers on our own machines and in the device lab at the university. Including an old version of Chrome for Android and the foreign UC Browser. The application looked fine and worked good on these browsers and most devices.

[!Device Lab](readme/device-lab.png)

## Changes made based on user testing and feedback:

- Changed design pattern, brought menu back on-canvas and fixed to the bottom.
- Changed position of "+" and "-" buttons, to make them easier to tap for the user.
- Created a visual difference between divisions by using material design cards.
- Added visual feedback when a score has been submitted.
- Added visual feedback when a game has finished.
- Added some information directly to the scorepage, instead of just under the info tab.
- Scrolling on the tournaments page was slow, so we changed the design, which made it easier to scroll.
- Added feedback to login.
- Added a final score checkbox, so the scorekeeper won't accidentally submit the score as final.
- Added round and tournament to info page.


## Screenshots
[!Live page](readme/screenshots/matches_live.png)
[!Match detail page](readme/screenshots/match_detail_score.png)


## Communication and planning tools

- [Trello](http://www.trello.com)
- [Google Drive](http://www.drive.google.com)
- [Telegram](http://www.telegram.com)
- [Appear](http://www.appear.in)
- [Slack](http://www.slack.com)
- [Harvest](http://www.harvest.com)

## Teamwork makes a dream work

"A lot of the application's functionality and structure was created as a result of a collaborative effort. The three of us communicated through appear.in and tackled most of the major functionalities as a team. We feel that our workflow and personal growth has had a lot of benefits from this way of working. Our personal development and motivation to work got a boost and in the end helped us to create an even better application."

### Contributors
- [Fons Hettema](https://github.com/strexx)
- [Melvin Reijnoudt](https://github.com/melvinr)
- [Senny Kalidien](https://github.com/sennykalidien)
