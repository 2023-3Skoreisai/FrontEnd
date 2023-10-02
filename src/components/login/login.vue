<template>
  <div class="background-image"></div>
</template>

<script>
export default {
  mounted() {
    const img = new Image();
    img.src = 'https://source.unsplash.com/featured/1600x600?nature';
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const container = document.querySelector('.background-image');
      container.style.backgroundImage = `url(${img.src})`;
      container.style.backgroundSize = aspectRatio > 1 ? 'auto 100%' : '100% auto';
    };
  },
};
</script>

<style scoped>
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>