import { Paper } from '@material-ui/core'
import React from 'react'

import styles from './LoginPage.module.scss'

const LoginPage: React.FC = () => {
  const [data, setData] = React.useState<string>('');
  React.useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setData(res.hello)
      })
  }, []);

  return (
    <div className='outer'>
      <Paper className='paper login' elevation={3}>
        <div>Login Page</div>
        <div className={styles.test}>{data}</div>
      </Paper>
    </div>
  )
}

export default LoginPage
