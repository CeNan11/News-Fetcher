import React from 'react';
import { useState, useEffect } from 'react';
import type { Article } from "../types/types";

const NewsScreen: React.FC = () => {
    const [article, setArticle] = useState<Article>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try{
                setLoading(true);
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=457e0eaa43774b17883e3f4641a9456e`);
                if(!response.ok) throw new Error("Could Not Fetch Data")
                const data = await response.json();
                setArticle(data.articles[0]);
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
    <h1>Test case</h1>
  );
}

export default NewsScreen