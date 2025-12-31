<template>
  <div class="p-4">
    <h1>Produtos</h1>

    <form @submit.prevent="cadastrar">
      <input v-model="nome" placeholder="Nome do Produto" />
      <input v-model="preco" placeholder="Preço" type="number" />
      <input v-model="estoque" placeholder="Estoque" type="number" />
      <button>Salvar</button>
    </form>

    <ul>
      <li v-for="p in produtos" :key="p.id_produto">
        {{ p.nome }} — R$ {{ p.preco }} — estoque: {{ p.estoque }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import produtoService from '../services/produtoService';

const nome = ref('');
const preco = ref('');
const estoque = ref('');
const produtos = ref([]);

const load = async () => {
  produtos.value = (await produtoService.list()).data;
};

const cadastrar = async () => {
  await produtoService.create({
    nome: nome.value,
    preco: preco.value,
    estoque: estoque.value
  });
  nome.value = preco.value = estoque.value = '';
  load();
};

onMounted(load);
</script>
