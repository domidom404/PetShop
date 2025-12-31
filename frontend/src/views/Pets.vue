<template>
  <div class="p-4">
    <h1>Pets</h1>

    <form @submit.prevent="cadastrar">
      <input v-model="nome" placeholder="Nome do Pet" />
      <input v-model="idade" placeholder="Idade" />
      <input v-model="raca" placeholder="Raça" />
      <input v-model="especie" placeholder="Espécie" />

      <input v-model="id_dono" placeholder="ID do Dono" />
      <button>Salvar</button>
    </form>

    <ul>
      <li v-for="p in pets" :key="p.id_pet">
        {{ p.nome }} — {{ p.especie }} — Dono {{ p.id_dono }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import petService from '../services/petService';

const nome = ref('');
const idade = ref('');
const raca = ref('');
const especie = ref('');
const id_dono = ref('');

const pets = ref([]);

const load = async () => {
  pets.value = (await petService.list()).data;
};

const cadastrar = async () => {
  await petService.create({
    nome: nome.value,
    idade: idade.value,
    raca: raca.value,
    especie: especie.value,
    id_dono: id_dono.value
  });
  nome.value = idade.value = raca.value = especie.value = id_dono.value = '';
  load();
};

onMounted(load);
</script>
