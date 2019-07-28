import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchem = new Schema({
    Category: {
        type: String,
        required: true,
        unique: true,
    },
    Creator_id: {
        type: String,
    },
});

const ProductSchem = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    Price: {
        type: Number,
    },
    Life: {
        type: String,
    },
    Category: {
        type: String,
    },
});

export const category = mongoose.model("Category", CategorySchem);
export const product = mongoose.model("Product", ProductSchem);
