import { createPreprClient } from "@preprio/nodejs-sdk";

const prepr = createPreprClient({
 token: process.env.PREPR_ACCESS_TOKEN,
 timeout: 4000,
 baseUrl: process.env.PREPR_API_URL,
});

export { prepr };

export async function getHome() {
  const data = await prepr
      .graphqlQuery(
        `{
          Home {
            title,
            subtitle,
            description,
            product_home_image {
              _id,
              url,
              name,
            }
          }
        }`
      )
      .fetch()
  return data.data.Home
}

export async function getContacts() {
  const data = await prepr
      .graphqlQuery(
        `{
          Contacts {
            _id
            title
            description
            address
            phone
            e_mail
          }
        }`
      )
      .fetch()
  return data.data.Contacts
}