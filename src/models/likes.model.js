import mongoose from "mongoose";

const likeSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true,
    // },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
        required: true,
    },
},{ timestamps: true })

export const Like = mongoose.model("Like", likeSchema)