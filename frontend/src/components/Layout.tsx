import React from 'react'
import { useLocation } from 'react-router-dom'

export const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const location = useLocation()
    const isHomePage = location.pathname === '/'
    const isGalleryPage = location.pathname === '/gallery'

    return (
        <div className='min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black'>
            <header className='border-b border-zinc-800'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='text-2xl sm:text-3xl font-bold text-white'>
                                Text2Diagram
                            </h1>
                            <p className='text-sm sm:text-base text-zinc-400 mt-1 sm:mt-2'>
                                Transform your text descriptions into beautiful
                                diagrams
                            </p>
                        </div>
                        <div className='flex gap-2'>
                            <a
                                href='/'
                                className={`px-4 py-2 text-white rounded-md transition-colors ${
                                    isHomePage
                                        ? 'bg-zinc-700'
                                        : 'bg-zinc-800 hover:bg-zinc-700'
                                }`}
                            >
                                Generate
                            </a>
                            <a
                                href='/gallery'
                                className={`px-4 py-2 text-white rounded-md transition-colors ${
                                    isGalleryPage
                                        ? 'bg-zinc-700'
                                        : 'bg-zinc-800 hover:bg-zinc-700'
                                }`}
                            >
                                Gallery
                            </a>
                        </div>
                    </div>
                </div>
            </header>
            <main className='max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8'>
                {children}
            </main>
        </div>
    )
}
