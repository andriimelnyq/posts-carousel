import React, { useState } from 'react';
import {
  Backdrop, Box, Button, Fade, FormControl, FormHelperText, IconButton, InputLabel,
  MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import validator from 'validator';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createPost } from '../../api';
import { ErrorText } from '../../types/ErrorText';
import { PostType } from '../../types/PostType';
import { errorActions } from '../../features/error';
import { postActions } from '../../features/currentPost';
import { Loader } from '../Loader';

type Props = {
  openAdding: boolean,
  setOpenAdding: (isClose: boolean) => void,
};

export const ModalAdding: React.FC<Props> = ({ openAdding, setOpenAdding }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const [userId, setUserId] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const [isBodyTouched, setIsBodyTouched] = useState(false);
  const [isUserTouched, setIsUserTouched] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const setError = (value: ErrorText) => dispatch(errorActions.set(value));
  const setPost = (value: PostType) => dispatch(postActions.set(value));

  const helperTextTitle = () => {
    if (!postTitle) {
      return 'Title is required';
    }

    if (postTitle && postTitle.length < 5) {
      return 'Title must be at least 5 characters long';
    }

    if (postTitle && !validator.isAlphanumeric(postTitle, 'en-US', { ignore: ' ' })) {
      return 'Title can only contain letters, numbers, and spaces';
    }

    return ' ';
  };

  const isValideTitle = helperTextTitle() === ' ';

  const helperBodyTitle = () => {
    if (!postBody) {
      return 'Body is required';
    }

    if (postBody && postBody.length < 10) {
      return 'Post body must be at least 10 characters long';
    }

    if (postBody && !validator.isAscii(postBody)) {
      return 'Post body can only contain ASCII characters';
    }

    return ' ';
  };

  const isValidateBody = helperBodyTitle() === ' ';

  const handleSelectUser = (event: SelectChangeEvent) => {
    setUserId(event.target.value as string);
  };

  const handlePostBody = (event: { target: { value: string; }; }) => {
    setPostBody(event.target.value as string);
  };

  const handlePostTitle = (event: { target: { value: string; }; }) => {
    setPostTitle(event.target.value as string);
  };

  const clearForm = () => {
    setUserId('');
    setPostBody('');
    setPostTitle('');
    setIsBodyTouched(false);
    setIsTitleTouched(false);
    setIsUserTouched(false);
  };

  const handleCloseAddPost = () => {
    setOpenAdding(false);
    clearForm();
  };

  const postDataOnServer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoad(true);
      const newPost = await createPost(+userId, postBody, postTitle);

      setPost(newPost);
      handleCloseAddPost();
    } catch {
      setError(ErrorText.POST_DATA);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <>
      {isLoad && <Loader />}

      <Modal
        open={openAdding}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAdding}>
          <Box
            className="modal"
          >
            <Box className="modal__row">
              <Typography id="modal-modal-title" variant="h5" component="h2" color="primary">
                Create post
              </Typography>

              <IconButton onClick={handleCloseAddPost}>
                <Close />
              </IconButton>
            </Box>

            <form
              className="modal__form"
              onSubmit={e => postDataOnServer(e)}
            >
              <TextField
                required
                error={!isValideTitle && isTitleTouched}
                label="Post title"
                variant="standard"
                helperText={isTitleTouched ? helperTextTitle() : ' '}
                value={postTitle}
                onChange={handlePostTitle}
                onFocus={() => setIsTitleTouched(true)}
              />

              <FormControl fullWidth>
                <InputLabel
                  error={!userId && isUserTouched}
                  id="demo-simple-select-label"
                >
                  Select author
                </InputLabel>

                <Select
                  id="demo-simple-select"
                  required
                  value={userId}
                  label="Select author"
                  variant="outlined"
                  error={!userId && isUserTouched}
                  onChange={handleSelectUser}
                  onFocus={() => setIsUserTouched(true)}
                >
                  {users.map(user => (
                    <MenuItem value={user.id} key={user.phone}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error>
                  {!userId && isUserTouched ? 'User is required' : ' '}
                </FormHelperText>
              </FormControl>

              <TextField
                required
                error={!isValidateBody && isBodyTouched}
                id="outlined-error-helper-text"
                variant="outlined"
                placeholder="Write your post"
                multiline
                rows={5}
                helperText={isBodyTouched ? helperBodyTitle() : ' '}
                value={postBody}
                onChange={handlePostBody}
                onFocus={() => setIsBodyTouched(true)}
              />

              <div className="modal__row">
                <Button variant="outlined" onClick={clearForm}>
                  Clear
                </Button>

                <Button
                  type="submit"
                  disabled={!isValideTitle || !isValidateBody || !userId}
                  variant="contained"
                >
                  Add post
                </Button>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
