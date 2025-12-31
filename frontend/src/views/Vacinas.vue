 <template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Vacinas</h1>

    <!-- FORM -->
    <form @submit.prevent="cadastrar" class="space-y-3 mb-6">
      <input v-model="nome" placeholder="Nome da Vacina" class="input" />
      <input v-model="fabricante" placeholder="Fabricante" class="input" />
      <input v-model="validade" type="date" class="input" />

      <button type="submit" class="btn">Salvar</button>
    </form>

    <!-- LISTA -->
    <ul class="space-y-2">
      <li v-for="v in vacinas" :key="v.id_vacina" class="border p-3 rounded flex justify-between">
        <div>
          <strong>{{ v.nome }}</strong> — {{ v.fabricante }}  
          <br />
          <strong>Validade:</strong> {{ v.validade }}
        </div>

        <button @click="apagar(v.id_vacina)" class="btn-delete">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import vacinaService from '../services/vacinaService';

const vacinas = ref([]);

const nome = ref('');
const fabricante = ref('');
const validade = ref('');

const load = async () => {
  vacinas.value = (await vacinaService.list()).data;
};

const cadastrar = async () => {
  await vacinaService.create({
    nome: nome.value,
    fabricante: fabricante.value,
    validade: validade.value
  });

  nome.value = fabricante.value = validade.value = '';
  load();
};

const apagar = async (id) => {
  await vacinaService.delete(id);
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
