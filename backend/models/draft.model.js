
import mongoose, { Schema, model } from "mongoose";

const draftSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receipent: {
        type: String,
        required: true
    },
    subject: {
        type: String
    },
    body: {
        type: String
    }
}
,
{
    timestamps: true 
}
)

export const Draft = model('Draft', draftSchema);