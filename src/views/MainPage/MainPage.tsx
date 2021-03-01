import { Paper } from '@material-ui/core'
import React from 'react'

import './MainPage.scss'

const MainPage: React.FC = () => {
  return (
    <div className='outer background'>
      <div className='mainTitle'>HELLO JJUHEY WORLD</div>
      <Paper className='paper mainPaper' elevation={3}>
        <div className='main'>Main Page</div>
        <div className='test'>hello</div>
      </Paper>
    </div>
  )
}

export default MainPage
