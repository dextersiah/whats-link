<template>
  <div class="dropdown-list" v-show="open">
    <div
      class="dropdown-item"
      v-for="(country, index) in countries"
      :key="index"
      @click="itemClick(country)"
    >
      <img :src="country.flag" alt="country_flag" />
      <p>{{ country.name }}</p>
      <p style="margin-left: auto">+{{ country.callingCodes[0] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["countries", "open"],
  methods: {
    itemClick(country) {
      this.$emit("on-item-selected", {
        code: country.callingCodes[0],
        flag: country.flag,
      });
    },
  },
};
</script>

<style lang="scss">
.dropdown-list {
  background: white;
  position: absolute;
  top: 50px;
  left: 0;
  height: 400px;
  width: 300px;
  max-height: 400px;
  overflow: auto;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 16px;
  z-index: 999;
}

.dropdown-item {
  display: flex;
  padding: 5px 10px;
  cursor: pointer;
  align-items: center;

  &:hover {
    background: #d9e2e0;
  }

  img[alt="country_flag"] {
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-right: 15px;
  }

  p {
    font-size: 14px;
  }
}
</style>
