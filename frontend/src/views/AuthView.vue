<template>
  <div class="auth">

    <div class="auth__top">
      <h3 class="auth__top__h3">Logowanie</h3>
    </div>

    <div class="auth__center">

      <div class="auth__center__row">

        <div class="auth__center__row__item">

          <label
              for="username"
              class="auth__center__row__item__label"
          >Username</label>

          <input
              type="text"
              id="username"
              class="auth__center__row__item__input"
          >

        </div>

      </div>

      <div class="auth__center__row">

        <div class="auth__center__row__item">

          <label
              for="password"
              class="auth__center__row__item__label"
          >Username</label>

          <input
              type="text"
              id="password"
              class="auth__center__row__item__input"
          >

        </div>

      </div>

      <div class="auth__center__row">

        <button class="auth__center__row__submit-btn">
          Zaloguj sie
        </button>

      </div>

    </div>

  </div>
</template>

<style>
@media (min-width: 1024px) {
  .auth {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup lang="ts">
</script>
