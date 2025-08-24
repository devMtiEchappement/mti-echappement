import React from 'react'
import { SliceZone } from '@prismicio/react'
import { PrismicSliceZoneProps } from '../types'

/**
 * Composant wrapper pour SliceZone de Prismic
 * Offre une interface cohérente avec les autres CMS du kit
 */
export const PrismicSliceZone: React.FC<PrismicSliceZoneProps> = ({
                                                                      slices,
                                                                      components
                                                                  }) => {
    if (!slices || slices.length === 0) {
        return null
    }

    return <SliceZone slices={slices} components={components} />
}
