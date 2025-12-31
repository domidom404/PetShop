<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const servico = route.query.servico;
const horario = route.query.horario;

const voltar = () => {
  router.push('/');
};
</script>

<template>
  <div class="confirmacao-container">
    <div class="content">
      <h1 class="titulo"> AGENDAMENTO CONFIRMADO!</h1>
      <div class="info-box">
        <p><strong>Serviço:</strong> {{ servico }}</p>
        <p><strong>Horário:</strong> {{ new Date(horario as string).toLocaleString('pt-BR') }}</p>
      </div>
      <button @click="voltar" class="btn-voltar">Voltar para Início</button>
    </div>
  </div>
</template>

<style scoped>
.confirmacao-container {
  min-height: 100vh;
  background-color: #EBEBEB;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.content {
  max-width: 500px;
  text-align: center;
}

.titulo {
  font-size: 2.5rem;
  font-weight: bold;
  color: #A2D729;
  margin-bottom: 2rem;
}

.info-box {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.info-box p {
  font-size: 1.25rem;
  color: #1E1D20;
  margin-bottom: 1rem;
}

.btn-voltar {
  padding: 1rem 2rem;
  background-color: #A2D729;
  color: #1E1D20;
  border: none;
  border-radius: 9999px;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-voltar:hover {
  background-color: #1E1D20;
  color: #A2D729;
}
</style>