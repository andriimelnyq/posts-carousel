import { PostType } from '../types/PostType';

type SetAction = { type: 'post/SET', payload: PostType };
type Action = SetAction;

const set = (value: PostType): SetAction => ({ type: 'post/SET', payload: value });

export const postActions = { set };

const postReducer = (post: PostType | null = null, action: Action) => {
  switch (action.type) {
    case 'post/SET':
      return action.payload;

    default:
      return post;
  }
};

export default postReducer;
