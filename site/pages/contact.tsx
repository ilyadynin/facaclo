import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import commerce from '@lib/api/commerce'
import { Text } from '@components/ui'
import { Layout } from '@components/common'
import getSlug from '@lib/get-slug'
import { missingLocaleInPages } from '@lib/usage-warns'
import type { Page } from '@commerce/types/page'
import { useRouter } from 'next/router'
import { useState, useRef } from 'react'

export default function Pages({ page }: { page: Page }) {
  const router = useRouter()
  const [submit, setSubmit] = useState(false)

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const emailChange = (event: any) => {
    setEmail(event.target.value)
  }

  const messageChange = (event: any) => {
    setMessage(event.target.value)
  }
  const submitHandler = (event: any) => {
    event.preventDefault()
    if (message.trim().length !== 0 && email.trim().length !== 0) {
      setSubmit(true)
    }
  }

  return (
    <div className="max-w-2xl mx-8 sm:mx-auto py-20">
      <div>
        <h3 style={{ fontSize: 35, fontWeight: 'bold', marginBottom: 20 }}>
          Contact
        </h3>
        {(!submit && (
          <p style={{ maxWidth: 600 }}>
            Hast du möglicherweise (noch) offene Fragen oder ein Problem? Gerne
            helfen wir Dir weiter! Wir stehen dir gerne per Mail zur Verfügung.
            Fülle einfach das Formular aus und wir nehmen innerhalb von 1
            Werktag Kontakt mit Dir auf!💚
          </p>
        )) || (
          <p style={{ maxWidth: 600 }}>Deine Nachricht wurde gesendet 💚</p>
        )}
      </div>
      <div>
        {!submit && (
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '15px 0px',
              width: 320,
            }}
          >
            <input
              style={{
                width: 320,
                padding: 15,
                borderRadius: 12,
                margin: '15px auto',
                borderColor: '#eee',
                borderWidth: 1,
              }}
              type="text"
              placeholder="Betreff"
            />
            <input
              onChange={emailChange}
              style={{
                width: 320,
                padding: 15,
                borderRadius: 12,
                margin: '15px auto',
                borderColor: '#eee',
                borderWidth: 1,
              }}
              type="email"
              placeholder="E-Mail"
            />
            <input
              onChange={messageChange}
              style={{
                width: 320,
                padding: 15,
                borderRadius: 12,
                margin: '15px auto',
                borderColor: '#eee',
                borderWidth: 1,
              }}
              type="text"
              placeholder="Nachricht"
            />
            <input
              style={{
                width: 320,
                padding: 15,
                borderRadius: 12,
                margin: '15px auto',
                backgroundColor: '#000',
                color: 'white',
              }}
              type="submit"
              onClick={submitHandler}
              placeholder="Senden"
            />
          </form>
        )}
      </div>
    </div>
  )
}

Pages.Layout = Layout
