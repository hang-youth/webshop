import { GraphQLBoolean } from "graphql";
import gql from "graphql-tag";

async function apiCall(query: any, variables?: any, context:any) {
   const SPACE = context.env.CONTENTFUL_SPACE_ID;
   const TOKEN = context.env.CONTENTFUL_ACCESS_TOKEN;
   // const TOKEN = '1234'

   const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${SPACE}/environments/master`;
   const options = {
      method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${TOKEN}`,
		},
		body: JSON.stringify({ query, variables }),
   }
   return await fetch(fetchUrl, options);
}

async function getTourDates(context:any) {
   const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format
   
   const query = `
   query {
      tourDateCollection(where: { date_gte: "${today}" }, order: date_ASC) {
           items {
              date
              city
              venue
              ticketSaleUrl
              soldOut
           }
        }
     }
     `;
     
   const response = await apiCall(query, null, context);
   const json = await response.json() as any;
   return await json.data.tourDateCollection.items
}
async function getFestivalDates(context:any) {
   const today = new Date().toISOString().split('T')[0]; // Get today's date in ISO format
   
   const query = `
   query {
      festivalDateCollection(where: { date_gte: "${today}" }, order: date_ASC) {
           items {
              date
              city
              festival
              ticketSaleUrl
              soldOut
           }
        }
     }
     `;
     
   const response = await apiCall(query, null, context);
   const json = await response.json() as any;
   console.log(await json)
   return await json.data.festivalDateCollection.items;
}

export const client = {getTourDates, getFestivalDates};