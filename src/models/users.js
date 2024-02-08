
import { Schema, model } from 'mongoose';
import validator from "validator";

const schema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter Name"]
    },
    email: {
        type: String,
        required: [true, "please enter email"],
        unique: [true, "Email is already Exists"],
        validate: {
            validator: validator.isEmail,
            message: 'Invalid Email address'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true }
);

const User = model("users", schema)

export default User;