import { SyntheticEvent } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled from 'styled-components'
import { Label, FlexBox } from '@titicaca/core-elements'

export interface SortingOptionsProps {
  onSelect: (e: SyntheticEvent, key: string) => void
  selected: string
}

export const ORDER_BY_RECOMMENDATION = ''
export const ORDER_BY_RECENCY = 'latest'

const OptionsContainer = styled(FlexBox)`
  padding: 0;

  div:not(:first-child) {
    margin-left: 12px;
  }

  span {
    font-weight: bold;
  }
`

export default function SortingOptions({
  onSelect,
  selected,
}: SortingOptionsProps) {
  const { t } = useTranslation('common-web')

  const sortingOptions = [
    { key: ORDER_BY_RECOMMENDATION, text: t(['cuceonsun', '추천순']) },
    { key: ORDER_BY_RECENCY, text: t(['coesinsun', '최신순']) },
  ]

  return (
    <OptionsContainer
      flex
      css={{
        alignItems: 'center',
      }}
    >
      {sortingOptions.map(({ key, text }) => (
        <Label key={key} radio selected={selected === key}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <span onClick={onSelect && ((e) => onSelect(e, key))}>{text}</span>
        </Label>
      ))}
    </OptionsContainer>
  )
}

export const DEFAULT_SORTING_OPTION = ORDER_BY_RECOMMENDATION
