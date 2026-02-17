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
  return effectiveType.includes('2g') || effectiveType.includes('slow-2g');
};

const getInitialLowPower = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  return isLowPowerConnection();
};

export default function useLowPowerMode() {
  const [isLowPower, setIsLowPower] = useState(getInitialLowPower);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const connection = getConnection();

    const update = () => {
      setIsLowPower(isLowPowerConnection());
    };

    update();

    if (connection?.addEventListener) {
      connection.addEventListener('change', update);
    }

    return () => {
      if (connection?.removeEventListener) {
        connection.removeEventListener('change', update);
      }
    };
  }, []);

  return isLowPower;
}
