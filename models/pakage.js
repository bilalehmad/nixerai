import mongoose, { Schema, model, models } from "mongoose";

const PakageSchema = new Schema({
    title: {
        type: 'String',
        required: [true, "Title is Required."]
    },
    detail: {
        type: 'String',
        required: [true, "Detail is Required."]
    },
    duration: {
        type: 'String',
        required: [true, "Title is Required."]
    },
    discription: {
        type: mongoose.Schema.Types.Array,
        required: [true, "Discription is Required."]
    },
    amount: {
        type: 'String',
        required: [true, "Title is Required."]
    }
})

const Pakage = models.Pakage || model("Pakage", PakageSchema);

export default Pakage;