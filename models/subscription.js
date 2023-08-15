import mongoose, { Schema, model, models } from "mongoose";

const PromptReactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    pakage: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Pakages',

    },
    status: {
        type: 'String',
        required: [true, "Status is Required."]
    },
    start_timestamps: { type : Date},
    start_timestamps: { type : Date}
})

const PromptReaction = models.PromptReaction || model("PromptReaction", PromptReactionSchema);

export default PromptReaction;