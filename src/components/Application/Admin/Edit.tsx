import { ListItemIcon, MenuItem } from '@mui/material'
import { Edit2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Edit = ({href}) => {
  return (
    <div>
      <MenuItem key='edit'>
      <Link href={href}>
      <ListItemIcon>
            <Edit2Icon/>
      </ListItemIcon>
      </Link>
      </MenuItem>
    </div>
  )
}

export default Edit
