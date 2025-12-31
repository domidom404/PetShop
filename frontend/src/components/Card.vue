<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Props {
  title: string;
  description: string;
  image: string;
  bgColor?: string;
}

defineProps<Props>();
const router = useRouter();

const irParaAgendar = () => {
  router.push('/agendar');
};
</script>

<template>
  <div class="card">
    <div :class="['image-wrapper', bgColor || 'bg-white']">
      <img
        :src="image"
        :alt="title"
        class="image"
      />
    </div>
    <h3 class="title">{{ title }}</h3>
    <p class="description">{{ description }}</p>
    <button @click="irParaAgendar" class="button">AGENDAR</button>
  </div>
</template>

<style scoped>
.card {
  background-color: #EBEBEB;
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 15px rgba(19, 12, 73, 0.1);
  transition: all 0.3s;
  border: 2px solid transparent;
}

.card:hover {
  box-shadow: 0 25px 50px rgba(73, 47, 12, 0.2);
  border-color: #A2D729;
  transform: translateY(-5px);
}

.image-wrapper {
  width: 12rem;
  height: 12rem;
  margin: 0 auto 1.5rem;
  border-radius: 9999px;
  overflow: hidden;
  border: 3px solid #A2D729;
}

.bg-white {
  background-color: #EBEBEB;
}

.bg-gold {
  background-color: #A2D729;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1E1D20;
}

.description {
  color: #1E1D20;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.button {
  background-color: #A2D729;
  color: #1E1D20;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.button:hover {
  background-color: #1E1D20;
  color: #EBEBEB;
  transform: scale(1.05);
}
</style>