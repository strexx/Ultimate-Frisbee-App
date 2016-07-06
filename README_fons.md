# Individual readme

**Important:** this is the **individual README** of Fons Hettema for the Ultimate Frisbee Project. In this document you'll see what I have contributed to this project for each course during the minor Everything Web on a weekly basis. These courses are all related to (modern) web development standards. If you want to read an in-depth README about the other individual contributions by Melvin Reijnoudt and Senny Kalidien, please follow the links below:

- [Go to the individual README of contributor Melvin Reijnoudt](https://github.com/melvinr/Ultimate-Frisbee-App)
- [Go to the individual README of contributor Senny Kalidien](https://github.com/sennykalidien/Ultimate-Frisbee-App)

------


# Ultimate Frisbee App (UFA)
The Ultimate Frisbee App started as a school assignment for the Amsterdam University of Applied Sciences, at the study of Communication and Multimedia Design. This app is a web app, built in the popular platform Node.js. It's currently designed to show the latest matches for the Windmill Tournaments, which is a yearly event. The app uses the Leaguevine API for getting the scores and updating the score.

When using the app it will allow you to post scores to the app in real-time, which other users are able to see live without ever refreshing the page. That is just one of the many strenghts of this web app...

**Live demo**

[https://www.meesterproef.directzichtbaar.nl](http://www.meesterproef.directzichtbaar.nl)


## Tasks per week

We used Trello to manage and keep track of our tasks based on the MoSCow method. Therefore we assigned labels to each task with their own level of priority. In the screenshot you see a sneak peek of what everybody's tasks were each week.

![MoSCow](readme/screenshots/MoSCow.png)
![Trello-board](readme/screenshots/trello.png)

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

#### Week 6

- Fixed bug for realtime scores on the matches page 
- Fixed 505 Bad Gateway error when adding score without javascript
- Helped creating the favorites page with cookies
- Added manifest.json and touch icons for progressive web app purposes
- Started with progressbar and it's realtime functionality on scorepage

#### Week 7

- Added responsive tournament ranking page
- Finished progressbar and it's realtime functionality on scorepage
- Added progressbar and it's realtime functionality on matches page
- Helped setting up service worker right
- Added cross-browser CSS fixes
- Added some minor feature detections
- Fixed feedback errors for login page
- Rewrote the general and individual readme of this project

#### Weekly tasks

- Update process report with new material
- Update Harvest with working hours
- Update trello board with tasks (MoSCow)

## Used techniques from courses in minor

Things I've done to contribute to this project can be found at https://github.com/strexx/Ultimate-Frisbee-App/commits?author=strexx.
Besides these commits I also contributed to a lot of commits done by Melvin and Senny. Below you see an overview with detailed descriptions of what I've done for each course in this project covered in the minor.

### CSS to the rescue

#### Flexbox
I have worked with Flexbox to create layouts and position elements. We also created a fallback file to serve for older browsers that don't support flexbox. This file is located in ``/public/src/css/flexboxfallback.css``.

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

```
{{#if liveWomen}}
	<div class="matches__division">
	    <h1 class="matches__division__title">Women</h1>
	    {{#each liveWomen}}
	        {{> content_matches}}
	    {{/each}}
	</div>
{{/if}}
```

#### Client-side rendering with HTTP requests
- Setup GET and POST http request handling using XHR (XML HTTP REQUEST) including promises.
- Manipulate data from API and present into views.

```
// src: http://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr

function request(url) {
    return new Promise(function(resolve, reject) {
        UFA.ux.showLoader(); // show loader
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url); // method = always GET
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
                UFA.ux.hideLoader(); // hide loader
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
                UFA.ux.hideLoader(); // hide loader
            }
        };
        xhr.onerror = function() {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}
```

#### Array functions
- Manipulate arrays with underscore functions like ``._filter`` and ``._map``.

```
// Filter on today's date
var matchesToday = matches._filter(function(obj) {
    var currentDate = obj.start_time.split(" ")[0];
    return currentDate == todayDate;
});
```

#### Ecmascript5 with Babel
- Setup gulp-babel plugin to support ECMAscript 5.


###Performance Matters

#### Font face observer
Font Face Observer is a small @font-face loader and monitor compatible with any web font service. For this project I've setup font face observer to show fonts when they are loaded. We use **Lato** and **Roboto Slab** from the Google Fonts library in our project.

```
/*********************************************************
	FONT FACE OBSERVER [with multiple fonts]
*********************************************************/

UFA.fontFaceObserver = (() => {

    function init() {
        var fontFamilies = {
            'Lato': [{
                weight: 100
            }, {
                weight: 300
            }, {
                weight: 400
            }, {
                weight: 700
            }],
            'Roboto Slab': [{
                weight: 100
            }]
        };

        var fontObservers = [];

        Object.keys(fontFamilies).forEach(function(family) {
            fontObservers.push(fontFamilies[family].map(function(config) {
                return new FontFaceObserver(family, config).check()
            }));
        });

        Promise.all(fontObservers)
            .then(function() {
                document.documentElement.className += " fonts-loaded";
            }, function() {
                console.log('Fonts not available');
            });
    }

    return {
        init: init
    };

})();
```


#### Block Element Modifier (BEM) notation
When working alone on a single project, organizing styles usually isn't a big concern. Because we work on a large, more complex project, we used BEM to organize our code. According to a lot of developers this is key to efficiency. Not only in how much time it takes, but also in how much code you write, and how much a browser has to load.

#### Specific performance features
- Write semantic HTML and CSS in whole project.
- Used of gulp plugins and edited file when needed.
- Created loader spinner to support the progressive web app concept.

###Real Time Web

#### SocketIO

<!--![Socket.IO](readme/logos/socket-io.png)-->

We decided to use the SocketIO real time engine because it works on every platform, browser or device, focusing equally on reliability and speed. SocketIO listens to events fired from client-side. I've setup and used this for live data results on the matches page and the match score page.

![Match-page](readme/screenshots_redesign/match_detail_score.png)
![Match-page](readme/screenshots_redesign/matches_live.png)

Below is a piece of code which I wrote for the realtime functionality on the scorepage using socket.io.

```
// Server side: if addScore is fired, broadcast socket with data

socket.on('addScore', function(data) {

    // Postdata
    var postData = JSON.stringify({
        game_id: parseInt(data.gameID),
        team_1_score: data.score1,
        team_2_score: data.score2,
        is_final: data.isFinal
    });
    
    // Broadcast socket data to client
    io.emit('dbupdate', postData);
    
});
```

```
// Client side: get postdata and update scores

socket.on("dbupdate", function(json) {
	var data = JSON.parse(json);
	
	var updateScore1 = data.team_1_score,
	    updateScore2 = data.team_2_score;
	
	if(data.game_id == gameID)
	  replaceScores(updateScore1, updateScore2);
});
```

#### MongoDB
Along with Senny, I've implemented and setup MongoDB on local machine and remote server. The reason we used MongoDB is because it's highly scalable and we had never worked with MongoDB on a Node Server. So this was a challenge for us. We spent a lot of time with this because we wanted this to work on a remote database. We created a droplet on Digital Ocean and tried to install this from multiple web tutorials. However this wasn't as easy as we thought and struggled with this for a couple of days. We were happy when we finally set this up.

The code below is a function I wrote for adding a match to the matches collection

```
function addMatch(data) {
  var matchesCollection = db.collection('matches');
  matchesCollection.insertOne(data, function(err, result) {
      if (err) {
          console.log(err);
      } else {
          console.log('Inserted document into the "matches" collection. The document inserted with "_id" is:', result.length, result);
      }
  });
}
```

![MongoDB](readme/logos/mongodb.png)

#### Collections
When using MongoDB you need to work with collections. Therefore we created user, matches and tournaments collections where we store data requested from the API.

### Browser Technologies

#### Progressive enhancement
Made the application's core functionality available without JavaScript. The user gets a better experience with extra functionalities if JavaScript is turned on or the browser supports it. For the scorepage I've created the core functionality by showing input fields instead of plus and min buttons to add scores.

#### Accessibility
For this project we've done some minor accessibility fixes. For example on the login page I've made it possible to tab through the input fields and add an active class to the submit button when reached in the hierarchy. We also added some aria-elements to define roles described by their characteristics.

#### Browser and device compatibility
The application was tested on a multitude of devices and browsers on our own machines and in the device lab at the university. Including an old version of Chrome for Android and the foreign UC Browser. The application looked fine and worked good on these browsers and most devices.

![Device Lab](readme/device-lab.png)


## Teamwork makes a dream work

"A lot of the application's functionality and structure was created as a result of a collaborative effort. The three of us communicated through appear.in and tackled most of the major functionalities as a team. We feel that our workflow and personal growth has had a lot of benefits from this way of working. Our personal development and motivation to work got a boost and in the end helped us to create an even better application."

# General readme
*For a general README about this project with more information about the project, a technical description and our workflow go to the following link:*

- [Go to general README of this project](https://github.com/strexx/Ultimate-Frisbee-App)

**Live demo**

[https://www.meesterproef.directzichtbaar.nl](http://www.meesterproef.directzichtbaar.nl)


### Contributors
- [Fons Hettema](https://github.com/strexx)
- [Melvin Reijnoudt](https://github.com/melvinr)
- [Senny Kalidien](https://github.com/sennykalidien)