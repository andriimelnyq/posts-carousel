import { UserType } from '../types/UserType';

type SetAction = { type: 'users/SET', payload: UserType[] };
type Action = SetAction;

const set = (value: UserType[]): SetAction => ({ type: 'users/SET', payload: value });

export const actions = { set };

const usersReducer = (users: UserType[] = [], action: Action) => {
  switch (action.type) {
    case 'users/SET':
      return action.payload;

    default:
      return users;
  }
};

export default usersReducer;
