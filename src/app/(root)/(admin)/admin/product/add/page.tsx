"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormInput, Loader2 } from "lucide-react";
import { productSchema } from "@/lib/productSchema";
import { toast } from "sonner";
type FormInput = z.input<typeof productSchema>; // raw input shape (strings for numeric fields)
type ParsedProduct = z.infer<typeof productSchema>;

const Product = () => {
  const [loading,setisloading]=useState(false)
    const form = useForm<FormInput>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            slug: "",
            category: "",
            mrp: "", // keep as string for form input
            sellingPrice: "",
            discount: "",
            // add other fields as needed (media, description, DeletedAt) using strings if you expect input
        },
    });

    const onSubmit = async (data:FormInput) => {
      console.log(data,"data")
          let payload: ParsedProduct;
    try {
      payload = productSchema.parse(data);
      console.log(payload,"payload")
    } catch (err) {
      if (err instanceof z.ZodError) {
        // zodResolver usually surfaces errors, but handle unexpected parse error
        toast("Validation error", { description: "Please check form fields." });
        return;
      }
      toast("Unexpected error while preparing data");
      return;
    }
    };
    return (
        <Card className="md:h-fit md:w-[95%] mt-2 h-full border-2 shadow-xl gap-10 mx-auto">
            <CardContent>
                <CardHeader className="  border-b-2 m-w-full  flex items-center h-[50px] justify-start ">
                    Add product
                </CardHeader>
                <div className="mt-5 relative ">
                    <Form {...form} >
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8  grid md:grid-cols-2 gap-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold gap-5">
                                            {" "}
                                            name
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
                            <FormField
                                control={form.control}
                                name="mrp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            {" "}
                                            MRP
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="outline-primary"
                                                type="text"
                                                placeholder="MRP"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            {" "}
                                            Discount
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="outline-primary"
                                                type="text"
                                                placeholder="Discount"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sellingPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            {" "}
                                            Sellingprice
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="outline-primary"
                                                type="text"
                                                placeholder="Sellingprice"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div>
                                <Button>
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

export default Product;
