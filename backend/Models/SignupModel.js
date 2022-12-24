import mongoose from "mongoose";

const SignupStructure = mongoose.Schema({
  FullName: { type: String },
  UserName: {
    type: String,
  },
  Password: {
    type: String,
  },

  Email: {
    type: String,
  },
  PhoneNumber: {
    type: String,
  }
});

const SignupModel = mongoose.model("Sign Up Data", SignupStructure);

export default SignupModel;
