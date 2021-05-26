<template>
  <div id="app">
    <div class="heading">
      <div class="title">
        <img src="./assets/images/whatsapp.svg" alt="Whatsapp logo" />
        <h2>Whatsapp Link Generator</h2>
      </div>
      <p class="subtitle">
        Send Whatsapp messages without adding to your contact
      </p>
    </div>
    <Card />
  </div>
</template>

<script>
import Card from "./components/Card";
export default {
  name: "App",
  components: {
    Card,
  },
};
</script>

<style lang="scss">
.title {
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;
  grid-gap: 1rem;

  img {
    width: 50px;
    height: auto;
  }
}

.subtitle {
  color: $light-primary;
  font-size: 18px;
  font-weight: 500;
}
</style>
