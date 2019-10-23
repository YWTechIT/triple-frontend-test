import React from 'react'
import Router from 'next/router'
import qs from 'qs'
import { parseUrl, generateUrl } from '@titicaca/view-utilities'

const NOOP: Function = () => {}

const Context = React.createContext<{
  uriHash: string
  push: any
  replace: any
  back: any
  navigate: any
}>({
  uriHash: '',
  push: NOOP,
  replace: NOOP,
  back: NOOP,
  navigate: NOOP,
})

const EXTERNAL_BROWSER_HOSTS = ['play.google.com', 'itunes.apple.com']

function targetPageAvailable(path: string) {
  const regexes = [
    /^\/regions\/.+\/(attractions|restaurants|hotels|articles)\/.+/,
    /^\/articles\/.+/,
  ]

  return regexes.some((regex) => path.match(regex))
}

interface HashHistory {
  hash?: string
  useRouter?: boolean
}

const HASH_HISTORIES: HashHistory[] = []

export function HistoryProvider({
  appUrlScheme,
  webUrlBase,
  transitionModalHash,
  isAndroid,
  isPublic,
  children,
}) {
  const [uriHash, setUriHash] = React.useState(null)

  const onHashChange = React.useCallback((url) => {
    const hash = new URL(url, 'https://triple.guide').hash.replace(/^#/, '')

    // We only need to check if onHashChange is triggered by native action.
    const { hash: previousHash } = HASH_HISTORIES[
      HASH_HISTORIES.length - 2
    ] || { hash: undefined }

    if ((previousHash || '') === hash) {
      HASH_HISTORIES.pop()

      setUriHash(previousHash)
    }
  }, [])

  React.useEffect(() => {
    Router.events.on('routeChangeStart', onHashChange)
    Router.events.on('hashChangeStart', onHashChange)

    return () => {
      Router.events.off('routeChangeStart', onHashChange)
      Router.events.off('hashChangeStart', onHashChange)
    }
  }, [onHashChange])

  const replace = React.useCallback(
    (hash, { useRouter = isAndroid } = {}) => {
      HASH_HISTORIES.pop()
      HASH_HISTORIES.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        Router.replace(generateUrl({ hash }, Router.asPath))
      }
    },
    [isAndroid],
  )

  const push = React.useCallback(
    (hash, { useRouter = isAndroid } = {}) => {
      HASH_HISTORIES.push({ hash, useRouter })

      setUriHash(hash)

      if (useRouter) {
        Router.push(generateUrl({ hash }, Router.asPath))
      }
    },
    [isAndroid],
  )

  const back = React.useCallback(() => {
    const { useRouter } = HASH_HISTORIES.pop() || { useRouter: false }

    setUriHash((HASH_HISTORIES[HASH_HISTORIES.length - 1] || {}).hash)

    if (useRouter) {
      Router.back()
    }
  }, [])

  const navigateOnPublic = React.useCallback(
    ({ href, scheme, path, query, hash }, _) => {
      if (scheme === 'http' || scheme === 'https') {
        return (window.location = href)
      } else if (path === '/outlink') {
        const { url: encodedUrl } = qs.parse(query || '')
        const {
          path: targetPath,
          query: targetQuery,
          hash: targetHash,
        } = parseUrl(decodeURIComponent(encodedUrl))

        if (targetPath && targetPageAvailable(targetPath)) {
          return (window.location = (generateUrl(
            { path: targetPath, query: targetQuery, hash: targetHash },
            webUrlBase,
          ) as unknown) as Location)
        }
      } else if (path === '/inlink') {
        const { path: encodedPath } = qs.parse(query || '')
        const {
          path: targetPath,
          query: targetQuery,
          hash: targetHash,
        } = parseUrl(decodeURIComponent(encodedPath))

        if (targetPath && targetPageAvailable(targetPath)) {
          return (window.location = (generateUrl(
            { path: targetPath, query: targetQuery, hash: targetHash },
            webUrlBase,
          ) as unknown) as Location)
        }
      } else if (targetPageAvailable(path)) {
        return (window.location = (generateUrl(
          { path, query, hash },
          webUrlBase,
        ) as unknown) as Location)
      }

      transitionModalHash && push(transitionModalHash)
    },
    [push, transitionModalHash, webUrlBase],
  )

  const navigateInApp = React.useCallback(
    ({ href, scheme, host }, params) => {
      if (scheme === 'http' || scheme === 'https') {
        const outlinkParams = qs.stringify({
          url: href,
          ...(params || {}),
          target:
            (params || {}).target ||
            (EXTERNAL_BROWSER_HOSTS.includes(host) ? 'browser' : 'default'),
        })

        window.location = (`${appUrlScheme}:///outlink?${outlinkParams}` as unknown) as Location
      } else {
        window.location = generateUrl({ scheme: appUrlScheme }, href)
      }
    },
    [appUrlScheme],
  )

  const navigate = React.useCallback(
    (rawHref, params) =>
      (isPublic ? navigateOnPublic : navigateInApp)(parseUrl(rawHref), params),
    [isPublic, navigateInApp, navigateOnPublic],
  )

  const value = React.useMemo(
    () => ({
      uriHash,
      push,
      replace,
      back,
      navigate,
    }),
    [back, navigate, push, replace, uriHash],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useHistoryContext() {
  return React.useContext(Context)
}

export function withHistory(Component) {
  return function HistoryComponent(props) {
    return (
      <Context.Consumer>
        {({ uriHash, push, replace, back, navigate }) => (
          <Component
            uriHash={uriHash}
            historyActions={{
              push,
              replace,
              back,
              navigate,
            }}
            {...props}
          />
        )}
      </Context.Consumer>
    )
  }
}
