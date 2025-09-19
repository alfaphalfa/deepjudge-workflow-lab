'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

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
  const [selectedItem, setSelectedItem] = useState<any>(undefined);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-600 text-white p-8">
        <h1 className="text-4xl font-bold">Knowledge Activation</h1>
      </div>

      <div className="container mx-auto p-6">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-2 rounded ${
              activeTab === 'search' ? 'bg-emerald-600 text-white' : 'bg-gray-200'
            }`}
          >
            Search
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`px-4 py-2 rounded ${
              activeTab === 'graph' ? 'bg-emerald-600 text-white' : 'bg-gray-200'
            }`}
          >
            Graph
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-4 py-2 rounded ${
              activeTab === 'roi' ? 'bg-emerald-600 text-white' : 'bg-gray-200'
            }`}
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
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">ROI Calculator</h2>
            <p className="text-gray-600">
              Calculate your savings with DeepJudge Knowledge Activation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}