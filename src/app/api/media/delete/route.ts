import cloudinary from "@/lib/cloudinay";
import { dbconnect } from "@/lib/dbconnect";
import Media from "@/model/Media.model";

import mongoose from "mongoose";


export async function PUT(request: Request) {
    await dbconnect();
    try {
        const payload = await request.json();
        console.log(payload, "payload--->");
        const { ids } = payload || [];
        const { deleteType } = payload;
        if (!Array.isArray(ids) || ids.length == 0) {
            return Response.json(
                {
                    success: false,
                    message: "data may not be in appropriate form",
                },
                { status: 401 }
            );
        }
        const media = await Media.find({ _id: { $in: ids } }).lean();
        if (!media.length) {
            return Response.json(
                { success: false, message: "media not present" },
                { status: 404 }
            );
        }
        if (!["SD", "RSD"].includes(deleteType)) {
            return Response.json(
                { success: false, message: "inappropiate form" },
                { status: 404 }
            );
        }
        if (deleteType == "SD") {
          const deleteddata=  await Media.updateMany(
                { _id: { $in: ids } },
                { $set: { DeletedAt: new Date().toISOString() } }
            );
            console.log(deleteddata,"deletedfata")
        } else {
          const data =   await Media.updateMany(
                { _id: { $in: ids } },
                { $set: { DeletedAt: null } }
            );
            console.log(data,"datta")
        }
        
        return Response.json({
            success: true,
            message: deleteType==="SD"?"soft-deleted":"restored"+" successfully",
        });
    } catch (error) {
        return Response.json(
            { success: false, message: error },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    await dbconnect();
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const payload = await request.json();
        const { ids } = payload || [];
        const { deleteType } = payload;
        if (Array.isArray(ids) || ids.length == 0) {
            return Response.json(
                {
                    success: false,
                    message: "data may not be in appropriate form",
                },
                { status: 401 }
            );
        }
        const media = await Media.find({ _id: { $in: ids } })
            .session(session)
            .lean();
        if (!media.length) {
            return Response.json(
                { success: false, message: "media not present" },
                { status: 404 }
            );
        }
        if (deleteType !== "PD") {
            return Response.json(
                { success: false, message: "inappropiate form" },
                { status: 404 }
            );
        }
       const deleteddata =  await Media.deleteMany({ _id: { $in: ids } }).session(session);
       console.log(deleteddata,"deleteddata")

        const public_ids = media.map((m) => m.public_id);
        try {
          const  cloudinarydelete =   await cloudinary.api.delete_resources(public_ids);
          console.log(cloudinarydelete,"cloudinary deleted dat")
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.log("cloudinary delete error", error);
            return Response.json(
                {
                    success: false,
                    message: "error deleting from cloudinary",
                },
                { status: 500 }
            );
        }
            await session.commitTransaction();
            session.endSession();

        return Response.json({
            success: true,
            message: "deleted successfully perqmanently",
        });
    } catch (error) {
        await session.commitTransaction();
            session.endSession();
        return Response.json(
            { success: false, message: error },
            { status: 500 }
        );
    }
}
