<template>
  <div class="footer py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12 footer-block">
          <div class="store-info">
            <Logo :width="150"></Logo>
            <div class="store-desc">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim rem blanditiis eius harum quo repellendus cupiditate aspernatur quaerat quae velit iste repudiandae in, aliquid unde. Error numquam neque nam ipsum?
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 pt-5 footer-block text-md-start">
          <div class="other-links">
            <h5>Navigation</h5>
            <ul class="mt-5">
              <li><a class="text-decoration-none" href="">About us</a></li>
              <li><a class="text-decoration-none" href="">Our team</a></li>
              <li><a class="text-decoration-none" href="">Shop</a></li>
              <li><a class="text-decoration-none" href="">FAQ</a></li>
              <li><a class="text-decoration-none" href="">Contact us</a></li>
              <li><a class="text-decoration-none" href="">Cookies</a></li>
              <li><a class="text-decoration-none" href="">Cakes</a></li>
              <li><a class="text-decoration-none" href="">Specials</a></li>
              <li><a class="text-decoration-none" href="">Location</a></li>
              <li><a class="text-decoration-none" href="">Brands</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12 pt-5 footer-block text-md-start">
          <div class="contact-info">
            <h5>Contact info</h5>
            <ul class="mt-5">
              <li>
                <div class="row">
                  <div class="col-1">
                    <fa icon="location-arrow" type="fas" class="contact-icon"></fa>
                  </div>
                  <div class="col-11 text-start">
                    <a class="text-decoration-none" href="#">
                      523 Sylvan Ave, 5th Floor<br>Mountain View, CA 94041 USA
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-1">
                    <fa icon="phone-alt" type="fas" class="contact-icon"></fa>
                  </div>
                  <div class="col-11 text-start">
                    <a class="text-decoration-none" href="tel: (+844) 123 456 78"> (+844) 123 456 78</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-1">
                    <fa icon="envelope" type="far" class="contact-icon"></fa>
                  </div>
                  <div class="col-11 text-start">
                    <a class="text-decoration-none" href="mailto:eric840906@hotmail.com.tw">eric840906@hotmail.com.tw</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '@/components/logo.vue'
export default defineComponent({
  components: {
    Logo
  }
})
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.footer {
  background-color: #ffffff47;
  backdrop-filter: blur(6px);
  .row {
    @media (max-width:766px) {
      .footer-block + .footer-block {
        margin-top: 3rem;
      }
    }
  }
}
.store-info {
  padding-right: 100px;
  @media (min-width: 992px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width:992px) {
    padding-right: 0;
  }
  .store-desc {
    text-align: initial;
    margin-top: 20px;
    @media (max-width:992px) {
      text-align: center;
    }
  }
}
.other-links {
  ul {
    columns: 2;
  }
}
.contact-info {
  .contact-icon {
    width: 20px;
    color: #906c64;
  }
  li+li {
    margin-top: 20px;
  }
}
a{
  color: #6c757d;
  &:hover {
    color: #b4685dcc;
  }
}
</style>
