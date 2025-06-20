// arquivo.js

document.addEventListener('DOMContentLoaded', () => {

    // 1) Filtro de produtos (para páginas de categoria)
    const categoriaSection = document.querySelector('.categoria');
    if (categoriaSection) {
        const produtos = categoriaSection.querySelectorAll('.produto');
        if (produtos.length > 0) {
            // Create filter input field
            const filtroDiv = document.createElement('div');
            filtroDiv.style.marginBottom = '30px'; // Add some space below the filter
            filtroDiv.innerHTML = `
                <label for="filtro-produto" style="display: none;">Filtrar produtos:</label>
                <input type="text" id="filtro-produto" placeholder="🔍 Digite para filtrar produtos...">
            `;
            // Insert the filter div after the H2, within the container logic
            const h2Element = categoriaSection.querySelector('h2');
            if (h2Element) {
                h2Element.after(filtroDiv);
            } else {
                categoriaSection.prepend(filtroDiv); // Fallback if H2 not found
            }

            const inputFiltro = document.getElementById('filtro-produto');
            inputFiltro.addEventListener('input', () => {
                const textoFiltro = inputFiltro.value.toLowerCase();
                produtos.forEach(produto => {
                    const descricao = produto.querySelector('p').textContent.toLowerCase();
                    if (descricao.includes(textoFiltro)) {
                        produto.style.display = 'flex'; // Use flex as defined in CSS
                    } else {
                        produto.style.display = 'none';
                    }
                });
            });
        }
    }

    // 2) Validação simples do formulário de contato
    const formContato = document.querySelector('form');
    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            const nome = formContato.querySelector('input[placeholder="Nome"]').value.trim();
            const email = formContato.querySelector('input[type="email"]').value.trim();
            const mensagem = formContato.querySelector('textarea').value.trim();

            if (!nome || !email || !mensagem) {
                alert('Por favor, preencha todos os campos (Nome, Email e Mensagem) para enviar.');
                return;
            }

            // Basic email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
            formContato.reset(); // Clear the form
        });
    }

    // 3) Botão "Voltar ao Topo"
    const botaoTopo = document.createElement('button');
    botaoTopo.id = 'botaoTopo'; // Assign ID for CSS styling
    botaoTopo.textContent = '↑ Topo';
    // No inline styles here, let CSS handle it.
    document.body.appendChild(botaoTopo);

    window.addEventListener('scroll', () => {
        // Show button if scrolled down more than 200px
        if (window.scrollY > 200) {
            botaoTopo.style.display = 'block';
        } else {
            botaoTopo.style.display = 'none';
        }
    });

    botaoTopo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
    });

    // 4) Animação no botão "Shop Now" (only for index.html)
    const shopNowBtn = document.querySelector('.banner button');
    if (shopNowBtn) {
        // CSS handles transitions, so remove inline transition property
        // shopNowBtn.style.transition = 'all 0.3s ease'; // Removed

        shopNowBtn.addEventListener('mouseenter', () => {
            // CSS handles these visual changes via :hover, but if you want JS control:
            // shopNowBtn.style.backgroundColor = '#0056b3';
            // shopNowBtn.style.transform = 'scale(1.1)';
            shopNowBtn.classList.add('hover-effect'); // Add a class for JS-driven animation
        });
        shopNowBtn.addEventListener('mouseleave', () => {
            // shopNowBtn.style.backgroundColor = 'blue';
            // shopNowBtn.style.transform = 'scale(1)';
            shopNowBtn.classList.remove('hover-effect'); // Remove class
        });

        // Event listener for redirection, kept separate from visual effects
        shopNowBtn.addEventListener('click', () => {
            window.location.href = 'produtos.html';
        });
    }

    // Active state for navigation links based on current page
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const currentPath = window.location.pathname.split('/').pop(); // Get current filename

    navLinks.forEach(link => {
        // Handle "index.html" specifically, as it's often the root
        if (currentPath === '' || currentPath === 'index.html') {
            if (link.getAttribute('href') === 'index.html') {
                link.classList.add('active');
            }
        } else if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});