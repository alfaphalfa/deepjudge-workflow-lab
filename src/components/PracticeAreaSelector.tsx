'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Scale, Shield, Lightbulb, Briefcase, FileText,
  TrendingUp, Search, Brain, DollarSign, Clock, Users,
  CheckCircle, ArrowRight, Sparkles, Target, Zap, AlertCircle
} from 'lucide-react';

export interface PracticeArea {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  painPoints: string[];
  workflows: {
    name: string;
    description: string;
    timesSaved: string;
  }[];
  searchQueries: string[];
  roiMetrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
}

const practiceAreas: PracticeArea[] = [
  {
    id: 'corporate',
    name: 'Corporate / M&A',
    icon: Building2,
    color: 'blue',
    description: 'Streamline due diligence, contract analysis, and deal documentation',
    painPoints: [
      'Manual due diligence taking weeks',
      'Missing critical change of control provisions',
      'Inconsistent deal precedent tracking',
      'Time-consuming disclosure schedule preparation'
    ],
    workflows: [
      {
        name: 'Due Diligence Automation',
        description: 'AI-powered document review and issue spotting',
        timesSaved: '80% reduction in DD time'
      },
      {
        name: 'Deal Precedent Search',
        description: 'Find relevant precedent from past transactions',
        timesSaved: '6 hours per deal'
      },
      {
        name: 'Contract Risk Analysis',
        description: 'Automated identification of non-market terms',
        timesSaved: '4 hours per agreement'
      }
    ],
    searchQueries: [
      'Find all change of control provisions in employment agreements',
      'Show me indemnification caps above 20% in recent deals',
      'List all MAE definitions from 2023 transactions',
      'Compare earnout structures in healthcare acquisitions'
    ],
    roiMetrics: [
      { label: 'DD Time Reduction', value: '75%', improvement: 'From 3 weeks to 4 days' },
      { label: 'Deals Reviewed Monthly', value: '3x more', improvement: 'From 2 to 6 deals' },
      { label: 'Cost per Transaction', value: '-$45K', improvement: 'Associate hours saved' },
      { label: 'Precedent Reuse', value: '85%', improvement: 'vs 30% manual' }
    ],
  },
  {
    id: 'litigation',
    name: 'Litigation',
    icon: Scale,
    color: 'red',
    description: 'Accelerate discovery, case research, and motion drafting',
    painPoints: [
      'Document review consuming 70% of case budget',
      'Missing key precedents in case law research',
      'Inconsistent privilege review across matters',
      'Manual timeline creation from thousands of documents'
    ],
    workflows: [
      {
        name: 'Discovery Document Analysis',
        description: 'AI privilege review and responsive document identification',
        timesSaved: '90% faster review'
      },
      {
        name: 'Case Law Research',
        description: 'Semantic search across jurisdictions with citation checking',
        timesSaved: '8 hours per motion'
      },
      {
        name: 'Deposition Preparation',
        description: 'Automated witness outline generation from case documents',
        timesSaved: '2 days per deposition'
      }
    ],
    searchQueries: [
      'Find all mentions of fraud in discovery documents',
      'Show privilege log entries missing attorney names',
      'Identify inconsistencies in witness statements',
      'Extract key admissions from defendant emails'
    ],
    roiMetrics: [
      { label: 'Discovery Cost', value: '-65%', improvement: '$200K to $70K per case' },
      { label: 'Motion Success Rate', value: '+28%', improvement: 'Better precedent citations' },
      { label: 'Review Speed', value: '1000 docs/hr', improvement: 'vs 50 manual' },
      { label: 'Case Prep Time', value: '-60%', improvement: '2 weeks to 5 days' }
    ],
  },
  {
    id: 'regulatory',
    name: 'Regulatory / Compliance',
    icon: Shield,
    color: 'green',
    description: 'Navigate complex regulations and automate compliance monitoring',
    painPoints: [
      'Regulatory changes requiring manual policy updates',
      'Cross-jurisdictional compliance mapping',
      'Audit preparation taking months',
      'Manual regulatory filing assembly'
    ],
    workflows: [
      {
        name: 'Regulatory Change Tracking',
        description: 'Monitor and alert on relevant regulatory updates',
        timesSaved: '20 hours weekly'
      },
      {
        name: 'Compliance Gap Analysis',
        description: 'Compare policies against current regulations',
        timesSaved: '3 weeks per audit'
      },
      {
        name: 'Filing Automation',
        description: 'Auto-populate regulatory forms from internal data',
        timesSaved: '70% faster filing'
      }
    ],
    searchQueries: [
      'Show GDPR compliance gaps in our privacy policy',
      'Find all SOX control deficiencies from last audit',
      'List new SEC requirements effective this quarter',
      'Compare our AML procedures to FinCEN guidance'
    ],
    roiMetrics: [
      { label: 'Compliance Violations', value: '-87%', improvement: 'Proactive detection' },
      { label: 'Audit Prep Time', value: '-75%', improvement: '3 months to 3 weeks' },
      { label: 'Regulatory Fines', value: '-$2.3M', improvement: 'Avoided penalties' },
      { label: 'Policy Updates', value: 'Real-time', improvement: 'vs quarterly manual' }
    ],
  },
  {
    id: 'ip',
    name: 'IP / Patent',
    icon: Lightbulb,
    color: 'purple',
    description: 'Streamline patent prosecution, portfolio management, and IP litigation',
    painPoints: [
      'Prior art searches taking days per application',
      'Missing critical patent expiration dates',
      'Manual freedom-to-operate analysis',
      'Inconsistent patent claim construction'
    ],
    workflows: [
      {
        name: 'Prior Art Search',
        description: 'AI-powered semantic search across patent databases',
        timesSaved: '95% faster searches'
      },
      {
        name: 'Patent Portfolio Analysis',
        description: 'Automated landscape and competitor monitoring',
        timesSaved: '30 hours monthly'
      },
      {
        name: 'Claim Construction Assistant',
        description: 'Consistent interpretation across patent families',
        timesSaved: '2 days per patent'
      }
    ],
    searchQueries: [
      'Find all prior art related to quantum computing encryption',
      'Show patents expiring in next 6 months requiring action',
      'Identify potential infringement of our battery patents',
      'Compare our claims to competitor patent US10,123,456'
    ],
    roiMetrics: [
      { label: 'Prior Art Search', value: '48hrs → 2hrs', improvement: '96% faster' },
      { label: 'Patent Quality', value: '+35%', improvement: 'Fewer rejections' },
      { label: 'FTO Analysis', value: '2 weeks → 2 days', improvement: '85% faster' },
      { label: 'Portfolio Value', value: '+$4.2M', improvement: 'Better coverage' }
    ],
  }
];

interface PracticeAreaSelectorProps {
  onSelectArea?: (area: PracticeArea) => void;
  selectedAreaId?: string;
}

export default function PracticeAreaSelector({ onSelectArea, selectedAreaId = 'corporate' }: PracticeAreaSelectorProps) {
  const [selectedArea, setSelectedArea] = useState<PracticeArea>(
    practiceAreas.find(a => a.id === selectedAreaId) || practiceAreas[0]
  );
  const [showDetails, setShowDetails] = useState(true);

  const handleSelectArea = (area: PracticeArea) => {
    setSelectedArea(area);
    if (onSelectArea) {
      onSelectArea(area);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; light: string }> = {
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        border: 'border-blue-500',
        light: 'bg-blue-50'
      },
      red: {
        bg: 'bg-red-500',
        text: 'text-red-600',
        border: 'border-red-500',
        light: 'bg-red-50'
      },
      green: {
        bg: 'bg-green-500',
        text: 'text-green-600',
        border: 'border-green-500',
        light: 'bg-green-50'
      },
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-600',
        border: 'border-purple-500',
        light: 'bg-purple-50'
      }
    };
    return colors[color] || colors.blue;
  };

  const colors = getColorClasses(selectedArea.color);

  return (
    <div className="space-y-6">
      {/* Practice Area Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-gray-600" />
            Select Your Practice Area
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            See workflows and solutions tailored to your legal specialty
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {practiceAreas.map((area) => {
            const Icon = area.icon;
            const isSelected = area.id === selectedArea.id;
            const areaColors = getColorClasses(area.color);

            return (
              <motion.button
                key={area.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectArea(area)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? `${areaColors.border} ${areaColors.light}`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={`p-3 rounded-lg ${
                    isSelected ? areaColors.bg : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      isSelected ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{area.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{area.description}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle className={`h-5 w-5 ${areaColors.text}`} />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showDetails && (
          <motion.div
            key={selectedArea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Pain Points */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className={`h-5 w-5 ${colors.text}`} />
                Common {selectedArea.name} Pain Points We Solve
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedArea.painPoints.map((pain, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <div className={`p-1 rounded ${colors.light} mt-0.5`}>
                      <Target className={`h-4 w-4 ${colors.text}`} />
                    </div>
                    <span className="text-gray-700 text-sm">{pain}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Workflows */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className={`h-5 w-5 ${colors.text}`} />
                {selectedArea.name} Automation Workflows
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedArea.workflows.map((workflow, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-2 ${colors.border} rounded-lg p-4 ${colors.light}`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {workflow.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {workflow.description}
                    </p>
                    <div className={`inline-flex items-center gap-1 text-sm font-semibold ${colors.text}`}>
                      <Clock className="h-4 w-4" />
                      {workflow.timesSaved}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sample Search Queries */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Search className={`h-5 w-5 ${colors.text}`} />
                Sample {selectedArea.name} Search Queries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedArea.searchQueries.map((query, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <Sparkles className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                    <span className="text-sm text-gray-700 font-mono">"{query}"</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ROI Metrics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className={`h-5 w-5 ${colors.text}`} />
                {selectedArea.name} ROI Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedArea.roiMetrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className={`text-2xl font-bold ${colors.text}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mt-1">
                      {metric.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {metric.improvement}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { practiceAreas };