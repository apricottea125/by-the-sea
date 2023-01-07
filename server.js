// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const express = require("express");
const app = express();

// CHANGE THE TWO ABOVE TO ENVIRONMENTAL VARIABLES LATER
const client = require('twilio')(accountSid, authToken);

// function to call someone
async function callPatient(phoneNumber, message) {
    client.calls
        .create({
            twiml: `<Response><Say>${message}</Say></Response>`,
            to: phoneNumber, 
            from: '+15105293839'
        })
        .then(call => {
            console.log(call.sid);
        })
        .catch(err => console.log(err));
}

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.htm");
});

app.listen(process.env.PORT || 3000, function() {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

// callPatient("+redacted lol", "HELLO IT'S ISABEL AND BAIHE!");