import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products as initialProducts, getAllCategories, Product } from '@/data/pdd/products';

export default function ProductManage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['全部', ...getAllCategories()];

  const filteredProducts = (() => {
    const base = selectedCategory === '全部' ? products : products.filter((p) => p.category === selectedCategory);
    if (!searchKeyword) return base;
    const kw = searchKeyword.toLowerCase();
    return base.filter(
      (p) =>
        p.name.toLowerCase().includes(kw) ||
        p.brand.toLowerCase().includes(kw) ||
        p.category.toLowerCase().includes(kw) ||
        p.subCategory.toLowerCase().includes(kw)
    );
  })();

  const openEdit = () => {
    if (!selectedProduct) return;
    setEditForm({ ...selectedProduct, tags: [...selectedProduct.tags] });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditForm(null);
    setIsEditing(false);
  };

  const saveEdit = () => {
    if (!editForm) return;
    setProducts((prev) => prev.map((p) => (p.id === editForm.id ? editForm : p)));
    setSelectedProduct(editForm);
    setEditForm(null);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editForm) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditForm({ ...editForm, image: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const updateEditField = (field: keyof Product, value: string | number | string[]) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [field]: value });
  };

  const displayProduct = isEditing && editForm ? editForm : selectedProduct;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/pdd" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">📦 产品管理</h1>
            </div>
            <span className="text-sm text-gray-500">共 {products.length} 个SKU</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索产品名称、品牌、分类..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">产品名称</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">品牌</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">规格</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">成本价</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">库存</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">标签</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                            暂无图
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{product.brand}</td>
                    <td className="px-4 py-3 text-gray-600">{product.spec}</td>
                    <td className="px-4 py-3 text-right font-medium">¥{product.unitCost.toFixed(2)}</td>
                    <td className={`px-4 py-3 text-right font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.stock}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-1 justify-center">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              tag === '爆款'
                                ? 'bg-red-100 text-red-700'
                                : tag === '引流款'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {displayProduct && (
          <>
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => { setSelectedProduct(null); setIsEditing(false); setEditForm(null); }}
            >
              <div
                className="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {isEditing ? (
                        <div
                          className="w-20 h-20 rounded-xl flex-shrink-0 cursor-pointer relative group border-2 border-dashed border-blue-400 bg-gray-50 flex items-center justify-center overflow-hidden"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {editForm?.image ? (
                            <img src={editForm.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-400">点击上传</span>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-colors">
                            <span className="text-white text-xs opacity-0 group-hover:opacity-100">更换图片</span>
                          </div>
                        </div>
                      ) : (
                        displayProduct.image ? (
                          <img src={displayProduct.image} alt={displayProduct.name} className="w-20 h-20 rounded-xl object-cover" />
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">暂无图</div>
                        )
                      )}
                      <div>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm?.name || ''}
                            onChange={(e) => updateEditField('name', e.target.value)}
                            className="text-xl font-bold text-gray-900 border border-gray-300 rounded-lg px-2 py-1 w-full"
                          />
                        ) : (
                          <h2 className="text-xl font-bold text-gray-900">{displayProduct.name}</h2>
                        )}
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm?.brand || ''}
                            onChange={(e) => updateEditField('brand', e.target.value)}
                            className="text-sm text-gray-500 border border-gray-300 rounded-lg px-2 py-1 mt-1"
                          />
                        ) : (
                          <p className="text-sm text-gray-500 mt-1">{displayProduct.brand}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setSelectedProduct(null); setIsEditing(false); setEditForm(null); }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">规格</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm?.spec || ''}
                          onChange={(e) => updateEditField('spec', e.target.value)}
                          className="font-semibold text-gray-900 mt-1 border border-gray-300 rounded-lg px-2 py-1 w-full"
                        />
                      ) : (
                        <div className="font-semibold text-gray-900 mt-1">{displayProduct.spec}</div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">箱规</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm?.packageSpec || ''}
                          onChange={(e) => updateEditField('packageSpec', e.target.value)}
                          className="font-semibold text-gray-900 mt-1 border border-gray-300 rounded-lg px-2 py-1 w-full"
                        />
                      ) : (
                        <div className="font-semibold text-gray-900 mt-1">{displayProduct.packageSpec}</div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">单个成本</div>
                      {isEditing ? (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="font-semibold text-gray-900">¥</span>
                          <input
                            type="number"
                            step="0.01"
                            value={editForm?.unitCost || 0}
                            onChange={(e) => updateEditField('unitCost', Number(e.target.value))}
                            className="font-semibold text-gray-900 border border-gray-300 rounded-lg px-2 py-1 w-full"
                          />
                        </div>
                      ) : (
                        <div className="font-semibold text-gray-900 mt-1">¥{displayProduct.unitCost.toFixed(2)}</div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">库存</div>
                      {isEditing ? (
                        <div className="flex items-center gap-1 mt-1">
                          <input
                            type="number"
                            value={editForm?.stock || 0}
                            onChange={(e) => updateEditField('stock', Number(e.target.value))}
                            className="font-semibold text-gray-900 border border-gray-300 rounded-lg px-2 py-1 w-full"
                          />
                          <span className="text-sm text-gray-500">件</span>
                        </div>
                      ) : (
                        <div className={`font-semibold mt-1 ${displayProduct.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                          {displayProduct.stock} 件
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">运费</div>
                      {isEditing ? (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="font-semibold text-gray-900">¥</span>
                          <input
                            type="number"
                            step="0.01"
                            value={editForm?.freight || 0}
                            onChange={(e) => updateEditField('freight', Number(e.target.value))}
                            className="font-semibold text-gray-900 border border-gray-300 rounded-lg px-2 py-1 w-full"
                          />
                        </div>
                      ) : (
                        <div className="font-semibold text-gray-900 mt-1">¥{displayProduct.freight.toFixed(2)}</div>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">标签</div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm?.tags?.join(', ') || ''}
                          onChange={(e) =>
                            updateEditField(
                              'tags',
                              e.target.value
                                .split(',')
                                .map((t) => t.trim())
                                .filter(Boolean)
                            )
                          }
                          placeholder="爆款, 利润款, 引流款"
                          className="font-semibold text-gray-900 mt-1 border border-gray-300 rounded-lg px-2 py-1 w-full text-sm"
                        />
                      ) : (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {displayProduct.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing ? (
                    <textarea
                      value={editForm?.description || ''}
                      onChange={(e) => updateEditField('description', e.target.value)}
                      rows={3}
                      className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 w-full border border-gray-300 resize-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4">{displayProduct.description}</p>
                  )}

                  <div className="flex justify-end gap-3 mt-6">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          取消
                        </button>
                        <button
                          type="button"
                          onClick={saveEdit}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          保存
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={openEdit}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        编辑
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </>
        )}
      </div>
    </div>
  );
}
