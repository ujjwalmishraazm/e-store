

export const column = [
    {
        accessorKey: "name",
        header: "Category-name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    }
]


export const columnConfig = (column, iscreatesAt = false, isUpdataedAt = false, DeletedAt = false) => {
    const newColumn = [...column];
    if (iscreatesAt) {
        newColumn.push({
          accessorKey: "createdAt",
          header: "Created At",
          
        })
      }
      if(isUpdataedAt){
        newColumn.push({
          accessorKey: "updatedAt",
          header: "Updated At",
        })
      }
      if(DeletedAt){
        newColumn.push({
          accessorKey: "deletedAt",
          header: "Deleted At",
        })
      }
      return newColumn;
}
