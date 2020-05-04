var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        description: "Lorem ipsum",
        link: "#",
        inventory: 10,
        image: "./assets/images/vmSocks-green-onWhite.jpg",
        alt: "Picture of a pair of green socks with Vue Mastery logo at the ancle.",
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 1,
                variantColor: "green",
                variantImage: "./assets/images/vmSocks-green-onWhite.jpg",
                variantAlt: "Picture of a pair of green socks with Vue Mastery logo at the ancle.",
            },
            {
                variantId: 2,
                variantColor: "blue",
                variantImage: "./assets/images/vmSocks-blue-onWhite.jpg",
                variantAlt: "Picture of a pair of blue socks with Vue Mastery logo at the ancle.",
            }
        ],
        sizes: ["29-34", "35-39", "40-45"],
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
        changeProductImage(variantId) {
            this.variants.forEach(variant => {
                if (variant.variantId == variantId) {                    
                    this.image = variant.variantImage;
                    this.alt = variant.variantAlt;
                }
            });
        }
    }
});