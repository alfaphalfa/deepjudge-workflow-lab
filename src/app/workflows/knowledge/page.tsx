'use client';

import { useState } from 'react';
import {
  Brain,
  Search,
  Network,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Award,
  Shield,
  Sparkles,
  ChevronRight,
  Calculator,
  Target,
  Zap,
  BookOpen,
  BarChart3,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import KnowledgeSearch from '@/components/workflows/KnowledgeSearch';
import KnowledgeGraph from '@/components/workflows/KnowledgeGraph';
import { SearchResult, KnowledgeItem, calculateROI, knowledgeBase } from '@/lib/knowledge-data';

export default function KnowledgeWorkflowPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'graph' | 'roi'>('search');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | undefined>(knowledgeBase[0]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showROIDetails, setShowROIDetails] = useState(false);
  const [lawyerCount, setLawyerCount] = useState(50);

  const roi = calculateROI(lawyerCount);

  const handleResultSelect = (result: SearchResult) => {
    setSelectedItem(result);
    setActiveTab('graph');
  };

  const handleNodeClick = (nodeId: string) => {
    const item = knowledgeBase.find(kb => kb.id === nodeId);
    if (item) {
      setSelectedItem(item);
    }
  };

  const stats = {
    documentsProcessed: '1.2M+',
    yearsOfExpertise: '30',
    adoptionRate: '92%',
    timeSaved: '8 hrs/week',
    accuracy: '99.2%',
    partnerKnowledge: '15'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Knowledge Activation</h1>
          </div>
          <p className="text-xl text-emerald-50 mb-8 max-w-3xl">
            Transform 30 years of retiring partner expertise into instantly accessible, AI-powered legal intelligence.
            Achieve 90%+ adoption with semantic search that understands context, not just keywords.
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-emerald-100 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-emerald-200 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Ethical Wall Compliance</h3>
                <p className="text-sm text-emerald-100">
                  Automatic permission management ensures knowledge sharing respects client confidentiality
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="h-6 w-6 text-emerald-200 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Semantic Understanding</h3>
                <p className="text-sm text-emerald-100">
                  AI comprehends intent and context, finding relevant insights even with imprecise queries
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="h-6 w-6 text-emerald-200 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Measurable ROI</h3>
                <p className="text-sm text-emerald-100">
                  Save $18,000 per lawyer annually through faster research and improved deal velocity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('search')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'search'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Semantic Search
              </div>
            </button>
            <button
              onClick={() => setActiveTab('graph')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'graph'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Knowledge Graph
              </div>
            </button>
            <button
              onClick={() => setActiveTab('roi')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'roi'
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                ROI Calculator
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {activeTab === 'search' && (
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Natural Language Legal Search
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ask questions in plain English. Our AI understands legal context, precedents, and relationships
                to surface the most relevant insights from decades of partner expertise.
              </p>
            </div>

            <KnowledgeSearch
              onResultSelect={handleResultSelect}
              onSearchChange={setSearchResults}
            />

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <Brain className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Contextual Intelligence</h3>
                <p className="text-sm text-gray-600">
                  Goes beyond keywords to understand legal concepts, relationships, and implications
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <Shield className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Ethical Compliance</h3>
                <p className="text-sm text-gray-600">
                  Built-in ethical walls ensure knowledge sharing respects confidentiality obligations
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <Zap className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Instant Insights</h3>
                <p className="text-sm text-gray-600">
                  Surface relevant precedents, clauses, and strategies in seconds, not hours
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'graph' && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Visual Knowledge Mapping
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore interconnected legal knowledge through an interactive graph.
                Discover relationships between precedents, contracts, and expert opinions.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="h-[600px]">
                <KnowledgeGraph
                  centerItem={selectedItem}
                  onNodeClick={handleNodeClick}
                />
              </div>
            </div>

            {selectedItem && (
              <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Selected Document</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{selectedItem.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      By {selectedItem.author} • {selectedItem.date}
                    </p>
                  </div>
                  <p className="text-gray-600">{selectedItem.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {selectedItem.insights && (
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <h4 className="font-medium text-emerald-900 mb-2">Key Insights</h4>
                      <ul className="space-y-2">
                        {selectedItem.insights.map((insight, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-emerald-800">
                            <CheckCircle className="h-4 w-4 mt-0.5" />
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'roi' && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ROI Calculator
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Calculate the financial impact of DeepJudge's Knowledge Activation system for your firm.
                See how AI-powered knowledge management delivers measurable value.
              </p>
            </div>

            {/* Calculator Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Lawyers in Your Firm
                </label>
                <input
                  type="number"
                  value={lawyerCount}
                  onChange={(e) => setLawyerCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  min="1"
                />
              </div>

              {/* ROI Summary */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-6 border border-emerald-200">
                  <DollarSign className="h-8 w-8 text-emerald-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    ${(roi.annualSavings / 1000000).toFixed(2)}M
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Annual Savings</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                  <Clock className="h-8 w-8 text-blue-600 mb-3" />
                  <div className="text-3xl font-bold text-gray-900">
                    {(roi.timeSavedHours / 1000).toFixed(1)}K
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Hours Saved Per Year</p>
                </div>
              </div>

              {/* Cost Per Lawyer */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Savings Per Lawyer</h4>
                    <p className="text-sm text-gray-500 mt-1">Annual value delivered per team member</p>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600">
                    ${(roi.costPerLawyer / 1000).toFixed(1)}K
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <button
                onClick={() => setShowROIDetails(!showROIDetails)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-700">View Detailed Breakdown</span>
                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${showROIDetails ? 'rotate-90' : ''}`} />
              </button>

              {showROIDetails && (
                <div className="mt-6 space-y-4">
                  {roi.breakdownItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-700">{item.category}</span>
                      <span className="font-medium text-gray-900">
                        ${(item.amount / 1000000).toFixed(2)}M
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <Target className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">90% Adoption Rate</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Industry-leading adoption through intuitive design and immediate value delivery
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Natural language interface</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No training required</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Instant time savings</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <BarChart3 className="h-8 w-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Measurable Impact</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Track and optimize knowledge utilization with detailed analytics
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Usage analytics dashboard</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Time savings reports</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Knowledge gap identification</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                Transform Your Firm's Knowledge Management
              </h3>
              <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                Join leading law firms achieving 90%+ adoption and saving millions annually
                with AI-powered knowledge activation.
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                  Schedule Demo
                </button>
                <button className="px-6 py-3 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors flex items-center gap-2">
                  Get ROI Report
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Stories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Success Metrics
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <Award className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900">92%</div>
              <p className="text-sm text-gray-600 mt-1">User Adoption Rate</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <Clock className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900">8 hrs</div>
              <p className="text-sm text-gray-600 mt-1">Saved Per Week</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <Users className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900">15</div>
              <p className="text-sm text-gray-600 mt-1">Partners Captured</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <BookOpen className="h-8 w-8 text-emerald-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900">1.2M</div>
              <p className="text-sm text-gray-600 mt-1">Documents Indexed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}