import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { JustinsAccount } from '../utils/constants';

export default function Redirect(): null {
  const { replace } = useRouter();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account === JustinsAccount) replace('/requests');
    else replace('/landing');
  }, [replace, account]);

  return null;
}
