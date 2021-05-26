<template>
  <div class="card-wrapper" v-if="countryList">
    <!-- Form -->
    <form
      action=""
      @submit.prevent="generateLink"
      v-if="!generatedLink.length > 0"
    >
      <!-- Phone Number -->
      <div class="phone-number row">
        <label for="">Enter the phone number whom you want to sent.</label>
        <div class="field-row">
          <div class="country-dropdown" @focusout="toggleDropdown" tabindex="0">
            <div class="selected-country" @click="toggleDropdown">
              <div
                class="selected-country-flag"
                :style="{
                  'background-image': `url(${selectedCountry.flag})`,
                }"
              />
              <img src="../assets/images/arrow_down.svg" alt="arrow down" />
            </div>
            <DropdownCountry
              :countries="countryList"
              @on-item-selected="countrySelected"
              :open="dropdownOpen"
            />
          </div>
          <p>+{{ selectedCountry.code }}</p>
          <input
            type="numeric"
            v-model="phoneNumber"
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
          />
        </div>
      </div>
      <p :class="[{ show: hasError }, 'error']">
        Please check your phone number
      </p>

      <!-- Custom Message -->
      <div class="custom-message row">
        <label>Your custom message</label>
        <textarea
          type="text"
          placeholder="Add your custom message to send"
          class="custom-message-field"
          v-model="message"
        />
      </div>

      <button :class="[{ disabled: phoneNumber.length <= 0 }, 'btn']">
        Generate Link
      </button>
    </form>

    <!-- Generated Link -->
    <div v-else class="generated-section">
      <p>Your link is ready</p>
      <a class="btn" :href="generatedLink">Open in WhatsApp</a>
      <template v-if="supported">
        <p class="separator">OR</p>
        <button class="btn btn-link" @click="shareLink">SHARE YOUR LINK</button>
      </template>
    </div>
  </div>
</template>

<script>
import DropdownCountry from "./DropdownCountry";
export default {
  components: {
    DropdownCountry,
  },
  props: ["countryList"],
  data() {
    return {
      selectedCountry: {},
      phoneNumber: "",
      message: "",
      isGenerating: false,
      dropdownOpen: false,
      hasError: false,
      generatedLink: "",
      supported: false,
    };
  },
  created() {
    navigator.share ? (this.supported = true) : (this.supported = false);
  },
  methods: {
    countrySelected(country) {
      this.selectedCountry = country;
      this.toggleDropdown();
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    generateLink() {
      this.isGenerating = true;

      if (!this.phoneNumber.length >= 0) {
        this.generatedLink = `https://api.whatsapp.com/send?phone=${this.selectedCountry.code}${this.phoneNumber}&text=${this.message}`;
      } else {
        this.hasError = true;
      }
    },
    async shareLink() {
      if (navigator.share) {
        try {
          const shareData = {
            url: this.generateLink,
          };
          await navigator.share(shareData);
          console.log("Share successfull");
        } catch (err) {
          console.log("Error: ", err);
        }
      } else {
        alert("error");
      }
    },
  },
  watch: {
    countryList: {
      immediate: true,
      handler: function (data) {
        console.log("watched");
        console.log(data);
        this.selectedCountry.code = data[0].callingCodes[0];
        this.selectedCountry.flag = data[0].flag;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  margin-top: 40px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  max-width: 400px;
  margin: 40px auto;
}

.field-row {
  display: flex;
  align-items: stretch;
  background: $off-white;
  border-radius: 5px;

  & > p {
    align-self: center;
  }
}

.selected-country {
  display: grid;
  grid-template-columns: 40px 20px;
  grid-gap: 10px;
  align-items: center;
  cursor: pointer;
}

.selected-country .selected-country-flag {
  width: 40px;
  height: 27px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.country-dropdown {
  position: relative;
  padding: 15px 10px 15px 15px;
}

label {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 15px;
  display: block;
}

input {
  width: 100%;
  border: none;
  background: transparent;
  font-family: "Poppins";
  font-size: 16px;
  padding-left: 10px;
}

.custom-message-field {
  font-family: "Poppins";
  padding: 10px 0 0 10px;
  font-size: 14px;
  background: $off-white;
  height: 200px;
  resize: none;
  border: none;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
}

form > * + * {
  margin-top: 20px;
}

.error {
  margin: 0;
  margin-top: 5px;
  font-size: 11px;
  color: rgb(212, 67, 51);
  visibility: hidden;

  &.show {
    visibility: initial;
  }
}

.btn {
  display: block;
  text-decoration: none;
  border: none;
  background: $primary;
  padding: 15px 0;
  text-align: center;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: $off-white;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.1s linear;

  &:active,
  &:focus {
    transform: scale(0.98);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.btn-link {
    background: none;
    color: $primary;
    font-size: 14px;
    padding: 0;
  }
}

// GENERATED SECTION SCSS

.generated-section {
  p {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 15px;
    display: block;

    &.separator {
      margin: 10px 0;
      text-align: center;
    }
  }
}
</style>
