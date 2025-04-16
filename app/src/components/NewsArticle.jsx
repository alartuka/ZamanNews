import React from 'react';
import Logo from "../logo192.png";
import { Box, Typography } from '@mui/material';

function NewsArticle({ article }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        m: 1
      }}
    >
      {/* === IMAGE === */}
      {article.image && article.url ? (
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <img src={article.image} alt={article.title} style={{ width: '100%', borderRadius: '16px' }} />
        </a>
      ) : article.image && !article.url ? (
        <img src={article.image} alt={article.title} style={{ width: '100%' }} />
      ) : (
        <img src={Logo} alt={article.title} style={{ width: '100%' }} />
      )}

      {/* === TITLE & LINK === */}        
      { article.url ? (
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <Typography variant="subtitle1" component="div" sx={{ p: 2 }}>
            {article.title}?
          </Typography>
        </a>
      ) : (
        <Typography variant="subtitle1" component="div" sx={{ p: 2 }}>
          {article.title}?
        </Typography>
      )}

      

      {/* === DESCRIPTION === */}
      { article.description ? (
        <Typography variant="body1" component="div" sx={{ p: 2 }}>
          {article.description}
        </Typography>
      ) : article.content ? (
        <Typography variant="body1" component="div" sx={{ p: 2 }}>
          {article.content}
        </Typography>
      ) : (
        <Typography variant="body1" component="div" sx={{ p: 2 }}>
          No description available.
        </Typography>
      )}

      {/* === SOURCE === */}
      { article.source &&
        <a href={article.source.url} target="_blank" rel="noopener noreferrer">
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            {/* {new Date(article.publishedAt).toLocaleDateString()} */}
            {article.source.name}
          </Typography>
        </a>
      }
      
    </Box>
  )
}

export default NewsArticle