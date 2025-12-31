<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Vendas</h1>

    <!-- FORM -->
    <form @submit.prevent="cadastrar" class="space-y-3 mb-6">
      <input v-model="id_dono" placeholder="ID do Dono" class="input" />
      <input v-model="id_produto" placeholder="ID do Produto" class="input" />
      <input v-model="quantidade" type="number" placeholder="Quantidade" class="input" />

      <button type="submit" class="btn">Registrar Venda</button>
    </form>

    <!-- LISTA -->
    <ul class="space-y-2">
      <li v-for="v in vendas" :key="v.id_venda" class="border p-3 rounded flex justify-between">
        <div>
          <strong>ID Dono:</strong> {{ v.id_dono }} <br />
          <strong>ID Produto:</strong> {{ v.id_produto }}  
          <br />
          <strong>Qtd:</strong> {{ v.quantidade }}  
        </div>

        <button @click="apagar(v.id_venda)" class="btn-delete">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import vendaService from '../services/vendaService';

const vendas = ref([]);

const id_dono = ref('');
const id_produto = ref('');
const quantidade = ref('');

const load = async () => {
  vendas.value = (await vendaService.list()).data;
};

const cadastrar = async () => {
  await vendaService.create({
    id_dono: Number(id_dono.value),
    id_produto: Number(id_produto.value),
    quantidade: Number(quantidade.value)
  });

  id_dono.value = id_produto.value = quantidade.value = '';
  load();
};

const apagar = async (id) => {
  await vendaService.delete(id);
  load();
};

onMounted(load);
</script>

<style>
.input {
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  border-radius: 0.375rem;
  width: 100%;
  box-sizing: border-box;
}
.btn {
  background: #2563eb;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}
.btn-delete {
  background: #dc2626;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}

</style>
