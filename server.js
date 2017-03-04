// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys

//var stripe = require("stripe")("sk_test_JsxAm64Y0saeKO42HWO0zh5W");
var stripe = require("stripe")(process.env.SECRET_KEY);


// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
var token = request.body.stripeToken; // Using Express

// Charge the user's card:
var charge = stripe.charges.create({
  amount: 4000,
  currency: "usd",
  description: "My365 Custom Calendar",
  source: token,
}, function(err, charge) {
  // asynchronously called
});