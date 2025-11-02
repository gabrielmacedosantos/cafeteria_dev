// Espera o documento carregar completamente
document.addEventListener("DOMContentLoaded", function() {

    // --- Seletores ---
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-item");
    const itemModal = document.getElementById('itemModal');
    
    // Variável para guardar o estado do filtro de categoria
    let activeCategory = "todos";

    // --- Função Principal de Filtragem ---
    function filterItems() {
        const searchTerm = searchInput.value.toLowerCase(); // Termo da busca

        menuItems.forEach(item => {
            const itemCategory = item.getAttribute("data-category");
            const title = item.querySelector('.card-title').textContent.toLowerCase();
            const description = item.querySelector('.card-text').textContent.toLowerCase();

            // Condições de filtro
            const categoryMatch = (activeCategory === "todos" || activeCategory === itemCategory);
            const searchMatch = (title.includes(searchTerm) || description.includes(searchTerm));

            // Mostra ou esconde o item
            if (categoryMatch && searchMatch) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    // --- Evento: Clique nos Botões de Categoria ---
    filterButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Remove classe ativa de todos
            filterButtons.forEach(btn => {
                btn.classList.remove("btn-dark");
                btn.classList.add("btn-outline-dark");
            });
            
            // Adiciona classe ativa ao clicado
            this.classList.remove("btn-outline-dark");
            this.classList.add("btn-dark");

            // Atualiza a categoria ativa
            activeCategory = this.getAttribute("data-category");
            
            // Roda a filtragem principal
            filterItems();
        });
    });

    // --- Evento: Digitação na Barra de Busca ---
    searchInput.addEventListener("input", filterItems);


    // --- (NOVO) Evento: Abertura do Modal ---
    // Ouve o evento 'show.bs.modal', que é disparado pelo Bootstrap
    itemModal.addEventListener('show.bs.modal', function (event) {
        
        // Pega o card que disparou o modal (que foi clicado)
        const card = event.relatedTarget; 

        // Pega os dados de dentro do card
        const title = card.querySelector('.card-title').textContent;
        const shortDescription = card.querySelector('.card-text').textContent;
        const price = card.querySelector('.text-warning').textContent;
        const imgSrc = card.querySelector('.card-img-top').getAttribute('src');
        
        // Pega a descrição completa que colocamos no 'data-full-description'
        // Se não houver, usa a descrição curta como padrão
        const fullDescription = card.getAttribute('data-full-description') || shortDescription;

        // Seleciona os elementos *dentro* do modal
        const modalTitle = itemModal.querySelector('#modalTitle');
        const modalDescription = itemModal.querySelector('#modalDescription');
        const modalPrice = itemModal.querySelector('#modalPrice');
        const modalImage = itemModal.querySelector('#modalImage');

        // "Popula" o modal com os dados do card
        modalTitle.textContent = title;
        modalDescription.textContent = fullDescription;
        modalPrice.textContent = price;
        modalImage.setAttribute('src', imgSrc);
    });

});