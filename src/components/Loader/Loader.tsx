import { CircularProgress } from '@mui/material';
import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => (
  <div
    className="loader"
  >
    <CircularProgress
      sx={{
        margin: 'auto',
      }}
    />
  </div>
);
