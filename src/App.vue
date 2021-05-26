<template>
  <div id="app" v-if="!apiIsLoading">
    <div class="heading">
      <div class="title">
        <img src="./assets/images/whatsapp.svg" alt="Whatsapp logo" />
        <h2>Whatsapp Link Generator</h2>
      </div>
      <p class="subtitle">
        Send Whatsapp messages without adding to your contact
      </p>
    </div>
    <Card :countryList="listOfPhoneCode" />
  </div>

  <Loader v-else />
</template>

<script>
import Card from "./components/Card";
import Loader from "./components/Loader";
export default {
  name: "App",
  components: {
    Card,
    Loader,
  },
  data() {
    return {
      apiIsLoading: true,
      listOfPhoneCode: [],
    };
  },
  created() {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;callingCodes;flag")
      .then((response) => response.json())
      .then((data) => {
        this.listOfPhoneCode = data;
        this.apiIsLoading = false;
      });
  },
};
</script>

<style lang="scss">
#app {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  display: grid;
  grid-template-columns: 50px max-content;
  align-items: center;
  grid-gap: 1rem;

  @media screen and (min-width: 700px) {
    justify-content: center;
  }

  img {
    width: 50px;
    height: auto;
  }
}

.subtitle {
  color: $light-primary;
  font-size: 18px;
  font-weight: 500;

  @media screen and (min-width: 700px) {
    text-align: center;
  }
}
</style>
