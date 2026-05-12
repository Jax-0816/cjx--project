import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/pdd/products';
import { getComboProducts, calculateCombo } from '@/data/pdd/combos';
import { useUserCombos } from '@/hooks/useUserCombos';
import { generateAntiComparisonSkus, formatSkusForCopy } from '@/utils/pdd/skuGenerator';

export default function SkuSetting() {
  const [selectedCombo, setSelectedCombo] = useState<string>('');
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [comboName, setComboName] = useState('');
  const [copied, setCopied] = useState(false);

  const presetCombos = useUserCombos();

  const handleComboSelect = (comboId: string) => {
    setSelectedCombo(comboId);
    const combo = presetCombos.find((c) => c.id === comboId);
    if (combo) {
      setComboName(combo.name);
      setCustomProducts(getComboProducts(combo.items));
    }
  };

  const comboItems = customProducts.map((p) => ({
    productId: p.id,
    quantity: 1,
  }));
  const { totalCost, suggestedPrice } = comboItems.length > 0
    ? calculateCombo(comboItems)
    : { totalCost: 0, suggestedPrice: 0 };

  const skuResult = customProducts.length > 0
    ? generateAntiComparisonSkus(customProducts, totalCost, suggestedPrice)
    : null;

  const copySkus = () => {
    if (!skuResult) return;
    const text = formatSkusForCopy(skuResult.skus);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
              <h1 className="text-xl font-bold text-gray-900">🏷️ SKU设置</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：选择组合 */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-900 mb-4">选择组合装</h2>
              <div className="space-y-2">
                {presetCombos.length === 0 ? (
                  <p className="text-sm text-gray-500">请先在「组合装搭配」中保存预设组合。</p>
                ) : (
                  presetCombos.map((combo) => (
                    <button
                      key={combo.id}
                      type="button"
                      onClick={() => handleComboSelect(combo.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedCombo === combo.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">{combo.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{combo.description}</div>
                      <div className="text-xs text-gray-400 mt-1">售价 ¥{combo.suggestedPrice.toFixed(2)}</div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 中间：SKU方案 */}
          <div className="lg:col-span-2">
            {skuResult ? (
              <div className="space-y-4">
                {/* SKU方案 */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-semibold text-gray-900">{skuResult.title}</h2>
                      {comboName ? (
                        <p className="text-xs text-gray-500 mt-0.5">当前组合：{comboName}</p>
                      ) : null}
                      <p className="text-sm text-gray-500 mt-1">{skuResult.description}</p>
                    </div>
                    <button
                      onClick={copySkus}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        copied
                          ? 'bg-green-100 text-green-700'
                          : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                      }`}
                    >
                      {copied ? '✅ 已复制' : '📋 复制SKU方案'}
                    </button>
                  </div>

                  {skuResult.skus.map((group, gi) => (
                    <div key={gi} className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3">{group.groupName}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {group.options.map((sku, si) => (
                          <div
                            key={si}
                            className={`rounded-lg border-2 p-4 ${
                              sku.isMain
                                ? 'border-pink-500 bg-pink-50'
                                : sku.isLossLeader
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm text-gray-900">{sku.name}</span>
                              <div className="flex gap-1">
                                {sku.isMain && (
                                  <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">主推</span>
                                )}
                                {sku.isLossLeader && (
                                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">引流</span>
                                )}
                              </div>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">售价</span>
                                <span className="font-semibold text-red-600">¥{sku.price.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">成本</span>
                                <span>¥{sku.cost.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">利润</span>
                                <span className="text-green-600">¥{sku.profit.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">库存</span>
                                <span>{sku.stock} 件</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 防比价技巧 */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                  <h2 className="font-semibold text-gray-900 mb-3">💡 防比价技巧</h2>
                  <div className="space-y-2">
                    {skuResult.tips.map((tip, i) => (
                      <div key={i} className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🏷️</div>
                  <p className="text-sm text-gray-400">请从左侧选择一个组合装</p>
                  <p className="text-xs text-gray-300 mt-2">系统将自动生成多规格SKU方案和防比价布局建议</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
