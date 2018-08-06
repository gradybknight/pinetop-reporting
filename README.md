# Pinetop Distillery Production System

## Front End

React / Redux Application using the following packages:
    
    material-ui
    axios
    react-easy-chart
    redux-thunk

The front end is designed to allow employees and partners to view current operation of each unit operation in the distillery.
Additionally, partners have access to current and historic inventory levels.
Access to views is governed on the backend through passport and a mongo database.

## Back End

Express server using the following packages:

    bcrypt
    express
    mongoose
    passport
    phidget22

All above packages are used in a relatively common manner.

phidget22 acts as an interface to a suite of input / output boards.  These boards are phyically attached to the server.  The boards are used to energize (or de-energize) relays or read temperature.

## Usage

```
mongod
yarn start
``
port 3000 will act as front end
port 3001 will act as server
