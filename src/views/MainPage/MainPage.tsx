import { Button, Paper, Typography } from '@material-ui/core'
import React from 'react'

import PaperPanel from '../../components/Panel/PaperPanel'
import ProfileSection from '../../components/Sections/ProfileSection'

import styles from './MainPage.module.scss'

const MainPage: React.FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.title}>
        <div>&lt; EVERYDAY JJUHEY &#x2F;&gt;</div>
        <div className={styles.buttons}>
          <Button variant='outlined' color='primary' size='small'>PROFILE</Button>
          <Button variant='outlined' color='primary' size='small'>Portfolio</Button>
          <Button variant='outlined' color='primary' size='small'>Contact</Button>
        </div>
      </div>
      <Paper className={`paper ${styles.paper}`} elevation={3}>
        <PaperPanel
          title='Profile'
        >
          <ProfileSection />
        </PaperPanel>
        <PaperPanel
          title='Portfolio'
        >
          <div className={styles.fake}>Portfolio content</div>
        </PaperPanel>
        <PaperPanel
          title='Contact'
        >
          <div className={styles.fake}>Contact me</div>
        </PaperPanel>
      </Paper>
    </div>
  )
}

export default MainPage
