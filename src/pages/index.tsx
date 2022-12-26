import Head from 'next/head'
import {GetStaticProps} from 'next'

import { getHome } from '../../services/prepr'

import { stripe } from '../lib/stripe'

import HomeSection from '../components/HomeSection'
import Testimonials from '../components/Testimonials'

type HomeProps = {
  title: string,
  subtitle: string,
  description: string,
  product_image: ProductImage,
  productsFormatted: Array<ProductsProps>
}

interface ProductImage {
  _id: string,
  name: string,
  url: string
}


interface ProductsProps {
  id: string,
  description: string,
  image: string,
  name: string,
}

const Home = ({title, subtitle, description, product_image, productsFormatted }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Alquimista | Saboaria artesanal</title>
      </Head>
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="h-80 lg:h-screen lg:-mt-12 relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <main className="flex justify-center items-center h-full mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8 ">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-orange-400 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">{title}</span> <br />
                  <p className="block text-[#75A892] xl:inline">{subtitle}</p>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  {description}
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:-mt-12 lg:inset-y-0 lg:right-0 lg:w-1/2 h-80 lg:h-screen">
          <img
            className="h-full w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
            src={product_image.url}
            alt={product_image.name}
          />
        </div>
      </div>

      <HomeSection productsFormatted={productsFormatted}/>
      <Testimonials />
    </>
  )
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { title, subtitle, description, product_home_image } = (await getHome()) || []

  const product_image = product_home_image[0]
  const products = await stripe.products.list();

  const { data } = products

  const productsFormatted = data.map((item) => {
    return {
      id: item.id,
      description: item.description,
      image: item.images[0],
      name: item.name,
    }
  })

  return {
    props: { title, subtitle, description, product_image, productsFormatted },
  }
}


