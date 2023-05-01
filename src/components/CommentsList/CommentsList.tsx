import React, { useState } from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Divider, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CommentType } from '../../types/CommentType';
import './CommentsList.scss';

type Props = {
  comments: CommentType[] | null,
};

export const CommentsList: React.FC<Props> = ({ comments }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      className="comments-list"
    >
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        disabled={comments?.length === 0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h5" color="primary">
            {comments?.length === 0 ? 'No comments yet' : 'Comments'}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          {comments?.map(comment => (
            <div
              key={comment.name}
              className="comments-list__item"
            >
              <Typography
                variant="h6"
              >
                {`"${comment.body}"`}
              </Typography>

              <div className="comments-list__titles">
                <Typography color="primary">
                  {comment.name}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {comment.email}
                </Typography>
              </div>
              <Divider sx={{ margin: '20px 0' }} />
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
