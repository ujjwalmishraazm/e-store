"use client"
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,

} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { verifySchema } from "@/lib/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const Verify = () => {

    const [loading, setIsloading] = useState(false)
    const params = useParams<{ username: string }>()
    const router = useRouter()
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
    })
    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        console.log("data", data.code)
        
        try {
            setIsloading(true)
            const res = await axios.post(`/api/auth/verify-code`, {
                username: params.username,
                verifyCode: data.code
            })
            toast("successfully", {
                description: res.data.message
            }) 
           router.replace("/login")
        } catch (error) {
            console.error(error, "axios error at verification of code")
            const axioserror = error as AxiosError<{message:string}>
            toast("unsuccessfully", {
                description:axioserror.response?.data.message
            })

        }finally{
            setIsloading(false)
        }

    }
    return (
        <Card className="md:h-fit md:w-[30%] mt-2 h-full border-2 shadow-xl bg-primary text-white ">
            <CardContent>
                <div className="mt-4 relative">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> otp</FormLabel>
                                        <FormControl>
                                            <Input className="outline-gray-700"
                                                placeholder="enter otp"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" >{loading ? <Loader2 className="animate-spin" /> : "verify your self"}</Button>
                        </form>
                    </Form>
                </div>

            </CardContent>
        </Card>
    );
};

export default Verify;
