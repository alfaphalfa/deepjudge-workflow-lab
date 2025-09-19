'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Brain } from 'lucide-react';
import { SearchResult, KnowledgeItem, calculateROI, knowledgeBase } from '@/lib/knowledge-data';

// Dynamically import components to avoid SSR issues
const KnowledgeSearch = dynamic(() => import('@/components/workflows/KnowledgeSearch'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading search...</div>
});

const KnowledgeGraph = dynamic(() => import('@/components/workflows/KnowledgeGraph'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading graph...</div>
});

export default function KnowledgeWorkflowPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'graph' | 'roi'>('search');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | undefined>(undefined);

  useEffect(() => {
    // Set initial item after mount to avoid SSR issues
    if (knowledgeBase && knowledgeBase.length > 0) {
      setSelectedItem(knowledgeBase[0]);
    }
  }, []);

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