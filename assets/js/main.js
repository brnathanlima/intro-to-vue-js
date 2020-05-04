var app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        description: "Lorem ipsum",
        image: "./assets/images/vmSocks-green-onWhite.jpg",
        alt: "Picture of a pair of green socks with Vue Mastery logo at the ancle.",
        link: "#",
        inventory: 10,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 1,
                variantColor: "green"
            },
            {
                variantId: 2,
                variantColor: "blue"
            }
        ],
        sizes: ["29-34", "35-39", "40-45"]
    }
});