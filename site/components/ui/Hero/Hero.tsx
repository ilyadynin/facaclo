import React, { FC } from 'react'
import { Container } from '@components/ui'
import { ArrowRight } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
interface HeroProps {
  className?: string
  headline: string
  description: string
  form?: boolean
}

const Hero: FC<HeroProps> = ({ headline, description, form }) => {
  return (
    <div className="bg-accent-9 border-b border-t border-accent-2">
      <Container>
        <div className={s.root}>
          <h2 className={s.title}>{headline}</h2>
          <div className={s.description}>
            <p>{description}</p>
            {!form && (
              <Link href="/">
                <a className="flex items-center text-accent-0 pt-3 font-bold hover:underline cursor-pointer w-max-content">
                  Über Faça
                  <ArrowRight width="20" heigh="20" className="ml-1" />
                </a>
              </Link>
            )}
            {form && (
              <div>
                Newsletter
                <form>
                  <input type="text" />
                  <input type="submit" />
                </form>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
