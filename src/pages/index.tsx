import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Redirect(): null {
  const { replace } = useRouter();

  useEffect(() => {
    replace('/landing');
  }, [replace]);

  return null;
}
