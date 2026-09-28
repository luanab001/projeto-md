const STORAGE_KEYS = {
    clientes: 'sistema_clientes',
    fornecedores: 'sistema_fornecedores',
    produtos: 'sistema_produtos',
    vendas: 'sistema_vendas',
    estoque: 'sistema_estoque',
    vendedores: 'sistema_vendedores',
    usuarios: 'sistema_usuarios',
    role: 'sistema_role'
};

const defaultRecords = {
    clientes: [
        { id: 1, nome: 'Maria Souza', email: 'maria@exemplo.com', telefone: '(11) 98888-1111', cidade: 'São Paulo', status: 'Ativo' },
        { id: 2, nome: 'João Pereira', email: 'joao@exemplo.com', telefone: '(21) 97777-2222', cidade: 'Rio de Janeiro', status: 'Ativo' }
    ],
    fornecedores: [
        { id: 1, nome: 'Distribuidora Norte', contato: 'Carlos Franco', email: 'contato@distribuidoranorte.com', telefone: '(11) 3333-4444', cnpj: '12.345.678/0001-99', cidade: 'São Paulo', status: 'Ativo' },
        { id: 2, nome: 'Fornecimento Vale', contato: 'Ana Ribeiro', email: 'vendas@fornecimentovale.com', telefone: '(31) 2999-1122', cnpj: '98.765.432/0001-88', cidade: 'Belo Horizonte', status: 'Ativo' }
    ],
    produtos: [
        { id: 1, nome: 'Notebook Pro 15', categoria: 'Tecnologia', marca: 'AlphaTech', preco: '4599.90', estoque_minimo: '10', descricao: 'Notebook profissional...', imagem: 'image/produto-1.png' },
        { id: 2, nome: 'Cafeteira Premium', categoria: 'Casa', marca: 'BrewMaster', preco: '899.00', estoque_minimo: '15', descricao: 'Cafeteira com controle digital', imagem: 'image/produto-2.png' }
    ],
    vendas: [
        { id: 1, cliente: 'Maria Souza', vendedor: 'Pedro Lima', produto: 'Notebook Pro 15', quantidade: 2, valor_total: '9199.80', data_venda: '2026-08-10', status: 'Concluída' },
        { id: 2, cliente: 'João Pereira', vendedor: 'Renata Costa', produto: 'Cafeteira Premium', quantidade: 3, valor_total: '2697.00', data_venda: '2026-08-12', status: 'Concluída' }
    ],
    estoque: [
        { id: 1, produto: 'Notebook Pro 15', quantidade_entrada: 50, quantidade_saida: 12, saldo: 38, data_movimento: '2026-08-01', observacao: 'Reposição' },
        { id: 2, produto: 'Cafeteira Premium', quantidade_entrada: 30, quantidade_saida: 8, saldo: 22, data_movimento: '2026-08-05', observacao: 'Inventário' }
    ],
    vendedores: [
        { id: 1, nome: 'Pedro Lima', email: 'pedro@empresa.com', telefone: '(11) 95555-1010', comissao: '8.50', meta_mensal: '15000.00', status: 'Ativo' },
        { id: 2, nome: 'Renata Costa', email: 'renata@empresa.com', telefone: '(11) 95555-2020', comissao: '9.00', meta_mensal: '18000.00', status: 'Ativo' }
    ],
    usuarios: [
        { usuario: 'admin', senha: 'admin123', nivel: 'Administrador' },
        { usuario: 'convidado', senha: 'convidado123', nivel: 'Convidado' }
    ]
};

function initStorage() {
    localStorage.removeItem('undefined');

    Object.entries(defaultRecords).forEach(([key, items]) => {
        const storageKey = STORAGE_KEYS[key];
        if (!storageKey) return;
        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, JSON.stringify(items));
        }
    });
}

function getRecords(key) {
    const storageKey = STORAGE_KEYS[key];
    if (!storageKey) return [];

    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
}

function saveRecords(key, records) {
    const storageKey = STORAGE_KEYS[key];
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(records));
}

function getCurrentRole() {
    return localStorage.getItem(STORAGE_KEYS.role) || 'visitante';
}

function setCurrentRole(role) {
    localStorage.setItem(STORAGE_KEYS.role, role);
}

function isAdmin() {
    return getCurrentRole() === 'Administrador';
}

function renderUserRole() {
    const roleBadge = document.getElementById('userRole');
    if (!roleBadge) return;

    const role = getCurrentRole();
    if (role === 'visitante') {
        roleBadge.textContent = 'Acesso: Público';
    } else {
        roleBadge.textContent = 'Acesso: ' + role;
    }
}

function autoLogin() {
    const savedRole = getCurrentRole();
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboardSummary');
    if (savedRole !== 'visitante' && savedRole) {
        if (loginForm) loginForm.classList.add('hidden');
        if (dashboard) dashboard.classList.remove('hidden');
    }
    renderUserRole();
}

function logout() {
    setCurrentRole('visitante');
    window.location.reload();
}

function showLoginForm() {
    document.getElementById('loginForm')?.classList.remove('hidden');
    document.getElementById('registerForm')?.classList.add('hidden');
}

function showRegisterForm() {
    document.getElementById('loginForm')?.classList.add('hidden');
    document.getElementById('registerForm')?.classList.remove('hidden');
}

function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const usuario = form.usuario.value.trim();
    const senha = form.senha.value.trim();

    if (!usuario || !senha) {
        alert('Informe usuário e senha para continuar.');
        return;
    }

    const usuarios = getRecords('usuarios');
    const match = usuarios.find((user) => user.usuario === usuario && user.senha === senha);

    if (!match) {
        alert('Credenciais inválidas. Verifique o usuário e a senha.');
        return;
    }

    setCurrentRole(match.nivel);
    renderUserRole();
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboardSummary');
    if (loginForm) loginForm.classList.add('hidden');
    if (dashboard) dashboard.classList.remove('hidden');

    const status = document.getElementById('loginStatus');
    if (status) {
        status.textContent = 'Login realizado com sucesso!';
    }

    window.location.href = 'index.html';
}

function handleRegister(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const usuario = form.usuario.value.trim();
    const senha = form.senha.value;
    const usuarios = getRecords('usuarios');

    if (usuarios.some((user) => user.usuario.toLowerCase() === usuario.toLowerCase())) {
        alert('Esse usuário já existe. Escolha outro nome.');
        return;
    }

    usuarios.push({ usuario, senha, nivel: 'Convidado' });
    saveRecords('usuarios', usuarios);
    alert('Conta criada com sucesso. Agora faça login.');
    form.reset();
    showLoginForm();
    document.getElementById('usuario').value = usuario;
}

function bindDeleteActions() {
    document.querySelectorAll('[data-delete]').forEach((button) => {
        button.addEventListener('click', () => {
            if (!isAdmin()) {
                alert('Usuário convidado não pode excluir registros.');
                return;
            }

            const key = button.dataset.delete;
            const id = Number(button.dataset.id);
            const records = getRecords(key);
            const filtered = records.filter((item) => item.id !== id);
            saveRecords(key, filtered);
            location.reload();
        });
    });
}

function renderClientesTable() {
    const tableBody = document.getElementById('clientesTableBody');
    if (!tableBody) return;

    const records = getRecords('clientes');
    tableBody.innerHTML = records.map((item) => `
        <tr>
            <td>${item.nome}</td>
            <td>${item.email}</td>
            <td>${item.telefone}</td>
            <td>${item.cidade}</td>
            <td><span class="badge">${item.status}</span></td>
            <td>
                <div class="action-group">
                    <button class="btn-small btn-secondary" data-edit="clientes" data-id="${item.id}">Editar</button>
                    <button class="btn-small btn-danger" data-delete="clientes" data-id="${item.id}">Excluir</button>
                </div>
            </td>
        </tr>
    `).join('');

    bindDeleteActions();
}

function renderFornecedoresTable() {
    const tableBody = document.getElementById('fornecedoresTableBody');
    if (!tableBody) return;

    const records = getRecords('fornecedores');
    tableBody.innerHTML = records.map((item) => `
        <tr>
            <td>${item.nome}</td>
            <td>${item.contato}</td>
            <td>${item.email}</td>
            <td>${item.telefone}</td>
            <td>${item.cidade}</td>
            <td><span class="badge">${item.status}</span></td>
            <td>
                <div class="action-group">
                    <button class="btn-small btn-secondary" data-edit="fornecedores" data-id="${item.id}">Editar</button>
                    <button class="btn-small btn-danger" data-delete="fornecedores" data-id="${item.id}">Excluir</button>
                </div>
            </td>
        </tr>
    `).join('');

    bindDeleteActions();
}

function renderProdutosCards() {
    const grid = document.getElementById('produtosGrid');
    if (!grid) return;

    const records = getRecords('produtos');
    grid.innerHTML = records.map((item) => `
        <article class="product-card" aria-label="Produto ${item.nome}">
            <img src="${item.imagem || 'image/produto-1.png'}" alt="${item.nome}">
            <div class="body">
                <h3>${item.nome}</h3>
                <span class="badge">${item.categoria}</span>
                <p>Marca: ${item.marca}</p>
                <p>Preço: R$ ${Number(item.preco).toFixed(2)}</p>
                <p>Estoque mínimo: ${item.estoque_minimo}</p>
                <div class="action-group" style="margin-top: 0.8rem;">
                    <button class="btn-small btn-secondary" data-edit="produtos" data-id="${item.id}">Editar</button>
                    <button class="btn-small btn-danger" data-delete="produtos" data-id="${item.id}">Excluir</button>
                </div>
            </div>
        </article>
    `).join('');

    bindDeleteActions();
}

function renderVendasTable() {
    const tableBody = document.getElementById('vendasTableBody');
    if (!tableBody) return;

    const records = getRecords('vendas');
    tableBody.innerHTML = records.map((item) => `
        <tr>
            <td>${item.cliente}</td>
            <td>${item.vendedor}</td>
            <td>${item.produto}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${Number(item.valor_total).toFixed(2)}</td>
            <td>${item.data_venda}</td>
            <td><span class="badge">${item.status}</span></td>
            <td>
                <div class="action-group">
                    <button class="btn-small btn-secondary" data-edit="vendas" data-id="${item.id}">Editar</button>
                    <button class="btn-small btn-danger" data-delete="vendas" data-id="${item.id}">Excluir</button>
                </div>
            </td>
        </tr>
    `).join('');

    bindDeleteActions();
}

function renderEstoqueTable() {
    const tableBody = document.getElementById('estoqueTableBody');
    if (!tableBody) return;

    const records = getRecords('estoque');
    tableBody.innerHTML = records.map((item) => `
        <tr>
            <td>${item.produto}</td>
            <td>${item.quantidade_entrada}</td>
            <td>${item.quantidade_saida}</td>
            <td>${item.saldo}</td>
            <td>${item.data_movimento}</td>
            <td>${item.observacao}</td>
            <td>
                <div class="action-group">
                    <button class="btn-small btn-secondary" data-edit="estoque" data-id="${item.id}">Editar</button>
                    <button class="btn-small btn-danger" data-delete="estoque" data-id="${item.id}">Excluir</button>
                </div>
            </td>
        </tr>
    `).join('');

    bindDeleteActions();
}

function renderVendedoresTable() {
    const tableBody = document.getElementById('vendedoresTableBody');
    if (!tableBody) return;

    const records = getRecords('vendedores');
    tableBody.innerHTML = records.map((item) => `
        <tr>
            <td>${item.nome}</td>
            <td>${item.email}</td>
            <td>${item.telefone}</td>
            <td>${item.comissao}%</td>
            <td>R$ ${Number(item.meta_mensal).toFixed(2)}</td>
            <td><span class="badge">${item.status}</span></td>
            <td>
                <div class="action-group">
                    <button class="btn-small btn-secondary" data-edit="vendedores" data-id="${item.id}">Editar</button>
                    <button class="btn-small btn-danger" data-delete="vendedores" data-id="${item.id}">Excluir</button>
                </div>
            </td>
        </tr>
    `).join('');

    bindDeleteActions();
}

function bindForms() {
    const clientForm = document.getElementById('cadastroClienteForm');
    if (clientForm) {
        clientForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(clientForm);
            const records = getRecords('clientes');
            const nextId = records.length ? Math.max(...records.map((item) => Number(item.id))) + 1 : 1;
            records.push({
                id: nextId,
                nome: formData.get('nome'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                cidade: formData.get('cidade'),
                status: formData.get('status') || 'Ativo'
            });
            saveRecords('clientes', records);
            clientForm.reset();
            renderClientesTable();
        });
    }

    const supplierForm = document.getElementById('cadastroFornecedorForm');
    if (supplierForm) {
        supplierForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(supplierForm);
            const records = getRecords('fornecedores');
            const nextId = records.length ? Math.max(...records.map((item) => Number(item.id))) + 1 : 1;
            records.push({
                id: nextId,
                nome: formData.get('nome'),
                contato: formData.get('contato'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                cnpj: formData.get('cnpj'),
                cidade: formData.get('cidade'),
                status: formData.get('status') || 'Ativo'
            });
            saveRecords('fornecedores', records);
            supplierForm.reset();
            renderFornecedoresTable();
        });
    }

    const productForm = document.getElementById('cadastroProdutoForm');
    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(productForm);
            const records = getRecords('produtos');
            const nextId = records.length ? Math.max(...records.map((item) => Number(item.id))) + 1 : 1;
            records.push({
                id: nextId,
                nome: formData.get('nome'),
                categoria: formData.get('categoria'),
                marca: formData.get('marca'),
                preco: formData.get('preco'),
                estoque_minimo: formData.get('estoque_minimo'),
                descricao: formData.get('descricao'),
                imagem: formData.get('imagem') || 'image/produto-1.png'
            });
            saveRecords('produtos', records);
            productForm.reset();
            renderProdutosCards();
        });
    }

    const saleForm = document.getElementById('cadastroVendaForm');
    if (saleForm) {
        saleForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(saleForm);
            const records = getRecords('vendas');
            const nextId = records.length ? Math.max(...records.map((item) => Number(item.id))) + 1 : 1;
            records.push({
                id: nextId,
                cliente: formData.get('cliente'),
                vendedor: formData.get('vendedor'),
                produto: formData.get('produto'),
                quantidade: formData.get('quantidade'),
                valor_total: formData.get('valor_total'),
                data_venda: formData.get('data_venda'),
                status: formData.get('status') || 'Concluída'
            });
            saveRecords('vendas', records);
            saleForm.reset();
            renderVendasTable();
        });
    }

    const stockForm = document.getElementById('cadastroEstoqueForm');
    if (stockForm) {
        stockForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(stockForm);
            const records = getRecords('estoque');
            const nextId = records.length ? Math.max(...records.map((item) => Number(item.id))) + 1 : 1;
            records.push({
                id: nextId,
                produto: formData.get('produto'),
                quantidade_entrada: formData.get('quantidade_entrada'),
                quantidade_saida: formData.get('quantidade_saida'),
                saldo: formData.get('saldo'),
                data_movimento: formData.get('data_movimento'),
                observacao: formData.get('observacao')
            });
            saveRecords('estoque', records);
            stockForm.reset();
            renderEstoqueTable();
        });
    }

    const sellerForm = document.getElementById('cadastroVendedorForm');
    if (sellerForm) {
        sellerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(sellerForm);
            const records = getRecords('vendedores');
            const nextId = records.length ? Math.max(...records.map((item) => Number(item.id))) + 1 : 1;
            records.push({
                id: nextId,
                nome: formData.get('nome'),
                email: formData.get('email'),
                telefone: formData.get('telefone'),
                comissao: formData.get('comissao'),
                meta_mensal: formData.get('meta_mensal'),
                status: formData.get('status') || 'Ativo'
            });
            saveRecords('vendedores', records);
            sellerForm.reset();
            renderVendedoresTable();
        });
    }
}

function renderDashboardMetrics() {
    const clients = getRecords('clientes');
    const suppliers = getRecords('fornecedores');
    const products = getRecords('produtos');
    const sales = getRecords('vendas');

    const totalClientCount = document.getElementById('totalClients');
    const totalSupplierCount = document.getElementById('totalSuppliers');
    const totalProductCount = document.getElementById('totalProducts');
    const totalSalesValue = document.getElementById('totalSales');

    if (totalClientCount) totalClientCount.textContent = clients.length;
    if (totalSupplierCount) totalSupplierCount.textContent = suppliers.length;
    if (totalProductCount) totalProductCount.textContent = products.length;
    if (totalSalesValue) {
        const sum = sales.reduce((acc, sale) => acc + Number(sale.valor_total || 0), 0);
        totalSalesValue.textContent = 'R$ ' + sum.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

function renderSalesChart() {
    const chart = document.getElementById('salesChart');
    if (!chart) return;

    const data = [12500, 18120, 14300, 24540, 23250, 27640];
    chart.innerHTML = data.map((value, index) => `
        <div class="chart-bar">
            <div class="value" style="height:${(value / 30000) * 100}%">R$ ${value.toLocaleString('pt-BR')}</div>
            <span>${['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'][index]}</span>
        </div>
    `).join('');
}

function enforcePermissions() {
    const role = getCurrentRole();
    const destructiveButtons = document.querySelectorAll('[data-delete]');
    destructiveButtons.forEach((button) => {
        if (role !== 'Administrador') {
            button.disabled = true;
            button.title = 'Acesso restrito ao administrador';
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    initStorage();
    renderUserRole();
    autoLogin();
    enforcePermissions();
    renderDashboardMetrics();
    renderSalesChart();

    renderClientesTable();
    renderFornecedoresTable();
    renderProdutosCards();
    renderVendasTable();
    renderEstoqueTable();
    renderVendedoresTable();
    bindForms();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    document.getElementById('showRegister')?.addEventListener('click', showRegisterForm);
    document.getElementById('showLogin')?.addEventListener('click', showLoginForm);
    document.getElementById('logoutButton')?.addEventListener('click', logout);
    document.getElementById('userRole')?.addEventListener('click', () => {
        if (getCurrentRole() !== 'visitante') logout();
    });
});
