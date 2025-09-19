'use client';

import { useState } from 'react';
import { Brain } from 'lucide-react';
import KnowledgeSearch from '@/components/workflows/KnowledgeSearch';
import KnowledgeGraph from '@/components/workflows/KnowledgeGraph';
import { SearchResult, KnowledgeItem, calculateROI, knowledgeBase } from '@/lib/knowledge-data';

export default function KnowledgeWorkflowPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'graph' | 'roi'>('search');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | undefined>(knowledgeBase[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-600 text-white p-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Brain className="h-10 w-10" />
          Knowledge Activation
        </h1>
      </div>

      <div className="container mx-auto p-6">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded ${activeTab === 'search' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}
          >
            Search
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-4 py-2 rounded ${activeTab === 'graph' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}
          >
            Graph
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-4 py-2 rounded ${activeTab === 'roi' ? 'bg-emerald-600 text-white' : 'bg-gray-200'}`}
          >
            ROI
          </button>
        </div>

        {activeTab === 'search' && (
          <div>
            <KnowledgeSearch onResultSelect={setSelectedItem} />
          </div>
        )}

        {activeTab === 'graph' && (
          <div className="h-[600px]">
            <KnowledgeGraph centerItem={selectedItem} />
          </div>
        )}

        {activeTab === 'roi' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">ROI Calculator</h2>
            <p>Calculate your savings with DeepJudge Knowledge Activation</p>
          </div>
        )}
      </div>
    </div>
  );
}