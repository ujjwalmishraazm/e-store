"use client"
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../../../../public/assets/images/logo-black.png";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/logInSchema";
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
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const Login = () => {
    const router = useRouter()
    const [passwordShow, setpasswordShow] = useState(true)
    const [loading, setIsloading] = useState(false)
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ''
        }
    })
    const onSubmit = async (data: z.infer<typeof loginSchema>) => {
        try {
            setIsloading(true)
            const res = await signIn("credentials", {
                redirect: true,
                email: data.email,
                password: data.password
            })
            if (res?.error) {
                if (res.error == "credentialSignIn") {
                    toast("logIn failed", {
                        description: "unable to lofIn"
                    })
                } else {
                    toast("error", {
                        description: res.error
                    })
                }
            }
            if (res?.url) {
                router.replace('/Dashboard')

            }

        } catch (error) {
            console.log(error)

        }
    }
    return (
        <Card className="md:h-[80%] md:w-[30%] mt-5 h-full border-2 shadow-xl ">
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
                        Login Into Account
                    </h1>
                    <p>Login into your account by filling details</p>
                </div>
                <div className="mt-4 relative">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> email</FormLabel>
                                        <FormControl>
                                            <Input className="outline-primary"
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
                                                type={passwordShow ? "password" : "text"}
                                                placeholder="**********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <div className="absolute top-29 right-2 "> <button onClick={() => setpasswordShow(!passwordShow)}>{passwordShow ? <EyeIcon /> : <Slash />}</button> </div>
                                    </FormItem>

                                )}
                            />
                            <Button type="submit" className="w-full" >{loading ? <Loader2 className="animate-spin" /> : "login"}</Button>
                        </form>
                    </Form>
                </div>
                <div className=" flex gap-1 mt-3 justify-center ">
                    <p className=" text-gray-600">
                        dont have  account?
                    </p>
                    <Link href={"/"} className="text-primary underline"> create account!</Link>
                </div>
                <div className="flex justify-center mt-2">
                    <Link href={"/"} className="text-primary underline">Forgot password</Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default Login;
