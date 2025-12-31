<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
}

const produtos = ref<Produto[]>([
  {
    id: 1,
    nome: 'Antibiótico Vetmax',
    preco: 45.90,
    descricao: 'Antibiótico de amplo espectro para cães e gatos',
    imagem: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    nome: 'Vermífugo Plus',
    preco: 32.50,
    descricao: 'Vermífugo eficaz contra diversos parasitas',
    imagem: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    nome: 'Antipulgas Total',
    preco: 78.00,
    descricao: 'Proteção completa contra pulgas e carrapatos',
    imagem: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    nome: 'Vitamina Pet',
    preco: 54.90,
    descricao: 'Suplemento vitamínico completo',
    imagem: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    nome: 'Anti-inflamatório',
    preco: 67.80,
    descricao: 'Alívio rápido de dores e inflamações',
    imagem: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    nome: 'Colírio Oftálmico',
    preco: 39.90,
    descricao: 'Tratamento para problemas oculares',
    imagem: 'https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=400&h=400&fit=crop'
  }
]);

const voltar = () => {
  router.push('/');
};

const comprar = (produto: Produto) => {
  alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
};
</script>

<template>
  <div class="vendas-container">
    <div class="header">
      <button @click="voltar" class="btn-voltar">Voltar</button>
      <h1 class="titulo">MEDICAMENTOS</h1>
      <p class="subtitulo">Produtos de qualidade para a saúde do seu pet</p>
    </div>

    <div class="produtos-grid">
      <div v-for="produto in produtos" :key="produto.id" class="produto-card">
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
  </div>
</template>

<style scoped>
.vendas-container {
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

.titulo {
  font-size: 3rem;
  font-weight: bold;
  color: #1E1D20;
  text-align: center;
  margin-bottom: 0.5rem;
}

.subtitulo {
  font-size: 1.25rem;
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
}

.produto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-color: #A2D729;
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

@media (max-width: 768px) {
  .titulo {
    font-size: 2rem;
  }

  .produtos-grid {
    grid-template-columns: 1fr;
  }
}
</style>