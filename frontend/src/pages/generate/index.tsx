import React, { useState } from 'react'
import PromptInput from '@/pages/generate/components/PromptInput'
import Result from '@/pages/generate/components/Result'

function Prompt() {
    const [diagram, setDiagram] = useState<string | null>(null)

    const handleGenerateDiagram = (diagram: string) => {
        setDiagram(diagram)
    }
    return (
        <>
            <PromptInput onGenerate={handleGenerateDiagram} />
            <Result diagram={diagram} />
        </>
    )
}

export default Prompt
