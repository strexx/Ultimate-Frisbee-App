# Ultimate Frisbee App (UFA)
**This is the main README of the Ultimate Frisbee App project repository.**

The README is divided into 3 parts:

1. About the app
2. Technical documentation
3. The contributions (global)

*If you want to read an in-depth README about the individual contributions that have been made for this repository, please follow the links below to find the README.*

- [Go to the individual README of contributor Fons Hettema](https://github.com/strexx/Ultimate-Frisbee-App)
- [Go to the individual README of contributor Melvin Reijnoudt](https://github.com/melvinr/Ultimate-Frisbee-App)
- [Go to the individual README of contributor Senny Kalidien](https://github.com/sennykalidien/Ultimate-Frisbee-App)

----

## Table of Content
1. [The app](#the-app)
  1. [About the app](#about-the-app)
  2. [The problem](#the-problem)
  3. [Design problem](#design-problem)
  4. [Target audience](#target-audience)
  5. [Use cases](#use-cases)
  6. [Design challenges](#design-challenges)
  7. [The solution](#design-challenges)
  8. [Design patterns](#design-patterns)
  9. [Testing](#testing)
  10. [Final result](#final-result)
  11. [Live demo](#live-demo)
2. [Technical documentation](#technical-documentation)
  1. [Main functionalities](#main-functionalities)
  2. [The structure](#the-structure)
  1. [Features and Packages](#features-and-packages)
  2. [How to install](#how-to-install)
  3. [How to develop](#how-to-develop)
3. [The contributions](#the-contributions)
  1. [The workflow](#the-workflow)
  2. [The contributors](#the-contributors)
  3. [The individual contributions](#the-individual-contributions)

----

## The app
![Live page](readme/screenshots/matches_live.png)
![Match detail page](readme/screenshots/match_detail_score.png)

### About the app
The Ultimate Frisbee App started as a school assignment for the Amsterdam University of Applied Sciences, at the study of  Communication and Multimedia Design. Christian Schaffner, a frisbee fanatic and the client for this assignment, had the wish to have a mobile app that can keep scores for the Ultimate Frisbee tournaments.

### The problem
The problem that exist is the lack of solution for the public who visits the Ultimate Frisbee tournaments that don't have a good resource to continously be updated with the latest scores in the tournaments they visit. They also doesn't have good way to showcase where the matches of a tournament is being held.

The client needs to have a fast and secure digital solution to confirm and store the final scores in the Leaguevine API, which is used to create leagues, tournaments, teams, games and calculation of the ranking, rounds and points.

### Design problem
*How can a mobile web application allow the client to receive the final scores of a finished match instantly and at the same time serve the public viewers real-time (score) updates about the matches?*

### Assignment
Built a real-time, progressive enhanced and responsive web application.

### Target audience
- **The public** who want to be updated with the latest scores.
- **The scorekeepers** present at the game who needs to keep score and insert those scores into the system.
- **The client** who wants to have the scores stored on a digital platform and updated within the Leaguevine App.

### Use cases
What are the most important cases of the users for this app?

#### Must haves
1. As a user I want to view real-time scores about a match or multiple matches that I'm interested in.
2. As a user I want to have an overview of matches that have been finished, are being played right now or that are upcoming.
3. As a user I want to update the score of my (favourite) team(s).
4. As a user I want to follow my favourite teams
4. As a scorekeeper of a game I want to confirm the final score, so he score can be updated in the system (Leaguevine API).
5. As a scorekeeper I want to see the matches that are relevent to me.

#### Could haves
1. As a user I want to be notified if my favourite team scores
2. As a scorekeeper I want to have an overview of all the teams that I need to keep the scores for.

### Design challenges
During this project there were the following design challenges:
- The user can experience *bad* to *no* mobile internet connection at some locations of the Ultimate Frisbee tournaments.
- The user isn't always aware where the matches are being played
- The Leaguevine API, which is very slow, can be overloaded if there are many requests to the server.

### The design solution
A mobile-first, responsive, real-time, progressive webapplication made in **Node.js**, **socket.io** and **MongoDB**. *To make the web app a minimal viable product, the app will only display the games of the Windmill tournaments, an event that's being held every year.*

- Node.js is used to keep the application lightweighted, fast, and highly customizeable. It also allows us to make the application progressive enhanced, so viewable to all kinds of users. Some examples of cases would be to have no JavaScript enabled, slow to no internet connection or using a screenreader. It also allows us to make the app real-time, by using a websockets library that can communicate between the client and the server with only the use of JavaScript.

- Socket.io is the websockets JavaScript library used to make the app update the scores real-time to all the users screen without the need to constantly refreshing the page.

- A MongoDB database is used to reduce the API calls to the highly vulnerable and slow serving Leaguevine API. The app will do a daily API request to store the matches off the Winmill tournaments and divisions of the current day in the database. Each time a score is updated, the database will be updated. If a scorekeeper confirms the final score of a match, a API post request will be done to the API to update and synchronise the API with the database.


### Used design patterns

#### Matches page - an overview of matches played on the current day
![Screenshots showing the patterns]()

#### Match detail page / Score page
![Screenshots showing the patterns]()

#### Tournaments page
![Screenshots showing the patterns]()

#### Tournaments detail page
![Screenshots showing the patterns]()

#### Update scores of the game I'm watching
![Screenshots showing the patterns]()

#### View all games in a tournament
![Screenshots showing the patterns]()

### Testing
![Device Lab](readme/device-lab.png)

#### Browser and device compatibility
The application was tested on a multitude of devices and browsers on our own machines and in the device lab at the school building of our university. Including an old version of Chrome for Android and the foreign UC Browser.

## Iterations:
These are the iterations that's been made after continuously testing with our test subjects.

- Changed design pattern, brought menu back on-canvas and fixed to the bottom.

![Screenshot before]()

![Screenshot after]()

- Changed position of "+" and "-" buttons, to make them easier to tap for the user.

![Screenshot before]()

![Screenshot after]()

- Created a visual difference between divisions by using material design cards.

![Screenshot before]()

![Screenshot after]()

- Added visual feedback when a score has been submitted.

![Screenshot before]()

![Screenshot after]()

- Added visual feedback when a game has finished.

![Screenshot before]()

![Screenshot after]()

- Added some information directly to the scorepage, instead of just under the info tab.

![Screenshot before]()

![Screenshot after]()

- Scrolling on the tournaments page was slow, so we changed the design, which made it easier to scroll.

![Screenshot before]()

![Screenshot after]()

- Added feedback to login.

![Screenshot before]()

![Screenshot after]()

- Added a final score checkbox, so the scorekeeper won't accidentally submit the score as final.

![Screenshot before]()

![Screenshot after]()

- Added round and tournament to info page.

![Screenshot before]()

![Screenshot after]()


## Final Results

## Matches page
##### Mobile
![Live page](readme/screenshots/matches_live.png)
##### Desktop
![Matches live responsive](readme/screenshots/matches_live_responsive.png)

#### Match detail page / Score page
##### Mobile
![Match detail page](readme/screenshots/match_detail_score.png)

#### Tournaments page
##### Mobile
![Tournaments](readme/screenshots/tournaments.png)

#### Tournaments detail page
##### Mobile
![Tournament matches](readme/screenshots/tournament_matches.png)
##### Desktop
![Tournaments responive](readme/screenshots/tournaments_responsive.png)

## Live Demo:
[https://www.meesterproef.directzichtbaar.nl](http://www.meesterproef.directzichtbaar.nl)

----

## Technical documentation

### Main functionalities
- Node.js
- MongoDB
- Socket.io
- Gulp

### The structure
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


### Features and packages

#### NPM packages
Overview of NPM packages / dependencies used to run the application.

Name                 | Version | Description
:------------------- | :------ | :----------
body-parser          | 1.15.0  | Body parsing middleware for node.js
dateformat        	 | 1.0.12  | Date formatting for node.js
express              | 4.13.4  | Fast, unopinionated, minimalist web framework
express-session      | 1.13.0  | Session middleware for Express
gsap 				 | 4.0.0   | Animation library
hbs      			 | 2.2.3   | Express.js template engine plugin for Handlebars
jsonfile             | 1.1.2   | Easily read/write JSON files.
mongodb              | 2.1.21  | The official MongoDB driver for node.js
password-hash        | 1.2.2   | Password hashing and verification for node.js
path          		 | 0.12.7  | Provides utilities for working with file and directory paths
request              | 2.72.0  | Simplified HTTP request client.
session-file-store   | 0.2.0   | Session file store is a provision for storing session data in the session
socket.io            | 1.4.6   | Node.js realtime framework server


### Feature list

#### Per school course
1. CSS to the rescue
2. Web App From Scratch
3. Performance Matters
4. Real Time Web
5. Browser Technologies
6. EXTRA: Server Side

#### Overview
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

#### Future feature wishlist
- User type related content
- Cachebuster with gulp
- Add team color
- Comments and likes on matches
- Touch events
- Overview of games per field
- Current ranking on live results tab


### How to install
A small tutorial how to install the Node application on your own local machine.

**Git repository**:
[https://github.com/strexx/Ultimate-Frisbee-App.git](https://github.com/strexx/Ultimate-Frisbee-App.git)

#### 1 - Clone the repository
```
git clone https://github.com/strexx/Ultimate-Frisbee-App.git
```

#### 2 - Navigate to the cloned repository

```
cd <path/to/file>
```

#### 3 - Install the node modules and packages
```
npm install
```

#### 4 - Start Gulp to create a dist folder with concatenated and minified files

```
gulp
```

#### 5 - Start the application
```
npm start
```

#### 6 - View the app in the browser
The app will be listening to port 3010. Open the browser and go to either ``http://127.0.0.1:3010`` or ``http://localhost:3010``


### How to develop
- Changes to the server side files can be modified in the folders of the root.
- Changes to the client side CSS and JS can be made in the public folder.
- HTML can be changed in the views folder

#### 1 - Use gulp watch to let Gulp watch for any changes
```
gulp watch
```

#### 1 - Use nodemon to automatically refresh the page on any changes

```
nodemon app.js
```

Open your browser and go to ``http://localhost:3010``

----

## The contributions
"A lot of the application's functionality and structure was created as a result of a collaborative effort. The three of us communicated through appear.in and tackled most of the major functionalities as a team. We feel that our workflow and personal growth has had a lot of benefits from this way of working. Our personal development and motivation to work got a boost and in the end helped us to create an even better application."

### The workflow

#### Used PM tools (communication and planning)
- [Trello](http://www.trello.com)
- [Google Drive](http://www.drive.google.com)
- [Telegram](http://www.telegram.com)
- [Appear](http://www.appear.in)
- [Slack](http://www.slack.com)
- [Harvest](http://www.harvest.com)

#### Overview of tasks done each week (in dutch)
![Trello-board](readme/screenshots/trello.png)

## The Contributors
- [Fons Hettema](https://github.com/strexx)
- [Melvin Reijnoudt](https://github.com/melvinr)
- [Senny Kalidien](https://github.com/sennykalidien)

### The individual contributions
- [Read the individual readme of Fons Hettema](https://github.com/strexx/Ultimate-Frisbee-App)
- [Read the individual readme of Melvin Reijnoudt](https://github.com/melvinr/Ultimate-Frisbee-App)
- [Read the individual readme of Senny Kalidien](https://github.com/sennykalidien/Ultimate-Frisbee-App)
