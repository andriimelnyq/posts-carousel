import React, { useEffect } from 'react';
import './App.scss';
import { Alert, Snackbar, Typography } from '@mui/material';
import { Post } from './components/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { UserType } from './types/UserType';
import { actions as usersActions } from './features/users';
import { getUsers } from './api';
import { ErrorText } from './types/ErrorText';
import { errorActions } from './features/error';

export const App: React.FC = () => {
  const error = useAppSelector(state => state.error);
  const dispatch = useAppDispatch();

  const setUsers = (value: UserType[]) => dispatch(usersActions.set(value));
  const setError = (value: ErrorText) => dispatch(errorActions.set(value));

  const loadUsersFromServer = async () => {
    try {
      const usersFromServer = await getUsers();

      setUsers(usersFromServer);
    } catch {
      setError(ErrorText.LOAD_DATA);
    }
  };

  useEffect(() => {
    loadUsersFromServer();
  }, []);

  return (
    <section className="app">
      {error === ErrorText.LOAD_DATA
        ? (
          <Typography
            variant="h4"
            gutterBottom
            color="primary"
            sx={{ mt: '200px' }}
          >
            {error}
          </Typography>
        )
        : <Post />}

      <Snackbar
        open={error !== ErrorText.NONE}
        autoHideDuration={5000}
        onClose={() => setError(ErrorText.NONE)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error">
          {error}
        </Alert>
      </Snackbar>
    </section>
  );
};
