import React from 'react'
import styled from 'styled-components'
import { formatNumber } from '../utilities'

const PricingContainer = styled.div`
  font-family: sans-serif;
  clear: both;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  color: #3a3a3a;
  padding-top: 18px;

  small {
    color: rgba(58, 58, 58, 0.3);
    font-weight: normal;
    font-size: 12px;
    display: inline-block;
    text-decoration: line-through;
    margin-right: 6px;
  }
`

export default function Pricing({ basePrice, salePrice }) {
  return (
    <PricingContainer>
      <small>{formatNumber(salePrice)}</small>
      {formatNumber(basePrice)}원
    </PricingContainer>
  )
}
