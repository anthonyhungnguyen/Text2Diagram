import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface ResultProps {
    data: { diagram: string } | undefined
    isFetching: boolean
}

const Result: React.FC<ResultProps> = ({ data, isFetching }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const handleDownload = () => {
        if (containerRef.current) {
            const svg = containerRef.current.querySelector('svg')
            if (svg) {
                const svgData = new XMLSerializer().serializeToString(svg)
                const blob = new Blob([svgData], { type: 'image/svg+xml' })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = 'diagram.svg'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
            }
        }
    }

    useEffect(() => {
        if (data?.diagram && containerRef.current) {
            // Clear previous renders
            if (containerRef.current.innerHTML) {
                containerRef.current.innerHTML = ''
            }

            // Reset and reinitialize mermaid
            mermaid.initialize({ startOnLoad: false })
            containerRef.current.innerHTML = data.diagram
            mermaid.run({
                nodes: [containerRef.current],
            })
        }
    }, [data])

    if (isFetching) {
        return (
            <div className='max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm'>
                <div className='flex justify-center items-center h-40'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                </div>
            </div>
        )
    }

    if (!data) return null

    return (
        <div className='max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold'>Generated Diagram</h2>
                <div className='flex gap-2'>
                    <button
                        onClick={handleDownload}
                        className='p-1.5 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded transition-colors'
                        title='Download SVG'
                    >
                        <ArrowDownTrayIcon className='w-5 h-5' />
                    </button>
                </div>
            </div>
            <div className='overflow-auto'>
                <div
                    ref={containerRef}
                    className='mermaid'
                    key={data?.diagram} // Force remount on diagram change
                />
            </div>
        </div>
    )
}

export default Result
