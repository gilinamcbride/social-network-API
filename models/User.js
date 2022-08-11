const { Schema, model } = require("mongoose");
const { User } = require(".");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;