<template>
  <div>
    <div class="row">
      <Button class="checkout-btn mt-3">checkout</Button>
    </div>
    <div class="row overflow-auto shadow my-5 rounded" v-if="cart">
      <table class="rwd-table text-start front-morph" v-if="cart.length">
        <thead>
          <tr class="text-uppercase">
            <th colspan="2">product</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item._id">
            <td data-th="PRODUCT">
              <img class="cart-img" :src="item.product.images[0]" alt="">
            </td>
            <td><span>{{item.product.name}}</span></td>
            <td data-th="PRICE">${{item.product.finalPrice}}</td>
            <td data-th="QUANTITY"><span class="mx-2">{{item.quantity}}</span></td>
            <td data-th="TOTAL">${{item.quantity * item.product.finalPrice}}</td>
            <td class="text-end text-md-start"><button class="cart-btn rounded" @click="deleteProduct(item.product._id)"><fa icon="trash-alt" type="far" class="product-delete-icon"></fa></button></td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <h1>Cart is empty now</h1>
        <a href="#">go shopping</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Button from '@/components/btn.vue'
import { useStore } from 'vuex'
import { Product } from '@/api/product'
import { deleteItem } from '@/api'
import { useToast } from 'vue-toastification'
export interface CartItem {
  _id: string;
  quantity: number;
  product: Product;
}

export default defineComponent({
  components: {
    Button
  },
  setup () {
    const store = useStore()
    const toast = useToast()
    const deleteProduct = async (product: string) => {
      console.log({ product })
      try {
        const res = await deleteItem({ product })
        if (res.status === 200) {
          await store.dispatch('setUser', res.data.data)
          toast.warning('Product deleted')
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    const cart = computed(() => {
      if (!store.getters.getUser.cart) return
      return store.getters.getUser.cart.map((item: CartItem) => {
        item.product.finalPrice = item.product.discountPrice ? item.product.discountPrice : item.product.price
        return item
      })
    })
    return {
      cart,
      deleteProduct
    }
  }
})
</script>

<style lang="scss" scoped>
.checkout-btn {
  width: 100px;
  margin-left: auto;
}
.cart-btn {
  background-color: transparent;
  border: none;
  .product-delete-icon {
    width: 25px;
  }
}
.cart-img {
  height: 100px;
  width: 100px;
  object-fit: cover;
}
.rwd-table {
    overflow: hidden;
}
.rwd-table tr:nth-of-type(2n) {
    background: #906c645e;
    color: white;
    .product-delete-icon {
      color: white;
    }
}
.rwd-table tr:nth-of-type(2n+1) {
    color: #906c64;
    .product-delete-icon {
      color: #906c64;
    }
}
.rwd-table th, .rwd-table td {
    margin: 0.5em 1em;
}
.rwd-table {
    min-width: 100%;
}
.rwd-table th {
    display: none;
}
.rwd-table td {
    display: block;
}
.rwd-table td:before {
    content: attr(data-th) " ";
    width: 6.5em;
    display: inline-block;
}
.rwd-table th, .rwd-table td {
    text-align: left;
}
.rwd-table td:before {
    color: #906c64;
}
.rwd-table th {
  background-color: #906c64;
  color: white;
  font-weight: 400;
}
.rwd-table {
  tbody {
    tr {
      &:nth-child(2n) {
        td {
          &::before {
            color: white;
          }
        }
        .product-btn {
          background: white;
          .product-btn-icon {
            color: #a8847c;
            height: 1rem;
          }
        }
      }
    }
  }
}
@media (min-width: 480px) {
    .rwd-table td:before {
        display: none;
    }
    .rwd-table th, .rwd-table td {
        display: table-cell;
        padding: 0.25em 0.5em;
    }
    .rwd-table th:first-child, .rwd-table td:first-child {
        padding-left: 0;
    }
    .rwd-table th:last-child, .rwd-table td:last-child {
        padding-right: 0;
    }
    .rwd-table th, .rwd-table td {
        padding: 1em !important;
    }
}
</style>
