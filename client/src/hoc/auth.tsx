/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react'
import axios from 'axios'

function authHOC<PropsType> (
  SpecificComponent: React.FC<PropsType>, 
  ption: boolean | null,
  _adminRoute: string | null = null) {
    function AuthenticationCheck (props: PropsType) {
      const fetchAuth = async () => {
        const res = await axios.get('/api/users/auth')
        console.log(res)
      }

      useEffect( () => {
        fetchAuth()
      }, [])

      return (
        <SpecificComponent {...props} />
      )
    }

    return AuthenticationCheck
}

export default authHOC