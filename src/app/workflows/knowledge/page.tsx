'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Brain, Home } from 'lucide-react';

// Dynamically import components to avoid SSR issues
const KnowledgeSearch = dynamic(() => import('@/components/workflows/KnowledgeSearch'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading search...</div>
});

const KnowledgeGraph = dynamic(() => import('@/components/workflows/KnowledgeGraph'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading graph...</div>
});

const MatterQA = dynamic(() => import('@/components/workflows/MatterQA'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading Matter Q&A...</div>
});

const ROICalculator = dynamic(() => import('@/components/workflows/ROICalculator'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading ROI Calculator...</div>
});

const PromptLab = dynamic(() => import('@/components/workflows/PromptLab'), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading Prompt Lab...</div>
});

export default function KnowledgeWorkflowPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'graph' | 'matterqa' | 'roi' | 'promptlab'>('search');
  const [selectedItem, setSelectedItem] = useState<any>(undefined);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-emerald-600 text-white p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Brain className="h-10 w-10" />
            Knowledge Activation
          </h1>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </Link>
        </div>
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
            onClick={() => setActiveTab('matterqa')}
            className={`px-4 py-2 rounded ${
              activeTab === 'matterqa' ? 'bg-emerald-600 text-white' : 'bg-gray-200'
            }`}
          >
            Matter Q&A
          </button>
          <button
            onClick={() => setActiveTab('roi')}
            className={`px-4 py-2 rounded ${
              activeTab === 'roi' ? 'bg-emerald-600 text-white' : 'bg-gray-200'
            }`}
          >
            ROI
          </button>
          <button
            onClick={() => setActiveTab('promptlab')}
            className={`px-4 py-2 rounded ${
              activeTab === 'promptlab' ? 'bg-emerald-600 text-white' : 'bg-gray-200'
            }`}
          >
            Prompt Lab
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

        {activeTab === 'matterqa' && (
          <div>
            <MatterQA />
          </div>
        )}

        {activeTab === 'roi' && (
          <div>
            <ROICalculator />
          </div>
        )}

        {activeTab === 'promptlab' && (
          <div>
            <PromptLab />
          </div>
        )}
      </div>
    </div>
  );
}