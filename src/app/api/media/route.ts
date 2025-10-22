import { dbconnect } from "@/lib/dbconnect";
import Media from "@/model/Media.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    dbconnect();
    try {
         const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const DeletedType = searchParams.get("deleteType")
        let filter = {};  
        if (DeletedType =="SD") {
            filter = {deletedAt:null}
        } else if( DeletedType =="PD"){
            filter = {deletedAt:{$ne:null}}
        }
        const media = await Media.find(filter).sort({createdAt:-1}).skip(page*limit).limit(limit).lean()
        const TotalMedia = await Media.countDocuments(filter)
return NextResponse.json({
    media,
    hashMore:((page+1)*limit) > TotalMedia
})
        
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch media", error },
            { status: 500 }
        );
    }
    
}