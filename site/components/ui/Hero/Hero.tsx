import React, { FC, useState } from 'react'
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
  const [submit, setSubmit] = useState(false)

  const submitHandler = () => {
    setSubmit(true)
  }

  return (
    <div className="bg-accent-5 border-b border-t border-accent-2">
      <Container>
        <div className={s.root}>
          {(!form && <h2 className={s.title}>SEI EINFACH FAÇA</h2>) ||
            (!submit && <h2 className={s.title}>NICHTS MEHR VERPASSEN</h2>) ||
            (submit && <h2 className={s.title}>DANKESCHÖN</h2>)}
          <div className={s.description}>
            {(!form && (
              <p>
                Wir sind eine junge dynamische Streetwear-Brand aus Österreich.
                Unser Team besteht aus 3 jungen Kleinunternehmern. Auf dem
                Button kannst du gerne weiterlesen und mehr über uns erfahren.
              </p>
            )) ||
              (!submit && (
                <p>
                  Sicher dir einen 5€ Gutschein und melde dich für unseren
                  Newsletter an, um nie wieder ein Kollektion zu verpassen.
                </p>
              )) || (
                <p>
                  {' '}
                  Danke dass du jetzt teil des Teams geworden bist ;)Danke dass
                  du jetzt teil des Teams geworden bist ;)Danke dass du jetzt
                  teil des Teams geworden bist ;){' '}
                </p>
              )}

            {!form && (
              <Link href="/uber-uns">
                <a className="flex items-center text-accent-0 pt-3 font-bold hover:underline cursor-pointer w-max-content">
                  Über Faça
                  <ArrowRight width="20" heigh="20" className="ml-1" />
                </a>
              </Link>
            )}
            {form && (
              <div>
                {!submit && (
                  <form className={s.styledForm}>
                    <input
                      className={s.styledInput}
                      type="text"
                      placeholder="E-Mail"
                    />
                    <input type="submit" onClick={submitHandler} />
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
