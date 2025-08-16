import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react';

const ImageWithFallback = ({ src, alt, className }) => {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
        />
    );
};

// Stock Analysis Component to handle its own rendering
const StockAnalysis = ({ stockMetrics }) => {
    if (!stockMetrics) return null;

    const scoreColor = (score) => {
        if (score >= 15) return 'text-green-400';
        if (score >= 10) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-gray-900 bg-opacity-70 p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="text-white text-center mb-8">
                <h2 className="text-4xl font-bold mb-2">{stockMetrics.company_name} ({stockMetrics.ticker})</h2>
                <p className="text-6xl font-extrabold mb-2">{stockMetrics.total_score}<span className="text-3xl text-gray-400">/100</span></p>
                <p className="text-white text-lg italic">{stockMetrics.total_message}</p>
            </div>
            <h3 className="text-white text-2xl font-bold text-center mb-4">주요 지표 분석</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="p-4 font-bold rounded-tl-lg">지표</th>
                            <th className="p-4 font-bold">값</th>
                            <th className="p-4 font-bold text-center">점수</th>
                            <th className="p-4 font-bold rounded-tr-lg">설명</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {stockMetrics.stock_metrics.map((metric, index) => (
                            <tr key={index} className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200">
                                <td className="p-4 font-bold text-white whitespace-nowrap">{metric.name}</td>
                                <td className="p-4 text-gray-300 whitespace-nowrap">{metric.value}</td>
                                <td className="p-4 text-center font-bold whitespace-nowrap">
                                    <span className={scoreColor(metric.score)}>{metric.score}</span>
                                </td>
                                <td className="p-4 text-gray-300 text-sm">{metric.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-gray-800 text-gray-200 p-6 mt-6 rounded-lg">
                <h4 className="text-lg font-bold mb-3">투자 대가의 조언</h4>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>이해 가능한 사업:</strong> 내가 이 회사가 어떻게 돈을 버는지 10분 안에 설명할 수 있는가?</li>
                    <li><strong>경제적 해자(Economic Moat):</strong> 경쟁사들이 쉽게 넘볼 수 없는 강력한 경쟁 우위가 있는가? (브랜드, 특허, 네트워크 효과 등)</li>
                    <li><strong>신뢰할 수 있는 경영진:</strong> 유능하고, 정직하며, 주주의 이익을 최우선으로 생각하는가?</li>
                </ul>
            </div>
        </div>
    );
};

const mockMarketData = {
    total_message: "시장이 전반적으로 매우 고평가되어있습니다.",
    market_metrics: [
        { name: '버핏지수', formula: '(미국 상장사 총시가총액 ÷ 명목 GDP) × 100', value: '235%', score: 40, message: '고평가' },
        { name: '금리 환경', formula: '연준 기준금리(FFR) − CPI YoY', value: '20%', score: 20, message: '보통' },
        { name: '인플레이션', formula: 'CPI YoY', value: '3.0%', score: 60, message: '적정' },
        { name: '실질 GDP 성장률', formula: '((RealGDP ÷ RealGDP_{t-4}) − 1) × 100', value: '2.5%', score: 70, message: '양호' },
    ],
    buffett_index: 'N/A'
};

const mockQuotes = [
    { en_quote: "Rule No. 1 is never lose money. Rule No. 2 is never forget Rule No. 1.", author: "— Berkshire Hathaway 주주서한 (1985)" },
    { en_quote: "The stock market is a device for transferring money from the impatient to the patient.", author: "— Berkshire Hathaway 주주서한 (1989)" },
    { en_quote: "Our favorite holding period is forever.", author: "— Berkshire Hathaway 주주서한 (1988)" },
    { en_quote: "The power of compounding is the eighth wonder of the world.", author: "— Columbia Business School 강연 (1999)" },
    { en_quote: "The more you learn, the more you earn.", author: "— Forbes 인터뷰 (2013)" },
    { en_quote: "Risk comes from not knowing what you are doing.", author: "— Berkshire Hathaway 주주서한 (1994)" },
    { en_quote: "Be fearful when others are greedy and greedy when others are fearful.", author: "— Berkshire Hathaway 주주서한 (1986)" },
    { en_quote: "Price is what you pay, value is what you get.", author: "— Berkshire Hathaway 주주서한 (2008)" },
    { en_quote: "Do not save what is left after spending, but spend what is left after saving.", author: "— 인도 비즈니스 스쿨 강연 (2011)" },
    { en_quote: "The three most important words in investing: Margin of safety.", author: "— Benjamin Graham 언급, 주주서한 (1992)" },
    { en_quote: "It’s far better to buy a wonderful company at a fair price than a fair company at a wonderful price.", author: "— 주주서한 (1989)" },
    { en_quote: "Time is the friend of the wonderful business, the enemy of the mediocre.", author: "— 주주서한 (1989)" },
    { en_quote: "You can turn any investment into a bad deal by paying too much. What you can't do is turn something into a good deal by paying little.", author: "— CNBC 인터뷰 (2017)" },
    { en_quote: "Only buy something that you'd be perfectly happy to hold if the market shut down for ten years.", author: "— Forbes 인터뷰 (1996)" },
    { en_quote: "Diversification is protection against ignorance. It makes little sense if you know what you are doing.", author: "— Forbes 인터뷰 (1996)" },
    { en_quote: "Life is like a snowball, all you need is wet snow and a really long hill.", author: "— Fortune 인터뷰 (2012)" },
    { en_quote: "The most important thing to do if you find yourself in a hole is to stop digging.", author: "— Omaha World-Herald 인터뷰 (2004)" },
    { en_quote: "Don’t pass up something that’s attractive today because you think you will find something better tomorrow.", author: "— 주주서한 (2011)" },
    { en_quote: "There’s never just one cockroach in the kitchen.", author: "— Fortune 인터뷰 (1989)" },
    { en_quote: "Opportunities come infrequently. When it rains gold, put out the bucket, not the thimble.", author: "— 주주서한 (2016)" },
    { en_quote: "Anything can happen anytime in markets. And no advisor, economist, or TV commentator—and definitely not Charlie nor I—can tell you when chaos will occur.", author: "— 주주서한 (2014)" },
    { en_quote: "It takes 20 years to build a reputation and five minutes to ruin it. If you think about that, you'll do things differently.", author: "— 주주서한 (1991)" },
    { en_quote: "Lose money for the firm, and I will be understanding. Lose a shred of reputation for the firm, and I will be ruthless.", author: "— 주주서한 (1989)" },
    { en_quote: "Know your circle of competence, and stick within it.", author: "— 주주서한 (1996)" },
    { en_quote: "You should never test the depth of the water with both feet.", author: "— Omaha 인터뷰 (1994)" },
    { en_quote: "Somebody’s sitting in the shade today because someone planted a tree a long time ago.", author: "— 주주서한 (2011)" },
    { en_quote: "Honesty is a very expensive gift. Don’t expect it from cheap people.", author: "— Omaha World-Herald 인터뷰 (2008)" },
    { en_quote: "Look for 3 things in a person. Intelligence, energy, and integrity. If they don’t have the last one, don’t even bother with the first two.", author: "— Forbes 인터뷰 (2013)" },
    { en_quote: "It’s better to hang out with people better than you. Pick out associates whose behavior is better than yours and you’ll drift in that direction.", author: "— Columbia University 강연 (2009)" },
    { en_quote: "I insist on a lot of time being spent, almost every day, to just sit and think.", author: "— Forbes 인터뷰 (2013)" }
];

const mockStockData = {
    AAPL: {
        company_name: 'Apple',
        ticker: 'AAPL',
        total_score: 85,
        total_message: '버핏이 매우 선호할 만한 우량 기업. 안정적이고 예측 가능한 현금흐름이 강점입니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '500억', score: 30, message: '매우 강력한 잉여현금흐름 생성 능력' },
            { name: '자기자본이익률 (ROE)', value: '35%', score: 25, message: '자기자본 대비 높은 수익성' },
            { name: '총자산이익률 (ROA)', value: '18%', score: 15, message: '자산을 효율적으로 활용하여 이익 창출' },
            { name: '부채비율', value: '1.2', score: 10, message: '부채비율이 다소 높지만 감당 가능' },
            { name: '현금전환비율', value: 'N/A', score: 5, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
    MSFT: {
        company_name: 'Microsoft',
        ticker: 'MSFT',
        total_score: 90,
        total_message: '버핏이 매우 선호할 만한 우량 기업. 안정적이고 예측 가능한 현금흐름이 강점입니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '600억', score: 30, message: '매우 강력한 잉여현금흐름 생성 능력' },
            { name: '자기자본이익률 (ROE)', value: '40%', score: 25, message: '자기자본 대비 높은 수익성' },
            { name: '총자산이익률 (ROA)', value: '20%', score: 15, message: '자산을 효율적으로 활용하여 이익 창출' },
            { name: '부채비율', value: '1.0', score: 20, message: '매우 낮은 부채비율, 뛰어난 재무 건전성' },
            { name: '현금전환비율', value: 'N/A', score: 10, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
    GOOGL: {
        company_name: 'Google',
        ticker: 'GOOGL',
        total_score: 80,
        total_message: '재무 건전성이 우수한 기업. 다만, 경기 변동에 따라 실적이 변동될 수 있습니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '450억', score: 20, message: '안정적인 현금흐름' },
            { name: '자기자본이익률 (ROE)', value: '18%', score: 15, message: '양호한 자기자본이익률' },
            { name: '총자산이익률 (ROA)', value: '12%', score: 10, message: '평균 수준의 자산이익률' },
            { name: '부채비율', value: '1.5', score: 10, message: '부채비율이 다소 높지만 감당 가능' },
            { name: '현금전환비율', value: 'N/A', score: 10, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
    AMZN: {
        company_name: 'Amazon',
        ticker: 'AMZN',
        total_score: 65,
        total_message: '성장성은 좋지만 재무적 리스크가 존재합니다. 신중한 분석이 필요합니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '150억', score: 10, message: '안정적인 현금흐름' },
            { name: '자기자본이익률 (ROE)', value: '8%', score: 5, message: '양호한 자기자본이익률' },
            { name: '총자산이익률 (ROA)', value: '4%', score: 5, message: '평균 수준의 자산이익률' },
            { name: '부채비율', value: '2.5', score: 5, message: '부채비율이 다소 높지만 감당 가능' },
            { name: '현금전환비율', value: 'N/A', score: 10, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
    TSLA: {
        company_name: 'Tesla',
        ticker: 'TSLA',
        total_score: 75,
        total_message: '재무 건전성이 우수한 기업. 다만, 경기 변동에 따라 실적이 변동될 수 있습니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '250억', score: 20, message: '안정적인 현금흐름' },
            { name: '자기자본이익률 (ROE)', value: '25%', score: 25, message: '자기자본 대비 높은 수익성' },
            { name: '총자산이익률 (ROA)', value: '10%', score: 10, message: '평균 수준의 자산이익률' },
            { name: '부채비율', value: '1.8', score: 10, message: '부채비율이 다소 높지만 감당 가능' },
            { name: '현금전환비율', value: 'N/A', score: 10, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
    NVDA: {
        company_name: 'Nvidia',
        ticker: 'NVDA',
        total_score: 95,
        total_message: '버핏이 매우 선호할 만한 우량 기업. 안정적이고 예측 가능한 현금흐름이 강점입니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '700억', score: 30, message: '매우 강력한 잉여현금흐름 생성 능력' },
            { name: '자기자본이익률 (ROE)', value: '50%', score: 25, message: '자기자본 대비 높은 수익성' },
            { name: '총자산이익률 (ROA)', value: '25%', score: 15, message: '자산을 효율적으로 활용하여 이익 창출' },
            { name: '부채비율', value: '0.8', score: 20, message: '매우 낮은 부채비율, 뛰어난 재무 건전성' },
            { name: '현금전환비율', value: 'N/A', score: 5, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
    V: {
        company_name: 'Visa',
        ticker: 'V',
        total_score: 88,
        total_message: '버핏이 매우 선호할 만한 우량 기업. 안정적이고 예측 가능한 현금흐름이 강점입니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '550억', score: 30, message: '매우 강력한 잉여현금흐름 생성 능력' },
            { name: '자기자본이익률 (ROE)', value: '38%', score: 25, message: '자기자본 대비 높은 수익성' },
            { name: '총자산이익률 (ROA)', value: '22%', score: 15, message: '자산을 효율적으로 활용하여 이익 창출' },
            { name: '부채비율', value: '1.1', score: 10, message: '부채비율이 다소 높지만 감당 가능' },
            { name: '현금전환비율', value: 'N/A', score: 8, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
    JPM: {
        company_name: 'JPMorgan',
        ticker: 'JPM',
        total_score: 72,
        total_message: '재무 건전성이 우수한 기업. 다만, 경기 변동에 따라 실적이 변동될 수 있습니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '300억', score: 20, message: '안정적인 현금흐름' },
            { name: '자기자본이익률 (ROE)', value: '15%', score: 15, message: '양호한 자기자본이익률' },
            { name: '총자산이익률 (ROA)', value: '8%', score: 10, message: '평균 수준의 자산이익률' },
            { name: '부채비율', value: '1.9', score: 10, message: '부채비율이 다소 높지만 감당 가능' },
            { name: '현금전환비율', value: 'N/A', score: 10, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
    UNH: {
        company_name: 'UnitedHealth',
        ticker: 'UNH',
        total_score: 83,
        total_message: '버핏이 매우 선호할 만한 우량 기업. 안정적이고 예측 가능한 현금흐름이 강점입니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '480억', score: 30, message: '매우 강력한 잉여현금흐름 생성 능력' },
            { name: '자기자본이익률 (ROE)', value: '28%', score: 25, message: '자기자본 대비 높은 수익성' },
            { name: '총자산이익률 (ROA)', value: '16%', score: 15, message: '자산을 효율적으로 활용하여 이익 창출' },
            { name: '부채비율', value: '1.3', score: 10, message: '부채비율이 다소 높지만 감당 가능' },
            { name: '현금전환비율', value: 'N/A', score: 3, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
    JNJ: {
        company_name: 'Johnson & Johnson',
        ticker: 'JNJ',
        total_score: 78,
        total_message: '재무 건전성이 우수한 기업. 다만, 경기 변동에 따라 실적이 변동될 수 있습니다.',
        stock_metrics: [
            { name: '잉여현금흐름 (FCF)', value: '350억', score: 20, message: '안정적인 현금흐름' },
            { name: '자기자본이익률 (ROE)', value: '17%', score: 15, message: '양호한 자기자본이익률' },
            { name: '총자산이익률 (ROA)', value: '10%', score: 10, message: '평균 수준의 자산이익률' },
            { name: '부채비율', value: '1.6', score: 10, message: '부채비율이 다소 높지만 감당 가능' },
            { name: '현금전환비율', value: 'N/A', score: 10, message: '이익이 현금으로 잘 전환됨' },
        ]
    },
};

const mockStockSearch = (query) => {
    const normalizedQuery = query.toUpperCase();
    for (const key in mockStockData) {
        if (key === normalizedQuery || mockStockData[key].company_name.toUpperCase() === normalizedQuery) {
            return mockStockData[key];
        }
    }
    return null;
};

export default function App() {
    const [marketData, setMarketData] = useState(null);
    const [quotes, setQuotes] = useState([]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [stockMetrics, setStockMetrics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showStockMetrics, setShowStockMetrics] = useState(false);

    const companies = ['Apple', 'Microsoft', 'Google', 'Amazon', 'Tesla', 'Nvidia', 'Visa', 'JPMorgan', 'UnitedHealth', 'Johnson & Johnson'];

    useEffect(() => {
        setMarketData(mockMarketData);
        setQuotes(mockQuotes);
    }, []);

    const handleAnalysis = async () => {
        if (!searchTerm) {
            setError('종목명이나 티커를 입력해주세요.');
            return;
        }
        setLoading(true);
        setError(null);
        setStockMetrics(null);
        setShowStockMetrics(true);

        const stockData = mockStockSearch(searchTerm);
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (stockData) {
            setStockMetrics(stockData);
        } else {
            setError('해당 종목에 대한 데이터가 없습니다. AAPL 또는 MSFT를 입력해보세요.');
        }

        setLoading(false);
    };

    const handleNextQuote = () => {
        if (quotes.length > 0) {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }
    };

    const handlePrevQuote = () => {
        if (quotes.length > 0) {
            setCurrentQuoteIndex((prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length);
        }
    };
    
    const currentQuote = quotes[currentQuoteIndex] || {};
    const marketMetrics = marketData?.market_metrics || mockMarketData.market_metrics;
    
    return (
        <div className="relative w-full min-h-screen bg-white overflow-y-auto">
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://storage.googleapis.com/g-static/chat/image-upload/스크린샷%202025-08-16%20오전%2011.17.35.jpg)`,
                    transform: 'scale(2.46) translateX(-42%) translateY(-1.8%)'
                }}
            />
            <div className="absolute inset-0 bg-black/30" />
            
            <div className="flex flex-col items-center w-full min-h-screen relative z-10 px-4 md:px-8 pb-20">
                
                {/* Header */}
                <div className="flex flex-col items-center mt-8 mb-16 w-full">
                    <h1 className="text-white font-bold text-5xl md:text-6xl leading-tight tracking-tight mb-6">ASK GURU</h1>
                    <button
                        onClick={() => window.open('https://smartstore.naver.com/comeat9/products/12244809201', '_blank')}
                        className="flex items-center gap-4 mb-8 cursor-pointer hover:opacity-80 transition-opacity group"
                    >
                        <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ring-2 ring-white/20 group-hover:ring-white/40 transition-all">
                            <ImageWithFallback
                                src="https://storage.googleapis.com/g-static/chat/image-upload/ChatGPT%20Image%20Aug%2016,%202025,%2001_32_50%20PM.jpg"
                                alt="T-shirt"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-white text-2xl md:text-3xl font-normal group-hover:underline">Buy T-shirt</span>
                    </button>
                    <div className="text-white text-center text-lg md:text-xl leading-7 max-w-4xl px-8">
                        투자 대가의 인사이트를 갈무리하여 투자자인 여러분들이 쉽게 활용하실 수 있게 도와드립니다. 현재는 버핏의 인사이트만을 지원합니다. 주주서한, 각종 인터뷰에서 언급한 이야기에서 힌트를 얻었습니다.
                    </div>
                </div>

                {/* Main Sections Wrapper to handle document flow */}
                <div className="w-full max-w-5xl flex flex-col items-center space-y-20">
                    
                    {/* Stock Evaluation Section */}
                    <div className="flex flex-col items-center w-full">
                        <div className="text-white text-center mb-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4">가치투자 프레임으로 종목을 평가해보세요</h2>
                            <div className="text-white text-xl md:text-2xl font-bold">현재 아래의 10개 종목만 지원합니다.</div>
                        </div>
                        <div className="flex flex-col items-center gap-4 w-full">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center w-80 md:w-96 h-10 bg-white border border-gray-300 rounded-full px-4 relative">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleAnalysis();
                                        }}
                                        className="w-full h-full bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none"
                                        placeholder="예: AAPL, 애플, MSFT"
                                    />
                                    {searchTerm && (
                                        <X
                                            className="w-4 h-4 text-gray-400 ml-2 cursor-pointer hover:text-gray-600"
                                            onClick={() => setSearchTerm('')}
                                        />
                                    )}
                                </div>
                                <button
                                    onClick={handleAnalysis}
                                    className="flex items-center gap-2 bg-white/90 hover:bg-white border border-gray-300 rounded-full px-4 py-2 transition-all hover:shadow-md"
                                >
                                    <Search className="w-4 h-4 text-gray-700" />
                                    <span className="text-gray-700 text-sm md:text-base font-medium">분석하기</span>
                                </button>
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-xl px-4">
                                {companies.map((company, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSearchTerm(company)}
                                        className="flex items-center bg-black/10 border border-gray-300 rounded-full px-3 py-1 cursor-pointer hover:bg-black/20 transition-colors"
                                    >
                                        <span className="text-white text-sm md:text-base">{company}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {loading && (
                            <div className="text-center flex flex-col items-center mt-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-white"></div>
                                <p className="mt-4 text-white text-lg">데이터 분석 중...</p>
                            </div>
                        )}
                        
                        {error && !loading && (
                            <div className="mt-12 p-4 text-red-400 font-bold bg-white/20 rounded-lg">
                                {error}
                            </div>
                        )}

                        {showStockMetrics && stockMetrics && !loading && (
                            <div className="flex flex-col items-center w-full mt-12">
                                <StockAnalysis stockMetrics={stockMetrics} />
                            </div>
                        )}
                    </div>

                    {/* Market Analysis Section */}
                    <div className="flex flex-col items-center w-full">
                        <div className="text-white text-center mb-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-4">가치투자 프레임으로 시장을 읽어보세요</h2>
                            <div className="text-red-400 text-xl md:text-2xl font-bold px-4">"{marketData ? marketData.total_message : '데이터 로딩 중...'}"</div>
                        </div>
                        <div className="flex flex-col gap-3 w-full max-w-4xl px-4">
                            {marketData?.market_metrics.map((metric, index) => (
                                <div key={index} className="flex flex-col md:flex-row items-start md:items-center w-full bg-white/20 rounded-lg px-4 py-3 hover:bg-white/25 transition-colors cursor-pointer">
                                    <span className="text-white text-lg md:text-xl min-w-[80px] font-bold">{metric.name}</span>
                                    <span className="text-gray-300 text-sm md:text-base flex-1 mx-4 text-center">{metric.formula}</span>
                                    <span className="text-white text-lg md:text-xl min-w-[50px] text-center">{metric.value}</span>
                                    <span className="text-white text-lg md:text-xl min-w-[60px] text-center">{metric.message}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quote Section */}
                    <div className="flex flex-col items-center w-full text-white text-center max-w-5xl px-8">
                        {quotes.length > 0 && (
                            <div className="relative w-full">
                                <div className="text-xl md:text-2xl lg:text-3xl leading-relaxed mb-4 font-normal">
                                    "{quotes[currentQuoteIndex].en_quote}"
                                </div>
                                <div className="text-lg md:text-xl lg:text-2xl leading-relaxed font-normal">
                                    {quotes[currentQuoteIndex].author}
                                </div>
                                <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                                    <ChevronLeft className="w-7 h-7 text-white hover:text-gray-300 transition-colors cursor-pointer" onClick={handlePrevQuote} />
                                </div>
                                <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                                    <ChevronRight className="w-7 h-7 text-white hover:text-gray-300 transition-colors cursor-pointer" onClick={handleNextQuote} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
