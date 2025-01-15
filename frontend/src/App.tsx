import React from 'react'
import { Layout } from '@/components/Layout'
import Footer from './components/Footer'
import { Routes, Route, Navigate } from 'react-router-dom'
import GeneratePage from './pages/generate'
import GalleryPage from './pages/gallery'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Navigate to='/generate' replace />} />
                <Route path='/generate' element={<GeneratePage />} />
                <Route path='/gallery' element={<GalleryPage />} />
            </Routes>
            <Footer />
        </Layout>
    )
}

export default App
