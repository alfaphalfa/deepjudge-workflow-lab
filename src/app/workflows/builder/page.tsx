'use client';

import dynamic from 'next/dynamic';

// Use the simplified workflow builder for better reliability
const SimpleWorkflowBuilder = dynamic(() => import('@/components/workflows/SimpleWorkflowBuilder'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Workflow Builder...</p>
      </div>
    </div>
  )
});

export default function WorkflowBuilderPage() {
  return <SimpleWorkflowBuilder />;
}