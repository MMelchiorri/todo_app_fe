'use client'

import Link from 'next/link'
import styles from '@/styles/navbar.module.css'
import { HomeFilled, FormatListBulleted, Person } from '@mui/icons-material'
import { Box } from '@mui/material'
import { Inter } from 'next/font/google'
import { useTranslations } from 'next-intl'

const inter = Inter({ subsets: ['latin'], weight: ['200'] })

export function Navbar() {
  const t = useTranslations('Todos')
  return (
    <nav className={`${styles.navbar} ${inter.className} `}>
      <div className={`${styles.container}`}>
        <div className={`${styles.innerContainer}`}>
          <Link className={styles.link} href={'/'}>
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <HomeFilled fontSize={'small'} />
              <p className={`${styles.title}`}>{t('navbar.home')}</p>
            </Box>
          </Link>
          <Link className={`${styles.link}`} href="/todos">
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <FormatListBulleted fontSize={'small'} />
              <p className={`${styles.title}`}>{t(`navbar.todo`)}</p>
            </Box>
          </Link>
          <Link className={`${styles.link}`} href="/users">
            <Box display={'flex'} alignItems={'center'} gap={2}>
              <Person fontSize={'small'} />
              <p className={`${styles.title}`}>{t(`navbar.userProfile`)}</p>
            </Box>
          </Link>
        </div>
      </div>
    </nav>
  )
}
