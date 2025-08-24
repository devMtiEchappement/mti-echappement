/**
 * Gère les erreurs Prismic de manière cohérente
 */
export function handlePrismicError(error: any, context: string) {
    console.error(`Erreur Prismic [${context}]:`, error)

    // En développement, on relance l'erreur pour un debug plus facile
    if (process.env.NODE_ENV === 'development') {
        throw error
    }

    // En production, on log mais on continue
    return null
}