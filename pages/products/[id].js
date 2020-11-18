import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

let easing = [0.33, 1, 0.68, 1];

const fadeInleft = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: easing,
    },
  },
};
const fadeInRight = {
  initial: {
    opacity: 0,
    x: -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};
const childStagger = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Product = (props) => {
  const [quantity, setQuantity] = useState(1);
  let updatedPrice = props.product.price * quantity;

  function handleClickAdd() {
    setQuantity(quantity + 1);
  }
  function handleClickRemove() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else if (quantity === 1) {
      setQuantity(1);
    }
  }
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      className="fullscreen"
    >
      <div className="container">
        <main className="centered">
          <aside className="left-content">
            <motion.img
              variants={fadeInRight}
              src={props.product.image}
              alt={props.product.name}
            />
          </aside>
          <section className="right-content">
            <Link href="/">Back to products</Link>
            <motion.article variants={childStagger} className="product-info">
              <motion.h2 variants={fadeInleft}>{props.product.name}</motion.h2>
              <motion.p variants={fadeInleft}>{props.product.details}</motion.p>
              <motion.div variants={fadeInleft} className="buttons-row">
                <motion.button
                  variants={fadeInleft}
                  className="btn-add"
                  onClick={handleClickAdd}
                >
                  +
                </motion.button>
                <motion.span variants={fadeInleft}>{quantity}</motion.span>
                <motion.button
                  variants={fadeInleft}
                  className="btn-remove"
                  onClick={handleClickRemove}
                >
                  -
                </motion.button>
              </motion.div>
              <motion.div variants={fadeInleft} className="price-row">
                <motion.strong variants={fadeInleft}>Price:</motion.strong>
                <motion.p variants={fadeInleft}>{updatedPrice} $</motion.p>
              </motion.div>
              <motion.button variants={fadeInleft} className="btn-order">
                Order Now!
              </motion.button>
            </motion.article>
          </section>
        </main>
      </div>
    </motion.div>
  );
};

Product.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(
    `https://my-json-server.typicode.com/michalzavadzan/demo-products/products/${id}`
  );
  const product = await res.json();
  return { product };
};

export default Product;
