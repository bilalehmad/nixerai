import mongoose, { Schema, model, models } from "mongoose";

const EmailsSchema = new Schema({
    
    email: {
        type: 'String',
        required: [true, "Email is Required."]
    }
})

const Emails = models.Emails || model("Emails", EmailsSchema);

export default Emails;