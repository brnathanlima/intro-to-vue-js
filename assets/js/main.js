var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        brand: "Vue Mastery",
        description: "Lorem ipsum",
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        sizes: ["29-34", "35-39", "40-45"],
        variants: [
            {
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
        cart: 0
    },
    methods: {
        addToCart() {
            ++this.cart;
        },
        removeFromCart() {
            if (this.cart > 0) {
                --this.cart;                
            }
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
        }
    }
});