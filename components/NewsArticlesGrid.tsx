import { NewsArticle } from '@/models/NewsArticles'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import { Row, Col } from 'react-bootstrap'

interface NewsArticlesGridProps {
  articles: NewsArticle[]
}

export default function NewsArticlesGrid({ articles }: NewsArticlesGridProps) {
  return (
    <Row xs={1} sm={2} xl={3} className='g-4'>
      {articles.map(article => (
        <Col key={article.url}>
          <NewsArticleEntry article={article} />
        </Col>
      ))}
    </Row>
  )
}
