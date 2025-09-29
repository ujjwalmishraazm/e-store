import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface Media {     
    public_id: string;
    url: string;
    path: string;
    thumbnailUrl: string;
    DeletedAt: Date;
    alt: string;
    title: string;
}

const mediaSchema = new Schema({
    asset_id: { type: String, trim: true },
    public_id: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    path: { type: String, required: true },
    thumbnailUrl: { type: String, trim: true },
    DeletedAt: { type: Date, default: Date.now },
    alt: { type: String, trim: true, default: "image" },
    title: { type: String, trim: true, default: "image" },
});

const Media = mongoose.model("Media", mediaSchema);

export default Media; // cloudinary.ts
