'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Network, Brain, FileText, Scale, Shield } from 'lucide-react';
import { KnowledgeItem, generateKnowledgeGraph } from '@/lib/knowledge-data';

// Import ReactFlow CSS at the top level
import 'reactflow/dist/style.css';

// Dynamically import ReactFlow to avoid SSR issues
const ReactFlowComponent = dynamic(
  () => import('reactflow'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading Knowledge Graph...</p>
        </div>
      </div>
    )
  }
);

interface KnowledgeGraphProps {
  centerItem?: KnowledgeItem;
  onNodeClick?: (nodeId: string) => void;
}

export default function KnowledgeGraph({ centerItem, onNodeClick }: KnowledgeGraphProps) {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    console.log('KnowledgeGraph: Generating graph for centerItem:', centerItem?.id);

    const graphData = generateKnowledgeGraph(centerItem);
    console.log('Generated graph data:', {
      nodes: graphData.nodes.length,
      edges: graphData.edges.length
    });

    if (graphData.nodes.length === 0) {
      // Create a default node if no data
      const defaultNodes = [
        {
          id: 'default',
          type: 'default',
          position: { x: 400, y: 300 },
          data: {
            label: 'Select a document from search to explore connections'
          }
        }
      ];
      setNodes(defaultNodes);
      setEdges([]);
      return;
    }

    // Calculate positions for nodes in a radial layout
    const centerX = 400;
    const centerY = 300;
    const radius = 250;

    const flowNodes = graphData.nodes.map((node, index) => {
      let x = centerX;
      let y = centerY;

      if (index > 0) {
        // Place non-center nodes in a circle
        const angle = ((index - 1) / (graphData.nodes.length - 1)) * Math.PI * 2;
        x = centerX + Math.cos(angle) * radius * (node.size / 20);
        y = centerY + Math.sin(angle) * radius * (node.size / 20);
      }

      return {
        id: node.id,
        type: 'default',
        position: { x, y },
        data: {
          label: (
            <div className={`px-3 py-2 ${index === 0 ? 'bg-emerald-100 border-emerald-500' : 'bg-white'} border-2 rounded-lg`}>
              <div className="text-xs font-medium text-gray-600 mb-1">{node.type}</div>
              <div className="text-sm font-medium text-gray-900 line-clamp-2">
                {node.label.replace('...', '')}
              </div>
            </div>
          )
        },
        style: {
          width: 200,
          height: 'auto',
        }
      };
    });

    const flowEdges = graphData.edges.map((edge) => ({
      id: `${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: edge.weight > 0.7,
      style: {
        stroke: edge.type === 'related' ? '#059669' : edge.type === 'category' ? '#10b981' : '#6ee7b7',
        strokeWidth: Math.max(1, edge.weight * 3)
      }
    }));

    console.log('Setting nodes and edges:', {
      nodes: flowNodes.length,
      edges: flowEdges.length
    });

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [centerItem, isClient]);

  const onNodeClickHandler = useCallback((event: any, node: any) => {
    console.log('Node clicked:', node.id);
    if (node.id !== 'default') {
      onNodeClick?.(node.id);
    }
  }, [onNodeClick]);

  if (!isClient) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Initializing Knowledge Graph...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl relative">
      <ReactFlowComponent
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClickHandler}
        fitView
        attributionPosition="bottom-left"
      />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-4 z-10">
        <div className="flex items-center gap-2 mb-2">
          <Network className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Knowledge Graph</span>
        </div>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span>Primary Document</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Related Documents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-300"></div>
            <span>Category/Author Links</span>
          </div>
        </div>
      </div>
    </div>
  );
}