import * as React from "react";

export default function useIsMounted() {
  const isMountedRef = React.useRef(true);

  React.useEffect(function onMount() {
    isMountedRef.current = true;
    return function onUnmount() {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef.current;
}
