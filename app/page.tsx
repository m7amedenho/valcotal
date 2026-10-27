import CompanySite from './company-site';
import articles from '@/data/articles.json';

export default function Home() {
  return <CompanySite articles={articles.map(({title, date, url, images, cover}) => ({title, date, url, image: cover || images[0] || ''}))} />;
}
