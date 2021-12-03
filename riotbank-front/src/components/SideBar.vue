<template>
  <div class="sidebar">
    <img :src="img1" class="menuicon" />
    <img :src="img2" class="menuicon" />
    <img :src="img3" class="menuicon" />
    <img :src="img4" class="menuicon" />
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      img1: require('/home/paulo/Projetos/pv209/riotbank-front/src/Images/bars-graphic.svg'),
      img2: require('/home/paulo/Projetos/pv209/riotbank-front/src/Images/flow-magic.svg'),
      img3: require('/home/paulo/Projetos/pv209/riotbank-front/src/Images/file-edit.svg'),
      img4: require('/home/paulo/Projetos/pv209/riotbank-front/src/Images/contract (2).svg'),
    };
  },
};
</script>

<style>
.sidebar {
  background-color: #ffffff;
  border: 1px solid #dfe3e6;
  float: left;
  position: fixed;
  z-index: 1;
  top: 70px;
  width: 60px;
  left: 0px;
  bottom: 0px;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.menuicon {
  top: 102px;
  left: 25px;
  width: 18px;
  height: 18px;
  margin-bottom: 15px;
}
</style>
