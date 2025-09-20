'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Plus, Download, Play, Save, Trash2, Grid, MousePointer } from 'lucide-react';
import {
  nodeTypes,
  workflowTemplates,
  categoryColors,
  categoryBorderColors,
  type WorkflowNode,
  type WorkflowConnection,
  type WorkflowTemplate
} from '@/lib/workflow-builder-data';

interface DraggedNode {
  node: WorkflowNode;
  offsetX: number;
  offsetY: number;
}

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<WorkflowConnection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<DraggedNode | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const canvasRef = useRef<HTMLDivElement>(null);

  // Cancel connection mode
  const cancelConnection = useCallback(() => {
    setIsConnecting(false);
    setConnectingFrom(null);
  }, []);

  // ESC key handler to cancel connection mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isConnecting) {
        cancelConnection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConnecting, cancelConnection]);

  // Handle dragging from palette
  const handleNodeDragStart = (e: React.DragEvent, nodeType: WorkflowNode) => {
    e.dataTransfer.effectAllowed = 'copy';
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDraggedNode({
      node: nodeType,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    });
  };

  // Handle drop on canvas
  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - draggedNode.offsetX;
    const y = e.clientY - rect.top - draggedNode.offsetY;

    const newNode: WorkflowNode = {
      ...draggedNode.node,
      id: `node-${Date.now()}`,
      position: { x, y }
    };

    setNodes([...nodes, newNode]);
    setDraggedNode(null);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Simplified click-to-connect logic
  const handleConnect = (sourceId: string) => {
    setConnectingFrom(sourceId);
    setIsConnecting(true);
    // Visual feedback handled by node styling
  };

  // Handle node click for connection or selection
  const handleNodeClick = (nodeId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    if (isConnecting && connectingFrom && connectingFrom !== nodeId) {
      // Create edge instantly
      const newEdge: WorkflowConnection = {
        id: `${connectingFrom}-${nodeId}-${Date.now()}`,
        source: connectingFrom,
        target: nodeId,
      };

      // Check if connection already exists
      const exists = connections.some(
        conn => conn.source === connectingFrom && conn.target === nodeId
      );

      if (!exists) {
        const updatedConnections = [...connections, newEdge];
        setConnections(updatedConnections);
        console.log('Created connection:', newEdge);
        console.log('All connections:', updatedConnections);
      }

      // Exit connection mode
      setIsConnecting(false);
      setConnectingFrom(null);
    } else if (!isConnecting) {
      // Normal node selection
      setSelectedNode(nodeId);
    }
  };

  // Delete selected node
  const deleteSelectedNode = () => {
    if (!selectedNode) return;

    setNodes(nodes.filter(n => n.id !== selectedNode));
    setConnections(connections.filter(c => c.source !== selectedNode && c.target !== selectedNode));
    setSelectedNode(null);
  };

  // Delete connection
  const deleteConnection = (connectionId: string) => {
    setConnections(connections.filter(c => c.id !== connectionId));
  };

  // Load template
  const loadTemplate = (template: WorkflowTemplate) => {
    setNodes(template.nodes);
    setConnections(template.connections);
    setWorkflowName(template.name);
    setShowTemplates(false);
  };

  // Clear canvas
  const clearCanvas = () => {
    setNodes([]);
    setConnections([]);
    setSelectedNode(null);
    setWorkflowName('Untitled Workflow');
    setIsConnecting(false);
    setConnectingFrom(null);
  };

  // Export as JSON
  const exportWorkflow = () => {
    const workflow = {
      name: workflowName,
      timestamp: new Date().toISOString(),
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        label: node.label,
        category: node.category,
        position: node.position,
        properties: node.properties || {}
      })),
      connections: connections.map(conn => ({
        id: conn.id,
        source: conn.source,
        target: conn.target,
        label: conn.label
      }))
    };

    const json = JSON.stringify(workflow, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflowName.toLowerCase().replace(/\s+/g, '-')}-workflow.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Run workflow (simulation)
  const runWorkflow = () => {
    alert(`Running workflow: ${workflowName}\n\nThis would execute the workflow with ${nodes.length} nodes and ${connections.length} connections.`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Node Palette */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-gray-700">Workflow Components</h3>
        </div>

        {/* Group nodes by category */}
        {['input', 'process', 'decision', 'action', 'output'].map(category => (
          <div key={category} className="p-4 border-b">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              {category}
            </h4>
            <div className="space-y-2">
              {nodeTypes
                .filter(node => node.category === category)
                .map(node => {
                  const Icon = node.icon;
                  return (
                    <div
                      key={node.id}
                      draggable
                      onDragStart={(e) => handleNodeDragStart(e, node)}
                      className={`p-2 rounded border-2 ${categoryBorderColors[node.category]} bg-white cursor-move hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${categoryColors[node.category]} text-white`}>
                          <Icon className="h-3 w-3" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium">{node.label}</div>
                          <div className="text-xs text-gray-500">{node.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="text-lg font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1"
              />
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center gap-1"
              >
                <Grid className="h-4 w-4" />
                Templates
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearCanvas}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </button>
              <button
                onClick={runWorkflow}
                disabled={nodes.length === 0}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 text-sm flex items-center gap-1"
              >
                <Play className="h-4 w-4" />
                Run
              </button>
              <button
                onClick={exportWorkflow}
                disabled={nodes.length === 0}
                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300 text-sm flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                Export JSON
              </button>
            </div>
          </div>
        </div>

        {/* Templates Panel */}
        {showTemplates && (
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="grid grid-cols-3 gap-4">
              {workflowTemplates.map(template => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-700">{template.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {template.nodes.length} nodes, {template.connections.length} connections
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-4">
          <div
            ref={canvasRef}
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            className="relative w-full h-full min-h-[600px] bg-white rounded-lg border-2 border-dashed border-gray-300"
            style={{
              backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MousePointer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Drag components here to start building
                  </h3>
                  <p className="text-sm text-gray-500">
                    Or select a template to get started quickly
                  </p>
                </div>
              </div>
            )}

            {/* Render connections - fixed visibility */}
            <svg
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 1, pointerEvents: 'none' }}
              viewBox="0 0 2000 1000"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Simple arrowhead marker */}
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="5"
                  orient="auto"
                >
                  <path
                    d="M 0 0 L 10 5 L 0 10 L 3 5 Z"
                    fill="#3b82f6"
                  />
                </marker>
              </defs>

              {/* Debug: Log connections */}
              {(() => {
                console.log('Rendering connections:', connections, 'Nodes:', nodes);
                return null;
              })()}

              {connections.map((conn, index) => {
                const sourceNode = nodes.find(n => n.id === conn.source);
                const targetNode = nodes.find(n => n.id === conn.target);

                if (!sourceNode || !targetNode) {
                  console.log('Missing node for connection:', conn);
                  return null;
                }

                // Simple connection points
                const nodeWidth = 160;
                const nodeHeight = 60;

                const sourceX = (sourceNode.position?.x || 0) + nodeWidth;
                const sourceY = (sourceNode.position?.y || 0) + nodeHeight / 2;
                const targetX = (targetNode.position?.x || 0);
                const targetY = (targetNode.position?.y || 0) + nodeHeight / 2;

                console.log(`Connection ${index}: (${sourceX},${sourceY}) to (${targetX},${targetY})`);

                // Simple straight line for debugging
                const debugPath = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;

                // Curved path for production
                const midX = (sourceX + targetX) / 2;
                const path = `M ${sourceX} ${sourceY} C ${midX} ${sourceY}, ${midX} ${targetY}, ${targetX} ${targetY}`;

                return (
                  <g key={conn.id}>
                    {/* Visible red line for debugging */}
                    <line
                      x1={sourceX}
                      y1={sourceY}
                      x2={targetX}
                      y2={targetY}
                      stroke="red"
                      strokeWidth="3"
                      opacity="0.5"
                    />

                    {/* Main connection line */}
                    <path
                      d={path}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />

                    {/* Clickable area for deletion */}
                    <path
                      d={path}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="20"
                      style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                      onClick={() => {
                        if (window.confirm('Delete this connection?')) {
                          deleteConnection(conn.id);
                        }
                      }}
                    />


                    {/* Label on connection */}
                    {conn.label && (
                      <g>
                        <rect
                          x={(sourceX + targetX) / 2 - 20}
                          y={(sourceY + targetY) / 2 - 10}
                          width="40"
                          height="20"
                          fill="white"
                          opacity="0.9"
                          rx="4"
                        />
                        <text
                          x={(sourceX + targetX) / 2}
                          y={(sourceY + targetY) / 2 + 4}
                          fill="#1f2937"
                          fontSize="11"
                          fontWeight="500"
                          textAnchor="middle"
                        >
                          {conn.label}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Render nodes */}
            {nodes.map(node => {
              const Icon = node.icon;
              const isSelected = selectedNode === node.id;
              const isConnectingFrom = connectingFrom === node.id;

              return (
                <div
                  key={node.id}
                  onClick={(e) => handleNodeClick(node.id, e)}
                  className={`absolute p-3 bg-white rounded-lg border-2 cursor-pointer transition-all group ${
                    isSelected
                      ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                      : isConnectingFrom
                      ? 'border-orange-500 shadow-lg ring-2 ring-orange-200'
                      : categoryBorderColors[node.category]
                  } hover:shadow-md`}
                  style={{
                    left: node.position?.x || 0,
                    top: node.position?.y || 0,
                    zIndex: isSelected ? 10 : 2,
                    minWidth: '160px'
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`p-1 rounded ${categoryColors[node.category]} text-white`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="font-medium text-sm">{node.label}</div>
                  </div>
                  <div className="text-xs text-gray-500">{node.description}</div>

                  {/* Connection ports - always visible */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110" />
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110" />

                  {isSelected && (
                    <div className="flex gap-1 mt-2 pt-2 border-t">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConnect(node.id);
                        }}
                        className="flex-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        Connect
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSelectedNode();
                        }}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Connection mode indicator */}
            {isConnecting && (
              <div className="absolute top-4 left-4 bg-orange-500 text-white rounded-lg shadow-lg z-20 p-3">
                <div className="flex items-center gap-3">
                  <div className="animate-pulse">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Connection Mode Active</div>
                    <div className="text-sm text-orange-100">Click another node to connect from {nodes.find(n => n.id === connectingFrom)?.label}</div>
                  </div>
                  <button
                    onClick={cancelConnection}
                    className="ml-2 px-2 py-1 bg-orange-600 hover:bg-orange-700 rounded text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-100 border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div>
              {nodes.length} nodes, {connections.length} connections
            </div>
            <div>
              {isConnecting ? 'Connection mode' : selectedNode ? 'Node selected' : 'Ready'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}