import React from 'react'
import { useLazyGenerateDiagramQuery } from '@/store/apiSlice'
import PromptInput from './components/PromptInput'
import Result from './components/Result'

const GeneratePage: React.FC = () => {
    const [fetch, { data, isFetching }] = useLazyGenerateDiagramQuery()
    return (
        <div className='container mx-auto py-8'>
            <PromptInput onGenerate={fetch} isFetching={isFetching} />
            <Result data={data} isFetching={isFetching} />
        </div>
    )
}

export default GeneratePage
