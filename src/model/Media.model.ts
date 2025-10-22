import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IMedia {
    public_id: string;
    url: string;
    path: string;
    asset_id: string;
    thumbnailUrl: string;
    secure_url: string;
    DeletedAt: Date;
    alt: string;
    title: string;
}

const mediaSchema = new Schema({
    asset_id: { type: String, trim: true },
    public_id: { type: String, required: true, trim: true },
    secure_url: { type: String, required: true },
    path: { type: String, required: true },
    thumbnailUrl: { type: String, trim: true },
  
    DeletedAt: { type: Date, default: Date.now },
    alt: { type: String, trim: true, default: "image" },
    title: { type: String, trim: true, default: "image" },
}, { timestamps: true });

const Media = mongoose.models.Media || mongoose.model<IMedia>("Media", mediaSchema);


export default Media; // cloudinary.ts
