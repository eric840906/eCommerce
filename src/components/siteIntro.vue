<template>
  <div class="intro-row d-flex flex-column align-items-center flex-md-row justify-content-md-center" data-aos="fade-up" data-aos-offset="100" data-aos-once="false" data-aos-easing="ease-in-out">
    <div class="card mt-2 front-morph" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title"><fa icon="utensils" type="fas" class="control-icon"></fa></h5>
        <h3 class="card-title mt-3">Post your foods</h3>
        <p class="card-text">Just made some awesome dishes? It's time to show off!</p>
      </div>
    </div>
    <div class="card mt-2 border-end border-start front-morph" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title"><fa icon="share-alt" type="fas" class="control-icon"></fa></h5>
        <h3 class="card-title mt-3">Share your joy</h3>
        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, sapiente culpa ad inventore ipsam qui tenetur soluta distinctio ipsum, cumque exercitationem minus, quos laborum aliquam quas facere veniam saepe amet?</p>
      </div>
    </div>
    <div class="card mt-2 front-morph" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title"><fa icon="heart" type="fas" class="control-icon"></fa></h5>
        <h3 class="card-title mt-3">Spread love</h3>
        <p class="card-text">Join our community!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
})
</script>

<style lang="scss" scoped>
.card-body {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card {
  border: none;
  border-radius: 0;
  width: 18rem;
  box-shadow: 0px 11px 32px #eeb599;
}
</style>
