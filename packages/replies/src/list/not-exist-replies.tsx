import { useTranslation } from '@titicaca/next-i18next'
import { Container, HR1, Text } from '@titicaca/core-elements'

export default function NotExistReplies() {
  const { t } = useTranslation('common-web')

  return (
    <>
      <HR1
        color="var(--color-gray50)"
        css={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}
      />

      <Container
        css={{
          padding: '40px 0 50px',
          textAlign: 'center',
        }}
      >
        <Text size={14} lineHeight={1.2} color="gray300">
          {t(
            'ajig-daesgeuli-eobseoyo.-gajang-meonjeo-daesgeuleul-jagseonghaeboseyo',
          )}
        </Text>
      </Container>

      <HR1 color="var(--color-gray50)" css={{ marginTop: 0 }} />
    </>
  )
}
