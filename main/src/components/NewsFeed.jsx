import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NewsArticle } from './NewsArticle';
require('dotenv').config({ path: '../../.env' })
const NEWS_API_KEY="f70024ad8def4e78b23bf3008915b3b9"


function NewsFeed() {
    // Component logic 
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [news, setNews] = useState([]);
    // const [submitted, setSubmitted] = useState(false); 
    // https://newsapi.org/v2/top-headlines?country=${country}&from=${date}&to=${date}

    useEffect(() => {
        const fetchNews = async () => {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=football&apiKey=NEWS_API_KEY`)
            setNews(response.data.articles)
            console.log(response)
        }
    
        fetchNews()
    }, [])


  return (
    <div>
            {/* {news.map(article => {
                return(
                    <NewsArticle 
                        title={article.title}
                        description={article.description}
                        url={article.url}
                        urlToImage={article.urlToImage} 
                    />
                )
            })} */}
        </div>
  );
};

export default NewsFeed;;