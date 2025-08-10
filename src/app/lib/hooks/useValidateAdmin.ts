import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateCognitoToken } from '../auth/validateCognitoToken';

export function useValidateAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [validationFailed, setValidationFailed] = useState(false);
  const [validating, setValidating] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem('cognitoToken') || sessionStorage.getItem('cognitoToken');

    if (!token || !validateCognitoToken(token)) {
      localStorage.removeItem('cognitoToken');
      setValidationFailed(true);
      router.push('/admin');
    } else {
      setIsAdmin(true);
      setValidating(false);
    }
  }, [router]);

  return { isAdmin, validationFailed, validating };
}
