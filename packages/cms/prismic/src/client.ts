import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'

// Le nom de votre repository Prismic
export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || ''

// Configuration des routes (optionnel)
const routes: prismic.Route[] = [
    // Exemple de routes - à adapter selon vos besoins
    {
        type: 'homepage',
        path: '/',
    },
    {
        type: 'page',
        path: '/:uid',
    },
]

/**
 * Crée et configure un client Prismic
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
    const client = prismic.createClient(repositoryName, {
        routes,
        fetchOptions:
            process.env.NODE_ENV === 'production'
                ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
                : { next: { revalidate: 5 } },
        ...config,
    })

    prismicNext.enableAutoPreviews({ client })

    return client
}

/**
 * Client Prismic par défaut
 */
export const prismicClient = createClient()
