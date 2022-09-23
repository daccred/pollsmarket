import { useRef, useEffect } from 'react';

/**
 * @name useInterval
 * @see https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
 * @see https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app
 * @description Use to set interval in react components without
 * compromising on ref and setState performance.
 */

export default function useInterval(callback: undefined, delay: number) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
