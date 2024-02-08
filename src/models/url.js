import { Schema, model } from 'mongoose';

const referenceSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    redirectURL: {
        type: String,
        required: true,
        trim: true
    },
    history: [
        { timestamps: { type: Number } }
    ]
}, { timestamps: true })

//assing one schema to other for proper managing data
const schema = new Schema({
    reference_id: { type: String },
    urls: {
        type: [referenceSchema]
    }

}
)

const URL =  model("URLs", schema) 

export default URL;