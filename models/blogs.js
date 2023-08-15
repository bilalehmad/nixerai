import mongoose, { Schema, model, models } from "mongoose";

const BlogsSchema = new Schema({
    auther: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    subject: {
        type: 'String',
        required: [true, "Subject is Required."]
    },
    title: {
        type: 'String',
        required: [true, "Title is Required."]
    },
    article: {
        type: 'String',
        required: [true, "Article is Required."]
    },
    tags: {
        type: 'String',
        required: [true, "Article is Required."]
    },
    timestamps: { type : Date }
})

const Blogs = models.Blogs || model("Blogs", BlogsSchema);

export default Blogs;