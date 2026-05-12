import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { products, Product } from '@/data/pdd/products';
import { calculateCombo, getComboProducts, ComboItem } from '@/data/pdd/combos';
import {
  addUserCombo,
  deleteUserCombo,
  updateUserCombo,
} from '@/data/pdd/userComboStorage';
import { useUserCombos } from '@/hooks/useUserCombos';

/** 「自定义组合」「返回预设」共用：略大于文字的圆角边框按钮 */
const comboNavPillClass =
  'inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-100 hover:border-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';

export default function ComboBuilder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userCombos = useUserCombos();

  const [selectedProducts, setSelectedProducts] = useState<{ product: Product; quantity: number }[]>([]);
  const [comboName, setComboName] = useState('');
  const [comboDesc, setComboDesc] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showPreset, setShowPreset] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const loadedEditRef = useRef<string | null>(null);
  const editId = searchParams.get('edit') || searchParams.get('combo');

  const filteredProducts = searchKeyword
    ? products.filter((p) => p.name.includes(searchKeyword) || p.category.includes(searchKeyword))
    : products;

  useEffect(() => {
    if (!editId) {
      loadedEditRef.current = null;
      return;
    }
    const combo = userCombos.find((c) => c.id === editId);
    if (!combo) {
      loadedEditRef.current = null;
      navigate('/pdd/combos', { replace: true });
      return;
    }
    if (loadedEditRef.current === editId) return;
    loadedEditRef.current = editId;
    setComboName(combo.name);
    setComboDesc(combo.description);
    const comboProducts = getComboProducts(combo.items);
    setSelectedProducts(comboProducts.map((p) => ({ product: p, quantity: p.quantity })));
    setShowPreset(false);
  }, [editId, userCombos, navigate]);

  const clearBuilderForm = useCallback(() => {
    setComboName('');
    setComboDesc('');
    setSelectedProducts([]);
    loadedEditRef.current = null;
  }, []);

  const goCustomOnly = () => {
    navigate('/pdd/combos', { replace: true });
    setShowPreset(false);
    clearBuilderForm();
  };

  const goBackPresets = () => {
    navigate('/pdd/combos', { replace: true });
    setShowPreset(true);
    clearBuilderForm();
  };

  const loadPresetIntoBuilder = (presetId: string) => {
    navigate(`/pdd/combos?edit=${presetId}`, { replace: true });
  };

  const handleDeletePreset = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`确定删除预设「${name}」？`)) return;
    deleteUserCombo(id);
    if (editId === id) {
      navigate('/pdd/combos', { replace: true });
      clearBuilderForm();
      setShowPreset(true);
    }
  };

  const addProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.product.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }
    setSelectedProducts((prev) =>
      prev.map((p) => (p.product.id === productId ? { ...p, quantity } : p))
    );
  };

  const comboItems: ComboItem[] = selectedProducts.map((p) => ({
    productId: p.product.id,
    quantity: p.quantity,
  }));

  const { totalCost, suggestedPrice, profit, profitMargin } =
    comboItems.length > 0
      ? calculateCombo(comboItems)
      : { totalCost: 0, suggestedPrice: 0, profit: 0, profitMargin: 0 };

  const canSave = comboName.trim().length > 0 && comboItems.length > 0;

  const flashMessage = (msg: string) => {
    setSaveMessage(msg);
    window.setTimeout(() => setSaveMessage(null), 2500);
  };

  const handleSave = () => {
    if (!canSave) {
      flashMessage('请填写组合名称并至少添加一个产品');
      return;
    }
    const payload = {
      name: comboName.trim(),
      description: comboDesc.trim(),
      items: comboItems,
      category: '自定义',
      tags: ['自定义'],
    };
    if (editId) {
      const updated = updateUserCombo(editId, payload);
      if (updated) {
        flashMessage('已保存更改');
      } else {
        flashMessage('保存失败：未找到该预设');
      }
      return;
    }
    const created = addUserCombo(payload);
    navigate(`/pdd/combos?edit=${created.id}`, { replace: true });
    loadedEditRef.current = null;
    flashMessage('已保存为预设');
  };

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
              <h1 className="text-xl font-bold text-gray-900">🔗 组合装搭配</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showPreset && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">我的预设组合方案</h2>
            {userCombos.length === 0 ? (
              <p className="text-sm text-gray-500 mb-4">
                暂无已保存的预设。请先点击下方「自定义组合」，在下方搜索并添加产品，于中间「组合配置」中点击「保存为预设」。
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {userCombos.map((combo) => (
                  <div
                    key={combo.id}
                    className="relative rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      type="button"
                      onClick={() => loadPresetIntoBuilder(combo.id)}
                      className="w-full text-left pr-16 pb-6"
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">{combo.name}</h3>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-2">{combo.description}</p>
                      <div className="text-sm">
                        <span className="text-gray-500">成本 ¥{combo.totalCost.toFixed(2)}</span>
                        <span className="ml-3 font-semibold text-red-600">售价 ¥{combo.suggestedPrice.toFixed(2)}</span>
                      </div>
                    </button>
                    <div
                      className="absolute bottom-2 right-2 flex items-center gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        to={`/pdd/combos?edit=${combo.id}`}
                        className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                        title="编辑"
                      >
                        编辑
                      </Link>
                      <button
                        type="button"
                        title="删除"
                        onClick={(e) => handleDeletePreset(e, combo.id, combo.name)}
                        className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button type="button" onClick={goCustomOnly} className={`mt-4 ${comboNavPillClass}`}>
              自定义组合 →
            </button>
          </div>
        )}

        {!showPreset && (
          <button type="button" onClick={goBackPresets} className={`mb-4 ${comboNavPillClass}`}>
            ← 返回我的预设方案
          </button>
        )}

        <div className="space-y-6">
          {/* 2. 组合装配置 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">组合装配置</h2>
            {editId && (
              <p className="text-xs text-gray-500 mb-2">正在编辑预设（保存将更新当前方案）</p>
            )}

            <input
              type="text"
              placeholder="组合名称（如：火锅食材基础套餐）"
              value={comboName}
              onChange={(e) => setComboName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="组合描述"
              value={comboDesc}
              onChange={(e) => setComboDesc(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />

            <div className="space-y-2 mb-4">
              {selectedProducts.map((item) => (
                <div key={item.product.id} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                  <span className="flex-1 text-sm truncate">{item.product.name}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-white border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProduct(item.product.id)}
                    className="text-red-400 hover:text-red-600 ml-1"
                    aria-label="移除"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
              {selectedProducts.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">在下方搜索并点击产品添加到组合</p>
              )}
            </div>

            {selectedProducts.length > 0 && (
              <div className="border-t border-gray-200 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">总成本</span>
                  <span className="font-medium">¥{totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">建议售价</span>
                  <span className="font-semibold text-red-600 text-lg">¥{suggestedPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">利润</span>
                  <span className="font-medium text-green-600">¥{profit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">毛利率</span>
                  <span className="font-medium text-green-600">{profitMargin.toFixed(1)}%</span>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 space-y-2">
              {saveMessage && (
                <p className="text-sm text-green-600" role="status">
                  {saveMessage}
                </p>
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={!canSave}
                title={!canSave ? '请填写组合名称并至少添加一个产品' : undefined}
                className="w-full py-2.5 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {editId ? '保存更改' : '保存为预设'}
              </button>
            </div>
          </div>

          {/* 3. 搜索产品 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">搜索产品</h2>
            <input
              type="text"
              placeholder="搜索产品..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[500px] overflow-y-auto">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => addProduct(product)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-blue-50 hover:border-blue-200 text-left transition-colors"
                >
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">暂无</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{product.name}</div>
                    <div className="text-xs text-gray-500">¥{product.unitCost.toFixed(2)}/个 · 库存{product.stock}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
