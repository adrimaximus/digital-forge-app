import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CatalogProvider, useCatalog } from '@/components/catalog/CatalogContext';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/utils/formatters';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
const CartContent: React.FC = () => {
  const {
    cart,
    removeFromCart,
    clearCart
  } = useCatalog();
  const {
    toast
  } = useToast();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const handleCheckout = () => {
    toast({
      title: "Pesanan diterima",
      description: "Tim kami akan segera menghubungi Anda untuk konfirmasi pesanan"
    });
    clearCart();
  };
  return <div className="container mx-auto px-4 pt-32 pb-8 md:pt-36">
      <div className="flex items-center space-x-2 mb-6">
        <Link to="/catalog">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Kembali ke Katalog
          </Button>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Daftar Solusi</h1>
      
      {cart.length === 0 ? <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-medium mb-2">Daftar Anda kosong</h2>
          <p className="text-muted-foreground mb-6">Tambahkan layanan dari solusi</p>
          <Link to="/catalog">
            <Button>Lihat Solusi</Button>
          </Link>
        </div> : <>
          <div className="bg-card rounded-lg shadow-sm mb-8">
            <div className="p-4">
              <div className="hidden md:grid grid-cols-12 gap-4 font-medium text-muted-foreground pb-4 border-b">
                <div className="col-span-8">Layanan</div>
                <div className="col-span-4 text-right">Harga</div>
              </div>
              
              <div className="space-y-4 divide-y">
                {cart.map(item => <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 pt-4">
                    <div className="col-span-8 flex items-center">
                      <div className="w-1 self-stretch bg-yellow-400 mr-3 rounded-full"></div>
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        {item.description && <p className="text-muted-foreground text-xs mb-1">{item.description}</p>}
                        {item.features && item.features.length > 0 && <div className="text-xs text-muted-foreground mt-1">
                            <span className="font-medium text-xs">Fitur:</span>
                            <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                              {item.features.slice(0, 2).map((feature, idx) => <li key={idx} className="text-xs">{feature.title}</li>)}
                              {item.features.length > 2 && <li className="text-xs">+{item.features.length - 2} fitur lainnya</li>}
                            </ul>
                          </div>}
                        {item.quantity > 1 && <p className="text-xs text-muted-foreground mt-1">
                            Jumlah: {item.quantity}
                          </p>}
                      </div>
                    </div>
                    
                    <div className="col-span-4 flex justify-between md:justify-end items-center">
                      <div className="font-medium text-sm">
                        {item.quantity > 1 ? `${formatCurrency(item.price)} × ${item.quantity} = ${formatCurrency(item.price * item.quantity)}` : formatCurrency(item.price)}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/90">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Button variant="outline" onClick={clearCart} className="md:order-1 order-2" size="sm">
              <Trash2 className="mr-1 h-4 w-4" />
              Hapus Semua
            </Button>
            
            <div className="bg-card p-4 rounded-lg shadow-sm md:min-w-[280px] md:order-2 order-1">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold">{formatCurrency(totalPrice)}</span>
              </div>
              
              <Button className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black" onClick={handleCheckout} size="sm">
                <ShoppingBag className="mr-1 h-4 w-4 text-black" />
                Checkout
              </Button>
            </div>
          </div>
        </>}
    </div>;
};
const Cart: React.FC = () => {
  return <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <CatalogProvider>
        <div className="flex-1">
          <CartContent />
        </div>
      </CatalogProvider>
      
      <Footer />
      <Toaster />
    </div>;
};
export default Cart;