import mongoose, { Schema, model, models } from "mongoose";

const WishlistSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Prompt',

    }
}, {
    timestamps: true
});

const Wishlist = models.Wishlist || model("Wishlist", WishlistSchema);

export default Wishlist;