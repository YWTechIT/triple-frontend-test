import { PropsWithChildren } from 'react'

import { MotionContainer } from '../motion-container'

import { InitialEffectOptions } from './types'
import { generateTransition, stringifyTransition } from './common'

type ExtendedEffectOptions = InitialEffectOptions & {
  degree?: number
}

export interface RotateProps {
  type: 'rotate'
  options: ExtendedEffectOptions
}

export default function Rotate({
  children,
  options = {},
}: PropsWithChildren<RotateProps>) {
  const transition = generateTransition(options)

  return (
    <MotionContainer
      key={`rotate_${stringifyTransition(transition)}`}
      animate={{ rotate: options.degree || 0 }}
      transition={transition}
    >
      {children}
    </MotionContainer>
  )
}
