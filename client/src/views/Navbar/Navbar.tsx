import React from 'react'
import { AppBar, Box, Button, Container, CssBaseline, Slide, Toolbar, Typography, useScrollTrigger } from '@material-ui/core'
import { Link } from 'react-router-dom'

import './Navbar.scss'
import { LoginModal } from '../../components/Modal/LoginModal'

interface PropsType {
  window?: () => Window;
  children?: React.ReactElement;
}

function HideOnScroll(props: PropsType) {
  const { children, window } = props

  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}
const Components = (props: PropsType) => {
  const [showLogin, isShowLogin] = React.useState(false)

  const handleOpenModal = () => {
    isShowLogin(true)
  }
  const handleCloseModal = () => {
    isShowLogin(false)
  }

  return (
    <div className='section'>
      <div className='container'>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar position='fixed'>
            <Toolbar variant='dense'>
              <Typography variant='h6' className='title'>JJuhey</Typography>
              <Link to='/blog' className='link'>
                <Button color='inherit'>Blog</Button>
              </Link>
              <Button color='inherit' onClick={handleOpenModal}>Login</Button>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Container>
          <Box my={12}></Box>
        </Container>
      </div>
      <LoginModal
        show={showLogin}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default Components
