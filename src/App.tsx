import React from 'react';
import Header from './components/Header';
import ProductOrder from './components/ProductOrder';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AdminRoute>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="py-6 sm:py-12 flex-grow">
          <div className="container mx-auto px-4">
            <ProductOrder />
          </div>
        </main>
        <Footer />
      </div>
    </AdminRoute>
  );
}

export default App;