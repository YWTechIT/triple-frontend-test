import React from 'react'
import { number, text, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { StoryFn } from '@storybook/addons'
import {
  HistoryProvider,
  EventTrackingProvider,
  DeviceProvider,
} from '@titicaca/react-contexts'
import AdBanners, { ListDirection } from '@titicaca/ad-banners'
import styled from 'styled-components'

const CONTENT_TYPE_SET = {
  article: 'article',
  attraction: 'attraction',
  hotel: 'hotel',
  restaurant: 'restaurant',
}

const LongContent = styled.div`
  height: 1000px;
`

export default {
  title: 'ad-banners | AdBanners',
}

function ProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DeviceProvider
      value={{
        inRegion: boolean('inRegion', true),
        latitude: number('위도', 13.471778),
        longitude: number('경도', 144.812304),
      }}
    >
      <EventTrackingProvider pageLabel="광고 배너 테스트">
        <HistoryProvider
          appUrlScheme=""
          webUrlBase=""
          isPublic={false}
          isAndroid={false}
          transitionModalHash="transition.general"
        >
          <div>{children}</div>
        </HistoryProvider>
      </EventTrackingProvider>
    </DeviceProvider>
  )
}

export function BaseAdBanners() {
  return (
    <AdBanners
      contentType={select(
        '콘텐츠 타입',
        CONTENT_TYPE_SET,
        CONTENT_TYPE_SET['attraction'] as any,
      )}
      contentId={text('콘텐츠 ID', '81977f84-ddd0-4112-8057-6cc9dab9aa70')}
      regionId={text('리전 ID', 'ea2b52ff-9cdb-4028-9442-7a8defd13af9')}
      padding={{
        left: number('섹션 왼쪽 패딩', 0),
        right: number('섹션 오른쪽 패딩', 0),
      }}
      eventAttributes={{ title: '콘텐츠 제목' }}
    />
  )
}

BaseAdBanners.story = {
  name: '기본 광고 배너',
  decorators: [
    (storyFn: StoryFn<JSX.Element>) => (
      <ProviderWrapper>
        <div>{storyFn()}</div>
      </ProviderWrapper>
    ),
  ],
}

export function HorizontalAdBanners() {
  return (
    <>
      {boolean('스크롤 테스트', false) ? (
        <LongContent>스크롤을 내려보세요...</LongContent>
      ) : null}
      <AdBanners
        contentType={select(
          '콘텐츠 타입',
          CONTENT_TYPE_SET,
          CONTENT_TYPE_SET['attraction'] as any,
        )}
        contentId={text('콘텐츠 ID', '81977f84-ddd0-4112-8057-6cc9dab9aa70')}
        regionId={text('리전 ID', 'ea2b52ff-9cdb-4028-9442-7a8defd13af9')}
        direction={ListDirection.HORIZONTAL}
        padding={{
          top: number('위 패딩', 0),
          bottom: number('아래 패딩', 0),
          left: number('좌우 패딩', 25),
        }}
        eventAttributes={{ title: '콘텐츠 제목' }}
      />
    </>
  )
}

HorizontalAdBanners.story = {
  name: '가로형 광고 배너',
  decorators: [
    (storyFn: StoryFn<JSX.Element>) => (
      <ProviderWrapper>
        <div>{storyFn()}</div>
      </ProviderWrapper>
    ),
  ],
}

export function HotelListAdBanners() {
  return (
    <AdBanners
      direction={ListDirection.HORIZONTAL}
      padding={{
        left: number('섹션 왼쪽 패딩', 0),
        right: number('섹션 오른쪽 패딩', 0),
      }}
      onBannersFetch={async () => {
        const response = await fetch('/api/inventories/v1/hotels/items')
        const { items = [] } = await response.json()
        return items
      }}
      onBannerIntersect={action('배너 노출')}
      onBannerClick={action('배너 클릭')}
    />
  )
}

HotelListAdBanners.story = {
  name: '호텔 목록 광고 배너',
  decorators: [
    (storyFn: StoryFn<JSX.Element>) => (
      <ProviderWrapper>
        <div>{storyFn()}</div>
      </ProviderWrapper>
    ),
  ],
}
