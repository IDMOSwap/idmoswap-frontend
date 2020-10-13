import { useContext } from 'react'
import { Context } from '../contexts/Transactions'

const useTransactionAdder = () => {
  const { onAddTransaction, transactions } = useContext(Context)
  return { onAddTransaction, transactions }
}

export default useTransactionAdder
