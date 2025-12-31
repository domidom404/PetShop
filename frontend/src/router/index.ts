import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Medicamentos from '../views/Medicamentos.vue';
import Vacinas from '../views/Vacinas.vue';
import Outros from '../views/Outros.vue';
import Agendar from '../components/Agendar.vue';
import confirmacao from '../components/confirmacao.vue';
import cadastro from '../components/cadastro.vue';
import busca from '../views/busca.vue';
import receitas from '../views/receitas.vue';




const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/agendar',
    name: 'agendar',
    component: Agendar
  },
  {
    path: '/confirmacao',
    name: 'confirmacao',
    component: confirmacao
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: cadastro
  },
  {
    path: '/medicamentos',
    name: 'medicamentos',
    component: Medicamentos
  },
  {
    path: '/vacinas',
    name: 'vacinas',
    component: Vacinas
  },
  {
    path: '/outros',
    name: 'outros',
    component: Outros
  },
  {
    path: '/busca',
    name: 'busca',
    component: busca
  },
  {
    path: '/receitas',
    name: 'receitas',
    component: receitas
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;