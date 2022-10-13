import { UserAgentProvider } from '@titicaca/react-contexts'
import { ComponentStoryObj, Meta } from '@storybook/react'

import DetailHeader from './detail-header'

export default {
  title: 'poi-detail / DetailHeader',
  component: DetailHeader,
  decorators: [
    (Story) => (
      <UserAgentProvider
        value={{
          isPublic: true,
          isMobile: true,
          os: {},
          app: null,
        }}
      >
        <Story />
      </UserAgentProvider>
    ),
  ],
} as Meta

export const Basic: ComponentStoryObj<typeof DetailHeader> = {
  name: '기본',
  args: {
    names: {
      primary: '도쿄 디즈니 랜드',
      ko: '도쿄 디즈니 랜드',
      en: 'Tokyo Disney land',
      local: '東京ディズニーランド',
    },
    areaName: '도쿄',
    scrapsCount: 682,
    reviewsCount: 13859,
    reviewsRating: 4.45,
  },
}

export const WithBusinessHoursNote: ComponentStoryObj<typeof DetailHeader> = {
  name: '영업시간 추가',
  args: {
    ...Basic.args,
    todayBusinessHours: '11:00 - 18:00',
    permanentlyClosed: false,
  },
}
