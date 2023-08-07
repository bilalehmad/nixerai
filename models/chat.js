import mongoose, { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    messages: {
        type: mongoose.Schema.Types.Array,
        required: [true, "Messages is Required."]
    },
    title: {
        type: 'String',
        required: [true, "Title is Required."]
    }
})

const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;