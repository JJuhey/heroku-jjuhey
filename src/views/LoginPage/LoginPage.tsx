import { Paper } from '@material-ui/core'
import React from 'react'

import styles from './LoginPage.module.scss'

const LoginPage: React.FC = () => {
  return (
    <div className='outer'>
      <Paper className='paper login' elevation={3}>
        <div>Login Page</div>
        <div className={styles.test}>hello</div>
      </Paper>
    </div>
  )
}

export default LoginPage
