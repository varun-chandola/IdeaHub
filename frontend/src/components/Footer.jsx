import React from 'react'

const Footer = () => {
    return (
        <footer className="footer footer-center text-base-content p-4 mt-10">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - Made By @<a href='https://x.com/VarunChandola7' target='blank' className='hover:underline'>VarunChandola7</a></p>
            </aside>
        </footer>
    )
}

export default Footer