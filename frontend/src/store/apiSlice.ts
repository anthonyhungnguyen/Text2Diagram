import { GenerateDiagramRequest, GenerateDiagramResponse } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
    endpoints: (builder) => ({
        generateDiagram: builder.query<
            GenerateDiagramResponse,
            GenerateDiagramRequest
        >({
            query: (params) => ({
                url: '/generate',
                method: 'GET',
                params,
            }),
        }),
    }),
})

export const { useGenerateDiagramQuery, useLazyGenerateDiagramQuery } = apiSlice
