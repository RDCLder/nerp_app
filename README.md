# Fullstack NERP App

This repository provides the general layout of a fullstack NERP (Node, Express, React, PostgreSQL) app.

## Table of Contents

- [Create new App](https://github.com/RDCLder/nerp_app#create-new-app)
- [Setup Client](https://github.com/RDCLder/nerp_app#setup-client)
- [(Optional) Setup Redux](https://github.com/RDCLder/nerp_app#optional-setup-redux)
- [Setup Server](https://github.com/RDCLder/nerp_app#setup-server)
- [Version Control](https://github.com/RDCLder/nerp_app#version-control)
- [Setup Database](https://github.com/RDCLder/nerp_app#setup-database)
- [Host App](https://github.com/RDCLder/nerp_app#host-app)
- [To Do](https://github.com/RDCLder/nerp_app#to-do)

## Create New App

- Create a new base directory for your app
    ```mkdir appName```
- Inside the base directory, create a client directory and server directory
    - Use [create-react-app](https://facebook.github.io/create-react-app/docs/getting-started) to create the client
        ```create-react-app client```
    - Use [express application generator](https://expressjs.com/en/starter/generator.html) to create the server
        ```express server```

## Setup Client

- Navigate to the client directory

- Remove the .git directory
    ```rm -rf .git```
    - This will allow us to initialize git in the base directory

- Install the following dependencies
    ```npm i react-router-dom axios```

- (Optional) Install the React Bootstrap styling library
    ```npm i react-bootstrap```

- Inside the src directory, remove all extraneous files
    ```rm *.css App.test.js logo.svg serviceWorker.js```

- Inside the public directory, modify the index.html file
    - Remove all comments
    - (Optional) Add the Font Awesome stylesheet
        ```js
        <!-- Font Awesome Stylesheet -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        ```
    - (Optional) Add the React Bootstrap stylesheet
        ```js
        <!-- React Bootstrap Stylesheet -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous" />
        ```
- Inside the src directory, create the components directory
    ```mkdir components```

- Inside the components directory, create directories for views and partials
    ```mkdir views partials```
    - Views will be components that act as main routes that will be setup with BrowserRouter
    - Partials will be reusable components

- Inside the views directory, create a Home.js file
    ```touch Home.js```
    - Inside the file, use the ```cc``` shortcut to create the component skeleton

- Inside the src directory, modify the index.js file
    - Import additional dependencies
        ```js
        import { BrowserRouter, Switch, Route } from "react-router-dom";

        // View Components
        import Home from "./components/Home";
        ```
    - Modify ```ReactDom.render()``` into the following
        ```js
        ReactDOM.render(
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </App>
            </BrowserRouter>
            ,document.getElementById("root")
        );
        ```

## (Optional) Setup Redux

- Install redux dependencies
    ```npm i redux react-redux redux-thunk```

- Inside the src directory, create the actions and reducers directories
    ```mkdir actions reducers```

- Inside the reducer directory, create a reducer.js file and a baseReducer.js file
    ```touch reducer.js rootReducer.js```

- In the reducer.js file, create an initialState object and a skeleton for the reducer
    - initialState
        ```js
        const initialState = {};
        ```
    - reducer
        ```js
        const firstReducer = (state = initialState, action) => {
        switch (action.type) {
            case "":
            return {

            };
            default:
            return state;
        }
        };

        export default firstReducer;
        ```

- In the rootReducer.js file, copy the following
    ```js
    import { combineReducers } from "redux";
    import firstReducer from "./firstReducer";

    export default combineReducers({
        first: firstReducer
    });
    ```
    - Any additional reducers can be imported and added to the combineReducers object like the first reducer
    - When calling state data from a specific reducer, use ```state.reducerKey.dataKey```
    - e.g. To get the user data from the firstReducer, use ```state.first.user```

- Modify the index.js file
    - Import additional dependencies
        ```js
        import { BrowserRouter, Switch, Route } from "react-router-dom";
        import { createStore, compose, applyMiddleware } from "redux";
        import { Provider } from "react-redux";
        import thunk from "redux-thunk";
        import rootReducer from "./reducers/rootReducer";

        // View Components
        import Home from "./components/Home";
        ```
    - Create composeEnhancer variable
        ```js
        const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        ```
    - Create store variable
        ```js
        const store = createStore(
            rootReducer, 
            composeEnhancer(applyMiddleware(thunk))
        );
        ```
    - Modify ```ReactDom.render()``` into the following
        ```js
        ReactDOM.render(
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        <Switch>
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </App>
                </BrowserRouter>
            </Provider>
            ,document.getElementById("root")
        );
        ```

## Setup Server

- Navigate to the server directory

- Remove the bins directory

- Remove the public directory
    - All public files (e.g. media, stylesheets, scripts) will be in the client's public directory
    ```rm -rf public```

- Remove the views directory
    - Views will be rendered client-side as React components
    - The backend will only have routes that pass data between the client and database
    ```rm -rf views```

- Create a .gitignore file
    ```touch .gitignore```
    - Add the following to the file
        ```node_modules```

- Install the following dependencies
    ```npm i pg pg-promise connect-pg-simple sequelize cors```

- Create a config directory
    ```mkdir config```
    - Inside the config directory, create a config.json file
        ```touch config.json```
    - Inside the config.json file, add the following
        ```js
        {
            "development": {
                "username": "postgres",
                "password": null,
                "database": "nerpDB",
                "host": "127.0.0.1",
                "dialect": "postgres"
            },
            "production": {
                "use_env_variable": "DATABASE_URL",
                "username": "postgres",
                "password": null,
                "database": "nerpDB",
                "host": "127.0.0.1",
                "dialect": "postgres"
            },
            "test": {
                "username": "postgres",
                "password": null,
                "database": "nerpDB",
                "host": "127.0.0.1",
                "dialect": "postgres"
            }
        }
        ```

- Create a schema directory
    ```mkdir schema```
    - Inside the schema directory, create a index.js file and add the following to it
        ```js
        'use strict';

        const fs = require('fs');
        const path = require('path');
        const Sequelize = require('sequelize');
        const basename = path.basename(__filename);
        const env = process.env.NODE_ENV || 'development';
        const config = require(__dirname + '/../config/config.json')[env];
        const db = {};

        let sequelize;
        if (config.use_env_variable) {
            sequelize = new Sequelize(process.env[config.use_env_variable], config);
        } else {
            sequelize = new Sequelize(config.database, config.username, config.password, config);
        }

        fs
            .readdirSync(__dirname)
            .filter(file => {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
            })
            .forEach(file => {
                const model = sequelize['import'](path.join(__dirname, file));
                db[model.name] = model;
            });

        Object.keys(db).forEach(modelName => {
            if (db[modelName].associate) {
                db[modelName].associate(db);
            }
        });

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

        module.exports = db;
        ```
    - Create a schema file
        ```touch schemaName.js```
    - Add the following base code to the file
        ```js
        "use strict";

        module.exports = (sequelize, DataTypes) => {
            const schemaName = sequelize.define(
                "schemaName",
                {
                    attribute: DataTypes.TYPE,
                },
                {
                    freezeTableName: true,
                    
                }
            );

            schemaName.associate = models => {

            };

            return schemaName;
        };
        ```
    - See [DataTypes](http://docs.sequelizejs.com/variable/index.html#static-variable-DataTypes)

- Modify the app.js file
    - Rename the file to server.js
    - Remove code for view engine
        ```js
        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'ejs');
        ```
    - Change all var into const
    - Add the following to the dependencies
        ```js
        const cors = require('cors');
        const schema = require('./schema');
        ```
    - Add the following to the first ```app.use``` section 
        ```js
        app.use(cors);
        ```
    - Reformat routes into a single line with require on the file path
        - Original
            ```js
            const indexRouter = require('./routes/index');
            app.use('/', indexRouter);
            ```
        - New
            ```js
            app.use(require("./routes/index"));
            ```
    - Remove error handling section
        - We will implement our own error handling on the client side
    - Change ```module.exports = app``` at the bottom of the file to the following
        ```js
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`The server is running on port ${ PORT }`);
        });
        ```

- Create routes inside the routes directory
    - Rename index.js to home.js

## Version Control

## Setup Database

- Local or cloud?

## Host App

## To Do

- Figure out how to integrate remote instance of PostgreSQL database
    - Look into Heroku and AWS

- Figure out how necessary redux is and how we should setup API calls
    - Is our database going to be real-time?
    - If real-time, it's better to have distinct API calls for each view component
    - If not real-time, having a global store can be enough and the api call should be made in the base component's componentDidMount method