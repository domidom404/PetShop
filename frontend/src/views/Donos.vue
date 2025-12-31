<template>
  <div>
    <h1>Donos</h1>
    <form @submit.prevent="cadastrar">
      <input v-model="nome" placeholder="Nome" />
      <input v-model="telefone" placeholder="Telefone" />
      <input v-model="email" placeholder="Email" />
      <button type="submit">Salvar</button>
    </form>

    <ul>
      <li v-for="d in donos" :key="d.id_dono">
        {{ d.nome }} — {{ d.telefone }} — {{ d.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import donoService from '../services/donoService';

const nome = ref('');
const telefone = ref('');
const email = ref('');
const donos = ref([]);

const load = async () => {
  try {
    const r = await donoService.list();
    donos.value = r.data;
  } catch (err) { console.error(err); }
};

const cadastrar = async () => {
  try {
    await donoService.create({ nome: nome.value, telefone: telefone.value, email: email.value });
    nome.value = telefone.value = email.value = '';
    await load();
  } catch (err) { console.error(err); }
};

onMounted(load);
</script>
