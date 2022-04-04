// eslint-disable-next-line import/no-anonymous-default-export
export default {

  categories: [
    {
      id: 1,
      title: 'Top Deals',
      items: [
        {
          id: 1,
          title:'Nike Shoes',
          image: '../images/product1.jpg',
          price: 100,
          discount: 10,
          discountprice: 90,
          category: 'Shoes',
        },
        {
          id: 2,
          title:'XBOX Controller',
          image: '../images/product5.jpg',
          price: 30,
          discount: 20,
          discountprice: 25,
          category: 'Gaming',
        },
        {
          id: 3,
          title:'One Step 2',
          image: '../images/product3.jpg',
          price: 100,
          discount: 50,
          discountprice: 50,
          category: 'Cameras',
        },
        {
          id: 4,
          title:'Red Diamond',
          image: '../images/product7.jpg',
          price: 70,
          discount: 42,
          discountprice: 30,
          category: 'Fragrance',
        },
      ],
    },
    {
      id: 2,
      title: 'Recommended for you',
      items: [
        {
          id: 5,
          title:'Nikon D750',
          image: '../images/product4.jpg',
          price: 300,
          discount: '',
          discountprice: '',
          category: 'Cameras',
        },
        {
          id: 6,
          title:'Rayban',
          image: '../images/product2.jpg',
          price: 500,
          discount: '',
          discountprice: '',
          category: 'Glasses',
        },
        {
          id: 7,
          title:'Vinta',
          image: '../images/product6.jpg',
          price: 15,
          discount: '',
          discountprice: '',
          category: 'Bags',
        },
        {
          id: 8,
          title:'Fossil',
          image: '../images/product8.jpg',
          price: 700,
          discount: '',
          discountprice: '',
          category: 'Watches',
        },
      ],
    },
  ],

  users:[
    {
      userName: "user1",
      email:'test1@gmail.com',
      password: "pass1"
    },
    {
      userName: "user2",
      email:'test2@gmail.com',
      password: "pass2"
    }
  ]
}