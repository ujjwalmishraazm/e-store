// import { UploadWidgetResult } from "@/components/Application/Admin/UploadWidgetResult";
import { UploadWidgetResult } from "@/components/Application/Admin/Uploadmedia";
import cloudinary from "@/lib/cloudinay";
import { dbconnect } from "@/lib/dbconnect";
import Media from "@/model/Media.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    await dbconnect();
    const data = await request.json();
    console.log(data, "data from frontend");
    try {
        const user = await Media.insertMany(data);
        console.log(user, "user data");
        return NextResponse.json(
            { success: true, message: user },
            { status: 200 }
        );
       
    } catch (error) {   
        try {
            if (data && data.length > 0) {
                const public_id = data.map(
                    (data: UploadWidgetResult) => data.info?.files?.[0]?.uploadInfo?.public_id
                );
                await cloudinary.api.delete_resources(public_id);
                return NextResponse.json(
                    { success: false, message: "Media upload failed", error },
                    { status: 500 }
                );
            }
        } catch (deleted) {
            console.log(deleted, "something happen during deleted cloudonary ");
        }
    }
}
