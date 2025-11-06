import { ListItemIcon, MenuItem } from '@mui/material'
import { DeleteIcon } from 'lucide-react'
import Link from 'next/link'

import React from 'react'

const DeleteAction = ({row,deleteType,handleDelete}) => {
  return (
    <div>
        <MenuItem key='Delete' onClick={() => handleDelete([row.original._id],deleteType)}>
      <ListItemIcon>
            <DeleteIcon/>
      </ListItemIcon>
  
        Delete
      
      </MenuItem>
    </div>
  )
}

export default DeleteAction
