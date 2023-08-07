import mongoose, { Schema, model, models } from "mongoose";

const PromptReactionSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Prompt',

    },
    reaction: {
        type: 'String',
        required: [true, "Reaction is Required."]
    },
    timestamps: { type : Date}
})

const PromptReaction = models.PromptReaction || model("PromptReaction", PromptReactionSchema);

export default PromptReaction;