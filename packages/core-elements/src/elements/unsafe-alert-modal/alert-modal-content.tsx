import styled from 'styled-components'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

const StyledOverlay = styled(AlertDialogPrimitive.Overlay)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(58, 58, 58, 0.5);
`

const StyledContent = styled(AlertDialogPrimitive.Content)<{ $width: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  width: ${({ $width }) => `${$width}px`};
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: #fff;
  user-select: none;
`

interface AlertModalContentProps {
  children?: React.ReactNode
  width?: number
}

export function AlertModalContent({
  children,
  width = 295,
  ...props
}: AlertModalContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props} $width={width}>
        {children}
      </StyledContent>
    </AlertDialogPrimitive.Portal>
  )
}
