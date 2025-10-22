import { categorySchema } from "@/lib/category";
import { dbconnect } from "@/lib/dbconnect";
import Category from "@/model/Category.model";


export async function POST(req: Request) {
      dbconnect();
    try {
        const payload =  await req.json();
        console.log(payload,"payload")
        const data = categorySchema.safeParse(payload);
        if(!data.success){
            return Response.json({success:false,message:data.error},{status:401})
        }
         const {name,slug} = data.data
        const newData = new Category({
            name,
            slug,
        })
        await newData.save()
        return Response.json({success:true,message:"successfully added categories"})
    } catch (error) {
        return Response.json(
            { success: false, message: "internal server error", Error },
            {
                status: 500,
            }
        );
    }
}
