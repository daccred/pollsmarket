import { useEffect, useMemo, useState } from 'react';
import nookies from 'nookies';
import { AUTH } from '@/config/constants';
import { decode } from 'js-base64';
import { formatAddress } from '@/utils/math.utils';

/* Lift the user from cookies and work the credentials */
export default function useAuthUser() {
  const [profile, setProfile] = useState<any>({});
  const [hasProfile, setHasProfile] = useState<boolean>(false);

  /* Retrieve profile from cookies */
  const cookies = nookies.get(null);
  const profileInCookies = useMemo(() => cookies[AUTH.key], [cookies]);

  useEffect(() => {
    if (profile) {
      setProfile(JSON.parse(decode(profileInCookies)));
      setHasProfile(true);
    }
  }, []);

  const user = {
    name: formatAddress(profile.public_address),
    email: profile.name || '',
    imageUrl: '/images/metamask.svg',
  };

  return { user, hasProfile, profile };
}
