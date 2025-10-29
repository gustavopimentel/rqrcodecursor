import { QRCodeSVG } from 'qrcode.react'

interface QRCodeGeneratorProps {
  value: string
  size?: number
  includeMargin?: boolean
}

export function QRCodeGenerator({ value, size = 200, includeMargin = true }: QRCodeGeneratorProps) {
  return (
    <QRCodeSVG
      value={value}
      size={size}
      level="H"
      includeMargin={includeMargin}
    />
  )
}

