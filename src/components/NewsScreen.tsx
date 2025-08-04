import React from 'react';
import { useState, useEffect } from 'react';
import type { Article } from "../types/types";

const NewsScreen: React.FC = () => {
    const [articles, setArticle] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try{
                setLoading(true);
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=457e0eaa43774b17883e3f4641a9456e`);
                if(!response.ok) throw new Error("Could Not Fetch Data")
                const data = await response.json();
                setArticle(data.articles);
                setError(null);
            }
            catch(err){
                setError((err as Error). message);
            }
            finally{
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

  return (
    <div>
        <div>
            <h1>Top News Today</h1>
        </div>
        {loading && <p>Loading...</p>}
        {error &&  <p>{error}</p>}

        {articles.map((article: Article, index: number) => (
        <div key={index}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
        ))}
    </div>
  );
}

export default NewsScreen