import styled, { css } from 'styled-components'

interface HrProps {
  compact?: boolean
  color?: string
}

export const HR1 = styled.div<HrProps>`
  margin: 50px 30px;
  height: 1px;
  background-color: ${({ color }) => color || '#efefef'};

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};
`

export const HR2 = styled.div<HrProps>`
  margin: 50px 0;
  height: 10px;
  background-color: #efefef;

  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};
`

export const HR3 = styled.div<{ height?: number }>`
  height: ${({ height }) => height || 10}px;
  background-color: transparent;
`

export const HR4 = styled.div`
  margin: 40px auto;
  width: 130px;
  height: 37px;
  background-repeat: no-repeat;
  background-size: 130px 37px;
  background-image: url('https://assets.triple.guide/images/img-line1@2x.png');
`

export const HR5 = styled.div`
  margin: 40px auto;
  width: 130px;
  height: 37px;
  background-repeat: no-repeat;
  background-size: 130px 37px;
  background-image: url('https://assets.triple.guide/images/img-line2@2x.png');
`

export const HR6 = styled.div`
  margin: 40px auto;
  width: 130px;
  height: 37px;
  background-repeat: no-repeat;
  background-size: 130px 37px;
  background-image: url('https://assets.triple.guide/images/img-line3@2x.png');
`

export const HR7 = styled.div<HrProps>`
  margin: 30px auto;
  ${({ compact }) =>
    compact &&
    css`
      margin: 0;
    `};

  width: 100%;
  border-bottom: dashed 1px #efefef;
`
