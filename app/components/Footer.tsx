export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 py-6 text-center text-sm text-black dark:text-white sm:text-lg">
      Copyright &copy;  {currentYear} Henrique Antony . Todos os direitos reservados.
    </footer>
  );
};
