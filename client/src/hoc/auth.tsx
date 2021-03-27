/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react'
import axios from 'axios'

function authHOC<PropsType> (
  SpecificComponent: React.FC<PropsType>, 
  ption: boolean | null,
  _adminRoute: string | null = null) {
    function AuthenticationCheck (props: PropsType) {
      const fetchAuth = async () => {
        try {
          const res = await axios.get('/api/users/auth')
          if (!res.data.success) {
            alert('로그인이 필요합니다.')
            window.location.href = '/'
          }
        } catch (err) {
          console.error(err)
        }
      }

      useEffect(() => {
        fetchAuth()
      }, [])

      return (
        <SpecificComponent {...props} />
      )
    }

    return AuthenticationCheck
}

export default authHOC