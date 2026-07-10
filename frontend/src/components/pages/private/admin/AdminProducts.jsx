import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { createProduct, deleteProduct, getAdminProducts, updateProduct } from '../../../../api/products';

const initialForm = {
    name: '',
    notes: '',
    price: '',
    image: '',
    tag: '',
    featured: false,
    gender: 'Unisex',
    story: '',
    type: 1,
    isActive: true,
};

const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
        return imagePath;
    }
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
};

export default function AdminProducts() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);

    // Image file state (for preview and conversion)
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getAdminProducts();
            setProducts(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to load products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const sortedProducts = useMemo(() => [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [products]);

    // Fixed tag options
    const tagOptions = [
        { value: '', label: 'No tag' },
        { value: 'Featured', label: 'Featured' },
        { value: 'New', label: 'New' },
    ];

    const resetForm = () => {
        setForm(initialForm);
        setEditingId(null);
        setImageFile(null);
        setImagePreview('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // If we have an image file, convert to base64 data URL and set it in form.image
            let payload = { ...form };
            if (imageFile) {
                const reader = new FileReader();
                const dataUrl = await new Promise((resolve) => {
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(imageFile);
                });
                payload.image = dataUrl;
            }

            if (editingId) {
                await updateProduct(editingId, payload);
            } else {
                await createProduct(payload);
            }

            resetForm();
            await loadProducts();
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to save product.');
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        setForm({
            name: product.name || '',
            notes: product.notes || '',
            price: product.price || '',
            image: product.image || '',
            tag: product.tag || '',
            featured: Boolean(product.featured),
            gender: product.gender || 'Unisex',
            story: product.story || '',
            type: Number(product.type || 1),
            isActive: product.isActive !== false,
        });
        setImageFile(null);
        setImagePreview(getImageUrl(product.image));
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await deleteProduct(id);
            await loadProducts();
        } catch (err) {
            setError(err.response?.data?.message || 'Could not delete product.');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview('');
        }
    };

    return (
        <section className="min-h-screen px-6 py-24 text-black dark:text-white">
            <div className="mx-auto max-w-7xl rounded-3xl border border-black/10 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-dark-teal/80">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-old-gold">Admin Panel</p>
                        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Products</h1>
                        <p className="mt-3 max-w-2xl text-base text-black/70 dark:text-white/70">
                            Create, update, and remove fragrances directly from the database so the public pages stay in sync.
                        </p>
                    </div>
                    <div className="rounded-full border border-old-gold/40 px-4 py-2 text-sm text-black/70 dark:text-white/70">
                        Signed in as {user?.firstName || 'Admin'}
                    </div>
                </div>

                {error && <div className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-900/20 dark:text-rose-300">{error}</div>}

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-black/10 bg-black/5 p-6 dark:border-white/10 dark:bg-white/5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">{editingId ? 'Edit product' : 'Add a new product'}</h2>
                            {editingId && <button type="button" onClick={resetForm} className="text-sm text-old-gold">Cancel</button>}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="text-sm">
                                <span className="mb-1 block text-black/70 dark:text-white/70">Name</span>
                                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-dark-teal" />
                            </label>
                            <label className="text-sm">
                                <span className="mb-1 block text-black/70 dark:text-white/70">Price</span>
                                <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-dark-teal" />
                            </label>

                            {/* Image upload */}
                            <div className="md:col-span-2">
                                <label className="text-sm block mb-1 text-black/70 dark:text-white/70">Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-black/70 dark:text-white/70 file:mr-4 file:rounded-xl file:border-0 file:bg-old-gold/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-old-gold hover:file:bg-old-gold/30"
                                />
                                {imagePreview && (
                                    <div className="mt-2 relative w-32 h-32 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            {/* Tag select - fixed options */}
                            <label className="text-sm">
                                <span className="mb-1 block text-black/70 dark:text-white/70">Tag</span>
                                <select
                                    value={form.tag}
                                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-dark-teal"
                                >
                                    {tagOptions.map(({ value, label }) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="text-sm">
                                <span className="mb-1 block text-black/70 dark:text-white/70">Gender</span>
                                <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-dark-teal">
                                    <option value="Unisex">Unisex</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                </select>
                            </label>
                            <label className="text-sm">
                                <span className="mb-1 block text-black/70 dark:text-white/70">Type</span>
                                <select value={form.type} onChange={(e) => setForm({ ...form, type: Number(e.target.value) })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-dark-teal">
                                    <option value={1}>Type 1</option>
                                    <option value={2}>Type 2</option>
                                </select>
                            </label>
                        </div>

                        <label className="block text-sm">
                            <span className="mb-1 block text-black/70 dark:text-white/70">Notes</span>
                            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows="3" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-dark-teal" />
                        </label>

                        <label className="block text-sm">
                            <span className="mb-1 block text-black/70 dark:text-white/70">Story</span>
                            <textarea value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} rows="3" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-dark-teal" />
                        </label>

                        <div className="flex flex-wrap gap-4 text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                                Featured on home page
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                                Active product
                            </label>
                        </div>

                        <button type="submit" className="rounded-xl bg-old-gold px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
                            {editingId ? 'Save changes' : 'Create product'}
                        </button>
                    </form>

                    {/* Product list */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Current products</h2>
                        {loading ? (
                            <div className="rounded-2xl border border-dashed border-black/10 p-6 text-sm text-black/60 dark:border-white/10 dark:text-white/60">Loading products…</div>
                        ) : sortedProducts.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-black/10 p-6 text-sm text-black/60 dark:border-white/10 dark:text-white/60">No products yet.</div>
                        ) : (
                            sortedProducts.map((product) => (
                                <div key={product._id} className="rounded-2xl border border-black/10 bg-black/5 p-4 dark:border-white/10 dark:bg-white/5">
                                    <div className="flex gap-3">
                                        {product.image ? (
                                            <img src={getImageUrl(product.image)} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                                        ) : (
                                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-old-gold/20 text-sm font-semibold text-old-gold">{product.name?.charAt(0) || 'P'}</div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold">{product.name}</h3>
                                                {product.featured && <span className="rounded-full bg-old-gold/20 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-old-gold">Featured</span>}
                                                {!product.isActive && <span className="rounded-full border border-black/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-black/60 dark:border-white/10">Inactive</span>}
                                            </div>
                                            <p className="mt-1 text-sm text-black/60 dark:text-white/60">{product.notes}</p>
                                            <p className="mt-1 text-sm text-old-gold">{product.price}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button onClick={() => handleEdit(product)} className="rounded-xl border border-black/10 px-3 py-2 text-sm dark:border-white/10">Edit</button>
                                        <button onClick={() => handleDelete(product._id)} className="rounded-xl border border-rose-400/30 px-3 py-2 text-sm text-rose-600 dark:text-rose-300">Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}