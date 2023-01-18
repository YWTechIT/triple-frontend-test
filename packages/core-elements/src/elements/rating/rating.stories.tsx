import { ComponentStoryObj, Meta } from '@storybook/react'

import { Rating } from './rating'

export default {
  title: 'core-elements / Rating',
  component: Rating,
} as Meta

export const Basic: ComponentStoryObj<typeof Rating> = {
  name: '리뷰점수',
  args: {
    size: 'tiny',
    score: 5,
  },
}
