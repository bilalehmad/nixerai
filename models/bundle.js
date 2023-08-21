import mongoose, { Schema, model, models } from "mongoose";

const BundleSchema = new Schema({
    title: {
        type: 'String',
        required: [true, "Title is Required."]
    },
    detail: {
        type: 'String',
        required: [true, "Detail is Required."]
    },
    amount: {
        type: 'number',
    },
    short: {
        type: 'String',
    },
    duration: {
        type: 'String',
        required: [true, "Title is Required."]
    },
    highlight: {
        type:'String'
    }
})

const Bundle = models.Bundle || model("Bundle", BundleSchema);

export default Bundle;