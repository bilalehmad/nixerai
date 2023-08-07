import mongoose, { Schema, model, models } from "mongoose";

const ToolReactionSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'AITool',

    },
    reaction: {
        type: 'String',
        required: [true, "Reaction is Required."]
    },
    timestamps: { type : Date}
})

const AIToolReaction = models.AIToolReaction || model("AIToolReaction", ToolReactionSchema);

export default AIToolReaction;