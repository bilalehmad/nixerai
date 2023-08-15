import mongoose, { Schema, model, models } from "mongoose";

const AICategorySchema = new Schema({
    
    name: {
        type: 'String',
        required: [true, "Name is Required."]
    }
})

const AICategory = models.AICategory || model("AICategory", AICategorySchema);

export default AICategory;