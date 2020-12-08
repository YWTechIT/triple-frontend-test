import React from 'react'
import { action } from '@storybook/addon-actions'
import { Container, Text } from '@titicaca/core-elements'
import RecommendedContents from '@titicaca/recommended-contents'

import { contents } from '../__mocks__/recommended-contents.sample.json'

export default {
  title: 'recommended-contents | RecommendedContents',
}

export function Primary() {
  return (
    <Container margin={{ top: 50, left: 30, right: 30 }}>
      <Text size="big" bold>
        다른 컨텐츠 더보기
      </Text>
      <RecommendedContents
        contents={contents}
        margin={{ top: 30 }}
        onContentIntersect={action('onContentIntersect')}
      />
    </Container>
  )
}

Primary.story = { name: '추천 컨텐츠' }
