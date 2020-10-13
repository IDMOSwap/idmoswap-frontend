import React from 'react'
import idmo from '../../assets/imgpc/idmo.png'
interface idmoIconProps {
  size?: number
  v1?: boolean
  v2?: boolean
  v3?: boolean
}

const idmoIcon: React.FC<idmoIconProps> = ({ size = 36, v1, v2, v3 }) => (
  <span
    role="img"
    style={{
      fontSize: size,
      filter: v1 ? 'saturate(0.5)' : undefined,
    }}
  >
    <img src={idmo} alt="" sizes="" style={{ width: '48px' }} />
  </span>
)

export default idmoIcon
