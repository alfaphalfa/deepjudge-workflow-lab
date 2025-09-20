'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  FileText, Home, Shield, CheckCircle, AlertCircle, Clock,
  TrendingUp, ArrowRight, DollarSign, Calendar, Users, Scale,
  Building, Globe, CreditCard, Lock, Search, GitCompare,
  Sparkles, Target, Info, X, ChevronRight, Award, Zap
} from 'lucide-react';

interface ExtractedTerm {
  category: string;
  term: string;
  value: string;
  confidence: number;
  risk?: 'low' | 'medium' | 'high';
}

interface DocumentComparison {
  section: string;
  original: string;
  modified: string;
  changeType: 'added' | 'removed' | 'modified';
}

export default function DocumentIntelligencePage() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'comparison' | 'metrics'>('analysis');
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState('services-agreement');
  const [comparisonMode, setComparisonMode] = useState(false);

  const extractedTerms: ExtractedTerm[] = [
    // Key Terms & Dates
    { category: 'Key Terms', term: 'Effective Date', value: 'January 1, 2024', confidence: 99 },
    { category: 'Key Terms', term: 'Term Length', value: '3 years with auto-renewal', confidence: 95 },
    { category: 'Key Terms', term: 'Governing Law', value: 'New York', confidence: 98 },
    { category: 'Key Terms', term: 'Jurisdiction', value: 'Southern District of New York', confidence: 97 },

    // Obligations & Deliverables
    { category: 'Obligations', term: 'Service Level Agreement', value: '99.9% uptime guaranteed', confidence: 96 },
    { category: 'Obligations', term: 'Response Time', value: '4 hours for critical issues', confidence: 94 },
    { category: 'Obligations', term: 'Quarterly Reports', value: 'Due within 15 days of quarter end', confidence: 98 },
    { category: 'Obligations', term: 'Training Requirements', value: '40 hours annually', confidence: 92 },

    // Risk Clauses
    { category: 'Risk', term: 'Liability Cap', value: '$10M aggregate', confidence: 99, risk: 'medium' },
    { category: 'Risk', term: 'Indemnification', value: 'Mutual, excluding IP claims', confidence: 95, risk: 'high' },
    { category: 'Risk', term: 'Force Majeure', value: 'Standard carve-outs apply', confidence: 93, risk: 'low' },
    { category: 'Risk', term: 'Data Breach Notification', value: '72 hours required', confidence: 97, risk: 'high' },

    // Payment Terms
    { category: 'Payment', term: 'Payment Schedule', value: 'Net 30 days', confidence: 99 },
    { category: 'Payment', term: 'Annual Fee', value: '$2.4M base + usage', confidence: 98 },
    { category: 'Payment', term: 'Late Payment Interest', value: '1.5% monthly', confidence: 96 },
    { category: 'Payment', term: 'Currency', value: 'USD only', confidence: 100 },

    // Termination Conditions
    { category: 'Termination', term: 'Notice Period', value: '90 days written notice', confidence: 98 },
    { category: 'Termination', term: 'Termination for Cause', value: '30 days cure period', confidence: 94 },
    { category: 'Termination', term: 'Early Termination Fee', value: '50% of remaining contract value', confidence: 96, risk: 'medium' },
    { category: 'Termination', term: 'Data Return', value: '60 days post-termination', confidence: 95 }
  ];

  const documentChanges: DocumentComparison[] = [
    {
      section: 'Liability Cap',
      original: 'Limited to $5M aggregate',
      modified: 'Limited to $10M aggregate',
      changeType: 'modified'
    },
    {
      section: 'Payment Terms',
      original: 'Net 45 days',
      modified: 'Net 30 days',
      changeType: 'modified'
    },
    {
      section: 'Auto-Renewal',
      original: '',
      modified: 'Contract auto-renews for successive 1-year terms unless terminated with 90 days notice',
      changeType: 'added'
    },
    {
      section: 'Exclusivity Clause',
      original: 'Exclusive provider for all legal AI services',
      modified: '',
      changeType: 'removed'
    },
    {
      section: 'SLA Penalties',
      original: '',
      modified: '1% monthly fee reduction per 0.1% below 99.9% uptime',
      changeType: 'added'
    },
    {
      section: 'IP Rights',
      original: 'All work product owned by vendor',
      modified: 'Client retains ownership of all work product and derivatives',
      changeType: 'modified'
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Key Dates': 'blue',
      'Financial': 'green',
      'Legal': 'purple',
      'Obligations': 'orange',
      'Termination': 'red',
      'Risk': 'pink',
      'IP Rights': 'indigo'
    };
    return colors[category] || 'gray';
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getChangeColor = (changeType: string) => {
    switch(changeType) {
      case 'added': return 'text-green-600 bg-green-50 border-green-200';
      case 'removed': return 'text-red-600 bg-red-50 border-red-200';
      case 'modified': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Security features for modal
  const securityFeatures = [
    { icon: Lock, title: 'Bank-Grade Encryption', description: 'AES-256 encryption at rest and in transit' },
    { icon: Shield, title: 'Ethical Wall Enforcement', description: 'Automated conflict checking and matter segregation' },
    { icon: Users, title: 'Granular Permissions', description: 'Role-based access control down to document level' },
    { icon: Globe, title: 'SOC 2 Type II Certified', description: 'Annual third-party security audits' },
    { icon: Search, title: 'Audit Trail', description: 'Complete activity logging with tamper-proof records' },
    { icon: Building, title: 'Data Residency', description: 'Choose where your data is stored (US, EU, APAC)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <FileText className="h-10 w-10" />
                Document Intelligence
              </h1>
              <p className="mt-2 text-blue-100">
                AI-powered contract analysis with 99.5% accuracy across 50+ jurisdictions
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'analysis', label: 'Contract Analysis', icon: FileText },
              { id: 'comparison', label: 'Document Comparison', icon: GitCompare },
              { id: 'metrics', label: 'Extraction Metrics', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
            <button
              onClick={() => setShowSecurityModal(true)}
              className="ml-auto py-4 px-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <Shield className="h-5 w-5" />
              Enterprise Security
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Contract Analysis Dashboard */}
        {activeTab === 'analysis' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Document Selector */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Contract Analysis Dashboard</h2>
                <select
                  value={selectedDocument}
                  onChange={(e) => setSelectedDocument(e.target.value)}
                  className="px-4 py-2 border rounded-lg text-sm"
                >
                  <option value="service-agreement">Master Service Agreement</option>
                  <option value="nda">Non-Disclosure Agreement</option>
                  <option value="employment">Employment Contract</option>
                  <option value="lease">Commercial Lease</option>
                </select>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">
                    {extractedTerms.length}
                  </div>
                  <div className="text-sm text-gray-600">Terms Extracted</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">
                    96.8%
                  </div>
                  <div className="text-sm text-gray-600">Avg Confidence</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-yellow-600">
                    5
                  </div>
                  <div className="text-sm text-gray-600">Risk Items</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-600">
                    3 min
                  </div>
                  <div className="text-sm text-gray-600">Analysis Time</div>
                </div>
              </div>
            </div>

            {/* Extracted Terms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(
                extractedTerms.reduce((acc, term) => {
                  if (!acc[term.category]) acc[term.category] = [];
                  acc[term.category].push(term);
                  return acc;
                }, {} as Record<string, ExtractedTerm[]>)
              ).map(([category, terms]) => (
                <div key={category} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className={`text-lg font-bold mb-4 text-${getCategoryColor(category)}-600`}>
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {terms.map((term, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border rounded-lg p-3"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{term.term}</div>
                            <div className="text-sm font-semibold text-gray-700 mt-1">
                              {term.value}
                            </div>
                          </div>
                          {term.risk && (
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(term.risk)}`}>
                                {term.risk} risk
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-end text-xs">
                          <div className="flex items-center gap-1">
                            <div className={`h-2 w-2 rounded-full ${
                              term.confidence >= 95 ? 'bg-green-500' :
                              term.confidence >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                            <span className="text-gray-600">{term.confidence}% confidence</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                AI Insights & Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <AlertCircle className="h-6 w-6 text-yellow-500 mb-2" />
                  <h4 className="font-semibold text-gray-900">Auto-Renewal Risk</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Contract auto-renews in 87 days. Set reminder for 60-day notice period.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <Target className="h-6 w-6 text-red-500 mb-2" />
                  <h4 className="font-semibold text-gray-900">Liability Exposure</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    $10M cap is 2x industry standard. Consider negotiating lower cap.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
                  <h4 className="font-semibold text-gray-900">Compliance Check</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    All required data protection clauses present and enforceable.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Document Comparison View */}
        {activeTab === 'comparison' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Side-by-Side Document Comparison</h2>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Upload Documents
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Export Redline
                  </button>
                </div>
              </div>

              {/* Document Headers */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Version 1.0 (Original)</h3>
                  <p className="text-sm text-gray-600">Uploaded: March 15, 2023</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Version 2.0 (Current)</h3>
                  <p className="text-sm text-gray-600">Uploaded: January 8, 2024</p>
                </div>
              </div>

              {/* Comparison Summary */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-around text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-600">Additions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">18</div>
                    <div className="text-sm text-gray-600">Modifications</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <div className="text-sm text-gray-600">Deletions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600">47</div>
                    <div className="text-sm text-gray-600">Unchanged</div>
                  </div>
                </div>
              </div>

              {/* Detailed Comparisons */}
              <div className="space-y-3">
                {documentChanges.map((change, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border rounded-lg p-4 ${getChangeColor(change.changeType)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{change.section}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${
                        change.changeType === 'added' ? 'bg-green-100 text-green-700' :
                        change.changeType === 'removed' ? 'bg-red-100 text-red-700' :
                        change.changeType === 'modified' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {change.changeType}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Original</p>
                        <div className={`text-sm ${change.changeType === 'removed' ? '' : 'opacity-75'}`}>
                          {change.original ? (
                            change.changeType === 'removed' ? (
                              <span className="line-through text-red-600">{change.original}</span>
                            ) : (
                              <span className="text-gray-600">{change.original}</span>
                            )
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Modified</p>
                        <div className="text-sm">
                          {change.modified ? (
                            change.changeType === 'added' ? (
                              <span className="font-semibold text-green-700">{change.modified}</span>
                            ) : (
                              <span className="font-semibold">{change.modified}</span>
                            )
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Extraction Metrics */}
        {activeTab === 'metrics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h2>

              {/* Time Savings */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Time Savings</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 line-through">8 hours</div>
                    <div className="text-sm text-gray-600 mt-2">Manual Review</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">3 minutes</div>
                    <div className="text-sm text-gray-600 mt-2">AI Analysis</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                    <Zap className="h-5 w-5" />
                    160x Faster
                  </span>
                </div>
              </div>

              {/* Coverage Comparison */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Manual Review Coverage</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Key Terms</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Clauses</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Obligations</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '82%'}}></div>
                        </div>
                        <span className="text-sm font-medium">82%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">DeepJudge AI Coverage</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Key Terms</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Clauses</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Obligations</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '100%'}}></div>
                        </div>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical Terms Missed */}
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-900 mb-4">Critical Terms Never Missed</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'Automatic Renewal Clauses',
                    'Limitation of Liability',
                    'Indemnification Terms',
                    'Termination Triggers',
                    'Change of Control',
                    'Non-Compete Clauses',
                    'IP Ownership',
                    'Confidentiality Breach'
                  ].map((term, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{term}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                    <Award className="h-5 w-5" />
                    0 Critical Terms Missed in 50,000+ Contracts
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Enterprise Security Modal */}
      <AnimatePresence>
        {showSecurityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowSecurityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Shield className="h-8 w-8" />
                    Enterprise-Grade Security
                  </h2>
                  <button
                    onClick={() => setShowSecurityModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {securityFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Compliance & Certifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['SOC 2 Type II', 'ISO 27001', 'GDPR', 'CCPA', 'HIPAA', 'FedRAMP', 'PCI DSS', 'NIST'].map((cert) => (
                      <div key={cert} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowSecurityModal(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}