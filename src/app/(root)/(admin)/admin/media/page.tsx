"use client";

import Uploadmedia from "@/components/Application/Admin/Uploadmedia";
import MediaCom from "@/components/Application/Media";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useDeleteMutation from "@/hooks/useMutation";
import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export type MediaItem = {
    _id: string;
    public_id?: string;
    secure_url?: string | null;
    asset_url?: string;
    path?: string;
    thumbnail_url?: string | null;
    title?: string;
};

type MediaPage = {
    media: MediaItem[];
    hasMore: boolean;
};

const MediaPage = () => {
    const [deleteType, setDeleteType] = useState("SD");
    const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const FetchMedia = async (
        page: number,
        deleteType: string
    ): Promise<MediaPage> => {
        const res = await axios.get<MediaPage>(
            `/api/media?page=${page}&&deleteType=${deleteType}&&limit=10`
        );

        return res.data;
    };
    const deleteMutation = useDeleteMutation(
        ["media-data",], 
        "/api/media/delete"
    );
    const handleDelete = (selectedMedia: string[], deleteType: string) => {
        let c = true;
        if (deleteType == "PD") {
            c = confirm(
                "Are you sure you want to permanently delete the selected media items? This action cannot be undone."
            );
        }
        if (c) {
            deleteMutation.mutate({ ids: selectedMedia, deleteType });
        }
        setSelectAll(false);
        setSelectedMedia([]);
    };
    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            // Select all media IDs
            const allMediaIds =
                data?.pages.flatMap((page) =>
                    page.media.map((item) => item._id)
                ) || [];
            setSelectedMedia(allMediaIds);
        } else {
            setSelectedMedia([]);
        }
    };
    const searchParamas = useSearchParams();
    useEffect(() => {
        if (searchParamas) {
            const trashof = searchParamas.get("trashOf");
            setSelectedMedia([]);
            if (trashof) {
                setDeleteType("PD");
            } else {
                setDeleteType("SD");
            }
        }
    }, [searchParamas]);
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery<MediaPage, Error>({
        queryKey: ["media-data", deleteType],
        queryFn: async ({ pageParam = 1 }: QueryFunctionContext) => {
            const pageNum =
                typeof pageParam === "number"
                    ? pageParam
                    : Number(pageParam || 1);
            return await FetchMedia(pageNum, deleteType);
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            const nextpage = pages.length;
            return lastPage.hasMore ? nextpage : undefined;
        },
    });

    return (
        <Card className=" rounded shadow-sm h-screen">
            <CardHeader className="border-b-1">
                <div className="flex justify-between items-center font-bold ">
                    {deleteType == "SD" ? "media" : "deleted media"}
                    <div className="flex justify-between items-center">
                        {deleteType == "SD" && <Uploadmedia />}
                        <div className="p-2">
                            {deleteType == "SD" ? (
                                <Button type="button" variant="destructive">
                                    <Link href={`/admin/media/?trashOf=media`}>
                                        Trash
                                    </Link>
                                </Button>
                            ) : (
                                <Button type="button">
                                    {" "}
                                    <Link href={`/admin/media/`}>
                                        {" "}
                                        Back to media
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </CardHeader>
            {selectedMedia.length > 0 && (
                <div className="w-full bg-violet-100 text-white  items-center  flex justify-between rounded px-1">
                    <label>
                        <Checkbox
                            checked={selectAll}
                            onCheckedChange={handleSelectAll}
                            className="mr-2 border-1 border-white"
                        />
                        <span className="shadow-2xl">Select All</span>
                    </label>
                    <div className="flex gap-3">
                        {deleteType === "SD" ? (
                            <Button
                                variant="destructive"
                                className="bg-red-500"
                                onClick={() =>
                                    handleDelete(selectedMedia, deleteType)
                                }
                            >
                                {" "}
                                Move Into Trash
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className="bg-green-400"
                                    onClick={() =>
                                        handleDelete(selectedMedia, deleteType)
                                    }
                                >
                                    Restore
                                </Button>
                                <Button
                                    className="bg-red-400"
                                    onClick={() =>
                                        handleDelete(selectedMedia, deleteType)
                                    }
                                >
                                    permanently Delete
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
            <CardContent className="h-[calc(100vh-100px)] overflow-y-auto">
                {status == "pending" ? (
                    <div>Loading...</div>
                ) : status == "error" ? (
                    <div>Error: {error?.message}</div>
                ) : (
                    <div className="grid grid-cols-3 gap-10 divide-x-2 p-2 border m-2 lg:grid-cols-5  ">
                        {data?.pages.map((page, index) => (
                            <React.Fragment key={index}>
                                {page.media.map((media) => (
                                    <MediaCom
                                        key={media._id}
                                        media={media}
                                        selectedMedia={selectedMedia}
                                        handleDelete={handleDelete}
                                        deleteType={deleteType}
                                        setSelectedMedia={setSelectedMedia}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MediaPage;
