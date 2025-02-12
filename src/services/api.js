export const fetchProducts = async () => {
    const cachedData = localStorage.getItem('randomProducts');
    const lastFetch = localStorage.getItem('lastFetch');

    const oneDay = 24 * 60 * 60 * 1000; 
    const now = new Date().getTime();

    if (cachedData && lastFetch && now - lastFetch < oneDay) {
        return JSON.parse(cachedData);
    } else {
        const response = await fetch('https://api.minhaxbz.com.br:5001/api/clientes/GetListaDeProdutos?cnpj=11459673000120&token=X43B18FE62');
        const data = await response.json();

        // Função para pegar 300 itens aleatórios
        const getRandomItems = (arr, num) => {
            const shuffled = arr.sort(() => 0.5 - Math.random());
            return shuffled.slice(0, num);
        };

        const randomProducts = getRandomItems(data, 300);
        
        // Armazenar apenas 300 itens aleatórios
        localStorage.setItem('randomProducts', JSON.stringify(randomProducts));
        localStorage.setItem('lastFetch', now);

        return randomProducts;
    }
};