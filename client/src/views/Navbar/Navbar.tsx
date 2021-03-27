import React from 'react'
import axios from 'axios'
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
  const [showLogin, setShowLogin] = React.useState(false)
  const [sessionInfo, setSessionInfo] = React.useState<any>(null)

  const handleSession = () => {
    const session = sessionStorage.getItem('session')

    if (session) setSessionInfo(JSON.parse(session))
    else setSessionInfo(null)
  }

  React.useEffect(() => {
    handleSession()
  }, [])

  const handleOpenModal = () => {
    setShowLogin(true)
  }
  const handleCloseModal = () => {
    setShowLogin(false)
  }

  const handleLogout = async () => {
    try {
      let res
      if (sessionInfo) res = await axios.post('/api/users/logout', sessionInfo)

      sessionStorage.clear()
      setSessionInfo(null)

    } catch (err) {
      console.error(err)
      alert(`Unexpected Error: ${err.message}`)
    }
  }

  const goHome = () => {
    window.location.href = '/'
  }

  const goBlog = () => {
    window.location.href = 'https://jjuhey.github.io'
  }

  return (
    <div className='section'>
      <div className='container'>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar position='fixed'>
            <Toolbar variant='dense'>
              <Typography variant='h6' className='title' onClick={goHome}>JJuhey</Typography>
              <Link to='/profile' className='link'>
                <Button color='inherit'>Profile</Button>
              </Link>
              {/* <Link to='/blog' className='link'> */}
                <Button color='inherit' onClick={goBlog}>Blog</Button>
              {/* </Link> */}
              {!sessionInfo &&<Button color='inherit' onClick={handleOpenModal}>Login</Button>}
              {sessionInfo && <Button color='inherit' onClick={handleLogout}>Logout</Button>}
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
        handleSession={handleSession}
      />
    </div>
  )
}

export default Components
