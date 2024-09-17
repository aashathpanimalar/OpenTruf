import ProductCard from './ProductCard';

export const products = [
  {
    imgSrc: "https://5.imimg.com/data5/SELLER/Default/2022/11/CB/VM/EY/3031557/spray-dried-green-bell-pepper-powder.jpg",
    title: "Green Pepper Powder",
    price: 50,
    rating: 5
  },
  {
    imgSrc: "https://media.istockphoto.com/id/1424983265/photo/making-vegetable-sauce-mechanical-grinding-of-paprika-sweet-bell-peppers-and-hot-pepper.jpg?s=612x612&w=0&k=20&c=cuePSr-bJ4QbDdyS7rwvurELWpWL5PWGzVYmee9lxeE=",
    title: "Red Chili Pepper Grinder",
    price: 65,
    rating: 4
  },
  {
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfop1A0ERgyTJbv0BDRhwGDcM2EPEYqbIj8CFOOmxy1w&s",
    title: "Red Chili Pepper Powder",
    price: 45,
    rating: 3
  },
  {
    imgSrc: "https://i.pinimg.com/736x/30/54/94/305494025a416cdf46bdca9d5be6e210.jpg",
    title: "Pickle Masala Powder",
    price: 60,
    rating: 4
  },
  {
    imgSrc: "https://img.freepik.com/free-photo/bowl-full-hot-peppers_1127-112.jpg",
    title: "Bowl full Hot Pepper",
    price: 45,
    rating: 5
  }, 
  {
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/5/50/Madame_Jeanette_and_other_chillies.jpg",
    title: "Spicy & Hot Pepper",
    price: 20,
    rating: 2
  },
  {
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJ-_Nm_kD1dCbL1XveWde7WERfDOpkLgKID-k0gcQGA&s",
    title: "Stuffed Pepper",
    price: 25,
    rating: 3
  },
  {
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4kxFGjUmsRAityJCg4GFrxzgqH8z9Txph14ggF03aWQ&s",
    title: "Caribbean Red Pepper",
    price: 55,
    rating: 4
  },
  {
    imgSrc: "https://www.newmexicanfoodie.com/wp-content/uploads/2018/09/41498342_2203106883052860_4936327520996818944_n.jpg",
    title: "Mexican Green Pepper",
    price: 15,
    rating: 2
  },
  {
    imgSrc: "https://m.media-amazon.com/images/I/31jUOALKXGL.jpg",
    title: "Scotch Bonnet Pepper",
    price: 35,
    rating: 3
  },
  {
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLtwo17hOqyZxJmUHPhJKYAark4v7vMgTa_CaepRB09A&s",
    title: "Bell Peppers",
    price: 25,
    rating: 5
  },
  {
    imgSrc: "https://static1.bigstockphoto.com/8/2/3/large1500/328093156.jpg",
    title: "Curved Pepper",
    price: 19,
    rating: 4
  },
  {
    imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Bhut-Jolokia-pc.jpg/640px-Bhut-Jolokia-pc.jpg",
    title: "Ghost Pepper",
    price: 45,
    rating: 5
  },
  {
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSybFxSE2rtWw3q4d1l4r4oHY-qbFTUf_MVvIoXQ-1RdA&s",
    title: "Green Finger Peppers",
    price: 10,
    rating: 2
  },
  {
    imgSrc: "https://media.post.rvohealth.io/wp-content/uploads/sites/3/2020/02/267248_2200-800x1200.jpg",
    title: "Cayenne Pepper",
    price: 35,
    rating: 4
  },
  {
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSthim9F-p4iWV4PgEbTGzM7sgy0ZtFo9trO9jc6LFYtw&s",
    title: "Long Red Chili",
    price: 20,
    rating: 5
  },
];

function Products({ onAddToCart, cartItems, onRemoveFromCart }) {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>PRODUCTS</h2>
      {products.map((product, index) => (
        <ProductCard
          product={product}
          key={index}
          quantity={cartItems[product.title] || 0}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
      <br /><br />
    </div>
  );
}

export default Products;
