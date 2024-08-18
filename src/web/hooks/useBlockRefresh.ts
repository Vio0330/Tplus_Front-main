import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export default function useBlockRefresh(callback: () => void) {
  const router = useRouter();

  const [isBlocked, setBlockNavigation] = useState<boolean>(true);

  const isSamePath = useCallback(
    (nextUrl: string) => router.asPath.split('?')[0] === nextUrl.split('?')[0],
    [router.asPath],
  );

  const syncUrlWithRouter = useCallback(() => {
    if (router.asPath !== window.location.pathname) {
      window.history.pushState(null, '', router.asPath);
    }
  }, [router.asPath]);

  const routeChangeStart = useCallback(
    (url: string) => {
      if (isSamePath(url)) {
        return;
      }
      if (isBlocked) {
        syncUrlWithRouter();
        callback();
        router.events.emit('routeChangeError');

        // eslint-disable-next-line no-throw-literal
        throw 'OK, This is Not Error';
      }
    },
    [router.events, syncUrlWithRouter, isSamePath, callback],
  );

  useEffect(() => {
    const handleBeforePopState = () => {
      if (isBlocked) {
        callback();
        return false;
      }

      return true;
    };
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    router.beforePopState(handleBeforePopState);
    router.events.on('routeChangeStart', routeChangeStart);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.beforePopState(() => true);
      router.events.off('routeChangeStart', routeChangeStart);
    };
  }, [setBlockNavigation, callback, router.events, routeChangeStart]);

  return {
    isBlocked,
    setBlockNavigation,
  };
}
