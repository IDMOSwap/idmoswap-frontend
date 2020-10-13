import React from 'react'
import Button from '../../Button'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'
import { useTranslation } from 'react-i18next';


interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => {
  const { t, i18n } = useTranslation();

  return (
    <Card>
      <CardContent>
        <CardIcon>{icon}</CardIcon>
        <CardTitle text={title} />
        <Spacer />
        <Button onClick={onConnect} text={t('connect')} />
      </CardContent>
    </Card>
  )
}

export default WalletCard
