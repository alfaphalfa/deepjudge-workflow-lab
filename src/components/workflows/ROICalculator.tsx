'use client';

import { useState } from 'react';
import {
  DollarSign, TrendingUp, Clock, Mail, FileText, Calendar,
  AlertCircle, CheckCircle, ArrowRight, Sparkles, Search,
  Activity, Users, Calculator, ChevronRight, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

interface UnbilledActivity {
  id: string;
  type: 'email' | 'document' | 'meeting' | 'call';
  client: string;
  matter: string;
  description: string;
  date: string;
  duration: number; // in minutes
  value: number;
  confidence: number;
  source: string;
}

export default function ROICalculator() {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  // Sample unbilled activities that AI would identify
  const unbilledActivities: UnbilledActivity[] = [
    {
      id: '1',
      type: 'email',
      client: 'Acme Corporation',
      matter: 'Merger Advisory',
      description: 'Reviewed and provided detailed feedback on merger agreement sections 4.1-4.8',
      date: 'Today, 2:30 PM',
      duration: 45,
      value: 337.50,
      confidence: 98,
      source: 'Email to Sarah Chen'
    },
    {
      id: '2',
      type: 'document',
      client: 'TechStart Inc',
      matter: 'Series B Financing',
      description: 'Drafted investor rights agreement amendment and side letter provisions',
      date: 'Today, 11:15 AM',
      duration: 120,
      value: 900,
      confidence: 95,
      source: 'Document: IRA_Amendment_v3.docx'
    },
    {
      id: '3',
      type: 'meeting',
      client: 'Global Manufacturing Co',
      matter: 'IP Portfolio Review',
      description: 'Strategy session on patent portfolio optimization and licensing opportunities',
      date: 'Yesterday, 3:00 PM',
      duration: 60,
      value: 450,
      confidence: 92,
      source: 'Calendar: Teams Meeting'
    },
    {
      id: '4',
      type: 'email',
      client: 'Wellness Brands LLC',
      matter: 'Regulatory Compliance',
      description: 'Analyzed FDA compliance requirements and provided regulatory strategy memo',
      date: 'Yesterday, 10:30 AM',
      duration: 90,
      value: 675,
      confidence: 96,
      source: 'Email thread: RE: FDA Requirements'
    },
    {
      id: '5',
      type: 'call',
      client: 'Acme Corporation',
      matter: 'Merger Advisory',
      description: 'Conference call discussing antitrust implications and HSR filing strategy',
      date: 'Monday, 4:00 PM',
      duration: 75,
      value: 562.50,
      confidence: 88,
      source: 'Phone log: +1-555-0123'
    },
    {
      id: '6',
      type: 'document',
      client: 'FinTech Solutions',
      matter: 'Licensing Agreement',
      description: 'Reviewed and marked up software licensing terms and SLA provisions',
      date: 'Monday, 9:00 AM',
      duration: 150,
      value: 1125,
      confidence: 97,
      source: 'Document: SLA_Review_Notes.pdf'
    },
    {
      id: '7',
      type: 'email',
      client: 'Healthcare Partners',
      matter: 'Joint Venture',
      description: 'Negotiated key terms for joint venture structure and governance provisions',
      date: 'Last Friday, 2:00 PM',
      duration: 180,
      value: 1350,
      confidence: 94,
      source: 'Email chain: JV Structure Discussion'
    },
    {
      id: '8',
      type: 'meeting',
      client: 'Real Estate Holdings',
      matter: 'Property Acquisition',
      description: 'Due diligence review meeting on commercial property portfolio',
      date: 'Last Friday, 10:00 AM',
      duration: 90,
      value: 675,
      confidence: 91,
      source: 'Calendar: DD Review Session'
    },
    {
      id: '9',
      type: 'document',
      client: 'Energy Corp',
      matter: 'Environmental Compliance',
      description: 'Prepared environmental impact assessment and compliance checklist',
      date: 'Last Thursday, 3:30 PM',
      duration: 240,
      value: 1800,
      confidence: 93,
      source: 'Document: Environmental_Assessment.docx'
    },
    {
      id: '10',
      type: 'email',
      client: 'Retail Chain Inc',
      matter: 'Franchise Agreements',
      description: 'Drafted franchise disclosure document updates and territory provisions',
      date: 'Last Thursday, 11:00 AM',
      duration: 105,
      value: 787.50,
      confidence: 96,
      source: 'Email: FDD Updates - Draft'
    }
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      // Auto-select high confidence items
      setSelectedActivities(
        unbilledActivities
          .filter(a => a.confidence >= 90)
          .map(a => a.id)
      );
    }, 2000);
  };

  const toggleActivity = (id: string) => {
    setSelectedActivities(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const totalRecovered = unbilledActivities
    .filter(a => selectedActivities.includes(a.id))
    .reduce((sum, a) => sum + a.value, 0);

  const totalHours = unbilledActivities
    .filter(a => selectedActivities.includes(a.id))
    .reduce((sum, a) => sum + a.duration, 0) / 60;

  const monthlySubscription = 3200;
  const roiMultiple = totalRecovered / monthlySubscription;

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'email': return Mail;
      case 'document': return FileText;
      case 'meeting': return Users;
      case 'call': return Activity;
      default: return FileText;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-600';
    if (confidence >= 90) return 'text-emerald-600';
    if (confidence >= 85) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <Calculator className="h-8 w-8" />
          ROI Calculator & Unbilled Work Analysis
        </h2>
        <p className="text-emerald-50 text-lg">
          Discover hidden revenue in your daily work with AI-powered time capture
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Annual Savings</p>
              <p className="text-2xl font-bold text-gray-900">$18,000</p>
              <p className="text-xs text-gray-500">per lawyer</p>
            </div>
            <DollarSign className="h-8 w-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Time Saved</p>
              <p className="text-2xl font-bold text-gray-900">8+ hrs</p>
              <p className="text-xs text-gray-500">weekly</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Adoption Rate</p>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-xs text-gray-500">vs 40% average</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ROI</p>
              <p className="text-2xl font-bold text-gray-900">350%</p>
              <p className="text-xs text-gray-500">year one</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Analyze My Unbilled Work Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              Analyze My Unbilled Work
            </h3>
            <p className="text-gray-600 mt-2">
              AI scans your emails, documents, and calendar to identify billable work you might have missed
            </p>
          </div>
          {!analyzed && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={analyzing}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                analyzing
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {analyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5" />
                  Start Analysis
                </>
              )}
            </motion.button>
          )}
        </div>

        {/* Analysis Results */}
        {analyzed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Summary Alert */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-emerald-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-bold text-emerald-900 text-lg">
                    Found {unbilledActivities.length} unbilled activities worth ${unbilledActivities.reduce((sum, a) => sum + a.value, 0).toLocaleString()}
                  </h4>
                  <p className="text-emerald-700 mt-1">
                    DeepJudge AI identified {Math.round(unbilledActivities.reduce((sum, a) => sum + a.duration, 0) / 60)} hours of billable work from the past week
                  </p>
                </div>
              </div>
            </div>

            {/* Activity List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">Identified Activities</h4>
                <button
                  onClick={() => setSelectedActivities(
                    selectedActivities.length === unbilledActivities.length ? [] : unbilledActivities.map(a => a.id)
                  )}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {selectedActivities.length === unbilledActivities.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              {unbilledActivities.map((activity) => {
                const Icon = getTypeIcon(activity.type);
                const isSelected = selectedActivities.includes(activity.id);

                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => toggleActivity(activity.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${
                        isSelected ? 'bg-emerald-200' : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          isSelected ? 'text-emerald-700' : 'text-gray-600'
                        }`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h5 className="font-semibold text-gray-900">
                              {activity.client} - {activity.matter}
                            </h5>
                            <p className="text-gray-700 mt-1">{activity.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ${activity.value.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {activity.duration} min
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">{activity.date}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">Source: {activity.source}</span>
                          <span className="text-gray-400">•</span>
                          <span className={`font-medium ${getConfidenceColor(activity.confidence)}`}>
                            {activity.confidence}% confidence
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleActivity(activity.id);
                          }}
                          className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Recovery Summary */}
            {selectedActivities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-emerald-100 text-sm mb-1">Total Recovered This Month</p>
                    <p className="text-4xl font-bold">${totalRecovered.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm mb-1">Hours Captured</p>
                    <p className="text-4xl font-bold">{totalHours.toFixed(1)} hrs</p>
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm mb-1">ROI Multiple</p>
                    <p className="text-4xl font-bold">{roiMultiple.toFixed(1)}x</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-white" />
                    <div>
                      <p className="font-semibold text-lg">
                        This pays for DeepJudge {roiMultiple.toFixed(1)}x over!
                      </p>
                      <p className="text-emerald-100 text-sm mt-1">
                        Monthly subscription: ${monthlySubscription} • Revenue recovered: ${totalRecovered.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <button className="px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2">
                    Add to Timesheet
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <p className="text-emerald-100 text-sm">
                    <Info className="h-4 w-4 inline mr-1" />
                    AI continues learning from your corrections
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* How It Works */}
        {!analyzed && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-4">How It Works</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Mail className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Email Analysis</h5>
                  <p className="text-sm text-gray-600">Scans email for legal advice and document reviews</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Document Tracking</h5>
                  <p className="text-sm text-gray-600">Identifies time spent on contracts and memos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Calendar Integration</h5>
                  <p className="text-sm text-gray-600">Captures meetings and calls automatically</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}