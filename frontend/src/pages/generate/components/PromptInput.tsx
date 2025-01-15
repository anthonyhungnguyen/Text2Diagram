import React, { useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { generateDiagram } from '@/services/api'
import { Loader2, X, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PromptInputProps {
    onGenerate: (diagram: string) => void
}

const PromptInput: React.FC<PromptInputProps> = ({ onGenerate }) => {
    const [prompt, setPrompt] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { toast } = useToast()
    const MAX_CHARS = 500

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleKeyDownSubmit()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [prompt])

    const handleKeyDownSubmit = () => {
        handleSubmit(new Event('submit') as unknown as React.FormEvent)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) {
            toast({
                title: 'Empty prompt',
                description: 'Please enter a diagram description',
                variant: 'destructive',
            })
            return
        }
        setIsLoading(true)
        setError(null)

        try {
            const diagram = await generateDiagram(prompt)
            onGenerate(diagram)
            toast({
                title: 'Success!',
                description: 'Your diagram has been generated',
            })
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
        <div className='w-full'>
            <div className='max-w-3xl mx-auto'>
                <div className='bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 p-6 shadow-2xl'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='relative'>
                            <Textarea
                                value={prompt}
                                onChange={(e) => {
                                    if (e.target.value.length <= MAX_CHARS) {
                                        setPrompt(e.target.value)
                                    }
                                }}
                                placeholder='Enter your diagram description here... (Ctrl/Cmd + Enter to generate)'
                                className='min-h-[200px] resize-none bg-white/5 border-white/10 text-white placeholder:text-gray-400'
                                disabled={isLoading}
                            />
                            {prompt && (
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='sm'
                                    className='absolute right-2 top-2 hover:bg-white/10 text-gray-400'
                                    onClick={() => setPrompt('')}
                                >
                                    <X className='h-4 w-4' />
                                </Button>
                            )}
                            <div className='absolute right-2 bottom-2 text-sm text-gray-400'>
                                {prompt.length}/{MAX_CHARS}
                            </div>
                        </div>

                        {error && (
                            <div className='bg-red-500/10 border-l-4 border-red-500 p-4 rounded'>
                                <p className='text-red-400'>{error}</p>
                            </div>
                        )}

                        <Button
                            type='submit'
                            className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'
                            disabled={isLoading || !prompt.trim()}
                        >
                            {isLoading ? (
                                <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                            ) : (
                                <Sparkles className='h-4 w-4 mr-2' />
                            )}
                            {isLoading ? 'Generating...' : 'Generate Diagram'}
                        </Button>
                    </form>
                </div>

                <div className='mt-6 text-center text-sm text-gray-400'>
                    <p>
                        Pro tip: Use Ctrl/Cmd + Enter to quickly generate your
                        diagram
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PromptInput
