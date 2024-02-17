const User =require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//register controller here
const registerUser = async (req, res) => {
    const { fullName, email,password } = req.body;

    // Check if any of the required parameters are missing
    if (!fullName  || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required details",
        });
    }

    try {
        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists",
            });
        }
        if (password.length <= 8) {
            return res.status(400).json({
                success: false,
                message: "password length should be greater than 8 character",
            });
        }

        // Hash the user's password before saving it to the database
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user instance with the hashed password
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
};


//Login controller here
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user provided both email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password",
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        //if user it will return all field like password name

        // Check if the user exists
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid  password",
            });
        }

        // User is authenticated; generate a JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        
    
        res.status(200).json({
            success: true,
            message: "Login successful",
            data:{user,token}
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
};

const updateUserDetails = async (req, res) => {
    const { fullName, email, password, oldPassword } = req.body;
    const userId = req.params.id;

    try {
        // Update user details
        const updateFields = {};
        if (fullName) updateFields.fullName = fullName;
        if (email) updateFields.email = email;

        if (oldPassword && password) {
            // Check if the old password matches
            const existingUser = await User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const isPasswordMatch = await bcrypt.compare(oldPassword, existingUser.password);
            if (!isPasswordMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Old password does not match"
                });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }

        // Find by id and update
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User details updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    }
};

module.exports={
    registerUser,
    loginUser,
    updateUserDetails
}