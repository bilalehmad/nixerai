import mongoose, { Schema, model, models } from "mongoose";

const SubscriptionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',

    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bundle'

    },
    status: {
        type: 'String',
        required: [true, "Status is Required."]
    },
    start_timestamps: { type : Date},
    end_timestamps: { type : Date}
})

const Subscription = models.Subscription || model("Subscription", SubscriptionSchema);

export default Subscription;