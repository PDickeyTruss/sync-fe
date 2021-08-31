import React from 'react'

import {AppBar} from '../ui/AppBar'
import {SideNav} from '../ui/SideNav'

function Dashboard({children}) {
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const drawerWidth = 240

  return (
    <React.Fragment>
      <AppBar
        open={open}
        openDrawer={handleDrawerOpen}
        drawerWidth={drawerWidth}
      />
      <SideNav
        open={open}
        closeDrawer={handleDrawerClose}
        drawerWidth={drawerWidth}
      />
      {children}
    </React.Fragment>
  )
}

export {Dashboard}
