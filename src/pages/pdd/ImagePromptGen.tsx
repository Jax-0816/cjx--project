import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/pdd/products';
import { getComboProducts } from '@/data/pdd/combos';
import { useUserCombos } from '@/hooks/useUserCombos';
import { generateAllImagePrompts, formatPromptsForCopy } from '@/utils/pdd/imagePromptGenerator';

export default function ImagePromptGen() {
  const [selectedCombo, setSelectedCombo] = useState<string>('');
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [comboName, setComboName] = useState('');
  const [comboDesc, setComboDesc] = useState('');
  const [generatedPrompts, setGeneratedPrompts] = useState<{
    mainImages: { name: string; description: string; prompt: string }[];
    detailImages: { name: string; description: string; prompt: string }[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const presetCombos = useUserCombos();

  const handleComboSelect = (comboId: string) => {
    setSelectedCombo(comboId);
    const combo = presetCombos.find((c) => c.id === comboId);
    if (combo) {
      setComboName(combo.name);
      setComboDesc(combo.description);
      setCustomProducts(getComboProducts(combo.items));
    }
  };

  const generatePrompts = () => {
    if (customProducts.length === 0) return;
    const prompts = generateAllImagePrompts(customProducts, comboName, comboDesc);
    setGeneratedPrompts(prompts);
    setCopied(false);
  };

  const copyAllPrompts = () => {
    if (!generatedPrompts) return;
    const mainText = formatPromptsForCopy(generatedPrompts.mainImages);
    const detailText = formatPromptsForCopy(generatedPrompts.detailImages);
    const fullText = `【主图提示词】\n${mainText}\n\n【详情页提示词】\n${detailText}`;
    navigator.clipboard.writeText(fullText).then(() => {
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
              <h1 className="text-xl font-bold text-gray-900">🖼️ 图片指令生成</h1>
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
                          ? 'border-blue-500 bg-blue-50'
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

          {/* 中间：已选产品 */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-900 mb-4">已选产品</h2>
              {customProducts.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {customProducts.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs">暂无</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.spec}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">请从左侧选择一个组合装</p>
              )}

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="组合名称"
                  value={comboName}
                  onChange={(e) => setComboName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="组合描述（如：火锅必备三件套）"
                  value={comboDesc}
                  onChange={(e) => setComboDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={generatePrompts}
                  disabled={customProducts.length === 0}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  生成图片提示词
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：生成的提示词 */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">生成的提示词</h2>
                {generatedPrompts && (
                  <button
                    onClick={copyAllPrompts}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      copied
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {copied ? '✅ 已复制' : '📋 全部复制'}
                  </button>
                )}
              </div>

              {generatedPrompts ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {/* 主图提示词 */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      主图提示词（5张）
                    </h3>
                    {generatedPrompts.mainImages.map((img, i) => (
                      <div key={i} className="bg-purple-50 rounded-lg p-3 mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-purple-700">第{i + 1}张：{img.name}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(img.prompt);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className="text-xs text-purple-500 hover:text-purple-700"
                          >
                            复制
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{img.prompt}</p>
                      </div>
                    ))}
                  </div>

                  {/* 详情页提示词 */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      详情页提示词（5张）
                    </h3>
                    {generatedPrompts.detailImages.map((img, i) => (
                      <div key={i} className="bg-blue-50 rounded-lg p-3 mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-blue-700">第{i + 1}张：{img.name}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(img.prompt);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                            className="text-xs text-blue-500 hover:text-blue-700"
                          >
                            复制
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{img.prompt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🖼️</div>
                  <p className="text-sm text-gray-400">选择组合装并点击"生成图片提示词"</p>
                  <p className="text-xs text-gray-300 mt-2">生成的提示词可直接复制到ChatGPT执行</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
