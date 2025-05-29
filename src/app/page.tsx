
import {useTranslations} from 'next-intl';

export default function Home() {
  const t= useTranslations('HomePage');

  return (
      <h1>{t('description')}</h1>
  );
}


