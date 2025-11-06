import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface Iproduct {
    name: string;
    slug: string;
    category: mongoose.Types.ObjectId;
    mrp: number;
    sellingPrice: number;
    discount?: number;
    media: mongoose.Types.ObjectId[];
    description?: string;
    DeletedAt: Date;
}

const productSchema: Schema<Iproduct> = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        mrp: {
            type: Number,
            required: true,
        },
        sellingPrice: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
        },
        media: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Media",
            },
        ],
        description: {
            type: String,
        },

        DeletedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Product =
    mongoose.models.Product ||
    mongoose.model<Iproduct>("Product", productSchema);

export default Product;
