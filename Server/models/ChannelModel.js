import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    rquired: true,
  },
  members: [{ type: mongoose.Schema.ObjectId, ref: "Users", required: true }],

  admin: { type: mongoose.Schema.ObjectId, ref: "Users", require: true },
  messages: [
    { type: mongoose.Schema.ObjectId, ref: "Messages", require: true },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});
channelSchema.pre("findOneAndUpdate",function(next){
    this.set({updatedAt:Date.now()});
    next();
})
const Channel=mongoose.model("Channels",channelSchema);
export default Channel;