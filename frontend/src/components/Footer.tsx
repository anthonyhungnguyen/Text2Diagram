import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="w-full py-4 mt-8 text-center text-sm text-gray-600">
            <p>
                © 2024 Text2Diagram |{' '}
                <a
                    href="https://github.com/anthonyhungnguyen/text2diagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                >
                    GitHub
                </a>
            </p>
        </footer>
    )
}

export default Footer
