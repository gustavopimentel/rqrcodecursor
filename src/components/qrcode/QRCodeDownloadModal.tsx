import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { toast } from 'sonner'

interface QRCodeDownloadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: string
  name: string
}

type Format = 'PNG' | 'JPG' | 'SVG'
type Size = 300 | 512 | 1024 | 2048

const formats: Format[] = ['PNG', 'JPG', 'SVG']
const sizes: { label: string; value: Size }[] = [
  { label: 'Pequeno (300x300px)', value: 300 },
  { label: 'Médio (512x512px)', value: 512 },
  { label: 'Grande (1024x1024px)', value: 1024 },
  { label: 'Extra Grande (2048x2048px)', value: 2048 },
]

export function QRCodeDownloadModal({
  open,
  onOpenChange,
  value,
  name,
}: QRCodeDownloadModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<Format>('PNG')
  const [selectedSize, setSelectedSize] = useState<Size>(300)
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)

    try {
      if (selectedFormat === 'SVG') {
        downloadAsSVG()
      } else {
        await downloadAsImage(selectedFormat)
      }
      toast.success(`QR Code baixado como ${selectedFormat}`)
      onOpenChange(false)
    } catch (error) {
      toast.error('Erro ao fazer download')
    } finally {
      setDownloading(false)
    }
  }

  const downloadAsSVG = () => {
    const svg = document.getElementById('download-qrcode-preview')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${name}-${selectedSize}px.svg`
    link.click()
    URL.revokeObjectURL(url)
  }

  const downloadAsImage = (format: 'PNG' | 'JPG') => {
    return new Promise<void>((resolve, reject) => {
      const svg = document.getElementById('download-qrcode-preview')
      if (!svg) {
        reject('SVG not found')
        return
      }

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject('Canvas context not available')
        return
      }

      canvas.width = selectedSize
      canvas.height = selectedSize

      const svgData = new XMLSerializer().serializeToString(svg)
      const img = new Image()

      img.onload = () => {
        // Fill white background for JPG
        if (format === 'JPG') {
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, selectedSize, selectedSize)
        }

        ctx.drawImage(img, 0, 0, selectedSize, selectedSize)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              link.download = `${name}-${selectedSize}px.${format.toLowerCase()}`
              link.click()
              URL.revokeObjectURL(url)
              resolve()
            } else {
              reject('Failed to create blob')
            }
          },
          format === 'PNG' ? 'image/png' : 'image/jpeg',
          format === 'JPG' ? 0.95 : undefined
        )
      }

      img.onerror = () => reject('Failed to load image')
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Baixar QR Code</DialogTitle>
          <DialogDescription>
            Escolha o formato e o tamanho para baixar seu QR Code "{name}".
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-3">
              Formato
            </label>
            <div className="grid grid-cols-3 gap-2">
              {formats.map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    selectedFormat === format
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-neutral-dark'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-dark mb-3">
              Tamanho
            </label>
            <div className="space-y-2">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium text-left ${
                    selectedSize === size.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-neutral-dark'
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                        selectedSize === size.value
                          ? 'border-primary'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedSize === size.value && (
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      )}
                    </div>
                    {size.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-center">
              <div className="bg-white p-3 rounded-lg border border-gray-300">
                <QRCodeSVG
                  id="download-qrcode-preview"
                  value={value}
                  size={120}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>
            <p className="text-center text-xs text-neutral mt-2">
              Preview • {selectedSize}x{selectedSize}px • {selectedFormat}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            disabled={downloading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDownload}
            className="flex-1 bg-primary hover:bg-primary-dark text-white"
            disabled={downloading}
          >
            <Download className="w-4 h-4 mr-2" />
            {downloading ? 'Baixando...' : 'Baixar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

