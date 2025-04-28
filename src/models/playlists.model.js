import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema ({
    id:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    videos: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{ timestamps: true })

export const PLaylist = mongoose.model("Playlist", playlistSchema)