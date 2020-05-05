Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <a v-bind:href="link"><img v-bind:src="image" v-bind:alt="alt"></a>
            </div>
            <div class="product-info">
                <p v-if="inventory >= 10">In Stock</p>
                <p v-else-if="inventory < 10 && inventory > 0">Almost sold out!</p>
                <p v-else>Sold out</p>

                <h1>{{ title }}</h1>
                <productDetails :details="details"></productDetails>

                <b><p>Colors</p></b>
                <div class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    @mouseover="changeProduct(index)"
                    :style="{ backgroundColor: variant.variantColor }"
                ></div>

                <b><p>Sizes</p></b>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>

                <botoesDoCarrinho
                    :carrinho="cart"
                    :productInventory="inventory"
                    :productId="this.variants[this.selectedVariant].variantId"
                    @add-to-cart="addToCart"
                    @remove-from-cart="removeFromCart"
                ></botoesDoCarrinho>
                <p>Shipping: {{ shipping }}</p>
            </div>
        </div>
    `,
    data() {
        return {
            product: "Socks",
            brand: "Vue Mastery",
            description: "Lorem ipsum",
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            sizes: ["29-34", "35-39", "40-45"],
            variants: [{
                    variantId: 1,
                    variantColor: "green",
                    variantImage: "./assets/images/vmSocks-green-onWhite.jpg",
                    variantAlt: "Picture of a pair of green socks with Vue Mastery logo at the ancle.",
                    variantLink: "#",
                    variantQuantity: 10
                },
                {
                    variantId: 2,
                    variantColor: "blue",
                    variantImage: "./assets/images/vmSocks-blue-onWhite.jpg",
                    variantAlt: "Picture of a pair of blue socks with Vue Mastery logo at the ancle.",
                    variantLink: "#",
                    variantQuantity: 5
                }
            ],
            selectedVariant: 0,
        }
    },
    methods: {
        addToCart() {
            this.$emit("update-cart", "add", this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
            this.$emit("update-cart", "remove", this.variants[this.selectedVariant].variantId)
        },
        changeProduct(variantIndex) {
            this.selectedVariant = variantIndex;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        alt() {
            return this.variants[this.selectedVariant].variantAlt;
        },
        link() {
            return this.variants[this.selectedVariant].variantLink;
        },
        inventory() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            return this.premium ? 'Free' : '$2.99';
        }
    }
});

Vue.component('productDetails', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `,
});

Vue.component('botoesDoCarrinho', {
    props: {
        carrinho: {
            type: Array,
            required: true
        },
        productInventory: {
            type: Number,
            required: true
        }
    },
    template: `
        <div>
            <Button :class="{ disabledButton: productInventory < 1}" v-on:click="addToCart" :disabled="productInventory < 1">Add to cart</Button>
            <Button :class="{ disabledButton: this.carrinho.lenght < 1 }" v-on:click="removeFromCart" :disabled="this.carrinho.lenght < 1">Remove from cart</Button>
        </div>
    `,
    methods: {
        addToCart() {
            this.$emit('add-to-cart');
        },
        removeFromCart() {
            this.$emit('remove-from-cart');
        },
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(action, id) {
            if (action === "add") {
                this.cart.push(id)
            }

            if (action === "remove") {
                index = this.cart.indexOf(id);
                if (index > -1) {
                    this.cart.splice(index, 1);
                }
            }
        }
    }
});