import Document, { Html, Head, Main, NextScript } from 'next/document'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Cart from '../components/Cart'
import WhatsAppButton from '../components/WhatsAppButton'


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt" >
        <Head />
        <body className='relative'>
          <Header />
          <Main />
          <NextScript />
          <Cart />
          <WhatsAppButton />
          <Footer />
        </body>
      </Html>
    )
  }
}