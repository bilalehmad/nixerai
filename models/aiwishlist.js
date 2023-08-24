import mongoose, { Schema, model, models } from "mongoose";

const AIWishlistSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'AITool',

    }
}, {
    timestamps: true
});

const AIWishlist = models.AIWishlist || model("AIWishlist", AIWishlistSchema);

export default AIWishlist;