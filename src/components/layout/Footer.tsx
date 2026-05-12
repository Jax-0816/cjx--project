import { Link } from 'react-router-dom';
import { brandInfo } from '@/data/site';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm">创</span>
              <span>{brandInfo.name}</span>
            </Link>
            <p className="text-sm leading-relaxed">
              {brandInfo.factory}，主打鲜虾滑、黑虎虾滑、青虾滑及多品类火锅食材，服务火锅连锁和餐饮采购客户。
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">快速导航</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-primary-light transition-colors">首页</Link>
              <Link to="/products" className="hover:text-primary-light transition-colors">产品中心</Link>
              <Link to="/about" className="hover:text-primary-light transition-colors">关于我们</Link>
              <Link to="/contact" className="hover:text-primary-light transition-colors">联系我们</Link>
              <a href={brandInfo.brochurePath} target="_blank" rel="noreferrer" className="hover:text-primary-light transition-colors">
                查看画册
              </a>
            </nav>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">联系方式</h4>
            <div className="text-sm space-y-2">
              <p>电话：{brandInfo.phone}</p>
              <p>工厂：{brandInfo.factory}</p>
              <p>地址：{brandInfo.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {brandInfo.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
