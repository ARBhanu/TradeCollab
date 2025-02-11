const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
            trim: true,
        },
        pic: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        otp: {
            type: String,
            default:null
        },
    },
    { timestaps: true }
)
userSchema.methods.matchPassword = async function (enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next){
    if(!this.isModified)
    {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);
module.exports = User;