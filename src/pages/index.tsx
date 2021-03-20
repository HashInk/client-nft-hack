import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Redirect(): null {
  const { replace } = useRouter();
  const { account } = useWeb3React();
  const JustinsAccount = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';

  useEffect(() => {
    // if (account === JustinsAccount) replace('/requests');
    // else replace('/landing');
    replace('/landing');
  }, [replace, account]);

  return null;
}
