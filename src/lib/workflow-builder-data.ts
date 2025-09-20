import { FileText, Search, Mail, Database, CheckCircle, AlertTriangle, Users, Calendar, DollarSign, Shield, Briefcase, Scale } from 'lucide-react';

export interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  icon: any;
  category: 'input' | 'process' | 'decision' | 'action' | 'output';
  description: string;
  properties?: Record<string, any>;
  position?: { x: number; y: number };
}

export interface WorkflowConnection {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
}

export const nodeTypes: WorkflowNode[] = [
  // Input Nodes
  {
    id: 'doc-upload',
    type: 'document-upload',
    label: 'Document Upload',
    icon: FileText,
    category: 'input',
    description: 'Upload documents for processing'
  },
  {
    id: 'email-trigger',
    type: 'email-trigger',
    label: 'Email Trigger',
    icon: Mail,
    category: 'input',
    description: 'Trigger workflow from email'
  },
  {
    id: 'calendar-event',
    type: 'calendar-event',
    label: 'Calendar Event',
    icon: Calendar,
    category: 'input',
    description: 'Trigger from calendar events'
  },

  // Process Nodes
  {
    id: 'doc-review',
    type: 'document-review',
    label: 'Document Review',
    icon: Search,
    category: 'process',
    description: 'AI-powered document analysis'
  },
  {
    id: 'extract-data',
    type: 'data-extraction',
    label: 'Extract Data',
    icon: Database,
    category: 'process',
    description: 'Extract key information from documents'
  },
  {
    id: 'risk-analysis',
    type: 'risk-analysis',
    label: 'Risk Analysis',
    icon: AlertTriangle,
    category: 'process',
    description: 'Identify legal risks and issues'
  },
  {
    id: 'compliance-check',
    type: 'compliance-check',
    label: 'Compliance Check',
    icon: Shield,
    category: 'process',
    description: 'Check regulatory compliance'
  },

  // Decision Nodes
  {
    id: 'approval-required',
    type: 'approval-decision',
    label: 'Approval Required?',
    icon: CheckCircle,
    category: 'decision',
    description: 'Route based on approval needs'
  },
  {
    id: 'risk-threshold',
    type: 'risk-threshold',
    label: 'Risk Threshold',
    icon: Scale,
    category: 'decision',
    description: 'Route based on risk level'
  },
  {
    id: 'value-threshold',
    type: 'value-threshold',
    label: 'Value Threshold',
    icon: DollarSign,
    category: 'decision',
    description: 'Route based on deal value'
  },

  // Action Nodes
  {
    id: 'send-notification',
    type: 'notification',
    label: 'Send Notification',
    icon: Mail,
    category: 'action',
    description: 'Send email or Slack notification'
  },
  {
    id: 'assign-task',
    type: 'task-assignment',
    label: 'Assign Task',
    icon: Users,
    category: 'action',
    description: 'Assign task to team member'
  },
  {
    id: 'generate-report',
    type: 'report-generation',
    label: 'Generate Report',
    icon: FileText,
    category: 'action',
    description: 'Create summary report'
  },

  // Output Nodes
  {
    id: 'store-document',
    type: 'document-storage',
    label: 'Store Document',
    icon: Database,
    category: 'output',
    description: 'Save to document management system'
  },
  {
    id: 'case-update',
    type: 'case-update',
    label: 'Update Case',
    icon: Briefcase,
    category: 'output',
    description: 'Update case management system'
  }
];

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'ma-due-diligence',
    name: 'M&A Due Diligence',
    description: 'Automated due diligence review for mergers and acquisitions',
    icon: Briefcase,
    nodes: [
      {
        id: 'node-1',
        type: 'document-upload',
        label: 'Upload DD Documents',
        icon: FileText,
        category: 'input',
        description: 'Upload due diligence documents',
        position: { x: 100, y: 200 }
      },
      {
        id: 'node-2',
        type: 'data-extraction',
        label: 'Extract Key Terms',
        icon: Database,
        category: 'process',
        description: 'Extract financial and legal terms',
        position: { x: 300, y: 200 }
      },
      {
        id: 'node-3',
        type: 'risk-analysis',
        label: 'Risk Assessment',
        icon: AlertTriangle,
        category: 'process',
        description: 'Identify deal risks',
        position: { x: 500, y: 200 }
      },
      {
        id: 'node-4',
        type: 'risk-threshold',
        label: 'High Risk?',
        icon: Scale,
        category: 'decision',
        description: 'Check risk level',
        position: { x: 700, y: 200 }
      },
      {
        id: 'node-5',
        type: 'notification',
        label: 'Alert Partner',
        icon: Mail,
        category: 'action',
        description: 'Notify senior partner',
        position: { x: 900, y: 100 }
      },
      {
        id: 'node-6',
        type: 'report-generation',
        label: 'DD Report',
        icon: FileText,
        category: 'action',
        description: 'Generate DD report',
        position: { x: 900, y: 300 }
      },
      {
        id: 'node-7',
        type: 'case-update',
        label: 'Update Deal Room',
        icon: Briefcase,
        category: 'output',
        description: 'Update virtual deal room',
        position: { x: 1100, y: 200 }
      }
    ],
    connections: [
      { id: 'conn-1', source: 'node-1', target: 'node-2' },
      { id: 'conn-2', source: 'node-2', target: 'node-3' },
      { id: 'conn-3', source: 'node-3', target: 'node-4' },
      { id: 'conn-4', source: 'node-4', target: 'node-5', label: 'Yes' },
      { id: 'conn-5', source: 'node-4', target: 'node-6', label: 'No' },
      { id: 'conn-6', source: 'node-5', target: 'node-7' },
      { id: 'conn-7', source: 'node-6', target: 'node-7' }
    ]
  },
  {
    id: 'contract-review',
    name: 'Contract Review',
    description: 'Automated contract review and approval workflow',
    icon: FileText,
    nodes: [
      {
        id: 'node-1',
        type: 'email-trigger',
        label: 'Contract Email',
        icon: Mail,
        category: 'input',
        description: 'Receive contract via email',
        position: { x: 100, y: 200 }
      },
      {
        id: 'node-2',
        type: 'document-review',
        label: 'AI Review',
        icon: Search,
        category: 'process',
        description: 'AI contract analysis',
        position: { x: 300, y: 200 }
      },
      {
        id: 'node-3',
        type: 'compliance-check',
        label: 'Compliance Check',
        icon: Shield,
        category: 'process',
        description: 'Check compliance requirements',
        position: { x: 500, y: 200 }
      },
      {
        id: 'node-4',
        type: 'value-threshold',
        label: 'Value > $1M?',
        icon: DollarSign,
        category: 'decision',
        description: 'Check contract value',
        position: { x: 700, y: 200 }
      },
      {
        id: 'node-5',
        type: 'task-assignment',
        label: 'Assign to Partner',
        icon: Users,
        category: 'action',
        description: 'Assign to senior review',
        position: { x: 900, y: 100 }
      },
      {
        id: 'node-6',
        type: 'notification',
        label: 'Auto-Approve',
        icon: CheckCircle,
        category: 'action',
        description: 'Automatic approval',
        position: { x: 900, y: 300 }
      },
      {
        id: 'node-7',
        type: 'document-storage',
        label: 'Store Contract',
        icon: Database,
        category: 'output',
        description: 'Save to DMS',
        position: { x: 1100, y: 200 }
      }
    ],
    connections: [
      { id: 'conn-1', source: 'node-1', target: 'node-2' },
      { id: 'conn-2', source: 'node-2', target: 'node-3' },
      { id: 'conn-3', source: 'node-3', target: 'node-4' },
      { id: 'conn-4', source: 'node-4', target: 'node-5', label: 'Yes' },
      { id: 'conn-5', source: 'node-4', target: 'node-6', label: 'No' },
      { id: 'conn-6', source: 'node-5', target: 'node-7' },
      { id: 'conn-7', source: 'node-6', target: 'node-7' }
    ]
  },
  {
    id: 'litigation-discovery',
    name: 'Litigation Discovery',
    description: 'Manage document discovery and production workflow',
    icon: Scale,
    nodes: [
      {
        id: 'node-1',
        type: 'document-upload',
        label: 'Discovery Upload',
        icon: FileText,
        category: 'input',
        description: 'Upload discovery documents',
        position: { x: 100, y: 200 }
      },
      {
        id: 'node-2',
        type: 'data-extraction',
        label: 'Extract Metadata',
        icon: Database,
        category: 'process',
        description: 'Extract document metadata',
        position: { x: 300, y: 200 }
      },
      {
        id: 'node-3',
        type: 'document-review',
        label: 'Privilege Review',
        icon: Shield,
        category: 'process',
        description: 'Check for privileged content',
        position: { x: 500, y: 200 }
      },
      {
        id: 'node-4',
        type: 'approval-decision',
        label: 'Privileged?',
        icon: Scale,
        category: 'decision',
        description: 'Contains privileged info',
        position: { x: 700, y: 200 }
      },
      {
        id: 'node-5',
        type: 'task-assignment',
        label: 'Flag for Review',
        icon: AlertTriangle,
        category: 'action',
        description: 'Manual review required',
        position: { x: 900, y: 100 }
      },
      {
        id: 'node-6',
        type: 'report-generation',
        label: 'Production Log',
        icon: FileText,
        category: 'action',
        description: 'Add to production log',
        position: { x: 900, y: 300 }
      },
      {
        id: 'node-7',
        type: 'case-update',
        label: 'Update Case File',
        icon: Briefcase,
        category: 'output',
        description: 'Update litigation database',
        position: { x: 1100, y: 200 }
      }
    ],
    connections: [
      { id: 'conn-1', source: 'node-1', target: 'node-2' },
      { id: 'conn-2', source: 'node-2', target: 'node-3' },
      { id: 'conn-3', source: 'node-3', target: 'node-4' },
      { id: 'conn-4', source: 'node-4', target: 'node-5', label: 'Yes' },
      { id: 'conn-5', source: 'node-4', target: 'node-6', label: 'No' },
      { id: 'conn-6', source: 'node-5', target: 'node-7' },
      { id: 'conn-7', source: 'node-6', target: 'node-7' }
    ]
  }
];

export const categoryColors = {
  input: 'bg-blue-500',
  process: 'bg-purple-500',
  decision: 'bg-yellow-500',
  action: 'bg-green-500',
  output: 'bg-gray-500'
};

export const categoryBorderColors = {
  input: 'border-blue-500',
  process: 'border-purple-500',
  decision: 'border-yellow-500',
  action: 'border-green-500',
  output: 'border-gray-500'
};