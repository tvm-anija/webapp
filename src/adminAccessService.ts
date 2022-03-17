import { useEffect, useState } from 'react';
import { Service } from '../src/service';
import { AdminAccess, permissions } from '../src/permissions';

export interface Admin {
  results: AdminAccess[];
}

const useAdminAccessService = () => {
  const [result, setResult] = useState<Service<AdminAccess>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch('https://localhost:44384/api/permissions')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export const SaveAccessChanges=(permissions:permissions[])=>{
    fetch('https://localhost:44384/api/permissions', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(permissions)
}).then(res => res.json())
  .then(res => console.log(res));
}

export default useAdminAccessService;