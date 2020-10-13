import { useContext } from 'react'
import { Context } from '../contexts/IDMOProvider'

const useIDMO = () => {
  const { idmo } = useContext(Context)
  return idmo
}

export default useIDMO
