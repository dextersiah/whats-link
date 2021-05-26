<template>
  <div class="loading"></div>
</template>

<style lang="scss">
/* Absolute Center S\pinner */
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;

  &:after {
    content: "";
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #1ebea5; /* Blue */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }
}

/* Animation */

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script></script>
