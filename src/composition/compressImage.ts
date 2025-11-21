// utils/compressImage.ts (можешь положить куда удобно)
export async function compressImageFile(
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.8
): Promise<File> {
  if (!file.type.startsWith('image/')) return file

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = dataUrl
  })

  let { width, height } = img

  // если картинка и так маленькая — не трогаем
  if (width <= maxWidth && height <= maxHeight) {
    return file
  }

  const ratio = Math.min(maxWidth / width, maxHeight / height)
  width = Math.round(width * ratio)
  height = Math.round(height * ratio)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return file

  ctx.drawImage(img, 0, 0, width, height)

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), 'image/jpeg', quality)
  )

  if (!blob) return file

  const ext = 'jpg'
  const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')
  const compressedFile = new File(
    [blob],
    `${nameWithoutExt}-compressed.${ext}`,
    {
      type: 'image/jpeg',
    }
  )

  return compressedFile
}
