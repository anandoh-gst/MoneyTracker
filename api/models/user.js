import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";


// User model schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static method to login a user
userSchema.statics.login = async function(email, password){

  const user = await this.findOne({ email });

  if ( !user ) {
    const error = new Error("Incorrect Email, please enter a valid email");
    error.errorType = "email";
    throw error;
  } 

  const isAuth = await bcrypt.compare(password, user.password);

  if ( !isAuth ) {
    const error = new Error("Incorrect Password, please enter a valid password");
    error.errorType = "password";
    throw error;
  } 
  
  return user;
}

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
