import { NewsArticle } from '@/models/NewsArticles'
import { Card } from 'react-bootstrap'
import Image from 'next/image'

import placeholderImage from '@/assets/images/newsarticle_placeholder.jpg'
import styles from '@/styles/NewsArticleEntry.module.css'

interface NewsArticleEntryProps {
  article: NewsArticle
}

export default function NewsArticleEntry({
  article: { title, description, url, urlToImage },
}: NewsArticleEntryProps) {
  const validImageUrl =
    urlToImage?.startsWith('http://') || urlToImage?.startsWith('https://')
      ? urlToImage
      : undefined

  return (
    <a href={url} target='_blank'>
      <Card className='h-100'>
        <Image
          alt='News article image'
          src={validImageUrl || placeholderImage}
          width={500}
          height={200}
          className={`card-img-top ${styles.image}`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  )
}
