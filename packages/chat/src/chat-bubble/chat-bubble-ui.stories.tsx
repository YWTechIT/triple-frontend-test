import React from 'react'
import { Story } from '@storybook/react'

import { MEDIA_ARGS, SAMPLE_IMAGES } from '../bubbles/__stories__/constants'

import { ChatBubbleUI, ChatBubbleUIProps } from './chat-bubble-ui'

import { ChatContext, MessageType } from '@titicaca/chat'

export default {
  title: 'chat-bubble / ChatBubbleUI',
  component: ChatBubbleUI,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['sent', 'received'],
      },
    },
    textBubbleFontSize: {
      control: {
        type: 'select',
        options: ['medium', 'large'],
      },
    },
    createdAt: {
      control: { type: 'date' },
    },
  },
}

const Template: Story<ChatBubbleUIProps> = (args) => (
  <ChatContext.Provider value={{ ...MEDIA_ARGS }}>
    <ChatBubbleUI {...args} />
  </ChatContext.Provider>
)

export const Text = Template.bind({})

Text.storyName = '텍스트'
Text.args = {
  type: 'sent',
  payload: {
    type: MessageType.TEXT,
    message: '안녕하세요\nhttps://www.google.com',
  },
  unreadCount: 1,
  createdAt: new Date().toISOString(),
  profileName: '테스트계정',
}

export const Image = Template.bind({})

Image.storyName = '이미지'
Image.args = {
  type: 'received',
  payload: { type: MessageType.IMAGES, images: SAMPLE_IMAGES },
  unreadCount: 1,
  createdAt: new Date().toISOString(),
  profileName: '테스트계정',
}

export const Rich = Template.bind({})

Rich.storyName = '리치'
Rich.args = {
  type: 'received',
  payload: {
    type: MessageType.RICH,
    items: [
      { type: MessageType.TEXT, message: '안녕하세요.' },
      { type: MessageType.IMAGES, images: SAMPLE_IMAGES },
      {
        type: MessageType.BUTTON,
        label: '버튼 누르기',
        action: {
          type: MessageType.LINK,
          param: 'https://www.google.com',
        },
      },
    ],
  },
  unreadCount: 1,
  createdAt: new Date().toISOString(),
  profileName: '테스트계정',
}

export const FailedSentMessage = Template.bind({})

FailedSentMessage.storyName = '실패한 메시지'
FailedSentMessage.args = {
  type: 'sent',
  payload: {
    type: MessageType.RICH,
    items: [{ type: MessageType.TEXT, message: '안녕하세요.' }],
  },
  unreadCount: 1,
  createdAt: undefined,
  profileName: '테스트계정',
}
