import { SyntheticEvent, useCallback, useState } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import { List } from '@titicaca/core-elements'
import {
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'
import { TransitionType } from '@titicaca/modals'
import { useAppCallback, useSessionCallback } from '@titicaca/ui-flow'
import { Timestamp } from '@titicaca/view-utilities'

import { useClientActions } from '../services'

import ReviewElement, { ReviewElementProps } from './review-element'
import { HASH_MY_REVIEW_ACTION_SHEET } from './my-review-action-sheet'
import OthersReviewActionSheet, {
  HASH_REVIEW_ACTION_SHEET,
} from './others-review-action-sheet'
import { AppNativeActionProps, ReviewData } from './types'

export default function ReviewsList({
  myReview,
  recentTrip,
  reviews,
  regionId,
  fetchNext,
  resourceId,
  maxLength,
  reviewRateDescriptions,
  showToast,
  isMorePage,
}: {
  myReview?: ReviewData
  recentTrip: boolean
  reviews: ReviewData[]
  fetchNext?: () => void
  regionId?: string
  resourceId: string
  maxLength?: number
  reviewRateDescriptions?: string[]
  showToast: AppNativeActionProps['showToast']
  isMorePage: boolean
}) {
  const { t } = useTranslation('common-web')

  const [selectedReview, setSelectedReview] =
    useState<ReviewData | undefined>(undefined)
  const app = useTripleClientMetadata()
  const { trackEvent } = useEventTrackingContext()
  const { push } = useHistoryFunctions()
  const { navigateUserDetail, navigateReviewDetail, reportReview } =
    useClientActions()

  const handleUserClick: ReviewElementProps['onUserClick'] = useSessionCallback(
    useCallback(
      (
        e: SyntheticEvent,
        { user: { uid, unregister, mileage }, id }: ReviewData,
      ) => {
        const { level } = mileage || { level: 0 }
        trackEvent({
          ga: ['리뷰 프로필'],
          fa: {
            action: '리뷰_프로필',
            item_id: resourceId,
            user_id: uid,
            review_id: id,
            level,
          },
        })

        if (unregister) {
          showToast(t(['taltoehan-sayongjaibnida.', '탈퇴한 사용자입니다.']))
        } else {
          navigateUserDetail(uid)
        }
      },
      [trackEvent, resourceId, showToast, navigateUserDetail, t],
    ),
  )

  const handleMenuClick: ReviewElementProps['onMenuClick'] = useSessionCallback(
    useCallback(
      (e: SyntheticEvent, review: ReviewData) => {
        if (app) {
          if (myReview && review.id === myReview.id) {
            push(HASH_MY_REVIEW_ACTION_SHEET)
          } else {
            setSelectedReview(review)
            push(HASH_REVIEW_ACTION_SHEET)
          }
        }
      },
      [app, myReview, push],
    ),
  )

  const handleReviewClick = useAppCallback(
    TransitionType.ReviewSelect,
    useCallback(
      (e: SyntheticEvent, reviewId: string) => {
        e.preventDefault()
        e.stopPropagation()
        navigateReviewDetail({ reviewId, regionId, resourceId })
      },
      [resourceId, navigateReviewDetail, regionId],
    ),
  )

  const handleMessageCountClick = useAppCallback(
    TransitionType.ReviewCommentSelect,
    useSessionCallback(
      useCallback(
        (e: SyntheticEvent, reviewId: string) => {
          navigateReviewDetail({
            reviewId,
            regionId,
            resourceId,
            anchor: 'reply',
          })
        },
        [navigateReviewDetail, regionId, resourceId],
      ),
      { triggeredEventAction: '리뷰_댓글_선택' },
    ),
  )

  const handleShow = fetchNext
    ? (index: number) => index > reviews.length - 3 && fetchNext()
    : undefined

  const allReviews =
    myReview && !recentTrip ? [myReview, ...(reviews || [])] : reviews
  const displayedReviews = maxLength
    ? allReviews.slice(0, maxLength)
    : allReviews

  return (
    <>
      <List divided margin={{ top: 24 }} verticalGap={48}>
        {displayedReviews.map((review, i) => (
          <ReviewElement
            isMyReview={!!(myReview && myReview.id === review.id)}
            key={i}
            index={i}
            review={review}
            reviewRateDescriptions={reviewRateDescriptions}
            onUserClick={app ? handleUserClick : undefined}
            onMenuClick={handleMenuClick}
            onReviewClick={handleReviewClick}
            onMessageCountClick={handleMessageCountClick}
            resourceId={resourceId}
            regionId={regionId}
            DateFormatter={Timestamp}
            onShow={handleShow}
            isMorePage={isMorePage}
          />
        ))}
      </List>

      <OthersReviewActionSheet
        selectedReview={selectedReview}
        onReportReview={reportReview}
      />
    </>
  )
}
