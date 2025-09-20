'use client';

import { useState, useRef } from 'react';
import {
  Plus, Download, Play, Trash2, Grid, ChevronDown,
  FileText, Search, Mail, Database, CheckCircle,
  AlertTriangle, Users, Calendar, DollarSign, Shield,
  Briefcase, Scale, ArrowDown, Sparkles, X
} from 'lucide-react';
import {
  nodeTypes,
  workflowTemplates,
  categoryColors,
  type WorkflowNode,
  type WorkflowTemplate
} from '@/lib/workflow-builder-data';

interface WorkflowStep {
  id: string;
  node: WorkflowNode;
  order: number;
}

export default function SimpleWorkflowBuilder() {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');
  const [showTemplates, setShowTemplates] = useState(false);
  const [draggedNode, setDraggedNode] = useState<WorkflowNode | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Add node to workflow
  const addNodeToWorkflow = (node: WorkflowNode) => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      node: { ...node, id: `node-${Date.now()}` },
      order: workflowSteps.length
    };
    setWorkflowSteps([...workflowSteps, newStep]);
  };

  // Remove step from workflow
  const removeStep = (stepId: string) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== stepId));
  };

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, node: WorkflowNode) => {
    setDraggedNode(node);
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Handle drag over workflow
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  // Handle drop on workflow
  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedNode) {
      const newStep: WorkflowStep = {
        id: `step-${Date.now()}`,
        node: { ...draggedNode, id: `node-${Date.now()}` },
        order: index
      };

      const newSteps = [...workflowSteps];
      newSteps.splice(index, 0, newStep);

      // Update order numbers
      newSteps.forEach((step, i) => {
        step.order = i;
      });

      setWorkflowSteps(newSteps);
      setDraggedNode(null);
      setDragOverIndex(null);
    }
  };

  // Load template
  const loadTemplate = (template: WorkflowTemplate) => {
    const steps: WorkflowStep[] = template.nodes.map((node, index) => ({
      id: `step-${Date.now()}-${index}`,
      node: { ...node },
      order: index
    }));
    setWorkflowSteps(steps);
    setWorkflowName(template.name);
    setShowTemplates(false);
  };

  // Clear workflow
  const clearWorkflow = () => {
    setWorkflowSteps([]);
    setWorkflowName('Untitled Workflow');
  };

  // Export workflow
  const exportWorkflow = () => {
    const workflow = {
      name: workflowName,
      timestamp: new Date().toISOString(),
      steps: workflowSteps.map(step => ({
        order: step.order,
        nodeType: step.node.type,
        label: step.node.label,
        category: step.node.category,
        description: step.node.description
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

  // Run workflow simulation
  const runWorkflow = () => {
    if (workflowSteps.length === 0) {
      alert('Please add some steps to your workflow first!');
      return;
    }
    alert(`Running workflow: ${workflowName}\\n\\nSteps:\\n${workflowSteps.map((s, i) => `${i+1}. ${s.node.label}`).join('\\n')}`);
  };

  // Filter nodes by category
  const filteredNodes = selectedCategory === 'all'
    ? nodeTypes
    : nodeTypes.filter(node => node.category === selectedCategory);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Node Palette */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Workflow Components
          </h3>
          <p className="text-sm text-blue-100 mt-1">Drag components to build your workflow</p>
        </div>

        {/* Category Filter */}
        <div className="p-3 border-b bg-gray-50">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="all">All Categories</option>
            <option value="input">Input Sources</option>
            <option value="process">Processing Steps</option>
            <option value="decision">Decision Points</option>
            <option value="action">Actions</option>
            <option value="output">Outputs</option>
          </select>
        </div>

        {/* Draggable Nodes */}
        <div className="p-4 space-y-2">
          {filteredNodes.map(node => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                draggable
                onDragStart={(e) => handleDragStart(e, node)}
                onClick={() => addNodeToWorkflow(node)}
                className={`p-3 rounded-lg border-2 bg-white cursor-move hover:shadow-lg transition-all transform hover:scale-105 ${
                  categoryColors[node.category].replace('bg-', 'border-')
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${categoryColors[node.category]} text-white flex-shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800">{node.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{node.description}</div>
                    <div className="text-xs text-gray-400 mt-2">Click or drag to add</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Workflow Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="text-xl font-bold bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1"
                placeholder="Workflow Name"
              />
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex items-center gap-2 transition-colors"
              >
                <Grid className="h-4 w-4" />
                Templates
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearWorkflow}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm flex items-center gap-2 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </button>
              <button
                onClick={runWorkflow}
                disabled={workflowSteps.length === 0}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm flex items-center gap-2 transition-colors"
              >
                <Play className="h-4 w-4" />
                Run
              </button>
              <button
                onClick={exportWorkflow}
                disabled={workflowSteps.length === 0}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm flex items-center gap-2 transition-colors"
              >
                <Download className="h-4 w-4" />
                Export JSON
              </button>
            </div>
          </div>
        </div>

        {/* Templates Panel */}
        {showTemplates && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Start Templates</h3>
            <div className="grid grid-cols-3 gap-4">
              {workflowTemplates.map(template => {
                const Icon = template.icon;
                return (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template)}
                    className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-bold text-gray-800">{template.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                        <p className="text-xs text-blue-600 mt-2 font-medium">
                          {template.nodes.length} steps ready to use
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Workflow Steps Display */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-3xl mx-auto">
            {workflowSteps.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                  <Plus className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  Start Building Your Workflow
                </h3>
                <p className="text-gray-500 mb-6">
                  Drag components from the left or select a template to get started
                </p>
                <div className="inline-flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Drag & Drop
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Click to Add
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Use Templates
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {workflowSteps.map((step, index) => {
                  const Icon = step.node.icon;
                  return (
                    <div key={step.id}>
                      {/* Drop Zone */}
                      <div
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragLeave={() => setDragOverIndex(null)}
                        className={`h-2 transition-all ${
                          dragOverIndex === index ? 'bg-blue-200 h-16 border-2 border-dashed border-blue-400 rounded-lg' : ''
                        }`}
                      />

                      {/* Step Card */}
                      <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all">
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-bold text-sm">
                          {index + 1}
                        </div>

                        <div className="p-4 flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${categoryColors[step.node.category]} text-white flex-shrink-0`}>
                            <Icon className="h-6 w-6" />
                          </div>

                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800">{step.node.label}</h4>
                            <p className="text-sm text-gray-600">{step.node.description}</p>
                            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                              categoryColors[step.node.category]
                            } bg-opacity-20 text-gray-700`}>
                              {step.node.category}
                            </span>
                          </div>

                          <button
                            onClick={() => removeStep(step.id)}
                            className="opacity-0 group-hover:opacity-100 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Connector Arrow */}
                        {index < workflowSteps.length - 1 && (
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10">
                            <ArrowDown className="h-6 w-6 text-blue-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Final Drop Zone */}
                <div
                  onDragOver={(e) => handleDragOver(e, workflowSteps.length)}
                  onDrop={(e) => handleDrop(e, workflowSteps.length)}
                  onDragLeave={() => setDragOverIndex(null)}
                  className={`h-2 transition-all ${
                    dragOverIndex === workflowSteps.length ? 'bg-blue-200 h-16 border-2 border-dashed border-blue-400 rounded-lg' : ''
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-100 border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                <strong>{workflowSteps.length}</strong> steps in workflow
              </span>
              {workflowSteps.length > 0 && (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Ready to run
                </span>
              )}
            </div>
            <div className="text-gray-500">
              Drag components or click to add • Export as JSON for integration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}