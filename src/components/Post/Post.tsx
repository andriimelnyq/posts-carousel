import React, { useState, useEffect } from 'react';
import { Button, Paper, Typography } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { getPost, getComments } from '../../api';
import { postActions } from '../../features/currentPost';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CommentsList } from '../CommentsList';
import { ModalInfo } from '../ModalInfo';
import { Loader } from '../Loader';
import { PostType } from '../../types/PostType';
import { ErrorText } from '../../types/ErrorText';
import { CommentType } from '../../types/CommentType';
import { errorActions } from '../../features/error';
import { ModalAdding } from '../ModalAdding';
import './Post.scss';

export const Post = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [postId, setPostId] = useState(1);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const post = useAppSelector(state => state.post);
  const users = useAppSelector(state => state.users);
  const author = users.find(user => user.id === post?.userId);
  const [openInfo, setOpenInfo] = useState(false);
  const [openAdding, setOpenAdding] = useState(false);

  const dispatch = useAppDispatch();
  const setPost = (value: PostType) => dispatch(postActions.set(value));
  const setError = (value: ErrorText) => dispatch(errorActions.set(value));

  const loadPostFromServer = async () => {
    try {
      setIsLoad(true);
      const postFromServer = await getPost(postId);

      setPost(postFromServer);
    } catch {
      setError(ErrorText.LOAD_DATA);
    } finally {
      setIsLoad(false);
    }
  };

  const loadCommentsFromServer = async () => {
    try {
      setIsLoad(true);
      const commentsFromServer = await getComments(post?.id || 1);

      setComments(commentsFromServer);
    } catch {
      setError(ErrorText.LOAD_DATA);
    } finally {
      setIsLoad(false);
    }
  };

  const handleNextPost = () => {
    setPostId(postId < 100 ? postId + 1 : 1);
  };

  const handlePrevPost = () => {
    setPostId(postId > 1 ? postId - 1 : 100);
  };

  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);
  const handleOpenAddPost = () => setOpenAdding(true);

  useEffect(() => {
    loadPostFromServer();
  }, [postId]);

  useEffect(() => {
    loadCommentsFromServer();
  }, [post?.id]);

  return (
    <>
      <div
        className="post"
      >
        {isLoad && <Loader />}

        <div className="post__title">
          <Typography
            variant="h4"
            gutterBottom
            color="primary"
          >
            {post?.title}
          </Typography>

          <Typography variant="h6">
            {`added by ${author?.username}`}
          </Typography>
        </div>

        <div className="post__control">
          <Button onClick={handlePrevPost}>
            <ArrowBackIosNewRoundedIcon />
            Prev
          </Button>

          <Button onClick={handleOpenInfo} variant="contained">Open author info</Button>

          <Button onClick={handleOpenAddPost} variant="contained">Add post</Button>

          <Button onClick={handleNextPost}>
            Next
            <ArrowForwardIosRoundedIcon />
          </Button>
        </div>

        <Paper elevation={3}>
          <Typography
            variant="h5"
            gutterBottom
            className="post__body"
          >
            {post?.body}
          </Typography>
        </Paper>

        <CommentsList
          comments={comments}
        />
      </div>

      <ModalInfo
        author={author}
        openInfo={openInfo}
        handleCloseInfo={handleCloseInfo}
      />

      <ModalAdding
        openAdding={openAdding}
        setOpenAdding={setOpenAdding}
      />
    </>
  );
};
