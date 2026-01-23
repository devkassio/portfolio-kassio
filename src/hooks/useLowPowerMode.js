import { useEffect, useState } from 'react';

const getConnection = () =>
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const isLowPowerConnection = () => {
  const connection = getConnection();
  if (!connection) {
    return false;
  }
  if (connection.saveData) {
    return true;
  }
  const effectiveType = connection.effectiveType || '';
  return effectiveType.includes('2g');
};

const getInitialLowPower = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  const media = window.matchMedia('(max-width: 700px)');
  return media.matches || isLowPowerConnection();
};

export default function useLowPowerMode() {
  const [isLowPower, setIsLowPower] = useState(getInitialLowPower);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const media = window.matchMedia('(max-width: 700px)');
    const connection = getConnection();

    const update = () => {
      const nextValue = media.matches || isLowPowerConnection();
      setIsLowPower(Boolean(nextValue));
    };

    update();

    if (media.addEventListener) {
      media.addEventListener('change', update);
    } else {
      media.addListener(update);
    }

    if (connection?.addEventListener) {
      connection.addEventListener('change', update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', update);
      } else {
        media.removeListener(update);
      }

      if (connection?.removeEventListener) {
        connection.removeEventListener('change', update);
      }
    };
  }, []);

  return isLowPower;
}
