import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/pdd/products';
import { getComboProducts } from '@/data/pdd/combos';
import { useUserCombos } from '@/hooks/useUserCombos';
import { generateTitles, getHotKeywords } from '@/utils/pdd/titleGenerator';

export default function TitleGenerator() {
  const [selectedCombo, setSelectedCombo] = useState<string>('');
  const [customProducts, setCustomProducts] = useState<Product[]>([]);
  const [comboName, setComboName] = useState('');
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const presetCombos = useUserCombos();
  const hotKeywords = getHotKeywords();

  const handleComboSelect = (comboId: string) => {
    setSelectedCombo(comboId);
    const combo = presetCombos.find((c) => c.id === comboId);
    if (combo) {
      setComboName(combo.name);
      setCustomProducts(getComboProducts(combo.items));
    }
  };

  const generate = () => {
    if (customProducts.length === 0) return;
    const titles = generateTitles(customProducts, comboName, { count: 8 });
    setGeneratedTitles(titles);
  };

  const copyTitle = (title: string, index: number) => {
    navigator.clipboard.writeText(title).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const copyAllTitles = () => {
    const text = generatedTitles.map((t, i) => `${i + 1}. ${t}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
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
              <h1 className="text-xl font-bold text-gray-900">✏️ 标题生成</h1>
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
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">{combo.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{combo.description}</div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* 热搜关键词 */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mt-4">
              <h2 className="font-semibold text-gray-900 mb-3">🔥 热搜关键词参考</h2>
              <div className="flex flex-wrap gap-1.5">
                {hotKeywords.slice(0, 30).map((kw, i) => (
                  <span key={i} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 中间：配置 */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h2 className="font-semibold text-gray-900 mb-4">标题配置</h2>
              {customProducts.length > 0 ? (
                <div className="space-y-3 mb-4">
                  <p className="text-sm text-gray-500">包含产品：</p>
                  {customProducts.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                      <span className="text-sm">{p.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">请从左侧选择一个组合装</p>
              )}

              <input
                type="text"
                placeholder="组合名称（用于标题生成）"
                value={comboName}
                onChange={(e) => setComboName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />

              <button
                onClick={generate}
                disabled={customProducts.length === 0}
                className="w-full py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                生成标题（8个版本）
              </button>
            </div>
          </div>

          {/* 右侧：生成的标题 */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">生成的标题</h2>
                {generatedTitles.length > 0 && (
                  <button
                    onClick={copyAllTitles}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      copiedAll
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    {copiedAll ? '✅ 已复制' : '📋 全部复制'}
                  </button>
                )}
              </div>

              {generatedTitles.length > 0 ? (
                <div className="space-y-2">
                  {generatedTitles.map((title, i) => (
                    <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-lg p-3 group">
                      <span className="text-xs font-bold text-gray-400 mt-1 w-5">{i + 1}.</span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            title.length > 50 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {title.length}字
                          </span>
                          <span className="text-xs text-gray-400">
                            {title.length > 50 ? '✅ 符合长度' : '建议加长至50字以上'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => copyTitle(title, i)}
                        className={`text-xs px-2 py-1 rounded ${
                          copiedIndex === i
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300 opacity-0 group-hover:opacity-100'
                        } transition-all`}
                      >
                        {copiedIndex === i ? '已复制' : '复制'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">✏️</div>
                  <p className="text-sm text-gray-400">选择组合装并点击"生成标题"</p>
                  <p className="text-xs text-gray-300 mt-2">基于拼多多热搜词和标题规则自动生成</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
