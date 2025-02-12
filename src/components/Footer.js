import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white text-center py-3">
       <p>&copy; {currentYear} inovarthe. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;