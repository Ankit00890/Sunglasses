import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { staticProducts } from '../constants/products';
import { API_ENDPOINTS, getImageUrl, API_BASE_URL } from '../config';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    // Verification: ensure admin is logged in
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = localStorage.getItem('adminToken'); // This is the hardcoded session token
        
        if (!token && (!userInfo || userInfo.role !== 'admin')) {
            if (!sessionStorage.getItem('adminSignedOut')) {
                toast.error('UNAUTHORIZED ACCESS: This vault is protected.');
            }
            navigate('/admin');
            return;
        }
        
        // Clear flag upon successful entry
        sessionStorage.removeItem('adminSignedOut');
        fetchAdminProducts();
    }, [navigate]);

    const fetchAdminProducts = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.PRODUCTS.BASE);
            const data = await response.json();
            const simulated = JSON.parse(localStorage.getItem('simulated_products') || '[]');
            
            if (data && data.length > 0) {
                setProducts([...data, ...simulated]);
            } else {
                setProducts([...staticProducts, ...simulated]);
            }
        } catch (error) {
            const simulated = JSON.parse(localStorage.getItem('simulated_products') || '[]');
            setProducts([...staticProducts, ...simulated]);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create a preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setEditingId(product._id || product.id);
        setName(product.name);
        setPrice(product.price);
        setPreview(getImageUrl(product.image));
        setMessage({ text: `Editing: ${product.name}`, type: 'warning' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product permanently?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(API_ENDPOINTS.PRODUCTS.BY_ID(id), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setMessage({ text: 'Product deleted from database', type: 'success' });
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            // Simulation Delete
            const simulated = JSON.parse(localStorage.getItem('simulated_products') || '[]');
            const updated = simulated.filter(p => (p._id || p.id) !== id);
            localStorage.setItem('simulated_products', JSON.stringify(updated));
            setMessage({ text: 'SIMULATION: Product removed from browser memory', type: 'warning' });
        }
        fetchAdminProducts();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        if (image) formData.append('image', image);

        try {
            const token = localStorage.getItem('adminToken');
            const url = isEditing 
                ? API_ENDPOINTS.PRODUCTS.BY_ID(editingId)
                : API_ENDPOINTS.PRODUCTS.BASE;
            
            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                setMessage({ text: `Product ${isEditing ? 'updated' : 'added'} successfully!`, type: 'success' });
                resetForm();
            } else {
                throw new Error('Server error');
            }
        } catch (error) {
            // Simulation Mode with Base64 Persistence
            const simulated = JSON.parse(localStorage.getItem('simulated_products') || '[]');
            if (isEditing) {
                const updated = simulated.map(p => 
                    (p._id || p.id) === editingId ? { ...p, name, price, image: preview || p.image } : p
                );
                localStorage.setItem('simulated_products', JSON.stringify(updated));
            } else {
                const newProd = { 
                    id: Date.now(), 
                    name, 
                    price, 
                    image: preview || '/images/Nior.jpg', // Using base64 preview for persistence
                    simulated: true 
                };
                localStorage.setItem('simulated_products', JSON.stringify([...simulated, newProd]));
            }
            setMessage({ text: `SIMULATION: Product ${isEditing ? 'updated' : 'added'} (Backend down)`, type: 'warning' });
            resetForm();
        } finally {
            setLoading(false);
            fetchAdminProducts();
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setImage(null);
        setPreview(null);
        setIsEditing(false);
        setEditingId(null);
    };

    return (
        <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white">
                        Admin <span className="text-yellow-400">Vault</span>
                    </h1>
                    <button 
                        onClick={() => { 
                            sessionStorage.setItem('adminSignedOut', 'true');
                            localStorage.removeItem('adminToken'); 
                            navigate('/'); 
                        }}
                        className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 hover:text-white transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Form Section */}
                <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-10 rounded-sm mb-12">
                    <h2 className="text-sm font-black tracking-[0.3em] uppercase text-yellow-400 mb-8 flex items-center gap-3">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        {isEditing ? 'Update Intelligence' : 'Deploy New Post'}
                    </h2>

                    {message.text && (
                        <div className={`p-4 mb-8 text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm border ${
                            message.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            {/* Preview Area */}
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                                {preview ? (
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-[8px] font-bold text-zinc-700 tracking-tighter uppercase px-4 text-center">No Image Selected</span>
                                )}
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <input 
                                    type="text" 
                                    placeholder="PRODUCT NAME" 
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-5 py-4 focus:border-yellow-400 outline-none text-xs font-bold tracking-widest uppercase"
                                    value={name} onChange={(e) => setName(e.target.value)} required
                                />
                                <input 
                                    type="text" 
                                    placeholder="PRICE (₹)" 
                                    className="w-full bg-zinc-950 border border-zinc-800 text-white px-5 py-4 focus:border-yellow-400 outline-none text-xs font-bold tracking-widest"
                                    value={price} onChange={(e) => setPrice(e.target.value)} required
                                />
                            </div>
                        </div>

                        <div className="relative group border-2 border-dashed border-zinc-800 p-8 text-center cursor-pointer hover:border-yellow-400 transition-colors bg-zinc-950/30">
                            <input type="file" id="file" className="hidden" onChange={handleFileChange} />
                            <label htmlFor="file" className="cursor-pointer">
                                <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                                    {image ? image.name : 'UPLOAD NEW ASSET (IMAGE)'}
                                </span>
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black py-5 font-black uppercase tracking-[0.2em] text-xs transition-transform active:scale-95"
                            >
                                {loading ? 'SYNCING...' : isEditing ? 'UPDATE ASSET' : 'POST TO COLLECTION'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={resetForm} className="px-8 border border-zinc-800 text-zinc-500 hover:text-white uppercase text-[10px] font-bold">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Management Section */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-sm">
                    <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                        <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400">Current Collection</h2>
                        <span className="text-[10px] font-bold text-zinc-600 uppercase">{products.length} Items</span>
                    </div>
                    <div className="divide-y divide-zinc-800">
                        {products.map(product => (
                            <div key={product._id || product.id} className="p-4 flex items-center justify-between group hover:bg-zinc-950/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-800 overflow-hidden">
                                        <img 
                                            src={getImageUrl(product.image)} 
                                            alt="" className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-black italic uppercase tracking-tighter text-zinc-100">{product.name}</p>
                                        <p className="text-[10px] font-bold text-yellow-400 tracking-widest">₹{product.price}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(product)} className="px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-white hover:border-yellow-400 transition-all text-[10px] font-bold uppercase">Edit</button>
                                    <button onClick={() => handleDelete(product._id || product.id)} className="px-4 py-2 border border-zinc-700 text-zinc-400 hover:text-red-500 hover:border-red-500 transition-all text-[10px] font-bold uppercase">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

