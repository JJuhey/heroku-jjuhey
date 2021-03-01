import { Divider, Typography } from '@material-ui/core'
import React from 'react'

import styles from './PaperPanel.module.scss'

interface PropsType {
  title: string;
  children: React.ReactElement;
}

const PaperPanel: React.FC<PropsType> = ({ title, children }: PropsType) => {
  return (
    <div className={styles.outline}>
      <Typography className={styles.title} variant='h6'>{title}</Typography>
      <div className={styles.content}>{children}</div>
      <Divider />
    </div>
  )
}

export default PaperPanel
