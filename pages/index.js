import Head from 'next/head';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { motion } from 'framer-motion';

let easing = [0.33, 1, 0.68, 1];

const fadeInTop = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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

const Index = (props) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      className="fullscreen"
    >
      <Head>
        <title>Eshop Products</title>
      </Head>
      <div className="container">
        <main className="centered">
          <aside className="left-content">
            <motion.h1 variants={fadeInRight}>Choose your flavour:</motion.h1>
          </aside>
          <section className="right-content">
            <motion.div variants={childStagger} className="products-row">
              {props.products.map((product) => (
                <Link
                  key={product.id}
                  href="/products/[id]"
                  as={`/products/${product.id}`}
                >
                  <motion.div
                    variants={fadeInTop}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="card"
                  >
                    <img
                      src={product.image}
                      key={product.image}
                      alt={product.name}
                    />
                    <h2>{product.name}</h2>
                    <p>{product.details}</p>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </section>
        </main>
      </div>
    </motion.div>
  );
};

Index.getInitialProps = async function () {
  const res = await fetch(
    'https://my-json-server.typicode.com/michalzavadzan/demo-products/products'
  );
  const data = await res.json();
  return {
    products: data,
  };
};

export default Index;
