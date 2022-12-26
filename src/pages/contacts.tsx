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
      <div className="relative bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
        </div>
        <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
          <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="mx-auto max-w-lg">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h2>
              <p className="mt-3 text-lg leading-6 text-gray-500">
                {description}
              </p>
              <dl className="mt-8 text-base text-gray-500">
                <div>
                  <dt className="sr-only">Morada</dt>
                  <dd>
                    <p>{address}</p>
                  </dd>
                </div>
                <div className="mt-6">
                  <dt className="sr-only">Telemóvel</dt>
                  <dd className="flex">
                    <PhoneIcon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">{phone}</span>
                  </dd>
                </div>
                <div className="mt-3">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex">
                    <EnvelopeIcon className="h-6 w-6 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">{e_mail}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <div className="mx-auto max-w-lg lg:max-w-none">
              <form action="https://postmail.invotes.com/send"
                method="post"
                id="email_form"
                onSubmit={sendEmail} 
                className="grid grid-cols-1 gap-y-6">
                <input
                  type="text"
                  name="extra_nome"
                  id="extra_nome"
                  required
                  autoComplete="extra_nome"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-[#75A892] focus:ring-[#75A892]"
                  placeholder="Nome"
                />
             
                <input
                  id="reply_to"
                  name="reply_to"
                  type="text"
                  required
                  autoComplete="reply_to"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-[#75A892] focus:ring-[#75A892]"
                  placeholder="Email"
                />
                
                <input
                  type="text"
                  name="extra_phone_number"
                  id="extra_phone_number"
                  required
                  autoComplete="tel"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-[#75A892] focus:ring-[#75A892]"
                  placeholder="Telemóvel"
                />

                <input
                  id="subject"
                  type="text" 
                  name="subject"
                  required
                  autoComplete="reply_to"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-[#75A892] focus:ring-[#75A892]"
                  placeholder="Assunto"
                />

                <textarea
                  id="text"
                  name="text"
                  rows={4}
                  required
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-[#75A892] focus:ring-[#75A892]"
                  placeholder="Mensagem"
                  defaultValue={''}
                />
                <input type="hidden" name="access_token" value="hs6h7m2187t2uicqpdd7bxdp" />
                <input type="hidden" name="success_url" value=".?message=Email+Successfully+Sent%21&isError=0" />
                <input type="hidden" name="error_url" value=".?message=Email+could+not+be+sent.&isError=1" />
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-[#75A892] py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-[#75A892] focus:outline-none focus:ring-2 focus:ring-[#75A892] focus:ring-offset-2"
                  >
                    {send}
                  </button>
                </div>
              </form>
            </div>
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
