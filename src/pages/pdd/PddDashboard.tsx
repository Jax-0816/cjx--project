import { Link, useNavigate } from 'react-router-dom';
import { products } from '@/data/pdd/products';
import { deleteUserCombo } from '@/data/pdd/userComboStorage';
import { useUserCombos } from '@/hooks/useUserCombos';

const tools = [
  {
    title: '📦 产品管理',
    desc: '管理你的86个SKU，查看库存、成本、规格、标签与产品信息',
    path: '/pdd/products',
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  },
  {
    title: '🔗 组合装搭配',
    desc: '创建产品组合，自动计算成本和建议售价',
    path: '/pdd/combos',
    color: 'bg-green-50 border-green-200 hover:bg-green-100',
  },
  {
    title: '🖼️ 图片指令生成',
    desc: '生成ChatGPT可执行的图片提示词（主图+详情页）',
    path: '/pdd/image-prompts',
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
  },
  {
    title: '✏️ 标题生成',
    desc: '根据拼多多规则自动生成高流量商品标题',
    path: '/pdd/titles',
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
  },
  {
    title: '🏷️ SKU设置',
    desc: '智能生成多规格SKU，含防比价布局建议',
    path: '/pdd/skus',
    color: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
  },
  {
    title: '📊 市场调研',
    desc: '竞品对比分析、利润计算、ROI分析',
    path: '/pdd/market',
    color: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
  },
];

export default function PddDashboard() {
  const navigate = useNavigate();
  const combos = useUserCombos();
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockProducts = products.filter((p) => p.stock < 10).length;
  const totalValue = products.reduce((sum, p) => sum + p.costPrice * p.stock, 0);

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`确定删除预设「${name}」？`)) return;
    deleteUserCombo(id);
  };

  const openCombo = (id: string) => {
    navigate(`/pdd/combos?edit=${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold text-gray-900">拼多多运营工具</h1>
            </div>
            <span className="text-sm text-gray-500">创极鲜 · 常温火锅食材</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
            <div className="text-sm text-gray-500 mt-1">产品SKU总数</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-gray-900">{totalStock.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mt-1">总库存（件）</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-red-600">{lowStockProducts}</div>
            <div className="text-sm text-gray-500 mt-1">低库存产品</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl font-bold text-green-600">¥{totalValue.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mt-1">库存总价值</div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">快捷操作</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className={`rounded-xl border-2 p-5 transition-all ${tool.color}`}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-600">{tool.desc}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-gray-900 mb-4">预设组合装方案</h2>
        {combos.length === 0 ? (
          <p className="text-sm text-gray-500 mb-4">
            暂无保存的预设。请前往「组合装搭配」自定义组套并点击「保存为预设」。
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {combos.map((combo) => (
              <div
                key={combo.id}
                className="relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => openCombo(combo.id)}
                  className="w-full text-left pr-14 pb-6"
                >
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="font-semibold text-gray-900">{combo.name}</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full shrink-0">
                      {combo.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{combo.description}</p>
                  <div className="flex items-center justify-between text-sm flex-wrap gap-2">
                    <span className="text-gray-500">成本 ¥{combo.totalCost.toFixed(2)}</span>
                    <span className="font-semibold text-red-600">售价 ¥{combo.suggestedPrice.toFixed(2)}</span>
                    <span className="text-green-600">利润 {combo.profitMargin.toFixed(0)}%</span>
                  </div>
                </button>
                <div
                  className="absolute bottom-3 right-3 flex items-center gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    to={`/pdd/combos?edit=${combo.id}`}
                    className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    编辑
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, combo.id, combo.name)}
                    className="text-xs px-2 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
