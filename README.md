# Junglee App

This app is used for selecting coin of suitable amount and making payment via some method.

## Technologies used
- Frontend: Angular 6
- Backend: Nodejs, Express


## To setup the app
- Clone the repository or download the zip file and extract it.
- Ensure that system has node and npm installed. If not, download and install node from "https://nodejs.org/en/download/".
- In the root folder, run `npm install`. This should create node_modules folder in the root folder of app. 
- Then go to server folder using `cd server` and run `npm install` there. This should fetch the dependencies for the node js server code.

## To setup the app
- Open terminal with path set to the root folder of the app.
- Run `ng serve`, this should start the frontend of the app.
- In a new terminal tab, go the server folder of the app and run `node app.js` to start the node app.
- Now go in the browser and type http://localhost:4200, the app will start running.

## Live demo
The app is deployed on heroku and can be accessed using the url "https://junglee-games.herokuapp.com/".

## Credentials
- Select any coin amount, for custom amount, enter value between 1 to 99999.
- For Credit/Debit card, enter any actual card number for testing.
- For netbanking, select any bank, enter Account No.; "1234567890" and Routing Id: "987654321". Only this entry will be considered valid and rest will be treated as invalid.
- To change the coins to be displayed, go to path `server/responses/coins-response.json` and upadte that file.
- Similarly for net banking bank list updates, go to path `server/responses/payment-options.json` and update that file.
