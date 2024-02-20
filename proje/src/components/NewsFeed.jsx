import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NewsArticle from './NewsArticle';
// import CountryOptions from './CountryOptions';
// f70024ad8def4e78b23bf3008915b3b9

function NewsFeed() {
    const [date, setDate] = useState('');
    const [country, setCountry] = useState('');
    const [submitted, setSubmitted] = useState(false); 
    const [news, setNews] = useState([]);

    const DateChange = (event) => {
        setDate(event.target.value);
    };

    const CountryChange = (event) => {
        setCountry(event.target.value);
    };
    
    // Submit Button Functionality
    const handleSubmit = (event) => {
        event.preventDefault()
        setSubmitted(true); // Set submitted to true when the form is submitted
        // setCountry(document.getElementById('selectCountry').value);
        // console.log(document.getElementById('countrySelect').value)
        // event.CountryChange()
    }

    // Reset Button Functionality
    const handleReset = (event) => {
        event.preventDefault()
        setCountry(""); // Reset country text box to empty
        setDate(""); // Reset date selection to default
        setSubmitted(false); // Set submitted to false when the form is submitted to reset form
    }
    
    // Fetch data on component mount
    useEffect(() => {
        const fetchNews = async () => {
            // const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&from=${date}&to=${date}&apiKey=f70024ad8def4e78b23bf3008915b3b9')
            // https://newsapi.org/v2/top-headlines?country=ca&from=2024-02-14&to=2024-02-14&apiKey=f70024ad8def4e78b23bf3008915b3b9
            const response = await axios.get("https://newsapi.org/v2/top-headlines?country=${country}&from=${date}&to={date}&apiKey=f70024ad8def4e78b23bf3008915b3b9")
                // {
                //   params: {
                //     country: {country},
                //     from: {date}, 
                //     to: {date},   
                //     apiKey: 'f70024ad8def4e78b23bf3008915b3b9',
                //   },}
                  
                //   )
            setNews(response.data.articles);
            console.log(response.data.articles);
            console.log({country, date});
            
        }
        if (submitted) {
            fetchNews()

        }

    }, [submitted, date, country])

  return (
        <div>
            {/* Conditionally show form => form != submitted */}
            {!submitted && 
                <form onSubmit={handleSubmit}> 
                    <label htmlFor="country">Select a country:</label><br />
                    <input type="text" id="country" name="country" value={country} onChange={CountryChange} required/><br />
                    {/* <div id="countrySelect">
                        <CountryOptions />
                    </div> */}
                    
                    <label htmlFor="date">Select a date:</label><br />
                    <input type="date" id="date" name="date" max={new Date().toISOString().split('T')[0]}  value={date} onChange={DateChange} placeholder="YYYY-MM-DD" required/><br />

                    <button type="submit">Submit</button>
                </form>
            }
            
            {/* Conditionally render NewsFeed => form submitted */}
            {submitted && news.map(article => {
                return(
                    <NewsArticle 
                        title={article.title}
                        description={article.description}
                        url={article.url}
                        urlToImage={article.urlToImage} 
                    />
                )
            })}

            {/* Conditionally Reset form => form submitted */}
            {submitted && 
            <form onSubmit={handleReset}>
                <button type="submit">Reset</button>
            </form>
            } 
        </div>
  )
}

export default NewsFeed