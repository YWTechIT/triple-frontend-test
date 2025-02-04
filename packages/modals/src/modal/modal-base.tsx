import { PropsWithChildren, useRef } from 'react'
import { Container, FlexBox, Portal } from '@titicaca/core-elements'
import { FocusScope } from '@react-aria/focus'
import { css } from 'styled-components'
import { useOverlay } from '@react-aria/overlays'

import { useModal } from './modal-context'

export type ModalBaseProps = PropsWithChildren

export const ModalBase = ({ children }: ModalBaseProps) => {
  const ref = useRef(null)
  const { open, titleId, descriptionId, onClose } = useModal()

  const { overlayProps, underlayProps } = useOverlay(
    { isDismissable: true, isOpen: open, onClose },
    ref,
  )

  if (!open) {
    return null
  }

  return (
    <Portal>
      {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
      <FocusScope autoFocus contain restoreFocus>
        <div>
          <FlexBox
            {...underlayProps}
            flex
            alignItems="center"
            justifyContent="center"
            css={css`
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: rgba(58, 58, 58, 0.5);
              z-index: 9999;
            `}
          >
            <Container
              {...overlayProps}
              ref={ref}
              role="dialog"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              aria-modal
              borderRadius={6}
              css={css`
                width: 295px;
                background-color: #fff;
              `}
            >
              {children}
            </Container>
          </FlexBox>
        </div>
      </FocusScope>
    </Portal>
  )
}
