import { FC } from 'react'
import { SAMPLE_DATA } from './data'
import { Diagram } from './components/Diagram'

const GalleryPage: FC = () => {
    return (
        <div className='space-y-8'>
            <h1 className='text-3xl font-bold text-white'>Diagram Gallery</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {SAMPLE_DATA.map((item, index) => (
                    <Diagram
                        key={index}
                        prompt={item.prompt}
                        diagram={item.diagram}
                    />
                ))}
            </div>
        </div>
    )
}

export default GalleryPage
