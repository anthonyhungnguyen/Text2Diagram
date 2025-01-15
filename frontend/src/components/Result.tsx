import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface ResultProps {
    diagram: string | null
}

const Result: React.FC<ResultProps> = ({ diagram }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (diagram && containerRef.current) {
            // Clear previous renders
            if (containerRef.current.innerHTML) {
                containerRef.current.innerHTML = ''
            }

            // Reset and reinitialize mermaid
            mermaid.initialize({ startOnLoad: false })
            containerRef.current.innerHTML = diagram
            mermaid.run({
                nodes: [containerRef.current],
            })
        }
    }, [diagram])

    if (!diagram) return null

    return (
        <div className='max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm'>
            <h2 className='text-lg font-semibold mb-4'>Generated Diagram</h2>
            <div className='overflow-auto'>
                <div
                    ref={containerRef}
                    className='mermaid'
                    key={diagram} // Force remount on diagram change
                />
            </div>
        </div>
    )
}

export default Result
