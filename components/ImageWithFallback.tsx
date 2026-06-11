'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'

type ImageWithFallbackProps = Omit<ImageProps, 'onError' | 'src'> & {
  src?: string
  /** Rendered when src is missing or the image fails to load (e.g. file not found). */
  fallback: React.ReactNode
}

/**
 * Wraps next/image and renders `fallback` if the source is empty or fails to
 * load. Keeps the UI clean when referenced image files do not exist yet.
 */
export function ImageWithFallback({ src, alt, fallback, ...props }: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return <>{fallback}</>
  }

  return <Image src={src} alt={alt} onError={() => setErrored(true)} {...props} />
}
