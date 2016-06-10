# SimpleNote
=======
A notepad example for [CAS] Front End Engineering.

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

## Dependencies

* [typescript](https://github.com/microsoft/typescript.git)
* [typings](https://github.com/typings/typings.git)
* jasmine
* jquery
* [handlebars.js](https://github.com/wycats/handlebars.js/)
* moment.js
* moment-timezone-with-data.js

## required devtools
* sass

## sass structure
top file is style.scss for standard style and

darkstyle for the second style.
style.scss only imports partials.

###_partials
* _layout.scss for basic styling.
* _stylenotelist.scss for component noteList.

