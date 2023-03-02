import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Alert } from 'react-bootstrap'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import Image from 'next/image'

interface CategoryNewsPagesProps {
  newsArticles: NewsArticle[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ]

  const paths = categorySlugs.map(slug => ({ params: { category: slug } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CategoryNewsPagesProps> = async ({
  params,
}) => {
  // await new Promise(r => setTimeout(r, 3000))
  const category = params?.category?.toString()
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  )
  const newsResponse: NewsResponse = await response.json()
  // console.log(newsResponse)

  return {
    props: { newsArticles: newsResponse.articles },
    revalidate: 5 * 60, // 5 minutes, only on production
  }
  // let error go to 500 page
}

export default function CategoryNewsPage({
  newsArticles,
}: CategoryNewsPagesProps) {
  const router = useRouter()
  const categoryName = router.query.category?.toString()
  const title = 'Category: ' + categoryName
  return (
    <>
      <Head>
        <title key='title'>{`${title} - NestJS News App`}</title>
      </Head>
      <main>
        <h1>{title}</h1>
        <Alert>
          This is page uses <strong>getStaticProps</strong> for very high page
          loading speed and <strong>incremental static regeneration</strong> to
          show data not older than <strong>5 minutes</strong>.
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}
