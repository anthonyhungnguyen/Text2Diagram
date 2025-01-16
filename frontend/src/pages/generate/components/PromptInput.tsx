import React, { useCallback, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, X, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
    prompt: z.string().min(1, 'Please enter a diagram description').max(500),
})

interface PromptInputProps {
    onGenerate: (args: { prompt: string }) => void
    isFetching: boolean
}

const PromptInput: React.FC<PromptInputProps> = ({
    onGenerate,
    isFetching,
}) => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
        },
    })

    const onSubmit = useCallback(
        async (values: z.infer<typeof formSchema>) => {
            try {
                await onGenerate({ prompt: values.prompt })
            } catch (err) {
                toast({
                    title: 'Error',
                    description:
                        err instanceof Error
                            ? err.message
                            : 'Failed to generate diagram',
                    variant: 'destructive',
                })
            }
        },
        [onGenerate, toast]
    )

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                form.handleSubmit(onSubmit)()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [form, onSubmit])

    return (
        <div className='w-full'>
            <div className='max-w-3xl mx-auto'>
                <div className='bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 p-6 shadow-2xl'>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            <FormField
                                control={form.control}
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem>
                                        <div className='relative'>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder='Enter your diagram description here... (Ctrl/Cmd + Enter to generate)'
                                                    className='min-h-[200px] resize-none bg-white/5 border-white/10 text-white placeholder:text-gray-400'
                                                    disabled={isFetching}
                                                />
                                            </FormControl>
                                            {field.value && (
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    className='absolute right-2 top-2 hover:bg-white/10 text-gray-400'
                                                    onClick={() =>
                                                        form.setValue(
                                                            'prompt',
                                                            ''
                                                        )
                                                    }
                                                >
                                                    <X className='h-4 w-4' />
                                                </Button>
                                            )}
                                            <div className='absolute right-2 bottom-2 text-sm text-gray-400'>
                                                {field.value.length}/500
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type='submit'
                                className='w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'
                                disabled={
                                    isFetching || !form.getValues('prompt')
                                }
                            >
                                {isFetching ? (
                                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                                ) : (
                                    <Sparkles className='h-4 w-4 mr-2' />
                                )}
                                {isFetching
                                    ? 'Generating...'
                                    : 'Generate Diagram'}
                            </Button>
                        </form>
                    </Form>
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
