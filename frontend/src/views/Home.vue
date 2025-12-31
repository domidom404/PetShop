<script setup lang="ts">
import { ref } from 'vue';
import Card from '../components/Card.vue';
import { useRouter } from 'vue-router';

const menuOpen = ref(false);
const activeDropdown = ref<number | null>(null);
const router = useRouter();

const scrollToServices = () => {
  const element = document.getElementById('servicos');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const setActiveDropdown = (index: number | null) => {
  activeDropdown.value = index;
};

const buscarProduto = () => {
    const inputBusca = document.querySelector('.search-input') as HTMLInputElement;
    if (inputBusca && inputBusca.value.trim()){
      router.push({ name: 'busca', query: { q: inputBusca.value}});
    }
  };

const toggleDropdown = (index: number) => {
  activeDropdown.value = activeDropdown.value === index ? null : index;
};

interface MenuItem {
  title: string;
  items: string[];
};

const menuItems: MenuItem[] = [
  { title: 'MEDICAMENTOS', items: [] },
 // { title: 'VACINAS', items: [] },
  { title: 'RECEITAS', items: [] },
  { title: 'OUTROS', items: [] }
];

const services = [
  {
    title: 'BANHO',
    description: 'Seu pet precisa ficar cheirosinho? Conte conosco para um banho caprichado, secagem segura e aquele toque especial que faz toda a diferença ',
    image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=400&fit=crop'
  },
  {
    title: 'VACINAS',
    description: 'Vacinação em dia é sinônimo de saúde! Proteja seu pet contra doenças e garanta mais bem-estar. Agende a vacina hoje mesmo!',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
    bgColor: 'bg-gold'
  },
  {
    title: 'CONSULTAS',
    description: 'Seu pet merece cuidado de verdade! Agende uma consulta e conte com nossa equipe para manter seu amigo sempre saudável.',
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400&h=400&fit=crop'
  }
];

const irParaPagina = (titulo: string) => {
  switch(titulo) {
    case 'MEDICAMENTOS':
      router.push('/medicamentos');
      break;
    case 'VACINAS':
      router.push('/vacinas');
      break;
    case 'RECEITAS':
      router.push('/receitas');
      break;
    case 'OUTROS':
      router.push('/outros');
      break;
    default:
      console.warn(`Rota não encontrada para: ${titulo}`);
  }
};

</script>

<template>
  <div class="petshop-container">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <h1 class="logo">PETSHOPER</h1>
        
        <div class="search-wrapper">
          <div class="search-box">
  <input
    type="text"
    placeholder="Buscar produtos..."
    class="search-input"
    @keyup.enter="buscarProduto"
  />
  <button @click="buscarProduto" class="search-icon-btn">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  </button>
</div>
        </div>

        <button @click="toggleMenu" class="menu-toggle lg:hidden">
          <svg v-if="!menuOpen" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Navigation Desktop -->
      <nav class="nav-desktop">
        <ul class="nav-list">
          <li 
            v-for="(item, index) in menuItems" 
            :key="index"
            class="nav-item"
            @mouseenter="setActiveDropdown(index)"
            @mouseleave="setActiveDropdown(null)"
          >
            <button @click="irParaPagina(item.title)" class="nav-button">
             {{ item.title }}
            </button>
            
            <div v-if="activeDropdown === index" class="dropdown">
              <a
                v-for="(subItem, subIndex) in item.items"
                :key="subIndex"
                href="#"
                class="dropdown-item"
              >
                {{ subItem }}
              </a>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Mobile Menu -->
      <nav v-if="menuOpen" class="nav-mobile">
        <ul class="nav-mobile-list">
          <li v-for="(item, index) in menuItems" :key="index" class="nav-mobile-item">
           <button @click="irParaPagina(item.title)" class="nav-button">
             {{ item.title }}
           </button>
            
            <div v-if="activeDropdown === index" class="mobile-dropdown">
              <a
                v-for="(subItem, subIndex) in item.items"
                :key="subIndex"
                href="#"
                class="mobile-dropdown-item"
              >
                {{ subItem }}
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop"
            alt="Mulher segurando cachorro"
            class="hero-image"
          />
        </div>
        
        <div class="hero-text">
          <h2 class="hero-title">
            A SAÚDE DO SEU <br />
            <span class="hero-highlight">PET</span> ESTÁ EM <br />
            NOSSOS <span class="hero-highlight">PLANOS</span>
          </h2>
          
          <button @click="scrollToServices" class="hero-button">
            CONFIRA 
          </button>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="servicos" class="services">
      <div class="services-container">
        <h2 class="services-title">Serviços petshop</h2>
        
        <div class="services-grid">
  <Card
    v-for="(service, index) in services"
    :key="index"
    :title="service.title"
    :description="service.description"
    :image="service.image"
    :bgColor="service.bgColor"
  />
</div>


      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p class="footer-text">© 2025 PetShoper - Todos os direitos reservados</p>
    </footer>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.petshop-container {
  min-height: 100vh;
  background-color: #EBEBEB;
}

/* Header Styles */
.header {
  background-color: #1E1D20;
  color: white;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.875rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  color: #A2D729;
  padding-left: 1rem;
}

.search-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  max-width: 20rem;
  margin: 0 2rem;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 0.5rem 3rem 0.5rem 1rem;
  border-radius: 9999px;
  border: none;
  color: #1E1D20;
  font-size: 1rem;
  background-color: #EBEBEB;
}

.search-input::placeholder {
  color: #909091;
}

.search-icon-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;
}

.search-icon-btn:hover {
  transform: translateY(-50%) scale(1.1);
}

.search-icon {
  color: #909091;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  padding-right: 1rem;
}

@media (max-width: 1024px) {
  .menu-toggle {
    display: block;
  }
}

/* Navigation Desktop */
.nav-desktop {
  background-color: #EBEBEB;
  border-top: 1px solid #909091;
}

.nav-list {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 1rem 0;
}

.nav-item {
  position: relative;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1E1D20;
  font-weight: 600;
  font-size: 1.125rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s;
}

.nav-button:hover {
  color: #909091;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background-color: #EBEBEB;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  min-width: 12rem;
}

.dropdown-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #1E1D20;
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #EBEBEB;
}

@media (max-width: 1024px) {
  .nav-desktop {
    display: none;
  }
}

/* Mobile Navigation */
.nav-mobile {
  background-color: #EBEBEB;
  border-top: 1px solid #909091;
}

.nav-mobile-list {
  list-style: none;
  padding: 1rem 0;
}

.nav-mobile-item {
  border-bottom: 1px solid #909091;
}

.nav-mobile-button {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  color: #1E1D20;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
}

/* Mobile Dropdown */
.mobile-dropdown {
  background-color: #EBEBEB;
  padding: 0.5rem 0;
}

.mobile-dropdown-item {
  display: block;
  padding: 0.75rem 2rem;
  color: #1E1D20;
  text-decoration: none;
  transition: background-color 0.3s;
}

.mobile-dropdown-item:hover {
  background-color: #EBEBEB;
}

/* Utility class para esconder em desktop */
.lg\:hidden {
  display: block;
}

@media (min-width: 1024px) {
  .lg\:hidden {
    display: none;
  }
}

/* Hero Section */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #EBEBEB;
}

.hero-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
  }
}

.hero-image-wrapper {
  display: flex;
  justify-content: center;
}

.hero-image {
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
  max-width: 28rem;
  width: 100%;
  object-fit: cover;
}

.hero-text {
  text-align: center;
  padding: 0 1rem;
}

@media (min-width: 1024px) {
  .hero-text {
    text-align: left;
  }
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  line-height: 1.2;
  color: #1E1D20;
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 3.75rem;
  }
}

.hero-highlight {
  color: #909091;
}

.hero-button {
  background-color: #A2D729;
  color: #1E1D20;
  padding: 1rem 3rem;
  border-radius: 9999px;
  font-size: 1.25rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 auto;
  display: block;
}

.hero-button:hover {
  background-color: #1E1D20;
  color: #A2D729;
  transform: translateY(-2px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
}

/* Services Section */
.services {
  padding: 5rem 0;
  background-color: #EBEBEB;
}

.services-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.services-title {
  font-size: 2.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4rem;
  color: #1E1D20;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 72rem;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}


.image-wrapper {
  width: 12rem;
  height: 12rem;
  margin: 0 auto 1.5rem;
  border-radius: 9999px;
  overflow: hidden;
  border: 3px solid #A2D729;
}

/* Footer */
.footer {
  background-color: #1E1D20;
  color: #A2D729;
  padding: 2rem;
  text-align: center;
}

.footer-text {
  font-size: 1.125rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .search-wrapper {
    margin: 0 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .services-title {
    font-size: 1.875rem;
  }
}
</style>