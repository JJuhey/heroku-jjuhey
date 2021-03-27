import { Breadcrumbs, Link, Paper } from '@material-ui/core'
import React from 'react'

const BlogPage = () => {
  return (
    <div className='outer'>
      <Breadcrumbs
        aria-label='breadcrumb'
        style={{ marginTop: '30px', marginBottom: '5px', width: '88%', textAlign: 'left', fontSize: 'small' }}
      >
        <Link color='inherit' href='/'>Main</Link>
        <Link color='inherit' href='/blog'>Profile</Link>
      </Breadcrumbs>
      <Paper className='paper' elevation={3}>
        <div>Profile Page</div>
      </Paper>
    </div>
  )
}

export default BlogPage
