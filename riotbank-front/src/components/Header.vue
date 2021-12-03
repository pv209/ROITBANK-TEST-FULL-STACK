<template>
  <div class="nav">
    <img :src="menu" @click="toggleSideBar" class="menu" />
    <SideBar v-if="sideBarTrigger" />
    <img :src="mySVG" />
  </div>
</template>

<script>
import SideBar from './SideBar.vue';
import { ref } from 'vue';
export default {
  components: { SideBar },
  name: 'Header',
  setup() {
    const sideBarTrigger = ref(false);
    const toggleSideBar = () => {
      sideBarTrigger.value = !sideBarTrigger.value;
    };
    return {
      sideBarTrigger,
      toggleSideBar,
    };
  },
  data() {
    return {
      mySVG: require('/home/paulo/Projetos/pv209/riotbank-front/src/Images/Grupo 4.svg'),
      menu: require('/home/paulo/Projetos/pv209/riotbank-front/src/Images/menu.svg'),
    };
  },
};
</script>

<style>
.nav {
  background-color: #0c517e;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 20px;
}

.menu {
  margin-right: 20px;
}
</style>
