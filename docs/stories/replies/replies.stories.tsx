import Replies from '@titicaca/replies'
import { ComponentStoryObj, Meta } from '@storybook/react'

import { historyProviderDecorator } from '../../decorators'

export default {
  title: 'Replies',
  component: Replies,
  decorators: [historyProviderDecorator],
  argTypes: {
    resourceId: {
      type: 'string',
      required: true,
    },
    resourceType: {
      options: ['itinerary', 'review', 'article'],
      control: {
        type: 'select',
        required: true,
      },
    },
    registerPlaceholder: {
      type: 'string',
      required: false,
    },
    size: {
      type: 'number',
      required: false,
      defaultValue: 10,
    },
  },
} as Meta

export const BaseReplies: ComponentStoryObj<typeof Replies> = {
  storyName: '기본 댓글',
  args: {
    resourceId: 'c31a0e75-0053-4ef2-9407-d2bdc7f116e3',
    resourceType: 'article',
  },
}
