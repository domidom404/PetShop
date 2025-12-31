<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const servicoSelecionado = ref('');
const horarioSelecionado = ref('');

const servicos = ['BANHO', 'VACINA', 'CONSULTA'];

// Simulação de verificação de cadastro (depois você vai conectar com backend)
const usuarioCadastrado = ref(false); // Mude para true para testar usuário cadastrado

const confirmarAgendamento = () => {
  if (!servicoSelecionado.value || !horarioSelecionado.value) {
    alert('Por favor, selecione o serviço e o horário!');
    return;
  }

  if (usuarioCadastrado.value) {
    // Usuário cadastrado - vai para confirmação
    router.push({
      name: 'confirmacao',
      query: {
        servico: servicoSelecionado.value,
        horario: horarioSelecionado.value
      }
    });
  } else {
    // Usuário não cadastrado - vai para cadastro
    router.push({
      name: 'cadastro',
      query: {
        servico: servicoSelecionado.value,
        horario: horarioSelecionado.value
      }
    });
  }
};

const voltar = () => {
  router.push('/');
};
</script>

<template>
  <div class="agendar-container">
    <div class="content">
      <button @click="voltar" class="btn-voltar">Voltar</button>
      
      <h1 class="titulo">AGENDAR</h1>
      <p class="subtitulo">Selecione o serviço que deseja contratar:</p>

      <!-- Seleção de Serviço -->
      <div class="box">
        <h3 class="box-titulo">Serviço</h3>
        <div class="opcoes">
          <button
            v-for="servico in servicos"
            :key="servico"
            :class="['opcao-btn', { 'ativo': servicoSelecionado === servico }]"
            @click="servicoSelecionado = servico"
          >
            {{ servico }}
          </button>
        </div>
      </div>

      <!-- Seleção de Horário -->
      <div class="box">
        <h3 class="box-titulo">Horário</h3>
        <input
          v-model="horarioSelecionado"
          type="datetime-local"
          class="horario-input"
          placeholder="Selecione data e horário"
        />
      </div>

      <!-- Botão Confirmar -->
      <button @click="confirmarAgendamento" class="btn-agendar">
        AGENDAR
      </button>
    </div>
  </div>
</template>

<style scoped>
.agendar-container {
  min-height: 100vh;
  background-color: #EBEBEB;
  padding: 1rem;
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
  margin-bottom: 1rem;
}

.subtitulo {
  font-size: 1.25rem;
  color: #4a4a4a;
  text-align: center;
  margin-bottom: 3rem;
}

.box {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.box-titulo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1E1D20;
  margin-bottom: 1.5rem;
}

.opcoes {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.opcao-btn {
  flex: 1;
  min-width: 120px;
  padding: 1rem;
  background-color: #EBEBEB;
  color: #1E1D20;
  border: 2px solid transparent;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.opcao-btn:hover {
  border-color: #A2D729;
}

.opcao-btn.ativo {
  background-color: #A2D729;
  color: #1E1D20;
  border-color: #A2D729;
}

.horario-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #EBEBEB;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #1E1D20;
  background-color: #EBEBEB;
  transition: border-color 0.3s;
}

.horario-input:focus {
  outline: none;
  border-color: #A2D729;
}

.btn-agendar {
  width: 40%;
  padding: 1rem;
  margin-bottom: 2rem;
  background-color: #A2D729;
  color: #1E1D20;
  border: none;
  border-radius: 9999px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
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

@media (max-width: 768px) {
  .titulo {
    font-size: 2rem;
  }

  .opcoes {
    flex-direction: column;
  }

  .opcao-btn {
    min-width: 100%;
  }
}
</style>