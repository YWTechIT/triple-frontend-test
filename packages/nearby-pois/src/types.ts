import { PointGeoJSON, TranslatedProperty } from '@titicaca/type-definitions'

type PoiType = 'attraction' | 'restaurant'

export type NearByPoisType = {
  id: string
  type: PoiType
  source: {
    type: PoiType
    regionId?: string
    names: TranslatedProperty
    pointGeolocation?: PointGeoJSON
  }
}
