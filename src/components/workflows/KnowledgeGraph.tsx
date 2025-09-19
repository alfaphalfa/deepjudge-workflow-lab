'use client';

import { useEffect, useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  ConnectionMode,
  NodeTypes,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Network, Brain, FileText, Scale, Shield } from 'lucide-react';
import { KnowledgeItem, generateKnowledgeGraph } from '@/lib/knowledge-data';

// Custom node component
const CustomNode = ({ data }: { data: any }) => {
  const getIcon = () => {
    switch (data.type) {
      case 'contract': return <FileText className="h-4 w-4" />;
      case 'precedent': return <Scale className="h-4 w-4" />;
      case 'opinion': return <Brain className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div
      className={`px-4 py-3 rounded-lg border-2 ${data.isCenter ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-white'} shadow-md hover:shadow-lg transition-shadow`}
      style={{ minWidth: '150px', maxWidth: '250px' }}
    >
      <div className="flex items-center gap-2 mb-1">
        {getIcon()}
        <div className="text-xs font-medium text-gray-500 uppercase">{data.type}</div>
      </div>
      <div className="text-sm font-medium text-gray-900 line-clamp-2">{data.label}</div>
      {data.confidence && (
        <div className="mt-2 flex items-center gap-2">
          <div className="text-xs text-gray-500">Confidence:</div>
          <div className={`text-xs font-medium ${data.confidence > 0.9 ? 'text-emerald-600' : data.confidence > 0.7 ? 'text-yellow-600' : 'text-gray-600'}`}>
            {Math.round(data.confidence * 100)}%
          </div>
        </div>
      )}
      {data.compliant && (
        <div className="mt-1 flex items-center gap-1">
          <Shield className="h-3 w-3 text-green-600" />
          <span className="text-xs text-green-600">Compliant</span>
        </div>
      )}
    </div>
  );
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

interface KnowledgeGraphProps {
  centerItem?: KnowledgeItem;
  onNodeClick?: (nodeId: string) => void;
}

export default function KnowledgeGraph({ centerItem, onNodeClick }: KnowledgeGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    console.log('KnowledgeGraph: Generating graph for centerItem:', centerItem?.id);

    const graphData = generateKnowledgeGraph(centerItem);
    console.log('Generated graph data:', {
      nodes: graphData.nodes.length,
      edges: graphData.edges.length
    });

    if (graphData.nodes.length === 0) {
      // Create a default node if no data
      const defaultNodes: Node[] = [
        {
          id: 'default',
          type: 'custom',
          position: { x: 400, y: 300 },
          data: {
            label: 'Select a document to explore connections',
            type: 'info',
            isCenter: true
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

    const flowNodes: Node[] = graphData.nodes.map((node, index) => {
      let x = centerX;
      let y = centerY;

      if (index > 0) {
        // Place non-center nodes in a circle
        const angle = ((index - 1) / (graphData.nodes.length - 1)) * Math.PI * 2;
        x = centerX + Math.cos(angle) * radius * (node.size / 20);
        y = centerY + Math.sin(angle) * radius * (node.size / 20);
      }

      // Find the corresponding knowledge item for additional data
      const item = centerItem && node.id === centerItem.id ? centerItem : null;

      return {
        id: node.id,
        type: 'custom',
        position: { x, y },
        data: {
          label: node.label.replace('...', ''),
          type: node.type,
          isCenter: index === 0,
          confidence: item?.confidenceScore,
          compliant: item?.ethicalWallCompliant
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left
      };
    });

    const flowEdges: Edge[] = graphData.edges.map((edge, index) => ({
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
  }, [centerItem, setNodes, setEdges]);

  const onNodeClickHandler = useCallback((event: any, node: Node) => {
    console.log('Node clicked:', node.id);
    if (node.id !== 'default') {
      onNodeClick?.(node.id);
    }
  }, [onNodeClick]);

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClickHandler}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#d1d5db"
        />
        <Controls
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        <MiniMap
          nodeColor={(node) => {
            if (node.data?.isCenter) return '#059669';
            return '#9ca3af';
          }}
          nodeStrokeWidth={3}
          pannable
          zoomable
        />
      </ReactFlow>

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