import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import Image from 'next/image'
import { Grid, Marquee, Hero } from '@components/ui'
import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import s from './index.module.css'

const Umwelt = () => {
  return (
    <div className={s.container}>
      <div className={s.container_content}>
        <div className={s.image_container}>
          <Image
            width={230}
            height={230}
            src="https://represocial.fra1.cdn.digitaloceanspaces.com/recycling.png"
            alt="globe environment"
          />
        </div>
        <div className={s.text_container}>
          <h2 className={s.title}>Umweltfreundlichkeit 🌍</h2>
          <p className={s.description}>
            Uns ist es wichtig, dass unsere Produkte so umweltfreundlich wie
            möglich produziert/hergestellt werden. Wir bieten derzeit schon eine
            Verpackung an, die komplett recyclebar ist, aus pflanzlichen
            Bestandteilen besteht und biologisch abbaubar ist. Nachhaltigkeit
            bei Textilien ist uns ebenfalls sehr wichtig, darum haben wir lange
            nach einer perfekten Produktion gesucht, die unseren Erwartungen
            entspricht. Nach langer suche haben wir einen Hersteller gefunden,
            der genau auf dies zutrifft. Die Produkte, die wir ab der nächsten
            Kollektion anbieten, bestehen zu 100% aus Bio-Baumwolle. Das heißt,
            dass für die Produktion von Baumwolle keine chemischen Düngermittel
            oder Pestizide verwendet werden und das Produkt somit natürlich
            wächst. Zusätzlich bestehen die Fäden der Produkte aus recyclebarer
            Baumwolle.
          </p>
        </div>
      </div>
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
            i={i}
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
          <ProductCard
            key={product.id}
            i={i}
            product={product}
            variant="slim"
          />
        ))}
      </Marquee>
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            i={i}
            variant="slim"
          />
        ))}
      </Marquee>
      <Umwelt />
      <Hero
        headline="Fühl den Faça Spirit."
        description="Eine wilde dynamische Streewear-Brand aus Österreich, die nie zum Stillstand kommt. Eine wilde dynamische Streewear-Brand aus Österreich, die nie zum Stillstand kommt. Eine wilde dynamische Streewear-Brand aus Österreich, die nie zum Stillstand kommt."
        form={true}
      />
    </>
  )
}

Home.Layout = Layout
