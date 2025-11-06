import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
    getIsRowSelected,
    MaterialReactTable,
    MRT_ShowHideColumnsButton,
    MRT_ToggleDensePaddingButton,
    MRT_ToggleFullScreenButton,
    MRT_ToggleGlobalFilterButton,
    useMaterialReactTable,
    type MRT_ColumnFiltersState,
    type MRT_PaginationState,
    type MRT_SortingState,
} from "material-react-table";
import axios from "axios";
import { IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import { DeleteIcon, Download } from "lucide-react";
import RecyclingIcon from "@mui/icons-material/Recycling";
import useDeleteMutation from "@/hooks/useMutation";

import { Button } from "@/components/ui/button";
import { column } from "@/lib/column";

type UserApiResponse = {
    data: Array<User>;
    meta: {
        totalRowCount: number;
    };
};
type User = {
    Username: "";
    _id: "";
};

const Datatable = ({
    queryKey,
    FetchUrl,
    columnConfig,
    deletetype,
    TrashView,
    deleteEndpoint,
    initialPageSize = 10,
    createAction,
    exportEndpoint,
}) => {
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        []
    );
    const [globalFilter, setGlobalFilter] = useState("");
    const [exportloading, setIsexportloading] = useState(false);
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowSelection, setRowSelection] = useState({});
    const deleteMutation = useDeleteMutation(queryKey, deleteEndpoint);
    const handleDelete = (ids, deletetype) => {
        let c;
        if (deletetype == "PD") {
            c = confirm(
                "Are you sure you want to permanently delete the selected items?"
            );
        } else {
            c = confirm(
                "Are you sure you want to move the selected items to trash?"
            );
        }
        if (c) {
            deleteMutation.mutate({ ids, deletetype });
            setRowSelection({});
        }
    };
  
    const handleExport = () => {
        return (
            <>
                <h1>unable to export data for now </h1>
            </>
        );
    };
    const {
        data: { data = [], meta } = {}, //your data and api response will probably be different
        isError,
        isRefetching,
        isLoading,
        refetch,
    } = useQuery<UserApiResponse>({
        queryKey: [
            queryKey,
            {
                columnFilters, //refetch when columnFilters changes
                globalFilter, //refetch when globalFilter changes
                pagination, //refetch when pagination changes
                sorting,
            },
        ],
        queryFn: async () => {
            const url = new URL(FetchUrl, process.env.NEXT_PUBLIC_BASE_URL);
            url.searchParams.set(
                "start",
                `${pagination.pageIndex * pagination.pageSize}`
            );
            url.searchParams.set("size", `${pagination.pageSize}`);
            url.searchParams.set(
                "filters",
                JSON.stringify(columnFilters ?? [])
            );
            url.searchParams.set("globalFilter", globalFilter ?? "");
            url.searchParams.set("sorting", JSON.stringify(sorting ?? []));
            url.searchParams.set("deletetype", deletetype ?? "");
            const { data: response } = await axios.get(url.href);
            return response;
        },
        placeholderData: keepPreviousData,
    });
    const table = useMaterialReactTable({
        columns: columnConfig,
        data,
        manualFiltering: true,
        enableRowSelection: true,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        columnFilterDisplayMode: "popover",
        paginationDisplayMode: "pages",
        enableColumnOrdering: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        initialState: { showColumnFilters: true },
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                  color: "error",
                  children: "Error loading data",
              }
            : undefined,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount: meta?.totalRowCount ?? 0,
        onRowSelectionChange: setRowSelection,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
            rowSelection,
        },
        getRowId: (originalRow) => originalRow._id,
        renderToolbarInternalActions: ({ table }) => {
            return (
                <>
                    {/* Add your custom toolbar actions here */}
                    <MRT_ToggleGlobalFilterButton table={table} />
                    <MRT_ShowHideColumnsButton table={table} />
                    <MRT_ToggleFullScreenButton table={table} />
                    <MRT_ToggleDensePaddingButton table={table} />

                    {deletetype !== "PD" && (
                        <Tooltip title="recycle Bin">
                            <Link href={TrashView}>
                                <IconButton>
                                    <RecyclingIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    )}
                    {deletetype == "SD" && (
                        <Tooltip title="Delete All">
                            <IconButton
                                disabled={
                                    !table.getIsSomeRowsSelected() &&
                                    !table.getIsAllRowsSelected()
                                }
                                onClick={() => {
                                    handleDelete(
                                        Object.keys(rowSelection),
                                        deletetype
                                    );
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                    {deletetype == "PD" && (
                        <>
                            <Tooltip title="Restore Data">
                                <IconButton
                                    disabled={
                                        !table.getIsSomeRowsSelected() &&
                                        !table.getIsAllRowsSelected()
                                    }
                                    onClick={() =>
                                        handleDelete(
                                            Object.keys(rowSelection),
                                            "RSD"
                                        )
                                    }
                                >
                                    <RecyclingIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete All Permanently">
                                <IconButton
                                    disabled={
                                        !table.getIsSomeRowsSelected() &&
                                        !table.getIsAllRowsSelected()
                                    }
                                    onClick={() =>
                                        handleDelete(
                                            Object.keys(rowSelection),
                                            deletetype
                                        )
                                    }
                                >
                                    <RecyclingIcon />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                </>
            );
        },
        enableRowActions: true,
        positionActionsColumn: "last",
        renderRowActionMenuItems: ({ row }) =>
            createAction(row, deletetype, handleDelete),
        renderTopToolbarCustomActions: ({ table }) => (
            <Tooltip title="Refresh Data">
                <Button onClick={() => handleExport()}>
                    <Download /> export
                </Button>
            </Tooltip>
        ),
    });

    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    );
};

export default Datatable;
