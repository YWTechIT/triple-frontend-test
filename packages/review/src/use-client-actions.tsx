import { useMemo } from 'react'
import qs from 'qs'
import { useHistoryFunctions, useEnv } from '@titicaca/react-contexts'

import { ResourceType } from './types'
import { writeReview } from './review-api-clients'

export function useClientActions() {
  const { appUrlScheme } = useEnv()
  const { navigate } = useHistoryFunctions()

  return useMemo(() => {
    return {
      writeReview(params: {
        resourceType: ResourceType
        resourceId: string
        regionId?: string
        rating?: number
        photoFirst?: boolean
      }) {
        writeReview({ appUrlScheme, ...params })
      },
      editReview({
        regionId,
        resourceId,
        resourceType,
      }: {
        regionId?: string
        resourceId: string
        resourceType: ResourceType
      }) {
        const params = qs.stringify({
          region_id: regionId,
          resource_type: resourceType,
          resource_id: resourceId,
        })
        window.location.href = `${appUrlScheme}:///reviews/edit?${params}`
      },
      navigateReviewList({
        regionId,
        resourceId,
        resourceType,
        sortingOption,
      }: {
        regionId?: string
        resourceId: string
        resourceType: ResourceType
        sortingOption: string
      }) {
        const params = qs.stringify({
          region_id: regionId,
          resource_id: resourceId,
          resource_type: resourceType,
          sorting_option: sortingOption,
        })

        navigate(
          `${appUrlScheme}:///inlink?path=${encodeURIComponent(
            `/reviews/list?_triple_no_navbar&${params}`,
          )}`,
        )
      },
      navigateUserDetail(uid: string) {
        window.location.href = `${appUrlScheme}:///users/${uid}`
      },
      navigateImages(
        images: {
          id: string
          title: string
          description: string
          width: unknown
          height: unknown
          sourceUrl: string
          sizes: {
            full: { url: string }
            large: { url: string }
            small_square: { url: string }
          }
        }[],
        index: number,
      ) {
        window.location.href = `${appUrlScheme}:///images?${qs.stringify({
          images: JSON.stringify(images),
          index,
        })}`
      },
      navigateReviewDetail({
        reviewId,
        regionId,
        resourceId,
        anchor,
      }: {
        reviewId: string
        regionId?: string
        resourceId: string
        anchor?: string
      }) {
        const params = qs.stringify({
          region_id: regionId,
          resource_id: resourceId,
        })
        navigate(
          `${appUrlScheme}:///reviews/${reviewId}/detail?${params}${
            anchor ? `#${anchor}` : ''
          }`,
        )
      },
      navigateMileageIntro() {
        navigate(`${appUrlScheme}:///my/mileage/intro`)
      },
      reportReview(reviewId: string) {
        window.location.href = `${appUrlScheme}:///reviews/${reviewId}/report`
      },
    }
  }, [appUrlScheme, navigate])
}
