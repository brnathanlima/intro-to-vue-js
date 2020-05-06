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
                <product-details :details="details"></product-details>

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

                <botoes-do-carrinho
                    :carrinho="cart"
                    :productInventory="inventory"
                    :productId="this.variants[this.selectedVariant].variantId"
                    @add-to-cart="addToCart"
                    @remove-from-cart="removeFromCart"
                ></botoes-do-carrinho>
                <p>Shipping: {{ shipping }}</p>
                <div>
                    <h2>Reviews</h2>
                    <p v-if="!reviews.length">There are no reviews yet.</p>
                    <p v-for="review in reviews">
                        <b>Name: </b>{{ review.name }}<br/>
                        <b>Recommend? </b>{{ review.recommend }}<br/>
                        <b>Rating: </b>{{ review.rating }} stars<br/>
                        <b>Review: </b>{{ review.review }}
                    </p>
                </div>
                <product-review @review-submitted="addReview"></product-review>
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
            reviews: []
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
            this.selectedVariant = variantIndex
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        alt() {
            return this.variants[this.selectedVariant].variantAlt
        },
        link() {
            return this.variants[this.selectedVariant].variantLink
        },
        inventory() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            return this.premium ? 'Free' : '$2.99'
        }
    }
})

Vue.component('product-details', {
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
})

Vue.component('botoes-do-carrinho', {
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
            this.$emit('add-to-cart')
        },
        removeFromCart() {
            this.$emit('remove-from-cart')
        },
    }
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <h2>Review the product</h2>
            <p v-if="errors.length">
                <b>Please correct the following errors:</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <p>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name">
            </p>
            <p>
                <label for="recommend">Would you recommend this product?</label><br/>
                <input class="recommendation" type="radio" name="recommend" id="recommend" value="Yes" v-model="recommend">Yes<br/>
                <input class="recommendation" type="radio" name="recommend" id="recommend" value="No" v-model="recommend">No<br/>
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea name="review" id="review" cols="30" rows="10" v-model="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating:</label>
                <select name="rating" id="rating" v-model.number="rating">
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
            </p>
            <p>
                <input type="submit" value="Submit">
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            recommend: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.recommend && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    recommend: this.recommend,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit("review-submitted", productReview)
                this.name = null,
                this.recommend = null,
                this.review = null,
                this.rating = null                
            } else {
                this.errors = []
    
                if (!this.name) {
                    this.errors.push("Name field is required.")
                }
                if (!this.recommend) {
                    this.errors.push("Recommendation field is required")
                }
                if (!this.review) {
                    this.errors.push("Review field is required")
                }
                if (!this.rating) {
                    this.errors.push("Rating field is required")
                }
            }
        }
    }
})

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
                index = this.cart.indexOf(id)
                if (index > -1) {
                    this.cart.splice(index, 1)
                }
            }
        }
    }
})