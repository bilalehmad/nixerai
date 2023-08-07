import mongoose, { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    title: {
        type: 'String',
        required: [true, "Title is Required."]
    },
    teasor: {
        type: 'String',
        required: [true, "Teasor is Required."]
    },
    sample: {
        type: 'String',
        required: [true, "Sample is Required."]
    },
    example: {
        type: 'String',
        required: [true, "Example is Required."]
    },
    output1: {
        type: 'String',
    },
    output2: {
        type: 'String',
    },
    status: {
        type: 'String',
        required: [true, "Status is Required."]
    },
    type: {
        type: 'String',
    },
    image: {
        type: 'String',
    },
    likes: {
        type: 'number',
    },
    views: {
        type: 'number',
    },
    wishlisted: {
        type: 'number',
    },
    tag: {
        type: "String",
        required: [true, "Tag is Required."]
    },
    timestamps: { type : Date }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;