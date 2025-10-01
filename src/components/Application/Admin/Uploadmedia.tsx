"use client"
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
// import { toast } from 'sonner'
// type UploadWidgetResult = {
//   event: string; // like "success", "queues-end", "display-changed"
//   info?: {
//     public_id?: string;
//     secure_url?: string;
//     url?: string;
//     [key: string]: string | undefined;
//   };
//   [key: string]: string | undefined;    
// };
const Uploadmedia = () => {
    const handleError = () => {
        // toast("error during upload", {
        //     description: error
        // })

    }
    const handleQueue = async (result: unknown) => {
        console.log(result)

    }
    return (
        <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-signature"
            uploadPreset="e-store"
            onError={handleError}
            onQueuesEnd={handleQueue}
            config={{
                cloud: {
                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
                    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
                }
            }}
            options={{
                sources: ['local', 'url', 'unsplash'],
                multiple: true,
            }}

        >
            {({ open }) => {
                return (
                    <Button className="button" onClick={() => open()}>
                        Upload
                    </Button>
                );
            }}

        </CldUploadWidget>
    )
}

export default Uploadmedia


