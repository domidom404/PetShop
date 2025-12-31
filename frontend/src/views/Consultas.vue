<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Consultas</h1>

    <!-- FORMULÁRIO -->
    <form @submit.prevent="cadastrar" class="space-y-3 mb-6">
      <input v-model="id_pet" placeholder="ID do Pet" class="input" />
      <input v-model="data_consulta" type="datetime-local" class="input" />
      <input v-model="descricao" placeholder="Descrição" class="input" />

      <button type="submit" class="btn">Salvar Consulta</button>
    </form>

    <!-- LISTAGEM -->
    <ul class="space-y-2">
      <li v-for="c in consultas" :key="c.id_consulta" class="border p-3 rounded flex justify-between">
        <div>
          <strong>Pet:</strong> {{ c.id_pet }} —
          <strong>Data:</strong> {{ c.data_consulta }} <br />
          {{ c.descricao }}
        </div>

        <button @click="apagar(c.id_consulta)" class="btn-delete">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import consultaService from '../services/consultaService';

const consultas = ref([]);

const id_pet = ref('');
const data_consulta = ref('');
const descricao = ref('');

const load = async () => {
  consultas.value = (await consultaService.list()).data;
};

const cadastrar = async () => {
  await consultaService.create({
    id_pet: Number(id_pet.value),
    data_consulta: data_consulta.value,
    descricao: descricao.value
  });

  id_pet.value = data_consulta.value = descricao.value = '';
  load();
};

const apagar = async (id) => {
  await consultaService.delete(id);
  load();
};

onMounted(load);
</script>

<style scoped>
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
