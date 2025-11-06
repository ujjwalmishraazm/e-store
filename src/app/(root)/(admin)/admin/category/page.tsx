import Datatable from "@/components/Application/Admin/Datatable";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
import Edit from "@/components/Application/Admin/Edit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { column, columnConfig } from "@/lib/column";
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";

const Category = () => {
    const columns = useMemo(() => columnConfig(column), []  );
    const action = useCallback((row,deleteType,handleDelete)=>{
      const ActionMenu = []
      ActionMenu.push(<Edit href={`/admin/category/edit/${row.original._id}`}/>)
      ActionMenu.push(<DeleteAction row={row} deleteType={deleteType} handleDelete={handleDelete}/>)
      return ActionMenu 

    },[]) 
    return (
        <Card>
            <CardHeader className="border-b-1  ">
              <div className="flex justify-between items-center">
                <h3>Show category</h3>
                <Button ><Plus/><Link href={"/admin/category/add"}>
                New Category
                </Link></Button>
              </div>
            </CardHeader>
            <CardContent>
              <Datatable
                queryKey="category-data"
                FetchUrl='/api/category'
                deleteEndpoint='/api/category/delete'
                exportEndpoint='ddddd'
                deletetype='SD'
                columnConfig={columns}
                TrashView='/admin/trash'
                initialPageSize={10}
              createAction={action}

   
              />
            </CardContent>
        </Card>
    );
};

export default Category;
