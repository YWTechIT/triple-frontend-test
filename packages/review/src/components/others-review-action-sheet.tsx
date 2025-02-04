import { ActionSheet, ActionSheetItem } from '@titicaca/action-sheet'
import { useTranslation } from '@titicaca/next-i18next'
import { useUriHash, useHistoryFunctions } from '@titicaca/react-contexts'

import { ReviewData } from './types'

export const HASH_REVIEW_ACTION_SHEET =
  'common.reviews-list.review-action-sheet'

export default function OthersReviewActionSheet({
  selectedReview,
  onReportReview,
}: {
  selectedReview?: ReviewData | null
  onReportReview: (reportingReviewId: string) => void
}) {
  const { t } = useTranslation('common-web')

  const uriHash = useUriHash()
  const { back } = useHistoryFunctions()

  const handleReportClick = () => {
    if (selectedReview) {
      onReportReview(selectedReview.id)
    }

    back()
  }

  return (
    <ActionSheet
      open={uriHash === HASH_REVIEW_ACTION_SHEET && !!selectedReview}
      onClose={back}
    >
      <ActionSheetItem icon="report" onClick={handleReportClick}>
        {t(['singohagi', '신고하기'])}
      </ActionSheetItem>
    </ActionSheet>
  )
}
