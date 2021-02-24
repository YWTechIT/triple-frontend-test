import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, number, select, boolean } from '@storybook/addon-knobs'
import { Button } from '@titicaca/core-elements'

storiesOf('Core-Elements / Button', module)
  .add('일반', () => (
    <Button
      as={select('as prop', ['a', 'button'], 'a')}
      size={select('버튼 크기', ['tiny', 'small'], 'tiny')}
      lineHeight={select(
        '버튼 높이',
        ['15px', '16px', '17px', '18px', '19px', '1', '2', '3'],
        '16',
      )}
      onClick={action('clicked')}
    >
      {text('버튼 레이블', '안녕')}
    </Button>
  ))
  .add('컴팩트', () => (
    <Button
      compact
      size={select('버튼 크기', ['tiny'], 'tiny')}
      onClick={action('clicked')}
    >
      {text('버튼 레이블', '안녕')}
    </Button>
  ))
  .add('일반 (채움형)', () => (
    <Button
      fluid
      size={select('버튼 크기', ['tiny', 'small'], 'tiny')}
      onClick={action('clicked')}
    >
      {text('버튼 레이블', '안녕')}
    </Button>
  ))
  .add('컴팩트 (아이콘)', () => (
    <Button
      compact
      bold
      size={select('버튼 크기', ['tiny', 'small', 'large'], 'tiny')}
      onClick={action('clicked')}
      color={select('버튼 색', ['gray', 'blue'], 'blue')}
    >
      <Button.Icon
        src="https://assets.triple-dev.titicaca-corp.com/images/save@4x.png"
        size={select('아이콘 크기', ['tiny', 'small'], 'small')}
      />
      {text('버튼 레이블', '저장하기')}
    </Button>
  ))
  .add('베이직', () => (
    <Button
      basic
      fluid={boolean('채움', false)}
      compact={boolean('콤팩트', false)}
      inverted={boolean('색반전', false)}
      onClick={action('clicked')}
    >
      {text('버튼 레이블', '안녕')}
    </Button>
  ))
  .add('베이직 (아이콘)', () => (
    <Button basic fluid compact onClick={action('clicked')}>
      <Button.Icon src="https://triple-dev.titicaca-corp.com/content/static/images/index@4x.png" />
      {text('버튼 레이블', '목차')}
    </Button>
  ))
  .add('블록형 아이콘', () => (
    <Button
      icon={select(
        '아이콘 종류',
        [
          'saveEmpty',
          'saveFilled',
          'starEmpty',
          'starFilled',
          'map',
          'share',
          'schedule',
        ],
        'saveEmpty',
      )}
    >
      {text('버튼 레이블', '저장하기')}
    </Button>
  ))
  .add('버튼 그룹', () => {
    const buttonTag = select('as prop', ['a', 'button'], 'a')

    return (
      <Button.Group
        horizontalGap={number('버튼 간격', 10)}
        buttonCount={number('button 개수', 2)}
      >
        <Button as={buttonTag} basic color="gray" size="small">
          현지에서 길묻기
        </Button>
        <Button as={buttonTag} basic inverted color="blue" size="small">
          길찾기
        </Button>
      </Button.Group>
    )
  })
  .add('버튼 컨테이너', () => {
    const buttonTag = select('as prop', ['a', 'button'], 'a')

    return (
      <Button.Container
        floated={select('floated', ['left', 'right', 'none'], 'none')}
      >
        <Button as={buttonTag} basic color="gray" size="small">
          버튼 1
        </Button>
        <Button as={buttonTag} basic inverted color="blue" size="small">
          버튼 2
        </Button>
      </Button.Container>
    )
  })
  .add('아이콘 버튼 그룹', () => (
    <Button.Group horizontalGap={number('버튼 간격', 22)}>
      <Button icon="saveEmpty">저장하기</Button>
      <Button icon="schedule">일정추가</Button>
      <Button icon="starEmpty">리뷰쓰기</Button>
      <Button icon="share">공유하기</Button>
    </Button.Group>
  ))
