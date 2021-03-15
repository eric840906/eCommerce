<template>
  <div class="view-window d-flex flex-column">
    <div class="d-flex p-3 m-2 dashboard-morph user-row">
      <div class="col-4 d-flex flex-column align-items-center">
        <div class="image-block">
          <img
            class="user-image"
            src="https://i.pinimg.com/564x/c4/0d/7a/c40d7a7060fb74926c257db982b6ddaf.jpg"
            alt=""
          />
          <a class="image-btn"><fa icon="camera" type="fas" class="camera-icon"></fa></a>
        </div>
        <ul class="w-100 mt-3">
          <li class="d-flex w-100">
            <span class="col-3 d-flex justify-content-end">
              <fa icon="envelope" type="far" class="account-icon"></fa>
            </span>
            <span class="col-9 text-start user-info">123</span>
          </li>
          <li class="d-flex w-100 mt-3">
            <span class="col-3 d-flex justify-content-end">
              <fa icon="user" type="far" class="account-icon"></fa>
            </span>
            <span class="col-9 text-start user-info">456</span>
          </li>
        </ul>
      </div>
      <div class="col-8 d-flex align-items-center text-start">
        <div class="user-desc">
          <h5></h5>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, libero maiores. Recusandae facilis, non est fuga quis dolorem voluptas culpa cum, blanditiis nemo ad in commodi molestias dolore distinctio repellat.
          </p>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="col-6 text-start">
        <form class="p-3 m-2 dashboard-morph">
          <div class="form-group">
            <label for="user-name">User Name</label>
            <input
              class="form-control"
              id="user-name"
              v-model="name"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Enter another name and submit to change it</small
            >
          </div>
          <div class="form-group">
            <label for="user-email">User Email</label>
            <input
              type="email"
              class="form-control"
              id="user-email"
              v-model="email"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Enter another email address and submit to change it</small
            >
          </div>
          <div class="form-group">
            <label for="user-desc">User Description</label>
            <textarea
              class="form-control"
              id="user-desc"
              v-model="description"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Enter some words to introduce yourself</small
            >
          </div>
          <!-- <div class="form-group">
            <label for="user-image"
              >Select a new profile pic</label
            >
            <input
              type="file"
              class="form-control-file display-none"
              id="exampleFormControlFile1"
            />
          </div> -->
          <div class="form-group d-flex">
            <Button class="ml-auto" type="submit">Change info</Button>
          </div>
        </form>
      </div>
      <div class="col-6 text-start">
        <form class="p-3 m-2 dashboard-morph">
          <div class="form-group">
            <label for="user-password">Password</label>
            <input
              type="password"
              class="form-control"
              id="user-password"
              v-model="password"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Enter and submit to change your password</small
            >
          </div>
          <div class="form-group">
            <label for="user-password-confirm">Password Confirm</label>
            <input
              type="password"
              class="form-control"
              id="user-password-confirm"
              v-model="passwordConfirm"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Type your new password again</small
            >
          </div>
          <div class="form-group d-flex">
            <Button class="ml-auto" type="submit">Change password</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/btn.vue'

export default defineComponent({
  components: {
    Button
  }
})
</script>

<style lang="scss" scoped>
.account-icon {
  width: 20px;
}
.active {
  background-color: #ffffffc4;
}

.view-window {
  overflow: auto;
  height: 80vh;
}
.image-block {
  position: relative;
  .user-image {
    border-radius: 100%;
    width: 200px;
    height: 200px;
  }
  .image-btn {
    cursor: pointer;
    position: absolute;
    bottom: 15%;
    right: 0%;
    border: none;
    background: #ffffff69;
    box-shadow: 0px 0px 2px black;
    border-radius: 100%;
    height: 35px;
    width: 35px;
    transition: all 0.5s ease;
    &:hover {
      box-shadow: 0px 0px 5px black;
    }
    .camera-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.user-row {
  position: relative;
}
.user-role-tag {
  border-radius: 0 0 0px 10px;
  text-transform: uppercase;
  position: absolute;
  width: 100px;
  right: 0px;
  top: 0;
}
.user-color {
  background-color: #1693e94a;
}
.admin-color {
  background-color: #e916164a;
}

.user-info {
  padding-left: 1rem;
}
</style>
