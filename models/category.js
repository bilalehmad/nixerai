import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
    
    name: {
        type: 'String',
        required: [true, "Name is Required."]
    }
})

const Category = models.Category || model("Category", CategorySchema);

export default Category;