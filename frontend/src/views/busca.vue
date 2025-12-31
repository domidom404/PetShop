<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const termoBusca = ref((route.query.q as string) || '');

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  categoria: string;
  imagem: string;
}

// Simulação de produtos - depois você vai buscar do banco de dados
const todosProdutos: Produto[] = [
  // Medicamentos
  {
    id: 1,
    nome: 'Antibiótico Vetmax',
    preco: 45.90,
    descricao: 'Antibiótico de amplo espectro para cães e gatos',
    categoria: 'Medicamentos',
    imagem: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    nome: 'Vermífugo Plus',
    preco: 32.50,
    descricao: 'Vermífugo eficaz contra diversos parasitas',
    categoria: 'Medicamentos',
    imagem: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&h=400&fit=crop'
  },
  // Vacinas
  {
    id: 3,
    nome: 'Vacina V10',
    preco: 120.00,
    descricao: 'Proteção contra 10 doenças virais e bacterianas',
    categoria: 'Vacinas',
    imagem: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    nome: 'Vacina Antirrábica',
    preco: 80.00,
    descricao: 'Proteção essencial contra a raiva',
    categoria: 'Vacinas',
    imagem: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400&h=400&fit=crop'
  },
  // Outros
  {
    id: 5,
    nome: 'Ração Premium 15kg',
    preco: 189.90,
    descricao: 'Ração balanceada para cães adultos',
    categoria: 'Outros',
    imagem: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    nome: 'Coleira Personalizada',
    preco: 45.00,
    descricao: 'Coleira resistente com nome bordado',
    categoria: 'Outros',
    imagem: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop'
  }
];

// Filtrar produtos baseado no termo de busca
const produtosFiltrados = computed(() => {
  if (!termoBusca.value.trim()) {
    return todosProdutos;
  }
  
  const termo = termoBusca.value.toLowerCase();
  return todosProdutos.filter(produto => 
    produto.nome.toLowerCase().includes(termo) ||
    produto.descricao.toLowerCase().includes(termo) ||
    produto.categoria.toLowerCase().includes(termo)
  );
});

const buscar = () => {
  router.push({ name: 'busca', query: { q: termoBusca.value } });
};

const voltar = () => {
  router.push('/');
};

const comprar = (produto: Produto) => {
  alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
};
</script>

<template>
  <div class="busca-container">
    <div class="header">
      <button @click="voltar" class="btn-voltar">Voltar</button>
      
      <div class="busca-box">
        <input
          v-model="termoBusca"
          @keyup.enter="buscar"
          type="text"
          placeholder="Buscar produtos..."
          class="busca-input"
        />
        <button @click="buscar" class="btn-buscar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
      
      <h1 class="titulo">RESULTADOS DA BUSCA</h1>
      <p class="subtitulo" v-if="termoBusca">
        {{ produtosFiltrados.length }} resultado(s) para "{{ termoBusca }}"
      </p>
      <p class="subtitulo" v-else>Todos os produtos</p>
    </div>

    <div v-if="produtosFiltrados.length > 0" class="produtos-grid">
      <div v-for="produto in produtosFiltrados" :key="produto.id" class="produto-card">
        <div class="produto-categoria">{{ produto.categoria }}</div>
        <div class="produto-imagem">
          <img :src="produto.imagem" :alt="produto.nome" />
        </div>
        <div class="produto-info">
          <h3 class="produto-nome">{{ produto.nome }}</h3>
          <p class="produto-descricao">{{ produto.descricao }}</p>
          <div class="produto-footer">
            <span class="produto-preco">R$ {{ produto.preco.toFixed(2) }}</span>
            <button @click="comprar(produto)" class="btn-comprar">COMPRAR</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="sem-resultados">
      <p>Nenhum produto encontrado</p>
      <p>Tente buscar por outro termo</p>
    </div>
  </div>
</template>

<style scoped>
.busca-container {
  min-height: 100vh;
  background-color: #EBEBEB;
  padding: 2rem 1rem;
}

.header {
  max-width: 1200px;
  margin: 0 auto 3rem;
}

.btn-voltar {
   background: #A2D729;
  border: 1rem;
  color: #1E1D20;
  padding: 10px;
  border-radius: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: color 0.3s;
}

.btn-voltar:hover {
   background-color: #1E1D20;
  color: #A2D729;
}

.busca-box {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.busca-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #909091;
  border-radius: 9999px;
  font-size: 1.125rem;
  color: #1E1D20;
  background-color: white;
  transition: border-color 0.3s;
}

.busca-input:focus {
  outline: none;
  border-color: #A2D729;
}

.btn-buscar {
  padding: 1rem 1.5rem;
  background-color: #A2D729;
  color: #1E1D20;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-buscar:hover {
  background-color: #1E1D20;
  color: #A2D729;
}

.titulo {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1E1D20;
  text-align: center;
  margin-bottom: 0.5rem;
}

.subtitulo {
  font-size: 1.125rem;
  color: #909091;
  text-align: center;
}

.produtos-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.produto-card {
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  border: 2px solid transparent;
  position: relative;
}

.produto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-color: #A2D729;
}

.produto-categoria {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #A2D729;
  color: #1E1D20;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 10;
}

.produto-imagem {
  width: 100%;
  height: 250px;
  overflow: hidden;
  background-color: #F5F5F5;
}

.produto-imagem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.produto-card:hover .produto-imagem img {
  transform: scale(1.05);
}

.produto-info {
  padding: 1.5rem;
}

.produto-nome {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1E1D20;
  margin-bottom: 0.5rem;
}

.produto-descricao {
  color: #909091;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.produto-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.produto-preco {
  font-size: 1.75rem;
  font-weight: bold;
  color: #A2D729;
}

.btn-comprar {
  padding: 0.75rem 1.5rem;
  background-color: #A2D729;
  color: #1E1D20;
  border: none;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-comprar:hover {
  background-color: #1E1D20;
  color: #A2D729;
  transform: scale(1.05);
}

.sem-resultados {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.sem-resultados p {
  font-size: 1.25rem;
  color: #909091;
}

@media (max-width: 768px) {
  .titulo {
    font-size: 2rem;
  }

  .produtos-grid {
    grid-template-columns: 1fr;
  }

  .busca-box {
    flex-direction: column;
  }
}
</style>