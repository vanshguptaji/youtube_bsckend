import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema ({
    // id: {
    //     type: String,
    //     required: true,
    // },
    subscriber:{
        type: Schema.Types.ObjectId, //one who is subscribing
        ref: "User",
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: "User", // channel to which the subscription is made
    },
},{timestamps: true});



export const Subscription = mongoose.model("Subscription", subscriptionSchema)