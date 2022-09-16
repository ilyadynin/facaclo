import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import s from './index.module.css'

const Umwelt = () => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>Umweltfreundlichkeit 🌍</h2>
      <p className={s.description}>
        Mir ist es wichtig, dass meine Produkte so umweltfreundlich wie möglich
        produziert/hergestellt werden. Ich biete derzeit schon eine Verpackung
        an, die komplett recyclebar ist, aus pflanzlichen Bestandteilen besteht
        und biologisch abbaubar ist. Nachhaltigkeit bei Textilien ist mir
        ebenfalls sehr wichtig, darum habe ich lange nach einer perfekten
        Produktion gesucht, die meinen Erwartungen entspricht. Nach langer suche
        habe ich einen Hersteller gefunden, der genau auf dies zutrifft. Die
        Produkte, die ich ab der nächsten Kollektion anbiete, bestehen zu 100%
        aus Bio-Baumwolle. Das heißt, dass für die Produktion von Baumwolle
        keine chemischen Düngermittel oder Pestizide verwendet werden und das
        somit Produkt natürlich wächst. Zusätzlich bestehen die Fäden der
        Produkte aus recyclebarer Baumwolle.
      </p>
    </div>
  )
}

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Hero
        headline="SEI EINFACH FACA"
        description="Eine wilde dynamische Streewear-Brand aus Österreich, die nie zum Stillstand kommt. Eine wilde dynamische Streewear-Brand aus Österreich, die nie zum Stillstand kommt. Eine wilde dynamische Streewear-Brand aus Österreich, die nie zum Stillstand kommt."
      />
      <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      <Hero
        headline="Fühl den Faça Spirit."
        description="Eine wilde dynamische Streewear-Brand aus Österreich, die nie zum Stillstand kommt. Eine wilde dynamische Streewear-Brand aus Österreich, die nie zum Stillstand kommt. Eine wilde dynamische Streewear-Brand aus Österreich, die nie zum Stillstand kommt."
        form={true}
      />
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      <Umwelt></Umwelt>
    </>
  )
}

Home.Layout = Layout
