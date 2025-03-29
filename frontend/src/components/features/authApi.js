
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const authApi = createApi({
    reducerPath : 'authApi',
    baseQuery : fetchBaseQuery({
        baseUrl:'http://localhost:5000/api/auth',
        credentials:'include',
    }),
    endpoints : (builder) => ({
        registerUser : builder.mutation({
            query : (user) => ({
                url:'/register',
                method:'POST',
                body:user
            })
        }),
        loginUser:builder.mutation({
            query:(user)=>({
                url:'/login',
                method:'POST',
                body:user,
            })
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:'/logout',
                method:'POST'
            })
        }),
        getCurrentUser:builder.query({
            query:()=>({
                url:'/me',
                method:'GET'
            })
        }),
        updateSmtpConfiguration:builder.mutation({
            query:(user)=>({
                url:'/smtp',
                method:'PUT',
                body:user  
            })
        }),
        getAllInboxes : builder.query({
            query:()=>({
                url:'/inbox',
                method:'GET'
            })
        }),
        getSingleEmail: builder.query({
            query:(emailId)=>({
                url:`/emails/${emailId}`,
                method:'GET' 
            })
        }),
        updateImapConfiguration : builder.mutation({
            query:(user)=>({
                url:'/imap',
                method:'PUT',
                body:user
            })
        }),
        saveDraft : builder.mutation({
            query:(email) => ({
                url:'/create-draft',
                method:'POST',
                body:email
            })
        }),

        getDraft : builder.query({
            query:()=>({
                url:'/drafts',
                method:'GET'
            })
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useGetSingleEmailQuery,useLogoutUserMutation ,useGetCurrentUserQuery, useUpdateSmtpConfigurationMutation, useGetAllInboxesQuery, useUpdateImapConfigurationMutation, useSaveDraftMutation, useGetDraftQuery } = authApi;

export default authApi;