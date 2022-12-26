import Head from 'next/head'
import Link from 'next/link'

import { GetStaticProps } from "next/types"
import { stripe } from "../lib/stripe"

import currencyFormater from '../../util/currencyFormater'

interface ProductsFormattedProps {
  id: string,
  name: string,
  description: string,
  image: string,
  priceFormatted: PriceFormattedProps
}

interface PriceFormattedProps {
  id: string,
  price: number,
  productId: string
}

interface Props {
  productsFormatted: Array<ProductsFormattedProps>
}

const Products = ({productsFormatted}: Props) => {  
  return (
    <>
      <Head>
        <title>Alquimista | Produtos</title>
      </Head>

      <div className="bg-gray-100">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-orange-500">Produtos</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {productsFormatted.map((product) => (
              <Link href={`/product/${product.name.replace(/\s/g, '')}`} key={product.id}>
                <div  className="group relative cursor-pointer">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-800">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{currencyFormater((product.priceFormatted.price / 100))}</p>
                  </div>
                </div>
                <div className='flex justify-between items-center mt-4'>
                  <div
                    className="text-sm font-medium cursor-pointer underline-offset-8  text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#75A892] focus:ring-offset-2"
                  >
                    Adicionar ao carrinho
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list()
  const prices = await stripe.prices.list();

  const pricesData = prices.data
  const { data } = response

  const price = pricesData.map((priceItem) => {
    return {
      id: priceItem.id,
      price: priceItem.unit_amount,
      product: priceItem.product
    }
  })

  const products = data.map((item) => {
    return {
      id: item.id,
      description: item.description,
      image: item.images[0],
      name: item.name,
      priceProduct: item.default_price
    }
  })
  
  const productsFormatted: any[] = []

  for (let index = 0; index < price.length; index++) {
    for (let j = 0; j < products.length; j++) {
      if(products[j].priceProduct === price[index].id) {
        productsFormatted.push({ 
          id: products[j].id,
          name: products[j].name,
          description: products[j].description,
          image: products[j].image,
          priceFormatted: price[index],
        })
      }
    }
  }

  return {
    props: { 
      productsFormatted
    },
  }
}