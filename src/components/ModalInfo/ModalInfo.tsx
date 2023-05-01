import React from 'react';
import {
  Backdrop, Box, Fade, Modal, Typography,
} from '@mui/material';
import { UserType } from '../../types/UserType';

type Props = {
  author?: UserType,
  openInfo: boolean,
  handleCloseInfo: () => void,
};

export const ModalInfo: React.FC<Props> = ({ author, openInfo, handleCloseInfo }) => {
  return (
    <Modal
      open={openInfo}
      onClose={handleCloseInfo}
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
      <Fade in={openInfo}>
        <Box
          className="modal"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2" color="primary">
            {author?.name}
          </Typography>
          <div className="modal__row" id="modal-modal-description">
            <Typography color="text.secondary">Email</Typography>

            <Typography>{author?.email}</Typography>
          </div>

          <div className="modal__row" id="modal-modal-description">
            <Typography color="text.secondary">Phone</Typography>

            <Typography>{author?.phone}</Typography>
          </div>

          <div className="modal__row" id="modal-modal-description">
            <Typography color="text.secondary">Website</Typography>

            <Typography>{author?.website}</Typography>
          </div>

          <div className="modal__row" id="modal-modal-description">
            <Typography color="text.secondary">Company</Typography>

            <Typography>{author?.company.name}</Typography>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};
