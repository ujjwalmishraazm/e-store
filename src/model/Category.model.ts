import mongoose from "mongoose";
import { Schema } from "mongoose";
      

export interface ICategory {
  name: string;
  slug: string;
  DeletedAt: Date;
}

const categorySchema: Schema<ICategory> = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        DeletedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Category =
    mongoose.models.Category ||
    mongoose.model<ICategory>("Category", categorySchema);

export default Category;
