"use client"
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../../../public/assets/images/logo-black.png";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/signup";

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
import Link from "next/link";
import { EyeIcon, Loader2, Slash } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";




const Signup = () => {
    const [passwordShow, setpasswordShow] = useState(false)
    const [loading, setIsloading] = useState(false)
    
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username:"",
            email: "",
            password: '',
            confirmPassword:"",
        }
    })
    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        try {
            setIsloading(true)
          const res =  await axios.post('/api/auth/sign-up', data)
          toast("succesfully",{
            description:res.data.message
          })

        } catch (error) {
            console.log("axioserror during registration",error)
            const axioserror = error as AxiosError<{message:string}>
           toast("axios error signup",{
            description:axioserror.response?.data.message
           })
        } finally{
            setIsloading(false)
        } 
           
    }
    return (
        <Card className="md:h-fit md:w-[30%] mt-2 h-full border-2 shadow-xl  ">
            <CardContent>
                <div className="flex flex-col  items-center">
                    <Image
                        src={Logo.src}
                        width={Logo.width}
                        alt="logo Image"
                        height={Logo.height}
                        className=" max-w-[130px]"
                    />
                    <h1 className="font-bold text-shadow-lg text-2xl">
                       Create Account!
                    </h1>
                    <p className="tracking-tight max-w-full">Create new account by filling out the form below.</p>
                </div>
                <div className="mt-4 relative">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> username</FormLabel>
                                        <FormControl>
                                            <Input className="outline-primary"
                                                placeholder="enter username"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> email</FormLabel>
                                        <FormControl>
                                            <Input className="outline-primary" type="email"
                                                placeholder="enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="**********"
                                                {...field}
                                            />
                                        </FormControl>
                                       
                                    </FormItem>

                                )}
                            />
                             <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>confirm password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={passwordShow ? "password" : "text"}
                                                placeholder="**********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <div className="absolute bottom-11 right-2 p-1 "> <button type="button" onClick={() => setpasswordShow(!passwordShow)}>{passwordShow ? <EyeIcon /> : <Slash />}</button> </div>
                                    </FormItem>

                                )}
                            />
                            <Button type="submit" className="w-full" >{loading ? <Loader2 className="animate-spin" /> : "login"}</Button>
                        </form>
                    </Form>
                </div>
                <div className=" flex gap-1 mt-3 justify-center ">
                    <p className=" text-gray-600">
                        already have  account?
                    </p>
                    <Link href={"/"} className="text-primary underline"> login</Link>
                </div>
                
            </CardContent>
        </Card>
    );
};

export default Signup;