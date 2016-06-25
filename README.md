# SimpleNote
=======
A notepad example for [CAS] Front End Engineering.

## Work Buddies
* [Marc Labud](https://github.com/marclabud)
* [Michel Rimbeaux](https://github.com/mrimbeau)

## Developer Setup

###prerequisite:
#####Node.js installed
#####Repository cloned
#####Typings cli installed

    npm install typings --global

### Setup
Install packages in `package.json`  from project folder using npm.

    npm install

Install typings in `typings.json`  from project folder using typings.

    typings install

####  build from commandline
Build .js and .css files from project folder using npm

    npm run build

Start express server
    
    npm start

When server ist running, start client with index.html
    
### REST Api

| Method        | HTTP Verb		| Description  |
| ------------- |---------------| -------------|
| /notes     	| GET 			| Returns a list of Notes |
| /notes      	| POST      	| Adds a new Note |
| /notes/:id 	| GET      		| Gets a Note by Id |
| /notes/:id 	| PUT      		| Updates a Note by Id |

## Dependencies

* [typescript](https://github.com/microsoft/typescript.git)
* [typings](https://github.com/typings/typings.git)
* node-saas (for commandline build)
* jquery
* [handlebars.js](https://github.com/wycats/handlebars.js/)
* moment.js
* moment-timezone-with-data.js

## required devtools
* sass

## sass structure
Top file is style.scss for standard style and darkstyle.scss for the second style.
Both files only imports partials.

###_partials
* _layout.scss for basic styling.
* _stylenotelist.scss for component notelist.
* _stylenotedetail.scss for component notedetail.

