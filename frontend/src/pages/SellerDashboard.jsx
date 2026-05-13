import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Inbox, 
  TrendingUp, 
  Eye, 
  X,
  Plus
} from 'lucide-react';

const SellerDashboard = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/seller', icon: LayoutDashboard, label: 'Overview' },
    { path: '/seller/products', icon: Package, label: 'Products' },
    { path: '/seller/orders', icon: Inbox, label: 'Orders' },
    { path: '/seller/earnings', icon: TrendingUp, label: 'Earnings' },
    { path: '/seller/preview', icon: Eye, label: 'Shop Preview' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-8 flex flex-col gap-8">
        <div className="mb-4">
          <h2 className="text-xl font-serif">Seller Hub</h2>
          <p className="text-xs text-muted uppercase tracking-widest mt-1">Krafft Artisans</p>
        </div>
        
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-colors text-sm font-medium ${
                  isActive ? 'bg-accent text-white' : 'hover:bg-muted'
                }`}
              >
                <Icon size={18} strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 bg-[#FDFDFB]">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/products" element={<ProductManager />} />
          <Route path="/orders" element={<OrderInbox />} />
          <Route path="/earnings" element={<EarningsOverview />} />
          <Route path="/preview" element={<ShopPreview />} />
        </Routes>
      </main>
    </div>
  );
};

const DashboardOverview = () => (
  <div>
    <h1 className="text-3xl mb-8 font-serif">Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="p-8 border bg-white rounded-sm">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Total Revenue</p>
        <p className="text-3xl font-serif">$4,250.00</p>
      </div>
      <div className="p-8 border bg-white rounded-sm">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Orders This Week</p>
        <p className="text-3xl font-serif">12</p>
      </div>
      <div className="p-8 border bg-white rounded-sm">
        <p className="text-xs uppercase tracking-widest text-muted mb-2">Active Listings</p>
        <p className="text-3xl font-serif">8</p>
      </div>
    </div>

    {/* Low Stock Alerts */}
    <div className="p-8 border bg-amber-50 rounded-sm">
      <h3 className="text-sm font-medium text-amber-900 mb-4 uppercase tracking-widest">Inventory Alerts</h3>
      <div className="flex justify-between items-center text-sm text-amber-800">
        <span>Heritage Notebook is low on stock (2 left)</span>
        <button className="underline font-medium">Restock</button>
      </div>
    </div>
  </div>
);

const ProductManager = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif">Products</h1>
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="border bg-white rounded-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted text-xs uppercase tracking-widest">
            <tr>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-t">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-sm"></div>
                  <span className="font-medium">Signature Inkwell</span>
                </div>
              </td>
              <td className="p-4">Ink</td>
              <td className="p-4">$45.00</td>
              <td className="p-4">15</td>
              <td className="p-4 text-right">
                <button className="text-accent text-xs font-medium hover:underline">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-8 z-50">
          <div className="bg-white w-full max-w-2xl rounded-sm p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">New Product Listing</h2>
              <button onClick={() => setShowModal(false)}><X size={24} /></button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-xs uppercase tracking-widest text-muted block mb-2">Product Name</label>
                  <input type="text" className="w-full border p-3 rounded-sm outline-none focus:border-accent" placeholder="e.g. Handmade Oak Pen" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted block mb-2">Price ($)</label>
                  <input type="number" className="w-full border p-3 rounded-sm outline-none focus:border-accent" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-muted block mb-2">Stock Count</label>
                  <input type="number" className="w-full border p-3 rounded-sm outline-none focus:border-accent" placeholder="0" />
                </div>
                <div className="col-span-2">
                  <label className="text-xs uppercase tracking-widest text-muted block mb-2">Category</label>
                  <select className="w-full border p-3 rounded-sm outline-none focus:border-accent">
                    <option>Notebooks</option>
                    <option>Ink & Pens</option>
                    <option>Wax Seals</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs uppercase tracking-widest text-muted block mb-2">Description</label>
                  <textarea rows="4" className="w-full border p-3 rounded-sm outline-none focus:border-accent" placeholder="Tell the story of this piece..."></textarea>
                </div>
                <div className="col-span-2">
                  <label className="text-xs uppercase tracking-widest text-muted block mb-2">Images</label>
                  <div className="border-2 border-dashed border-muted p-8 text-center rounded-sm text-sm text-muted">
                    Click to upload or drag and drop images
                  </div>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" className="btn-outline flex-1" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary flex-1">Publish Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const OrderInbox = () => (
  <div>
    <h1 className="text-3xl mb-8 font-serif">Order Inbox</h1>
    <div className="space-y-4">
      <div className="border bg-white p-6 rounded-sm flex justify-between items-center">
        <div>
          <p className="text-xs text-muted mb-1">ORDER #8271</p>
          <h4 className="font-medium">Heritage Notebook x 2</h4>
          <p className="text-sm text-muted">Customer: Julian Vane</p>
        </div>
        <div className="flex gap-4 items-center">
          <select className="border text-xs p-2 rounded-sm bg-[#FAFAF8]">
            <option>Received</option>
            <option>Packed</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
          <button className="btn-primary text-xs py-2">Update</button>
        </div>
      </div>
    </div>
  </div>
);

const EarningsOverview = () => (
  <div><h1 className="text-3xl mb-8 font-serif">Earnings Overview</h1></div>
);

const ShopPreview = () => (
  <div><h1 className="text-3xl mb-8 font-serif">Shop Preview</h1></div>
);

export default SellerDashboard;
