import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import User from './models/user.js';
const app = express();
const port = 4000;



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// connect to database
connectDB();

// midleware
const corsOptions = {
    origin: 'https://postttt.vercel.app', // frontend url
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());

// register route
app.post('/register', async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists", success: false });
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating new user

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.json({ message: "User registered successfully", success: true });



    } catch (error) {
        console.log(error);
        res.json({ message: "Error in registering user", success: false });
    }

});

// login route
app.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        // checking if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.json({ message: "User does not exist", success: false });
        }

        // comparing passwords
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.json({ message: "Invalid credentials", success: false });
        }

        res.json({ message: "User logged in successfully", success: true });

    } catch (error) {
        console.log(error);
        res.json({ message: "Error in logging in", success: false });
    }

});

// reset password route
app.post('/reset-password', async (req, res) => {

    try {
        const { email, newPassword } = req.body;

        //validate email / password here as needed
        if (!email || !newPassword) {
            return res.json({ message: "Email and new password are required", success: false });
        }

        // checking if user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.json({ message: "User does not exist", success: false });
        }

        // hashing new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // updating user's password
        existingUser.password = hashedPassword;
        await existingUser.save();
        
        res.json({ message: "Password reset successfully", success: true });

    } catch (error) {
        console.log(error);
        res.json({ message: "Error in logging in", success: false });

    }
});