import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

type PropsType = {
  show: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<PropsType> = ({
  show, onClose,
}) => {
  const [userInfo, setUserInfo] = React.useState<{ email: string, password: string }>({
    email: '',
    password: '',
  })

  const onChangeInput = (event: any) => {
    const name = event.target.name
    const newValue = event.target.value
    setUserInfo({
      ...userInfo,
      [name]: newValue,
    })
  }


  const handleSubmit = async () => {
    console.log('handleSubmit function')
    const response = await axios.post('/api/users/login', userInfo)
    console.log(response.data)

    setUserInfo({ email: '', password: '' })
    onClose()
  }
  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>LOGIN</DialogTitle>
      <DialogContent>
        {/* <DialogContentText>Please login if you want more information</DialogContentText> */}
        <TextField
          autoFocus
          margin='dense'
          name='email'
          label='Email Address'
          type='email'
          fullWidth
          defaultValue={userInfo.email}
          onChange={onChangeInput}
        />
        <TextField
          margin='dense'
          name='password'
          label='Password'
          type='password'
          fullWidth
          defaultValue={userInfo.password}
          onChange={onChangeInput}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>Cancel</Button>
        <Button onClick={handleSubmit} color='primary'>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
