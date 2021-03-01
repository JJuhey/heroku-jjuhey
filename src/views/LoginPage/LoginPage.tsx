import { Paper } from '@material-ui/core'
import React from 'react'

import './LoginPage.scss'

const LoginPage: React.FC = () => {
  return (
    <div className='outer'>
      <Paper className='paper login' elevation={3}>
        <div>Login Page</div>
        <div className='test'>hello</div>
      </Paper>
    </div>
  )
}

export default LoginPage
