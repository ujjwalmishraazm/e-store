import z from "zod";

export const categorySchema = z.object({
   name: z
         .string()
         .min(3, { message: "neme must be at least 3 characters." })
         .max(15, { message: "nem must be at most 15 characters." })
        ,
         slug:z.string().min(8,{message:"minimum 8 letter"}).max(50,{message:"maximum 50 charecter "})
})