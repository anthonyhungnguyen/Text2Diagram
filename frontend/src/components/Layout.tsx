import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const location = useLocation()
    const isHomePage = location.pathname === '/generate'
    const isGalleryPage = location.pathname === '/gallery'

    return (
        <div className='min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black'>
            <header className='border-b border-zinc-800'>
                <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6'>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0'>
                        <div>
                            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-white'>
                                Text2Diagram
                            </h1>
                            <p className='text-xs sm:text-sm md:text-base text-zinc-400 mt-1 sm:mt-2'>
                                Transform your text descriptions into beautiful
                                diagrams
                            </p>
                        </div>
                        <div className='flex gap-2'>
                            <Button
                                variant={isHomePage ? 'secondary' : 'default'}
                                size='sm'
                                asChild
                            >
                                <Link to='/generate'>Generate</Link>
                            </Button>
                            <Button
                                variant={
                                    isGalleryPage ? 'secondary' : 'default'
                                }
                                size='sm'
                                asChild
                            >
                                <Link to='/gallery'>Gallery</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>
            <main className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-8'>
                {children}
            </main>
        </div>
    )
}
