import { useState } from "react";
import { PRODUCTS } from "./mockData";

function App() {
  const [products, setProducts] = useState(PRODUCTS);

  let totalItems = products.reduce(
    (total, product) => (total += product.quantity),
    0
  );

  let productList = products.map((product) => (
    <li className="row" key={product.id}>
      <div className="col left">
        <div className="thumbnail">
          <a href="/">
            <img src={product.image} alt={"Anh san pham " + product.name} />
          </a>
        </div>
        <div className="detail">
          <div className="name">
            <a href="/">{product.name}</a>
          </div>
          <div className="description">
            Description for product item number 1
          </div>
          <div className="price">${product.price}</div>
        </div>
      </div>
      <div className="col right">
        <div className="quantity">
          <input
            type="number"
            className="quantity"
            step={1}
            value={product.quantity}
            onChange={(event) => updateQuantity(event, product.id)}
          />
        </div>
        <div className="remove">
          <svg
            version="1.1"
            className="close"
            xmlns="//www.w3.org/2000/svg"
            xmlnsXlink="//www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 60 60"
            enableBackground="new 0 0 60 60"
            xmlSpace="preserve"
            onClick={() => removeProduct(product.id)}
          >
            <polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
          </svg>
        </div>
      </div>
    </li>
  ));
  // Gán biến theo điều kiện
  // if (products.length === 0) productList = <li>404 not found</li>

  function removeProduct(productID) {
    const removedProducts = products.filter(
      (product) => product.id !== productID
    );
    setProducts(removedProducts);
  }

  function updateQuantity(event, productId) {
    const inputValue = event.target.value;
    let newProducts = [...products];
    let index = newProducts.findIndex((product) => product.id === productId);

    if (index > -1) {
      newProducts[index].quantity = Number(inputValue);
    }
    setProducts(newProducts);
  }

  // Return theo điều kiện
  // if (products.length === 0) return <h1>404 not found</h1>

  return (
    <main>
      <header className="container">
        <h1>Shopping Cart</h1>
        <ul className="breadcrumb">
          <li>Home</li>
          <li>Shopping Cart</li>
        </ul>
        <span className="count">{totalItems} items in the bag</span>
      </header>

      <section className="container">
        {/* Inline If Cách 1 */}
        {products.length > 0 && <ul className="products">{productList}</ul>}

        {products.length <= 0 && <h1>NO PRODUCT</h1>}

        {/* Inline If Cách 2 */}
        {products.length > 0 ? (
          <ul className="products">{productList}</ul>
        ) : (
          <h1>NO PRODUCT</h1>
        )}
      </section>

      <section className="container">
        <div className="promotion">
          <label htmlFor="promo-code">Have A Promo Code?</label>
          <input type="text" id="promo-code" /> <button type="button" />
        </div>
        <div className="summary">
          <ul>
            <li>
              Subtotal <span>$21.97</span>
            </li>
            <li>
              Tax <span>$5.00</span>
            </li>
            <li className="total">
              Total <span>$26.97</span>
            </li>
          </ul>
        </div>
        <div className="checkout">
          <button type="button">Check Out</button>
        </div>
      </section>
    </main>
  );
}

export default App;
