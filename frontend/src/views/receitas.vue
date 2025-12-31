<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const idDono = ref('');
const nomePet = ref('');
const receitasEncontradas = ref<any[]>([]);
const buscaRealizada = ref(false);
const carregando = ref(false);

interface Receita {
  id: number;
  idDono: string;
  nomePet: string;
  veterinario: string;
  dataConsulta: string;
  medicamentos: string[];
  observacoes: string;
  validade: string;
}

// Simulação de dados - depois você vai buscar do banco de dados
const receitasSimuladas: Receita[] = [
  {
    id: 1,
    idDono: '123',
    nomePet: 'Rex',
    veterinario: 'Dr. João Silva',
    dataConsulta: '2025-01-15',
    medicamentos: [
      'Antibiótico Vetmax - 1 comprimido a cada 12h por 7 dias',
      'Anti-inflamatório - 1 comprimido a cada 24h por 5 dias'
    ],
    observacoes: 'Manter o animal em repouso. Retornar em 7 dias para reavaliação.',
    validade: '2025-02-15'
  },
  {
    id: 2,
    idDono: '456',
    nomePet: 'Rex',
    veterinario: 'Dra. Maria Santos',
    dataConsulta: '2024-12-20',
    medicamentos: [
      'Vermífugo Plus - Dose única',
      'Vitamina Pet - 1 comprimido ao dia por 30 dias'
    ],
    observacoes: 'Vermifugação de rotina. Próxima dose em 3 meses.',
    validade: '2025-01-20'
  },
  {
    id: 3,
    idDono: '67890',
    nomePet: 'Luna',
    veterinario: 'Dr. Pedro Costa',
    dataConsulta: '2025-01-10',
    medicamentos: [
      'Colírio Oftálmico - 2 gotas a cada 8h por 10 dias',
      'Pomada cicatrizante - Aplicar 2x ao dia'
    ],
    observacoes: 'Usar cone elizabetano para evitar que coce os olhos.',
    validade: '2025-02-10'
  },
  {
    id: 4,
    idDono: '12345',
    nomePet: 'Mel',
    veterinario: 'Dr. João Silva',
    dataConsulta: '2025-01-18',
    medicamentos: [
      'Antipulgas Total - Aplicar 1 pipeta',
      'Shampoo medicamentoso - Usar 2x por semana'
    ],
    observacoes: 'Evitar banhos por 48h após aplicação do antipulgas.',
    validade: '2025-02-18'
  }
];

const buscarReceitas = () => {
  if (!idDono.value || !nomePet.value) {
    alert('Por favor, preencha o ID do dono e o nome do pet!');
    return;
  }

  carregando.value = true;
  buscaRealizada.value = true;

  // Simulação de busca no banco de dados
  setTimeout(() => {
    receitasEncontradas.value = receitasSimuladas.filter(
      receita => 
        receita.idDono === idDono.value && 
        receita.nomePet.toLowerCase() === nomePet.value.toLowerCase()
    );
    carregando.value = false;
  }, 500);
};

const limparBusca = () => {
  idDono.value = '';
  nomePet.value = '';
  receitasEncontradas.value = [];
  buscaRealizada.value = false;
};

const imprimirReceita = (receita: Receita) => {
  alert(`Preparando impressão da receita #${receita.id}`);
  window.print();
};

const voltar = () => {
  router.push('/');
};
</script>

<template>
  <div class="receitas-container">
    <div class="header">
      <button @click="voltar" class="btn-voltar">← Voltar</button>
      <h1 class="titulo">CONSULTAR RECEITAS</h1>
      <p class="subtitulo">Digite o ID do dono e o nome do pet para acessar as receitas</p>
    </div>

    <!-- Formulário de Busca -->
    <div class="busca-box">
      <div class="inputs-row">
        <div class="input-group">
          <label class="label">ID do Dono</label>
          <input
            v-model="idDono"
            type="text"
            placeholder="Ex: 12345"
            class="input-busca"
            @keyup.enter="buscarReceitas"
          />
        </div>

        <div class="input-group">
          <label class="label">Nome do Pet</label>
          <input
            v-model="nomePet"
            type="text"
            placeholder="Ex: Rex"
            class="input-busca"
            @keyup.enter="buscarReceitas"
          />
        </div>
      </div>

      <div class="botoes-group">
        <button @click="buscarReceitas" class="btn-buscar">
          🔍 BUSCAR RECEITAS
        </button>
        <button @click="limparBusca" class="btn-limpar">
          🗑️ LIMPAR
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="carregando" class="loading">
      <div class="loading-spinner"></div>
      <p>Buscando receitas...</p>
    </div>

    <!-- Resultados -->
    <div v-else-if="buscaRealizada" class="resultados">
      <div v-if="receitasEncontradas.length > 0">
        <h2 class="resultados-titulo">
          {{ receitasEncontradas.length }} receita(s) encontrada(s) para {{ nomePet }}
        </h2>

        <div class="receitas-grid">
          <div v-for="receita in receitasEncontradas" :key="receita.id" class="receita-card">
            <div class="receita-header">
              <div>
                <h3 class="receita-pet">🐾 {{ receita.nomePet }}</h3>
                <p class="receita-vet">👨‍⚕️ {{ receita.veterinario }}</p>
              </div>
              <div class="receita-id">Receita #{{ receita.id }}</div>
            </div>

            <div class="receita-info">
              <div class="info-item">
                <strong>Data da Consulta:</strong>
                <span>{{ new Date(receita.dataConsulta).toLocaleDateString('pt-BR') }}</span>
              </div>
              <div class="info-item">
                <strong>Validade:</strong>
                <span>{{ new Date(receita.validade).toLocaleDateString('pt-BR') }}</span>
              </div>
            </div>

            <div class="medicamentos-section">
              <h4 class="section-titulo">Medicamentos Prescritos</h4>
              <ul class="medicamentos-lista">
                <li v-for="(med, index) in receita.medicamentos" :key="index">
                  {{ med }}
                </li>
              </ul>
            </div>

            <div class="observacoes-section">
              <h4 class="section-titulo">Observações</h4>
              <p class="observacoes-texto">{{ receita.observacoes }}</p>
            </div>

            <div class="receita-footer">
              <button @click="imprimirReceita(receita)" class="btn-imprimir">
             IMPRIMIR RECEITA
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="sem-resultados">
        <h2>Nenhuma receita encontrada</h2>
        <p>Não encontramos receitas para o ID <strong>{{ idDono }}</strong> e pet <strong>{{ nomePet }}</strong></p>
        <p class="dica">💡 Dica: Verifique se o ID do dono e o nome do pet estão corretos</p>
      </div>
    </div>

    <!-- Estado inicial -->
    <div v-else class="estado-inicial">
      <div class="icone-receita">📋</div>
      <h3>Pronto para consultar receitas!</h3>
      <p>Preencha os campos acima para buscar as receitas médicas do seu pet</p>
    </div>
  </div>
</template>

<style scoped>
.receitas-container {
  min-height: 100vh;
  background-color: #EBEBEB;
  padding: 2rem 1rem;
}

.header {
  max-width: 900px;
  margin: 0 auto 3rem;
}

.btn-voltar {
  background: none;
  border: none;
  color: #1E1D20;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: color 0.3s;
}

.btn-voltar:hover {
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

.busca-box {
  max-width: 900px;
  margin: 0 auto 3rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.inputs-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  color: #1E1D20;
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}

.input-busca {
  padding: 1rem;
  border: 2px solid #EBEBEB;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #1E1D20;
  background-color: #F5F5F5;
  transition: border-color 0.3s;
}

.input-busca:focus {
  outline: none;
  border-color: #A2D729;
}

.botoes-group {
  display: flex;
  gap: 1rem;
}

.btn-buscar,
.btn-limpar {
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 9999px;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-buscar {
  background-color: #A2D729;
  color: #1E1D20;
}

.btn-buscar:hover {
  background-color: #1E1D20;
  color: #A2D729;
  transform: translateY(-2px);
}

.btn-limpar {
  background-color: #909091;
  color: white;
}

.btn-limpar:hover {
  background-color: #1E1D20;
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #EBEBEB;
  border-top-color: #A2D729;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading p {
  font-size: 1.25rem;
  color: #909091;
}

.resultados {
  max-width: 1200px;
  margin: 0 auto;
}

.resultados-titulo {
  font-size: 1.75rem;
  font-weight: bold;
  color: #1E1D20;
  text-align: center;
  margin-bottom: 2rem;
}

.receitas-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.receita-card {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s;
}

.receita-card:hover {
  border-color: #A2D729;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.receita-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #EBEBEB;
}

.receita-pet {
  font-size: 1.75rem;
  font-weight: bold;
  color: #1E1D20;
  margin-bottom: 0.5rem;
}

.receita-vet {
  font-size: 1rem;
  color: #909091;
}

.receita-id {
  background-color: #A2D729;
  color: #1E1D20;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: bold;
  font-size: 0.875rem;
}

.receita-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item strong {
  color: #1E1D20;
  font-size: 0.95rem;
}

.info-item span {
  color: #909091;
  font-size: 1.125rem;
}

.medicamentos-section,
.observacoes-section {
  margin-bottom: 1.5rem;
}

.section-titulo {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1E1D20;
  margin-bottom: 1rem;
}

.medicamentos-lista {
  list-style: none;
  padding: 0;
}

.medicamentos-lista li {
  background-color: #F5F5F5;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  border-left: 4px solid #A2D729;
  color: #1E1D20;
  line-height: 1.5;
}

.observacoes-texto {
  background-color: #FFF9E6;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #D5A648;
  color: #1E1D20;
  line-height: 1.6;
}

.receita-footer {
  padding-top: 1.5rem;
  border-top: 2px solid #EBEBEB;
}

.btn-imprimir {
  width: 100%;
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

.btn-imprimir:hover {
  background-color: #1E1D20;
  color: #A2D729;
  transform: scale(1.02);
}

.sem-resultados {
  text-align: center;
  padding: 4rem 2rem;
  background-color: white;
  border-radius: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.sem-resultados h2 {
  font-size: 2rem;
  color: #1E1D20;
  margin-bottom: 1rem;
}

.sem-resultados p {
  font-size: 1.125rem;
  color: #909091;
  margin-bottom: 1rem;
}

.dica {
  background-color: #FFF9E6;
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid #A2D729;
  margin-top: 2rem;
}

.estado-inicial {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.icone-receita {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.estado-inicial h3 {
  font-size: 1.75rem;
  color: #1E1D20;
  margin-bottom: 1rem;
}

.estado-inicial p {
  font-size: 1.125rem;
  color: #909091;
}

@media (max-width: 768px) {
  .titulo {
    font-size: 2rem;
  }

  .inputs-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .botoes-group {
    flex-direction: column;
  }

  .receita-info {
    grid-template-columns: 1fr;
  }

  .receita-header {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>