import React, { useState } from 'react';
import { 
  Heart, ShoppingBag, Truck, ShieldCheck, Sparkles, Send, 
  HelpCircle, ChevronRight, Calculator, RefreshCw, AlertCircle,
  Plus, Minus, Check, MessageSquare
} from 'lucide-react';

// 商品データ
const PRODUCTS = [
  {
    id: "bolognese",
    name: "和牛と完熟トマトの極上ボロネーゼ",
    tag: "一番人気",
    description: "淡路島産玉ねぎとじっくり煮込んだ肉感あふれる逸品",
    calories: "380kcal",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800",
    badges: ["完全無添加", "高タンパク", "化学調味料ゼロ"],
    ingredients: "牛豚合挽肉（国産）、トマト缶、玉ねぎ、赤ワイン、オリーブオイル、塩、ニンニク、香辛料"
  },
  {
    id: "genovese",
    name: "国産大葉と松の実の濃厚ジェノベーゼ",
    tag: "香り豊か",
    description: "大分県産の大葉を100%使用した爽やかで濃厚な味わい",
    calories: "320kcal",
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800",
    badges: ["完全無添加", "国産大葉100%", "着色料ゼロ"],
    ingredients: "大葉（大分県産）、オリーブオイル、ナチュラルチーズ、松の実、塩、ニンニク"
  },
  {
    id: "carbonara",
    name: "無塩せきベーコンの濃厚カルボナーラ",
    tag: "子供に人気",
    description: "発色剤不使用ベーコンと厳選チーズのやさしいコク",
    calories: "410kcal",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800",
    badges: ["完全無添加", "無塩せき肉", "保存料ゼロ"],
    ingredients: "生クリーム（北海道産）、卵黄、無塩せきベーコン、ナチュラルチーズ、塩、黒コショウ"
  }
];

export default function App() {
  const [quantities, setQuantities] = useState({ bolognese: 2, genovese: 1, carbonara: 1 });
  const [customLetter, setCustomLetter] = useState("体に気をつけてしっかり食べてね！応援してるよ。");
  const [activeTab, setActiveTab] = useState("store");

  // 計算用数値
  const PRICE_PER_SET = 3200; // 4食セット販売価格（送料込）
  const INGREDIENT_COST = 800; // 4食分の仕入れ・製造原価
  const SHIPPING_COST = 700; // 冷凍配送コスト
  const PACKAGING_COST = 200; // ギフト箱・手紙印刷コスト

  const totalQuantity = Object.values(quantities).reduce((a, b) => a + b, 0);

  const handleQuantityChange = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  return (
    <div className="min-h-screen bg-amber-50/30 text-gray-800 font-sans">
      {/* ナビゲーションバー */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 text-white p-2 rounded-xl shadow-md">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-gray-900 block leading-tight">かぞくの手紙パスタ</span>
              <span className="text-[10px] text-amber-700 font-medium">離れて暮らす大切な人へ贈る無添加パスタソース</span>
            </div>
          </div>

          <div className="flex bg-amber-100/60 p-1 rounded-full text-xs font-medium">
            <button
              onClick={() => setActiveTab("store")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeTab === "store" ? "bg-white text-orange-600 shadow-sm font-bold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🛍️ ECストア
            </button>
            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                activeTab === "simulator" ? "bg-white text-emerald-600 shadow-sm font-bold" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📊 経営シミュレーター
            </button>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      {activeTab === "store" ? (
        <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
          {/* ヒーローセクション */}
          <section className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4 max-w-lg">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium">
                ✨ 完全無添加・冷凍パスタソース仕送り便
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                「元気でやってる？」<br />言葉の代わりに、温かいスープとパスタを。
              </h1>
              <p className="text-orange-100 text-sm md:text-base leading-relaxed">
                一人暮らしのお子様やご両親へ。栄養満点で化学調味料一切不使用のパスタソースに、あなた自筆のオリジナル手紙を添えてお届けします。
              </p>
            </div>
          </section>

          {/* 商品一覧 */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">100%無添加 パスタソースラインナップ</h2>
              <p className="text-sm text-gray-500">お好きな味を組み合わせて合計4食（1セット）からお届けします</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                      {product.tag}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-900 leading-snug">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {product.badges.map((badge, idx) => (
                          <span key={idx} className="bg-amber-50 text-amber-800 text-[10px] px-2 py-0.5 rounded border border-amber-200">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="text-xs text-gray-400">{product.calories}</span>
                      <div className="flex items-center border rounded-lg bg-gray-50">
                        <button 
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="p-1.5 hover:bg-gray-200 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                        <span className="px-3 font-bold text-sm">{quantities[product.id]}</span>
                        <button 
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="p-1.5 hover:bg-gray-200 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 手紙メッセージ入力 */}
          <section className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-bold">
              <MessageSquare className="w-5 h-5" />
              <h3>同梱する仕送りメッセージ（無料サービス）</h3>
            </div>
            <textarea
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value)}
              className="w-full h-24 p-3 border rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none bg-amber-50/20"
              placeholder="メッセージを入力してください..."
            />
          </section>

          {/* 購入ボタン */}
          <section className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-orange-100">選択中: 合計 {totalQuantity} 食</p>
              <p className="text-2xl font-extrabold">¥{PRICE_PER_SET.toLocaleString()} <span className="text-xs font-normal">（全国送料・税込）</span></p>
            </div>
            <button className="w-full md:w-auto bg-white text-orange-600 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow-md flex items-center justify-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              仕送りセットを注文する
            </button>
          </section>
        </main>
      ) : (
        /* 経営シミュレーター */
        <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
          <div className="bg-white rounded-2xl p-6 border shadow-sm space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-700">
              <Calculator className="w-6 h-6" />
              D2C 事業収益シミュレーター
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <span className="text-xs text-emerald-600 font-medium">1セット販売価格</span>
                <p className="text-xl font-bold text-emerald-900">¥{PRICE_PER_SET.toLocaleString()}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                <span className="text-xs text-red-600 font-medium">製造食材原価</span>
                <p className="text-xl font-bold text-red-900">¥{INGREDIENT_COST}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <span className="text-xs text-blue-600 font-medium">クール便送料</span>
                <p className="text-xl font-bold text-blue-900">¥{SHIPPING_COST}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                <span className="text-xs text-amber-600 font-medium">限界利益率</span>
                <p className="text-xl font-bold text-amber-900">
                  {Math.round(((PRICE_PER_SET - INGREDIENT_COST - SHIPPING_COST - PACKAGING_COST) / PRICE_PER_SET) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}