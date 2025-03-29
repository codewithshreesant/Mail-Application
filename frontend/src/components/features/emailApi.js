
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

const emailApi = createApi({
    reducerPath:'emailApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000/api/emails',
        credentials:'include'
    }),
    endpoints : (builder)=>({
        sendEmail : builder.mutation({
            query : (emails) => ({
                url:'/send',
                method:'POST',
                body:emails
            })
        }),
        getSentEmails : builder.query({
            query : () => ({
                url:'/sents',
                method:'GET'
            })
        })
    })
})

export const { useSendEmailMutation, useGetSentEmailsQuery } = emailApi;

export default emailApi;