import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { generateDiagram } from '@/services/api'

interface PromptInputProps {
    onGenerate: (diagram: string) => void
}

const PromptInput: React.FC<PromptInputProps> = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const diagram = await generateDiagram(prompt)
            onGenerate(diagram)
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to generate diagram'
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='max-w-3xl mx-auto mt-10 px-4'>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder='Enter your diagram description here...'
                    className='min-h-[128px] resize-none'
                    disabled={isLoading}
                />
                {error && <div className='text-red-500 text-sm'>{error}</div>}
                <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate Diagram'}
                </Button>
            </form>
        </div>
    )
}

export default PromptInput
