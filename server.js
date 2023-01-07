// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const express = require("express");
const app = express();
const client = require('twilio')(accountSid, authToken);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser")

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

// API ENDPOINTS 
app.get("/register", async (req, res) => {
    res.sendFile(__dirname + "/register.htm");
});

app.post('/register', async (req, res) => {
    // Get the user details from the request body
    const { username, email, password, confirmPassword } = req.body;
    const user = await User.findOne({ username });
    if (password == confirmPassword && !user) {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Generate a JSON web token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Send the token back to the client
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        res.setHeader("Set-Cookie", `auth_token=${token}; Expires=${expires.toUTCString()}; Path=/`);
        res.sendFile(__dirname + "/success.htm");
    }
    else {
        res.send("<h1>NO.</h1>");
    }
});

app.get("/login", async (req,res) => {
    res.sendFile(__dirname + "/login.htm");
});

app.post('/login', async (req, res) => {
    // Get the user details from the request body
    const { username, password } = req.body;

    // Find the user by their username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JSON web token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send the token back to the client
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    res.setHeader("Set-Cookie", `auth_token=${token}; Expires=${expires.toUTCString()}; Path=/`);
    res.sendFile(__dirname + "/success.htm");
});

app.get('/protected', async (req, res) => {
    // Get the token from the request header
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'No authorization token provided' });
    }

    // Verify the token
    try {
        const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
        return res.status(401).json({ error: 'Invalid token' });
        }
        res.json({ message: 'You have access to this protected route' });
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});
  
app.get("/*",function(req,res){
    res.sendFile(__dirname + "/index.htm");
});

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/medicine-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a user model
const User = mongoose.model('User', {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

app.listen(process.env.PORT || 3000, function() {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
