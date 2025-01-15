import { useState } from 'react'
import Header from './components/Header'
import PromptInput from './components/PromptInput'
import Result from './components/Result'
import Footer from './components/Footer'

function App() {
    const [diagram, setDiagram] = useState<string | null>(null)

    const handleGenerateDiagram = (diagram: string) => {
        setDiagram(diagram)
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <Header />
            <main className='container mx-auto py-8'>
                <PromptInput onGenerate={handleGenerateDiagram} />
                <Result diagram={diagram} />
            </main>
            <Footer />
        </div>
    )
}

export default App
