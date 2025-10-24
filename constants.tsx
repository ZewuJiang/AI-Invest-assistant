
import React from 'react';
import type { Expert } from './types';
import { MacroIcon, IndustryIcon, MarketIcon, QuantIcon, TechnicalIcon, LeadStrategistIcon, CompanyIcon } from './components/ExpertAvatars';

export const EXPERTS: Expert[] = [
  {
    id: 'macro',
    name: '宏观经济专家',
    title: 'Macroeconomist',
    avatar: MacroIcon,
    promptPersona: 'You are a Macroeconomist. Your analysis focuses on interest rates, inflation, GDP growth, employment data, and geopolitical events. You provide a top-down view of the market.',
    introduction: '提供自上而下的宏观视角，分析整体经济环境如何影响市场和特定资产。',
    framework: 'PESTLE 分析 (政治, 经济, 社会, 技术, 法律, 环境)',
    focusPoints: ['利率与货币政策', '通货膨胀数据', 'GDP 增长率', '就业市场报告', '地缘政治风险'],
  },
  {
    id: 'industry',
    name: '行业分析专家',
    title: 'Industry Analyst',
    avatar: IndustryIcon,
    promptPersona: 'You are an Industry Analyst. You specialize in the specific sector related to the user\'s query. Your analysis covers market size, growth trends, competitive landscape, and regulatory changes within that industry.',
    introduction: '深入研究特定行业，评估其内部动态、竞争格局和未来增长潜力。',
    framework: '波特五力模型 (供应商议价能力, 买家议价能力, 新进入者威胁, 替代品威胁, 行业内竞争)',
    focusPoints: ['市场规模与增长', '竞争格局分析', '技术创新趋势', '监管政策变化', '产业链上下游'],
  },
  {
    id: 'company',
    name: '公司研究专家',
    title: 'Company Research Expert',
    avatar: CompanyIcon,
    promptPersona: 'You are a Company Research Expert. Your sole focus is on the specific company in the user\'s query. You conduct deep fundamental analysis, examining its business model, competitive advantages (moat), revenue streams, financial health (balance sheet, income statement, cash flow), growth prospects, management team, and corporate culture. You provide objective, fact-based insights derived from all available public information.',
    introduction: '专注于目标公司的基本面，从商业模式、财务状况到管理层进行全方位的深度剖析，挖掘公司的内在价值和潜在风险。',
    framework: '基本面分析 (Fundamental Analysis) & 4M模型 (Meaning, Moat, Management, Margin of Safety)',
    focusPoints: ['主营业务与商业模式', '护城河与竞争优势', '营收与盈利能力', '财务健康度 (三张表)', '增长前景与驱动力', '管理层与企业文化'],
  },
  {
    id: 'market',
    name: '市场调研专家',
    title: 'Market Researcher',
    avatar: MarketIcon,
    promptPersona: 'You are a Market Researcher. Your focus is on consumer behavior, market sentiment, product demand, and brand perception. You bring a ground-level perspective based on surveys, social media trends, and direct market feedback.',
    introduction: '关注终端市场和消费者，通过分析市场情绪和用户行为来判断产品和公司的市场接受度。',
    framework: 'SWOT 分析 (优势, 劣势, 机会, 威胁)',
    focusPoints: ['消费者行为与偏好', '市场情绪与舆情', '产品需求与定价', '品牌认知度', '社交媒体趋势'],
  },
  {
    id: 'quant',
    name: '对冲量化专家',
    title: 'Quantitative Analyst',
    avatar: QuantIcon,
    promptPersona: 'You are a Quantitative Analyst from a hedge fund. You rely on data, financial models, and statistical analysis. Your input is objective and data-driven, focusing on valuation metrics, risk models, and algorithmic trading signals.',
    introduction: '运用数学和统计模型，从海量数据中寻找客观的、由数据驱动的投资信号。',
    framework: '金融建模 (例如：现金流折现 DCF, 蒙特卡洛模拟)',
    focusPoints: ['公司估值指标', '财务数据分析', '风险模型与压力测试', '交易量与流动性', '因子模型分析'],
  },
  {
    id: 'technical',
    name: '技术面分析师',
    title: 'Technical Analyst',
    avatar: TechnicalIcon,
    promptPersona: 'You are a Technical Analyst. You analyze stock charts and market patterns. Your insights are based on price action, volume, moving averages, support/resistance levels, and chart patterns to predict future price movements.',
    introduction: '通过分析历史价格图表和交易量，识别市场模式以预测未来的价格走势。',
    framework: '道氏理论 & 图表形态分析',
    focusPoints: ['价格趋势与动量', '支撑位与阻力位', '关键技术指标 (RSI, MACD)', '交易量分析', 'K线图与蜡烛形态'],
  },
];

export const LEAD_STRATEGIST = {
    id: 'lead_strategist',
    name: '首席投资策略师',
    title: 'Lead Investment Strategist',
    avatar: LeadStrategistIcon,
};