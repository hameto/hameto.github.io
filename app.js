// deploy locally with ' PUBLISHABLE_KEY=abc123 SECRET_KEY=abc123 node app.js '


const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const express = require('express');
const app = express();
const stripe = require("stripe")(keySecret);
const path = require('path');
var PORT = process.env.PORT || 3000;
    
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + /public/));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.get("/calendar", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/calendar.html"));
});

app.get("/success", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/success.html"));
});

app.get("/whoops", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/whoops.html"));
});

app.post("/charge", (req, res) => {
  let amount = 4000; //$40

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  //.then(charge => res.sendFile(path.join(__dirname + "/public/success.html")) );
  	.then(redirect => res.redirect( '/success' ));

});



console.log('Express+Node are now running on localhost:' + PORT);
app.listen(PORT);