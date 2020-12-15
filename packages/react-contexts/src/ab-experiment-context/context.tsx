import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { ABExperimentMeta, getABExperiment } from './service'

interface ABExperimentMetas {
  [key: string]: ABExperimentMeta | undefined
}

type ABExperimentContextValue = ABExperimentMetas

const ABExperimentContext = createContext<ABExperimentContextValue>({})

export function ABExperimentProvider({
  slug,
  meta: metaFromSSR,
  onError: onErrorFromProps,
  children,
}: PropsWithChildren<{
  slug: string
  /**
   * SSR 단계에서 조회한 값을 넣어 줄 수 있는 prop
   */
  meta?: ABExperimentMeta
  onError?: (error: unknown) => void
}>) {
  const onErrorRef = useRef(onErrorFromProps)
  const experimentMetas = useContext(ABExperimentContext)
  const [meta, setMeta] = useState(metaFromSSR)

  useEffect(() => {
    const onError = onErrorRef.current

    async function fetchAndSetMeta() {
      const { result, error } = await getABExperiment(slug)

      if (error && onError) {
        onError(error)
      }

      if (result) {
        setMeta(result)
      }
    }

    if (!metaFromSSR) {
      fetchAndSetMeta()
    }
  }, [slug, metaFromSSR])

  const value = useMemo(() => ({ ...experimentMetas, [slug]: meta }), [
    experimentMetas,
    slug,
    meta,
  ])

  return (
    <ABExperimentContext.Provider value={value}>
      {children}
    </ABExperimentContext.Provider>
  )
}

export function useABExperimentVariant<T>(
  slug: string,
  variants: {
    [group: string]: T
  },
  fallback: T,
): T {
  const metas = useContext(ABExperimentContext)

  const { group } = metas[slug] || {}

  // TODO: session 시작을 기록해야함

  return group ? variants[group] : fallback
}
