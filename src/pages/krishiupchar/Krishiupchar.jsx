import React from 'react';
import Layout from '../../components/layout/Layout';

const KrishiUpchar = () => {
  return (
    <Layout>
      <header className="bg-green-500 p-4 text-white text-center rounded-md shadow-md">
        <h1 className="text-3xl font-bold">Krishi Upchar</h1>
      </header>
      <div className="flex justify-center items-center p-8 bg-green-50 text-green-900 font-sans">
        
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-10 border border-green-300">
          <h1 className="text-4xl font-extrabold text-green-700 mb-6 text-center">Common Rust of Corn</h1>

          {/* <p className="text-sm text-green-600 mb-6"><strong>Published:</strong> 03/19/2019</p> */}

          <h2 className="text-3xl font-semibold text-green-700 mb-4">Overview</h2>
          <p className="text-lg mb-6">
            Common rust is caused by the fungus <em>Puccinia sorghi</em> and occurs every growing season. 
            It is seldom a concern in hybrid corn. Rust pustules usually first appear in late June. 
            Early symptoms of common rust are chlorotic flecks on the leaf surface. These soon develop 
            into powdery, brick-red pustules as the spores break through the leaf surface.
          </p>

          <h2 className="text-3xl font-semibold text-green-700 mb-4">Symptoms</h2>
          <p className="text-lg mb-6">
            Pustules are oval or elongated, about 1/8 inch long, and scattered sparsely or clustered together. 
            The leaf tissue around the pustules may become yellow or die, leaving lesions of dead tissue. 
            The lesions sometimes form a band across the leaf and entire leaves will die if severely infected. 
            As the pustules age, the red spores turn black, so the pustules appear black, and continue to erupt 
            through the leaf surface. Husks, leaf sheaths, and stalks also may be infected.
          </p>

          <h2 className="text-3xl font-semibold text-green-700 mb-4">Images</h2>
          <p className="mb-3"><strong>Pustules of common rust with brick-red spores.</strong></p>
          <img
            className="mb-6 rounded-lg shadow-lg w-full"
            src="https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2FCommon-rust-Adam-Sisson-9-close-up.jpg%2F2c460a1ccf85ebce72c86509470b5dea.jpg&h=319&w=448&fit=contain"
            alt="Pustules of common rust with brick-red spores"
          />
          <p className="mb-3"><strong>Common rust foliar symptoms.</strong></p>
          <img
            className="mb-6 rounded-lg shadow-lg w-full"
            src="https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2FCommon-rust-Daren-Mueller-20.jpg%2F36fa21f79dcca7af9081b496e9f449bc.jpg&h=336&w=448&fit=contain"
            alt="Common rust foliar symptoms"
          />

          <h2 className="text-3xl font-semibold text-green-700 mb-4">Disease Cycle</h2>
          <p className="text-lg mb-6">
            The fungus survives the winter as spores in subtropical and tropical regions; spores are carried 
            long distances by wind and eventually reach the Midwest. Rust development is favored by high humidity 
            with night temperatures of 65-70°F and moderate daytime temperatures. The disease is usually more 
            severe on seed corn.
          </p>

          <h2 className="text-3xl font-semibold text-green-700 mb-4">Management</h2>
          <p className="text-lg mb-6">
            Resistant hybrids and inbreds are available. Foliar fungicides labeled for common rust are available.
          </p>

          <h2 className="text-3xl font-semibold text-green-700 mb-4">More Images</h2>
          <ul className="list-disc pl-6 mb-8 space-y-6">
            <li>
              Early development of common rust on corn leaf.
              <img
                className="mt-2 mb-4 rounded-lg shadow-lg w-64"
                src="https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2FCommon-rust_Early-symptoms_Wise.jpg%2Fda32af85ff3993245a751ce1278e484c.jpg&h=256&w=227&fit=cover"
                alt="Early development of common rust on corn leaf"
              />
            </li>
            <li>
              Common rust pustules erupting with brick-red spores.
              <img
                className="mt-2 mb-4 rounded-lg shadow-lg w-64"
                src="https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2FCommon-rust-Adam-Sisson-9-close-up-1643298849.jpg%2F2f69973f215a00ef4908bf8abf6e448f.jpg&h=256&w=227&fit=cover"
                alt="Common rust pustules erupting with brick-red spores"
              />
            </li>
            <li>
              Common rust pustules and surrounding dead leaf tissue.
              <img
                className="mt-2 mb-4 rounded-lg shadow-lg w-64"
                src="https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2FCommon-rust-Adam-Sisson-19.jpg%2F6a977528da7dbd9d8a375cd175f018eb.jpg&h=256&w=227&fit=cover"
                alt="Common rust pustules and surrounding dead leaf tissue"
              />
            </li>
            <li>
              Severe common rust on corn leaf.
              <img
                className="mt-2 mb-4 rounded-lg shadow-lg w-64"
                src="https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2FCommon-rust-Adam-Sisson-20.jpg%2Ff3185d56369fb530b0f9a797f44eea31.jpg&h=256&w=227&fit=cover"
                alt="Severe common rust on corn leaf"
              />
            </li>
            <li>
              Severe common rust infection on corn leaf.
              <img
                className="mt-2 mb-4 rounded-lg shadow-lg w-64"
                src="https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2FCommon-Rust-Daren-Mueller-2.jpg%2Feb4ceb0d54277dd4ad4b1dcfb37da9b0.jpg&h=256&w=227&fit=cover"
                alt="Severe common rust infection on corn leaf"
              />
            </li>
            <li>
              Common rust on leaf midrib.
              <img
                className="mt-2 mb-4 rounded-lg shadow-lg w-64"
                src="https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2FCommon-rust-Daren-Mueller-20-1643298874.jpg%2F447b0d5918efb30f1966764b3542da65.jpg&h=256&w=227&fit=cover"
                alt="Common rust on leaf midrib"
              />
            </li>
            <li>
              Common rust spores (bottom) are brick red, while southern rust spores (top) are more orange.
              <img
                className="mt-2 mb-4 rounded-lg shadow-lg w-64"
                src="https://cropprotectionnetwork.org/image?s=%2Fimg%2Fhttp%2Fgeneral%2FCommon-Rust-Tristan-Mueller-74.jpg%2Fa9fcd4fbc48c5a46a44e4e3f92783429.jpg&h=256&w=227&fit=cover"
                alt="Common rust spores (bottom) are brick red, while southern rust spores (top) are more orange"
              />
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default KrishiUpchar;
