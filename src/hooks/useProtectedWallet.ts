import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import usePrevious from './usePrevious';

export function useProtectedWallet() {
  const { disconnect } = useDisconnect();
  const account = useAccount();
  const session = useSession();
  const address = account.address;
  const prevAddress = usePrevious(account.address);

  const handleSignout = async () => {
    await signOut({ callbackUrl: '/' });
    await disconnect();
  };

  useEffect(() => {
    if (prevAddress && !address) {
      handleSignout();
    }
    if (session.status !== 'loading' && !address && prevAddress) {
      handleSignout();
    }
  }, [account, address]);

  return handleSignout;
}
