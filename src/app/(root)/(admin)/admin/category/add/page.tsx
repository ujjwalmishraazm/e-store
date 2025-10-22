"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import slugify from "slugify";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { categorySchema } from "@/lib/category";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";


const Category = () => {
    const [loading, setIsloading] = useState(false);
    const [message,setismessage]=useState('')
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            slug: "",
        },
    });
    useEffect(() => {
        const name = form.getValues("name");
        if (name) {
            form.setValue("slug", slugify(name).toLowerCase());
        }
    }, [form.watch("name")]);
    const onSubmit = async (data: z.infer<typeof categorySchema>) => {
        console.log(data,"data")
       try {
        setIsloading(true)
         const res = await axios.post("/api/category/create",data)
         console.log(res,"res")
         const msg = res.data?.message ?? "success";
         setismessage(res.data.message)
         toast("success",{description:msg})
         form.reset()
       } catch (error) {
                   const axioserror = error as AxiosError<{message:string}>
                  toast("error",{
                   description:axioserror.response?.data.message
                  })}
       finally{
       setIsloading(false)
       }
    };
    return (
        <Card className="md:h-fit md:w-[95%] mt-2 h-full border-2 shadow-xl gap-10 mx-auto">
            <CardContent>
                <CardHeader className="  border-b-2 m-w-full  flex items-center h-[50px] justify-start ">
                    Add category
                  
                </CardHeader>
                <div className="mt-5 relative ">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 gap-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold gap-5">
                                            {" "}
                                            username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="outline-primary"
                                                placeholder="enter username"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            {" "}
                                            slug
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="outline-primary"
                                                type="text"
                                                placeholder="slug"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div>
                                <Button >
                                    {loading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        "Add category"
                                    )}{" "}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    );
};

export default Category;
