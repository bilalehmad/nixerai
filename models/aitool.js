import mongoose, { Schema, model, models } from "mongoose";

const AIToolSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    title: {
        type: 'String',
        required: [true, "Title is Required."]
    },
    url: {
        type: 'String',
        required: [true, "URL is Required."]
    },
    accessibility: {
        type: 'String',
        required: [true, "Accessibility is Required."]
    },
    star: {
        type: 'Number'
    },
    youtubeUrl: {
        type: 'String'
    },
    description: {
        type: 'String',
        required: [true, "Description is Required."]
    },
    image: {
        type: 'String',
        required: [true, "Image is Required."]
    },
    status: {
        type: 'String',
        required: [true, "Status is Required."]
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
    }
})

const AITool = models.AITool || model("AITool", AIToolSchema);

export default AITool;