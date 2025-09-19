'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  Shield,
  TrendingUp,
  Brain,
  Filter,
  Sparkles,
  Clock,
  User,
  Building2,
  Scale,
  FileText,
  ChevronRight,
  Lock,
  Globe,
  Users,
  Zap,
  BookOpen,
  Download,
  Plus,
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import { SearchResult, searchKnowledge } from '@/lib/knowledge-data';

interface KnowledgeSearchProps {
  onResultSelect?: (result: SearchResult) => void;
  onSearchChange?: (results: SearchResult[]) => void;
}

export default function KnowledgeSearch({ onResultSelect, onSearchChange }: KnowledgeSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [searchStats, setSearchStats] = useState<{ time: string; saved: string } | null>(null);

  // Demo natural language queries - updated with more complex examples
  const exampleQueries = [
    "Find all merger agreements with MAC clauses from NY jurisdiction",
    "Precedents for breach of fiduciary duty in private equity",
    "Force majeure provisions related to pandemics",
    "IP assignment clauses for AI-generated content",
    "Cross-border M&A due diligence for EU transactions"
  ];

  const filters = [
    { id: 'contract', label: 'Contracts', icon: FileText },
    { id: 'precedent', label: 'Precedents', icon: Scale },
    { id: 'opinion', label: 'Opinions', icon: Brain },
    { id: 'memo', label: 'Memos', icon: FileText }
  ];

  // Permission level badges
  const getPermissionBadge = (item: SearchResult) => {
    if (item.department === 'Corporate/M&A' || item.department === 'Private Equity') {
      return { label: 'Partner Access', icon: Lock, color: 'text-purple-600 bg-purple-50 border-purple-200' };
    } else if (item.ethicalWallCompliant) {
      return { label: 'Public', icon: Globe, color: 'text-green-600 bg-green-50 border-green-200' };
    } else {
      return { label: 'Confidential', icon: Shield, color: 'text-red-600 bg-red-50 border-red-200' };
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      handleSearch();
    } else {
      setResults([]);
      setSearchStats(null);
      onSearchChange?.([]);
    }
  }, [query]);

  const handleSearch = () => {
    setIsSearching(true);
    setShowAIInsights(false);
    setSearchStats(null);

    // Simulate AI processing with realistic delay
    setTimeout(() => {
      const searchResults = searchKnowledge(query);

      // Apply filters if any selected
      const filteredResults = selectedFilters.length > 0
        ? searchResults.filter(r => selectedFilters.includes(r.type))
        : searchResults;

      setResults(filteredResults);
      onSearchChange?.(filteredResults);
      setIsSearching(false);

      // Set search statistics
      if (filteredResults.length > 0) {
        const searchTime = (Math.random() * 0.3 + 0.1).toFixed(2);
        setSearchStats({
          time: `${searchTime}s`,
          saved: '~45 minutes'
        });
      }

      // Show AI insights for complex queries
      if (query.split(' ').length > 4 && filteredResults.length > 0) {
        setTimeout(() => setShowAIInsights(true), 500);
      }
    }, 800);
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.9) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 0.7) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 0.5) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contract': return FileText;
      case 'precedent': return Scale;
      case 'opinion': return Brain;
      case 'memo': return FileText;
      default: return FileText;
    }
  };

  // Format highlights with bold concepts
  const formatHighlight = (text: string) => {
    // Replace **text** with bold spans
    return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-600 font-semibold">$1</strong>');
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Natural language search: Ask anything about legal precedents, contracts, or expertise..."
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-600"></div>
            </div>
          )}
        </div>

        {/* AI Understanding Indicator */}
        {query && !isSearching && results.length > 0 && (
          <div className="absolute -bottom-6 left-0 flex items-center gap-2 text-sm text-emerald-600">
            <Sparkles className="h-4 w-4" />
            <span>AI analyzed semantic context</span>
          </div>
        )}
      </div>

      {/* Search Statistics */}
      {searchStats && (
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-emerald-600">
            <Zap className="h-4 w-4" />
            <span>Found in {searchStats.time}</span>
          </div>
          <div className="text-gray-500">
            vs {searchStats.saved} manual search
          </div>
          <div className="ml-auto text-gray-600">
            {results.length} highly relevant results
          </div>
        </div>
      )}

      {/* Example Queries */}
      {!query && (
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-3">Try these example queries:</p>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((example, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(example)}
                className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 rounded-lg transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      {results.length > 0 && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Filter by type:</span>
          <div className="flex gap-2">
            {filters.map(filter => {
              const Icon = filter.icon;
              const isActive = selectedFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    isActive
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Insights */}
      {showAIInsights && results.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Brain className="h-5 w-5 text-emerald-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Semantic Analysis Complete</h3>
              <p className="text-sm text-gray-700 mb-2">
                DeepJudge understood your query beyond keywords, identifying related concepts like:
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(results.slice(0, 3).flatMap(r => r.matchedConcepts || []))).slice(0, 8).map((concept, idx) => (
                  <span key={idx} className="px-2 py-1 bg-white text-xs font-medium text-emerald-700 rounded">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              Semantic Search Results
            </h3>
            <span className="text-sm text-gray-500">
              Ranked by relevance & context
            </span>
          </div>

          {results.map((result) => {
            const TypeIcon = getTypeIcon(result.type);
            const confidenceClass = getConfidenceColor(result.confidenceScore);
            const permissionBadge = getPermissionBadge(result);

            return (
              <div
                key={result.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <TypeIcon className="h-5 w-5 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                          {result.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5" />
                            {result.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {result.date}
                          </span>
                          {result.jurisdiction && (
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3.5 w-3.5" />
                              {result.jurisdiction}
                            </span>
                          )}
                          {result.department && (
                            <span className="text-gray-400">
                              {result.department}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Confidence Score */}
                    <div className={`px-3 py-1 rounded-full border ${confidenceClass}`}>
                      <span className="text-xs font-medium">
                        {Math.round(result.confidenceScore * 100)}%
                      </span>
                    </div>

                    {/* Permission Badge */}
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full border ${permissionBadge.color}`}>
                      <permissionBadge.icon className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">{permissionBadge.label}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{result.summary}</p>

                {/* Semantic Reasoning */}
                {result.semanticReasons && result.semanticReasons.length > 0 && (
                  <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-emerald-600" />
                      <p className="text-sm font-medium text-emerald-700">Why this matched:</p>
                    </div>
                    <ul className="space-y-1">
                      {result.semanticReasons.slice(0, 3).map((reason, idx) => (
                        <li key={idx} className="text-sm text-emerald-600 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Highlights with matched concepts */}
                {result.highlights.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Relevant Excerpts:</p>
                    <ul className="space-y-2">
                      {result.highlights.slice(0, 2).map((highlight, idx) => (
                        <li key={idx} className="text-sm text-gray-600 pl-4 relative">
                          <span className="absolute left-0 top-1">•</span>
                          <span dangerouslySetInnerHTML={{ __html: formatHighlight(highlight) }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags and Metadata */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-wrap gap-2">
                    {result.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {result.citations && result.citations.length > 0 && (
                    <div className="text-xs text-gray-500">
                      {result.citations.length} citations
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => onResultSelect?.(result)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                  >
                    <BookOpen className="h-4 w-4" />
                    Open in Editor
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    <Plus className="h-4 w-4" />
                    Add to Research
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors text-sm">
                    <ExternalLink className="h-4 w-4" />
                    View Source
                  </button>
                </div>

                {/* Financial Impact */}
                {result.financialImpact && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800 font-medium flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      {result.financialImpact}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {query && !isSearching && results.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500">Try adjusting your search query or filters</p>
        </div>
      )}

      {/* Demo Notice */}
      {results.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">DeepJudge Advantage</p>
              <p>This semantic search found {results.length} relevant documents in {searchStats?.time || '0.2s'}, saving approximately {searchStats?.saved || '45 minutes'} of manual research time. With 92% user adoption, lawyers save $18,000 annually per person.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}