/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { User } from '../types/api/user';
import { useLoginUser } from './useLoginUser';
import { useMessage } from './useMessage';

export const useAuth = () => {
  const histroy = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      setLoading(true);

      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            const isAdmin = res.data.id === 10 ? true : false;
            setLoginUser({ ...res.data, isAdmin });
            showMessage({ title: 'ログインしました', status: 'success' });
            histroy.push('/home');
          } else {
            showMessage({ title: 'ユーザが見つかりません', status: 'error' });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({ title: 'ログインできません', status: 'error' });
          setLoading(false);
        });
    },
    [histroy, setLoginUser, showMessage]
  );

  return { login, loading };
};
