import React from 'react';
const Footer = () => {
    return (
        <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#282c34', color: 'white', position: 'fixed', bottom: 0, width: '100%' }}>
            © {new Date().getFullYear()} My Cloud. Все права защищены.
        </footer>
    );
};
export default Footer;