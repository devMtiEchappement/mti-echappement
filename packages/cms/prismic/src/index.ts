import { Metadata } from 'next'
import React from 'react'
import type { PrismicDocument as PrismicDocumentType } from '@prismicio/client'

// Export du client et des utilitaires
export { createClient, prismicClient } from './client'
export { repositoryName } from './client'

// Export des utilitaires (commenté pour l'instant si les fichiers n'existent pas)
export * from './utils/error-handler'
export * from './utils/field-mapper'

// Export des fonctions de création de page
export { createPrismicPage } from './lib/create-prismic-page'

export interface PrismicClientConfig {
    repositoryName: string
    accessToken?: string
}

export interface PrismicConfig {
    repositoryName: string
    accessToken?: string
    documentType?: string
    uid?: string
    lang?: string
    sliceComponents?: any
    /** Récupérer tous les documents du type spécifié */
    fetchAll?: boolean
    /** Options pour getAllByType */
    fetchAllOptions?: {
        lang?: string
        orderings?: string[]
        filters?: any[]
        pageSize?: number
        limit?: number
    }
}

export interface StaticParamsConfig {
    /** Type de document à utiliser pour générer les paramètres statiques */
    documentType: string
    /** Champ à utiliser comme paramètre (ex: 'uid', 'slug') */
    paramField?: string
    /** Nom du paramètre dans l'URL (ex: 'slug', 'id') */
    paramName?: string
    /** Langues à inclure */
    langs?: string[]
    /** Filtre personnalisé pour les documents */
    filter?: (document: any) => boolean
    /** Transformation des paramètres */
    transform?: (document: any) => Record<string, string>
}

export interface CreatePrismicPageProps {
    title?: string
    metadata?: Metadata
    renderComponent: React.ComponentType<any>
    prismicConfig?: PrismicConfig
    /** Configuration pour generateStaticParams */
    staticParamsConfig?: StaticParamsConfig
}

// Utiliser le type officiel de Prismic
export type PrismicDocument = PrismicDocumentType<Record<string, any>, string, string>

// Type simplifié pour les slices
export interface PrismicSliceZoneProps {
    slices: any[]
    components: any
}

export interface PrismicPageProps {
    prismicData: PrismicDocument | PrismicDocument[] | null
    prismicClient: any
    params?: any
    searchParams?: any
}