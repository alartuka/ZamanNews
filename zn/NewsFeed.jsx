import React from 'react';
import './styles/NewsFeed.css';
import { Box, Paper } from '@mui/material';
import Masonry from  "react-masonry-css";
import NewsArticle from './NewsArticle';

function NewsFeed({ articles }) {
  return (
    <Box className='news-feed'> 
      <Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {articles.map((article, i) => {        
          return (
              <Paper key={i}>
                <NewsArticle article={article} />
              </Paper>
          )})
        }
      </Masonry>
    </Box>    
  );
}

export default NewsFeed;