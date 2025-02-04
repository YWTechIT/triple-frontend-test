import { SyntheticEvent } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { Button, Container, Rating, Text } from '@titicaca/core-elements'

import { ResourceType } from './types'

const PlaceholderContainer = styled(Container)`
  width: 100%;
  text-align: center;
`

const GuideImage = styled.img`
  content: url('https://assets.triple.guide/images/img-card-guide-review@3x.png');
  display: block;
  width: 50px;
  height: 50px;
  margin: auto;
`

const NavigateToReviewsListButton = styled(Button)`
  padding: 10px 20px;
`

const RecentTripContainer = styled(Container)`
  text-align: center;
  padding-top: 180px;
  padding-bottom: 60px;

  @media only screen and (max-width: 667px) {
    padding-top: 120px;
  }
`

function ReviewsPlaceholder({
  isMorePage,
  hasReviews,
  resourceType,
  recentTrip,
  placeholderText,
  onClick,
}: {
  isMorePage: boolean
  hasReviews: boolean
  resourceType: ResourceType
  recentTrip: boolean
  placeholderText?: string
  onClick?: (e: SyntheticEvent, rating?: number) => void
}) {
  const { t } = useTranslation('common-web')

  return (
    <PlaceholderContainer
      onClick={!isMorePage ? onClick : undefined}
      css={{
        margin: '20px 0 0',
      }}
    >
      {!recentTrip ? (
        resourceType === 'article' ? (
          <GuideImage />
        ) : (
          <Rating size="medium" onClick={onClick} />
        )
      ) : null}

      {recentTrip ? (
        <RecentTripPlaceholder
          isMorePage={isMorePage}
          hasReviews={hasReviews}
          onClick={onClick}
        />
      ) : null}
      {!recentTrip ? (
        <DefaultPlaceholder
          placeholderText={
            placeholderText ??
            t([
              'igosyi-ceos-beonjjae-ribyureul-olryeojuseyo.',
              '이곳의 첫 번째 리뷰를 올려주세요.',
            ])
          }
        />
      ) : null}
    </PlaceholderContainer>
  )
}

function DefaultPlaceholder({ placeholderText }: { placeholderText: string }) {
  return (
    <Text
      margin={{ top: 8 }}
      size="large"
      color="gray"
      alpha={1}
      lineHeight={1.5}
    >
      {placeholderText}
    </Text>
  )
}

function RecentTripPlaceholder({
  isMorePage,
  hasReviews,
  onClick,
}: {
  isMorePage: boolean
  hasReviews: boolean
  onClick?: (e: SyntheticEvent, rating?: number) => void
}) {
  const { t } = useTranslation('common-web')

  return isMorePage ? (
    <RecentTripContainer>
      <img
        width={44}
        height={44}
        src="https://assets.triple.guide/images/ico_empty_review@4x.png"
        alt="write-review-icon"
      />
      <Text
        size={18}
        padding={{ top: 20, bottom: 8 }}
        bold
        lineHeight="21px"
        textAlign="center"
      >
        {t([
          'seontaeghan-jogeonyi-ribyuga-eobsseubnida.',
          '선택한 조건의 리뷰가 없습니다.',
        ])}
      </Text>
      <Text size={14} lineHeight="19px" textAlign="center" color="gray500">
        {t([
          'danyeoon-yeohaengjiyi-ribyureul-namgyeoboseyo.',
          '다녀온 여행지의\n리뷰를 남겨보세요.',
        ])}
      </Text>
    </RecentTripContainer>
  ) : (
    <Container
      css={{
        padding: '60px 0',
      }}
    >
      <Text size={14} color="gray500">
        {t([
          'seontaeghan-jogeonyi-ribyuga-eobsseubnida.',
          '선택한 조건의 리뷰가 없습니다.',
        ])}
      </Text>
      {hasReviews ? (
        <NavigateToReviewsListButton
          inverted
          margin={{ top: 10 }}
          onClick={onClick}
        >
          <Text size={13} color="white" bold>
            {t(['jeonce-ribyu-bogi', '전체 리뷰 보기'])}
          </Text>
        </NavigateToReviewsListButton>
      ) : null}
    </Container>
  )
}

export default ReviewsPlaceholder
