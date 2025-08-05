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
    <div className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 px-4 py-8">
        <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-10">
            📰 Top News Today
        </h1>

        {loading && <p className="text-white text-center">Loading...</p>}
        {error && <p className="text-red-400 text-center">{error}</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article: Article, index: number) => (
            <div
                key={index}
                className="bg-white/10 m-2 backdrop-blur-sm p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transition-transform hover:scale-110 duration-300"
            >
                {article.urlToImage && (
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
                )}
                <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                {article.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">
                {article.description}
                </p>
                <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-blue-400 hover:underline"
                >
                🔗 Read more
                </a>
            </div>
            ))}
        </div>
        </div>
    </div>
    );
}

export default NewsScreen