import React from "react";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import { MediaItem } from "@/app/(root)/(admin)/admin/media/page";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";

type MediaComProps = {
    media: MediaItem;
    selectedMedia: string[];
    handleDelete?: (ids: string[], deleteType: string) => void;   
    setSelectedMedia: React.Dispatch<React.SetStateAction<string[]>>;
    deleteType?: string;
};

const MediaCom: React.FC<MediaComProps> = ({
    media,
    selectedMedia,
    handleDelete,
    setSelectedMedia,
    deleteType,
}) => {
   
    const checkChange = () => {
      let checkMedia = []
      if(selectedMedia?.includes(media._id)){
         checkMedia = selectedMedia?.filter((id) => id !== media._id);
      
      } else{
            checkMedia = [...(selectedMedia || []), media._id];
      }
      setSelectedMedia?.(checkMedia);
    };
   

    return (
        <div className="border-1 border-gray-200 dark:border-gray-800 relative group overflow-hidden rounded hover:shadow-lg ">
            <div className="absolute z-20 left-0 top-0 ">
                <Checkbox
                    checked={selectedMedia?.includes(media._id)}
                    onCheckedChange={checkChange}
                />
            </div>
            <div className="absolute z-20 right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="h-20 w-20">
                            <BsThreeDotsVertical className="text-white" />
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {deleteType == "SD" && (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link href={`/admin/media/edit/${media._id}`}>
                                        <MdOutlineEdit />
                                        Edit
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={async (e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        try {
                                            const url = media.secure_url ?? "";
                                            if (!url) {
                                                toast("No URL to copy");
                                                return;
                                            }
                                            if (
                                                !navigator.clipboard?.writeText
                                            ) {
                                                toast(
                                                    "Clipboard API not supported in this browser"
                                                );
                                                return;
                                            }
                                            await navigator.clipboard.writeText(
                                                url
                                            );
                                            toast("Link copied to clipboard", {
                                                description: url,
                                            });
                                        } catch (err) {
                                            console.error(
                                                "clipboard error",
                                                err
                                            );
                                            toast("Failed to copy link");
                                        }
                                    }}
                                >
                                    <IoIosLink />
                                    copy
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuItem onClick={()=>{
                            handleDelete?.([media._id], deleteType || "SD")}}>
                            <LuTrash2 color="red" />
                            {deleteType == "SD"
                                ? "move into trash"
                                : "Delete permanently"}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div>
                <Image
                    className="object-fit w-full h-48"
                    src={media.secure_url || ""}
                    alt="media"
                    width={300}
                    height={300}
                    unoptimized
                />
            </div>
        </div>
    );
};

export default MediaCom;
