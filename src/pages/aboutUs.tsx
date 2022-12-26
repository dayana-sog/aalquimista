import { useState } from 'react'

import Head from 'next/head'
import { GetStaticProps } from 'next'

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

import { getContacts } from '../../services/prepr'

interface ContactsProps {
  title: string, 
  description: string, 
  address: string, 
  phone: string, 
  e_mail: string
}

const Contacts = ({title, description, address, phone, e_mail}: ContactsProps) => {
  const [send, setSend] = useState('Enviar');

  function sendEmail() {
    setTimeout(() => {
      setSend('Enviado');
    }, 1000);
    return setSend('Enviando...');
  }

  return (
    <>
      <Head>
        <title>Alquimista | Saboaria artesanal</title>
      </Head>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Take control of your team.
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
              Start building for free, then add a site plan to go live. Account plans unlock additional features.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contacts

export const getStaticProps: GetStaticProps = async () => {
  const contactsData = (await getContacts()) || []
  const { title, description, address, phone, e_mail } = contactsData

  return {
    props: {
      title, 
      description, 
      address, 
      phone, 
      e_mail
    },
  }
}
