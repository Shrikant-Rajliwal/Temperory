import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
    Name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        sparse:true,
        index:true
    },
    Description: {
        type: String,
        required: true,
        trim: true
    },
    Image: {
        type: String,
        required: true,
        trim: true
    },
    Price: {
        type: Number,
    }
});

export const item = mongoose.model("item", ItemSchema);


