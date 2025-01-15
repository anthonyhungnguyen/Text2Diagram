import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface DiagramProps {
    prompt: string
    diagram: string
}

// Initialize mermaid with proper settings for markdown lists
mermaid.initialize({
    startOnLoad: true,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
        htmlLabels: true,
        useMaxWidth: true,
    },
})

export const Diagram: React.FC<DiagramProps> = ({ prompt, diagram }) => {
    const diagramRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const renderDiagram = async () => {
            if (diagramRef.current) {
                try {
                    diagramRef.current.innerHTML = ''
                    // Clean the diagram input
                    const cleanDiagram = diagram.trim().replace(/^\s+/gm, '')
                    const id = `diagram-${Math.random().toString(36).slice(2)}`

                    const { svg } = await mermaid.render(id, cleanDiagram)
                    if (diagramRef.current) {
                        diagramRef.current.innerHTML = svg
                    }
                } catch (error) {
                    console.error('Failed to render diagram:', error)
                    diagramRef.current.innerHTML =
                        '<p class="text-red-500">Failed to render diagram</p>'
                }
            }
        }

        renderDiagram()
    }, [diagram])

    return (
        <div className='bg-zinc-800 rounded-lg p-6 space-y-4'>
            <div className='space-y-2'>
                <h3 className='text-lg font-semibold text-white'>Prompt</h3>
                <p className='text-zinc-300'>{prompt}</p>
            </div>
            <div className='space-y-2'>
                <h3 className='text-lg font-semibold text-white'>Diagram</h3>
                <div ref={diagramRef} className='bg-white rounded-md p-4' />
            </div>
        </div>
    )
}
