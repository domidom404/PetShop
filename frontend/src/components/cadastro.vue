<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import cadastrarDonoCompleto from '../services/cadastroCompletoService';

const route = useRoute();
const router = useRouter();

const servico = route.query.servico as string || '';
const horario = route.query.horario as string || '';

const nomeDono = ref('');
const telefone = ref('');
const email = ref('');
const rua = ref('');
const bairro = ref('');
const cidade = ref('');
const numero = ref('');
const estadoSelecionado = ref('');
const nomePet = ref('');
const idade = ref('');
const raca = ref('');
const especieSelecionada = ref('Cachorro');

const estado = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO'
];

const especie = ['Cachorro','Gato','Pássaro','Outro'];

const voltar = () => router.push('/agendar');

const formatarTelefone = (event: Event) => {
  const input = event.target as HTMLInputElement;
  let valor = input.value.replace(/\D/g, ''); // só números
  if (valor.length > 11) valor = valor.slice(0, 11);

  if (valor.length > 6) {
    valor = `(${valor.slice(0,2)}) ${valor.slice(2,7)}-${valor.slice(7)}`;
  } else if (valor.length > 2) {
    valor = `(${valor.slice(0,2)}) ${valor.slice(2)}`;
  } else if (valor.length > 0) {
    valor = `(${valor}`;
  }

  telefone.value = valor;
};

const finalizarCadastro = async () => {
  if (!nomeDono.value || !telefone.value || !email.value || !nomePet.value) {
    alert('Por favor, preencha os campos obrigatórios!');
    return;
  }

  const payload = {
    dono: {
      nome: nomeDono.value,
      telefone: telefone.value,
      email: email.value
    },
    endereco: {
      rua: rua.value,
      bairro: bairro.value,
      cidade: cidade.value,
      numero: numero.value,
      estado: estadoSelecionado.value
    },
    pet: {
      nome: nomePet.value,
      idade: idade.value || null,
      especie: especieSelecionada.value,
      raca: raca.value
    },
    agendamento: {
      servico,
      horario
    }
  };

  try {
    await cadastroService.createAll(payload);
    router.push({ name: 'confirmacao', query: { servico, horario }});
  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar!");
  }
};
</script>


<template>
  <div class="cadastro-container">
    <div class="content">
      <button @click="voltar" class="btn-voltar">Voltar</button>
      
      <h1 class="titulo">CADASTRO</h1>
      <p class="subtitulo">Seu pet precisa ficar cheirosinho? Deixa com a gente!</p>

      <!-- Sobre o Dono -->
      <div class="secao">
        <h3 class="secao-titulo">SOBRE O DONO</h3>
        
        <input
          v-model="nomeDono"
          type="text"
          placeholder="Nome do dono *"
          class="input-full"
        />

        <div class="input-row">
           <input
            :value="telefone"
            @input="formatarTelefone"
            type="tel"
            placeholder="Número de telefone *"
            class="input-half"
            maxlength="15"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Email *"
            class="input-half"
          />
        </div>
      </div>

      <!-- Endereço -->
      <div class="secao">
        <h3 class="secao-titulo">ENDEREÇO</h3>
        
        <input
          v-model="rua"
          type="text"
          placeholder="Rua"
          class="input-full"
        />

        <input
          v-model="bairro"
          type="text"
          placeholder="Bairro"
          class="input-full"
        />

        <div class="input-row">
          <input
            v-model="cidade"
            type="text"
            placeholder="Cidade"
            class="input-third"
          />
          <input
            v-model="numero"
            type="text"
            placeholder="Número"
            class="input-third"
          />
          <select
            v-model="estado"
            class="input-third select"
          >
            <option value="" disabled selected>Estado</option>
            <option v-for="uf in estado" :key="uf" :value="uf">
              {{ uf }}
            </option>
          </select>
        </div>
      </div>

      <!-- Sobre o Pet -->
      <div class="secao">
        <h3 class="secao-titulo">SOBRE O PET</h3>
        
        <div class="input-row">
          <input
            v-model="nomePet"
            type="text"
            placeholder="Nome *"
            class="input-half"
          />
          <input
            v-model="idade"
            type="text"
            placeholder="Idade"
            class="input-half"
          />
        </div>

        <div class="input-row">
          <select
            v-model="especie"
            class="input-half select"
          >
            <option value="" disabled selected>Espécie</option>
            <option v-for="esp in especie" :key="esp" :value="esp">
              {{ esp }}
            </option>
          </select>
          <input
            v-model="raca"
            type="text"
            placeholder="Raça"
            class="input-half"
          />
        </div>
      </div>

      <!-- Botão Agendar -->
      <button @click="finalizarCadastro" class="btn-agendar">
        AGENDAR
      </button>

      <p class="nota">* Campos obrigatórios</p>
    </div>
  </div>
</template>

<style scoped>
.cadastro-container {
  min-height: 100vh;
  background-color: #EBEBEB;
  padding: 2rem 1rem;
}

.content {
  max-width: 80%;
  margin: 0 auto;
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
  font-size: 1.125rem;
  color: #909091;
  text-align: center;
  margin-bottom: 3rem;
}

.secao {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.secao-titulo {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1E1D20;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.input-full,
.input-half,
.input-third {
  padding: 1rem;
  border: 2px solid #EBEBEB;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #1E1D20;
  background-color: #F5F5F5;
  transition: border-color 0.3s;
  margin-bottom: 1rem;
}

.input-full {
  width: 100%;
}

.input-row {
  display: flex;
  gap: 1rem;
}

.input-half {
  flex: 1;
}

.input-third {
  flex: 1;
}

.input-full:focus,
.input-half:focus,
.input-third:focus {
  outline: none;
  border-color: #A2D729;
}

.input-full::placeholder,
.input-half::placeholder,
.input-third::placeholder {
  color: #909091;
}

.btn-agendar {
  width: 40%;
  padding: 1.25rem;
  background-color: #A2D729;
  color: #1E1D20;
  border: none;
  border-radius: 9999px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(162, 215, 41, 0.3);
  margin: 0 auto;
  display: block;
}

.btn-agendar:hover {
  background-color: #1E1D20;
  color: #A2D729;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(162, 215, 41, 0.4);
}

.nota {
  text-align: center;
  color: #909091;
  font-size: 0.875rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .titulo {
    font-size: 2rem;
  }

  .input-row {
    flex-direction: column;
  }

  .btn-agendar {
    width: 100%;
  }
}
</style>