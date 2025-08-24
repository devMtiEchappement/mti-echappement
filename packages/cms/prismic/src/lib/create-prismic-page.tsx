import  React from 'react'
import { createClient } from "../client"
import { Metadata } from 'next'
import { CreatePrismicPageProps, PrismicDocument } from '../index'

/**
 * Crée une page avec intégration Prismic
 * Étend le concept createPage pour supporter Prismic
 */
export const createPrismicPage = (props: CreatePrismicPageProps) => {
    const {
        renderComponent: RenderComponent,
        title,
        metadata,
        prismicConfig
    } = props

    // Créer le client Prismic si la config est fournie
    const prismicClient = prismicConfig ? createClient() : null

    async function Page(pageProps: any) {
        let prismicData: PrismicDocument | PrismicDocument[] | null = null

        // Récupérer les données Prismic si configuré
        if (prismicClient && prismicConfig) {
            try {
                if (prismicConfig.fetchAll && prismicConfig.documentType) {
                    // Récupérer tous les documents du type spécifié
                    prismicData = await prismicClient.getAllByType(
                        prismicConfig.documentType,
                        prismicConfig.fetchAllOptions
                    ) as PrismicDocument[]
                } else if (prismicConfig.uid && prismicConfig.documentType) {
                    // Récupérer un document spécifique par UID
                    prismicData = await prismicClient.getByUID(
                        prismicConfig.documentType,
                        prismicConfig.uid,
                        { lang: prismicConfig.lang }
                    ) as PrismicDocument
                } else if (prismicConfig.documentType) {
                    // Récupérer le premier document du type spécifié
                    prismicData = await prismicClient.getSingle(
                        prismicConfig.documentType,
                        { lang: prismicConfig.lang }
                    ) as PrismicDocument
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données Prismic:', error)

                // En développement, on peut vouloir voir l'erreur
                if (process.env.NODE_ENV === 'development') {
                    throw error
                }
            }
        }

        // Combiner les props de la page avec les données Prismic
        const combinedProps = {
            ...pageProps,
            prismicData,
            prismicClient,
        }

        return React.createElement(RenderComponent, combinedProps)
    }

    // Générer les métadonnées en utilisant les données Prismic si disponibles
    async function generateMetadata(): Promise<Metadata> {
        let prismicMetadata: Partial<Metadata> = {}

        if (prismicClient && prismicConfig) {
            try {
                let document: PrismicDocument | null = null

                if (prismicConfig.uid && prismicConfig.documentType) {
                    document = await prismicClient.getByUID(
                        prismicConfig.documentType,
                        prismicConfig.uid,
                        { lang: prismicConfig.lang }
                    ) as PrismicDocument
                } else if (prismicConfig.documentType) {
                    document = await prismicClient.getSingle(
                        prismicConfig.documentType,
                        { lang: prismicConfig.lang }
                    ) as PrismicDocument
                }

                if (document) {
                    prismicMetadata = {
                        title: document.data?.meta_title || document.data?.title || title,
                        description: document.data?.meta_description || document.data?.description,
                        openGraph: {
                            title: document.data?.og_title || document.data?.meta_title || title,
                            description: document.data?.og_description || document.data?.meta_description,
                            images: document.data?.og_image ? [document.data.og_image.url] : undefined,
                        },
                        twitter: {
                            card: 'summary_large_image',
                            title: document.data?.twitter_title || document.data?.meta_title || title,
                            description: document.data?.twitter_description || document.data?.meta_description,
                            images: document.data?.twitter_image ? [document.data.twitter_image.url] : undefined,
                        },
                    }
                }
            } catch (error) {
                console.error('Erreur lors de la génération des métadonnées Prismic:', error)
            }
        }

        return {
            title,
            ...metadata,
            ...prismicMetadata,
        }
    }

    return {
        Page,
        generateMetadata,
    }
}