import { dbconnect } from "@/lib/dbconnect";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await dbconnect();

        const searchParams = req.nextUrl.searchParams;
        // extracting query parameter
        const start = parseInt(searchParams.get("start") || 0, 10);
        const size = parseInt(searchParams.get("size") || 10, 10);
        const filter = JSON.parse(searchParams.get("filters") || "[]");
        const globalFilter = searchParams.get("globalFilter");
        const sorting = JSON.parse(searchParams.get("sorting") || "[]");
        const deleteType = searchParams.get("deleteType");
        // match Query
        let matchQuey = {};
        if (deleteType == "SD") {
            matchQuey = { deleteType: null };
        } else if (deleteType == "PD") {
            matchQuey = { deleteType: { $ne: null } };
        }
        // globalfiter
        if (globalFilter) {
            matchQuey["$or"] = [
                { name: { $regex: globalFilter, $options: "i" } },
                { slug: { $regex: globalFilter, $options: "i" } },
            ];
        }
      filter.forEach(filter=>{
            matchQuey[filter._id] = {$regex:filter.value,$options:'i'}
      })
      // sorting
      let sortQuey = {}
      sorting.forEach(sort=>{
            sortQuey[sort._id] = sort.desc?-1:1
      })

    } catch (error) {
        return Response.json(
            { success: false, message: "internal server Error" },
            { status: 500 }
        );
    }
}
