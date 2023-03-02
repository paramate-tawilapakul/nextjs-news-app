import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import { GetServerSideProps } from 'next'
import { Alert } from 'react-bootstrap'
import Head from 'next/head'
// import Image from 'next/image'

interface BreakingNewsPagesProps {
  newsArticles: NewsArticle[]
}

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPagesProps
> = async () => {
  // await new Promise(r => setTimeout(r, 3000))
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?q=covid&apiKey=${process.env.NEWS_API_KEY}`
  )
  const newsResponse: NewsResponse = await response.json()
  // console.log(newsResponse)

  return {
    props: { newsArticles: newsResponse.articles },
  }

  // let error go to 500 page
}

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPagesProps) {
  return (
    <>
      <Head>
        <title key='title'>Breaking News - NextJS News App</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
          This page uses <strong>getServerSideProps</strong> to fetch data
          server-side on every request. This allows search engines to crawl the
          page content and <strong>improves SEO</strong>.
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}
