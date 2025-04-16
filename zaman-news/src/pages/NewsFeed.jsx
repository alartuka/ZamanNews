// import './styles/NewsFeed.css';
import { Box, Paper } from '@mui/material';
import Masonry from  "react-masonry-css";

import NewsArticle from '../components/NewsArticle';
import "../styles/NewsFeed.css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

function NewsFeed({ articles }) {
  return (
    <Box className='news-feed'> 
      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {articles.map((article, i) => {        
          return (
              <Paper key={i} sx={{ borderRadius: '16px', boxShadow: 3, margin: '10px' }}>
                <NewsArticle article={article} />
              </Paper>
          )})
        }
      </Masonry>
    </Box>    
  );
}

export default NewsFeed;