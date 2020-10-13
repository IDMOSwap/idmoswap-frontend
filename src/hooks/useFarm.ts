import { useContext } from 'react'
import useFarms from './useFarms'

const useFarm = (id: string) => {
  const [farms] = useFarms()
  const farm = farms.find((farm) => farm.id === id)
  return farm
}

export default useFarm
