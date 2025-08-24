import { Metadata } from 'next'
import { PrismicDocument } from '../types'

/**
 * Mappe les champs d'un document Prismic vers les métadonnées Next.js
 */
export function mapPrismicToMetadata(
    document: PrismicDocument,
    fallbackTitle?: string
): Partial<Metadata> {
    return {
        title: document.data?.meta_title || document.data?.title || fallbackTitle,
        description: document.data?.meta_description || document.data?.description,
        openGraph: {
            title: document.data?.og_title || document.data?.meta_title || fallbackTitle,
            description: document.data?.og_description || document.data?.meta_description,
            images: document.data?.og_image ? [document.data.og_image.url] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: document.data?.twitter_title || document.data?.meta_title || fallbackTitle,
            description: document.data?.twitter_description || document.data?.meta_description,
            images: document.data?.twitter_image ? [document.data.twitter_image.url] : undefined,
        },
    }
}