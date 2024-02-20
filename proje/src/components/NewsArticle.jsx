import React from 'react'
import './NewsArticle.css'

function NewsArticle({title, description, url, urlToImage}) {
  return (
    <div className='news-app'>
            <div className='news-item'>
                <img className='news-img' src={urlToImage} alt={urlToImage} />
                <h2><a href={url}>{title}</a></h2>
                <p>{description}</p>
            </div>
        </div>
  )
}

export default NewsArticle