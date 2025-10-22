"use client"

import React, { ComponentProps } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

/* ---------- TYPES ---------- */
// Each file returned from the Cloudinary widget
export type UploadFileInfo = {
    uploadInfo?: {
        asset_id?: string;
        public_id?: string;
        secure_url?: string;
        path?: string;
        thumbnail_url?: string;
    };
};

// The event result from the upload widget
export type UploadWidgetResult = {
    event?: string;
    info?: {
        files?: UploadFileInfo[];
    };
};

type OnQueuesEnd = ComponentProps<typeof CldUploadWidget>["onQueuesEnd"];
type OnError = ComponentProps<typeof CldUploadWidget>["onError"];

/* ---------- COMPONENT ---------- */
const Uploadmedia: React.FC = () => {
    const handleError: OnError = (error) => {
        console.error("Error during upload:", error);
        toast.error("Upload failed. Please try again.");
    };

    const handleQueue: OnQueuesEnd = async (result) => {
       

        const files = (result as UploadWidgetResult)?.info?.files ?? [];
        if (!Array.isArray(files) || files.length === 0) {
            toast.warning("No file metadata found after upload!");
            return;
        }

        // Extract relevant fields for MongoDB
        const payload = files.map((f) => ({
            asset_id: f.uploadInfo?.asset_id,
            public_id: f.uploadInfo?.public_id,
            secure_url: f.uploadInfo?.secure_url,
            path: f.uploadInfo?.path,
            thumbnail_url: f.uploadInfo?.thumbnail_url,
        }));

    

        try {
            const res = await axios.post("/api/media/create", payload);
            toast.success("Media uploaded and saved!", {
                description: `Inserted ${
                    res.data.data?.length || 0
                } documents.`,
            });
        } catch (error) {
            console.error("Axios error:", error);
            toast.error("Failed to save media to database");
        }
    };

    /* ---------- UI ---------- */
    return (
        <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-signature"
            uploadPreset="e-store"
            onError={handleError}
            onQueuesEnd={handleQueue}
            options={{
                sources: ["local", "url", "unsplash"],
                multiple: true,
            }}
        >
            {({ open }) => (
                <Button onClick={() => open()} className="button">
                    Upload Media
                </Button>
            )}
        </CldUploadWidget>
    );
};

export default Uploadmedia;
