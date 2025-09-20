'use client';

import { useState } from 'react';
import {
  Beaker, ArrowRight, CheckCircle, AlertCircle, TrendingUp,
  FileText, Scale, Search, Sparkles, Copy,
  ChevronDown, ChevronUp, Target, Brain, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  iconName: string;
  basicPrompt: string;
  engineeredPrompt: string;
  variables: string[];
  improvements: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  sampleOutput: {
    basic: string;
    engineered: string;
  };
  tips: string[];
}

export default function PromptLab() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('contract');
  const [showComparison, setShowComparison] = useState(true);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>('template');

  // Helper function to get icon component
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'FileText': return FileText;
      case 'Scale': return Scale;
      case 'Search': return Search;
      default: return FileText;
    }
  };

  const promptTemplates: PromptTemplate[] = [
    {
      id: 'contract',
      name: 'Contract Analysis',
      category: 'Transactional',
      iconName: 'FileText',
      basicPrompt: 'Review this contract and tell me the key terms.',
      engineeredPrompt: `You are an experienced transactional attorney specializing in [PRACTICE_AREA].

TASK: Analyze the provided [CONTRACT_TYPE] with focus on risk allocation and commercial terms.

INSTRUCTIONS:
1. Extract and categorize key provisions:
   - Parties and definitions
   - Payment terms and consideration
   - Performance obligations
   - Warranties and representations
   - Limitation of liability
   - Termination and remedies
   - Governing law and dispute resolution

2. Identify potential issues:
   - Ambiguous language requiring clarification
   - Missing standard protections
   - Unusual or aggressive terms
   - Regulatory compliance concerns

3. Provide risk assessment:
   - Rate each risk (Low/Medium/High)
   - Suggest specific mitigation strategies
   - Flag items requiring client decision

FORMAT: Use structured headings and bullet points. Include specific section references.

CONTEXT: This review is for [CLIENT_TYPE] in [JURISDICTION].`,
      variables: ['PRACTICE_AREA', 'CONTRACT_TYPE', 'CLIENT_TYPE', 'JURISDICTION'],
      improvements: [
        {
          metric: 'Accuracy',
          before: '73%',
          after: '96%',
          improvement: '+23%'
        },
        {
          metric: 'Completeness',
          before: '68%',
          after: '94%',
          improvement: '+26%'
        },
        {
          metric: 'Review Time',
          before: '45 min',
          after: '12 min',
          improvement: '-73%'
        },
        {
          metric: 'Hallucination Rate',
          before: '18%',
          after: '2%',
          improvement: '-89%'
        }
      ],
      sampleOutput: {
        basic: `The contract is between Acme Corp and Beta LLC. Payment is $100,000. There's a warranty section and some liability limits. The term is 2 years.`,
        engineered: `## CONTRACT ANALYSIS SUMMARY

**Parties:** Acme Corporation (Buyer) | Beta LLC (Seller)
**Agreement Type:** Software License & Services Agreement
**Jurisdiction:** Delaware | Governed by Delaware law

### 1. KEY COMMERCIAL TERMS

**Payment Structure:**
- License Fee: $100,000 (Section 4.1)
- Payment Terms: Net 30 (Section 4.2)
- *ISSUE:* No late payment penalties specified [MEDIUM RISK]

**Performance Obligations:**
- Software delivery: 30 days from execution (Section 3.1)
- Implementation support: 90 days (Section 3.4)
- *ISSUE:* No acceptance criteria defined [HIGH RISK]

### 2. RISK ALLOCATION

**Warranties (Section 7):**
- Standard merchantability: YES
- Fitness for purpose: LIMITED
- *ISSUE:* Warranty period only 90 days (industry standard: 12 months) [MEDIUM RISK]

**Liability Cap (Section 9.3):**
- General cap: 12 months fees
- Excluded: Indemnification, confidentiality breaches
- *FAVORABLE:* Mutual limitation applies

### 3. CRITICAL ISSUES REQUIRING ATTENTION

1. **Missing Data Security Provisions** [HIGH RISK]
   - No data breach notification requirements
   - Recommendation: Add SOC 2 compliance requirement

2. **Weak Termination Rights** [MEDIUM RISK]
   - Only for material breach with 30-day cure
   - Recommendation: Add convenience termination with notice

### 4. RECOMMENDED ACTIONS
- Negotiate extended warranty period
- Define clear acceptance criteria
- Add data security addendum
- Include audit rights`
      },
      tips: [
        'Specify the attorney role and specialization',
        'Include jurisdiction for applicable law',
        'Request structured output format',
        'Define risk rating criteria',
        'Ask for specific section references'
      ]
    },
    {
      id: 'case',
      name: 'Case Summary',
      category: 'Litigation',
      iconName: 'Scale',
      basicPrompt: 'Summarize this case.',
      engineeredPrompt: `You are a litigation attorney preparing a case brief for [COURT_TYPE] proceedings.

TASK: Analyze the case using IRAC methodology and prepare a comprehensive brief.

STRUCTURE:
1. CASE CAPTION & PROCEDURAL HISTORY
   - Case name and citation
   - Court and date
   - Procedural posture
   - Judge(s)

2. ISSUE(S) PRESENTED
   - Primary legal question(s)
   - Sub-issues if applicable
   - Framed as yes/no questions

3. RULE(S) OF LAW
   - Applicable statutes with citations
   - Relevant case law precedents
   - Legal standards and tests
   - Burden of proof

4. APPLICATION/ANALYSIS
   - Facts relevant to each issue
   - Court's reasoning step-by-step
   - Distinguishing or following precedent
   - Policy considerations

5. CONCLUSION/HOLDING
   - Court's decision on each issue
   - Disposition (affirmed/reversed/remanded)
   - Precedential value

6. CONCURRING/DISSENTING OPINIONS
   - Key arguments
   - Alternative reasoning

7. PRACTICE IMPLICATIONS
   - Impact on [PRACTICE_AREA]
   - Strategic considerations for [CLIENT_TYPE]
   - Distinguishing factors for future cases

FORMAT: Use clear headings. Bold key holdings. Include pin cites.`,
      variables: ['COURT_TYPE', 'PRACTICE_AREA', 'CLIENT_TYPE'],
      improvements: [
        {
          metric: 'Structure Score',
          before: '62%',
          after: '98%',
          improvement: '+36%'
        },
        {
          metric: 'Citation Accuracy',
          before: '71%',
          after: '95%',
          improvement: '+24%'
        },
        {
          metric: 'Issue Spotting',
          before: '66%',
          after: '93%',
          improvement: '+27%'
        },
        {
          metric: 'Usability',
          before: '58%',
          after: '97%',
          improvement: '+39%'
        }
      ],
      sampleOutput: {
        basic: `Smith v. Jones was about breach of contract. The plaintiff won. The court said the contract was valid and defendant breached it. Damages were awarded.`,
        engineered: `## CASE BRIEF

**Smith v. Jones Industries**, 2024 WL 123456 (2d Cir. Jan. 15, 2024)

### PROCEDURAL HISTORY
- **Lower Court:** S.D.N.Y. granted defendant's motion for summary judgment
- **Appeal:** Plaintiff appeals dismissal of breach of contract claim
- **Panel:** Judges Chen, Rodriguez, and Williams

### ISSUES PRESENTED
1. Did the district court err in finding no valid contract existed between the parties?
2. If a contract existed, did defendant's unilateral modification constitute breach?

### RULES OF LAW
**Contract Formation (New York Law):**
- Requires: (1) offer, (2) acceptance, (3) consideration, (4) mutual assent
- *R.G. Group, Inc. v. Horn & Hardart Co.*, 751 F.2d 69, 74 (2d Cir. 1984)
- Email exchanges can form binding contracts if essential terms present
- *Stevens v. Publicis S.A.*, 50 A.D.3d 253, 256 (1st Dep't 2008)

**Material Breach Standard:**
- Must "go to the root of the agreement"
- *Frank Felix Assocs. v. Austin Drugs*, 111 F.3d 284, 289 (2d Cir. 1997)

### APPLICATION
**Contract Formation:**
The court found the email chain dated March 15-20, 2023, contained:
- Definite offer: "Will provide services for $50,000/month" (JA-045)
- Clear acceptance: "Agreed to your terms" (JA-048)
- Consideration: Services for payment
- **HOLDING:** Valid contract formed via email exchange

**Breach Analysis:**
Defendant's April 30 email reducing payment to $30,000 without plaintiff's consent:
- Constituted unilateral modification
- No evidence of agreed modification or new consideration
- **HOLDING:** Material breach established

### CONCLUSION
**REVERSED and REMANDED** for damages determination
- Contract validly formed through email negotiations
- Unilateral price reduction = material breach
- Plaintiff entitled to expectation damages

### PRACTICE IMPLICATIONS
- **Email negotiations:** Carefully worded emails can create binding obligations
- **Documentation:** Preserve entire email chains showing negotiations
- **Modification clauses:** Include requirement for written, signed modifications`
      },
      tips: [
        'Use IRAC structure for legal analysis',
        'Include procedural history',
        'Request pin cites for accuracy',
        'Specify jurisdiction for applicable law',
        'Ask for practice implications'
      ]
    },
    {
      id: 'duediligence',
      name: 'Due Diligence Review',
      category: 'M&A',
      iconName: 'Search',
      basicPrompt: 'Review these documents for the acquisition.',
      engineeredPrompt: `You are an M&A attorney conducting due diligence for [BUYER_TYPE] acquiring [TARGET_COMPANY] in the [INDUSTRY] sector.

TRANSACTION CONTEXT:
- Deal Value: [DEAL_VALUE]
- Structure: [DEAL_STRUCTURE]
- Key Concerns: [PRIMARY_RISKS]

SYSTEMATIC REVIEW PROTOCOL:

1. DOCUMENT INVENTORY & GAPS
   ☐ List all documents reviewed with dates/versions
   ☐ Identify missing critical documents
   ☐ Flag expired or soon-to-expire items
   ☐ Note documents requiring follow-up

2. MATERIAL CONTRACTS ANALYSIS
   For each material contract identify:
   - Counterparty and term
   - Annual value/revenue impact
   - Change of control provisions
   - Assignment restrictions
   - Unusual terms or obligations
   - RED FLAG: [Specifically note problematic terms]

3. REGULATORY & COMPLIANCE
   - Active licenses and permits status
   - Regulatory violations or investigations
   - Pending litigation or claims
   - Environmental liabilities
   - Data privacy compliance (GDPR/CCPA)

4. INTELLECTUAL PROPERTY
   - Ownership verification
   - Employee invention assignments
   - Third-party licenses (in/out)
   - Open source software usage
   - IP litigation or disputes

5. FINANCIAL RED FLAGS
   - Revenue recognition issues
   - Customer concentration (>15%)
   - Unusual related party transactions
   - Working capital adjustments needed
   - Hidden liabilities or contingencies

6. DEAL BREAKERS vs. PRICE ADJUSTMENTS
   Categorize findings as:
   - DEAL BREAKER: [Issue requiring resolution pre-closing]
   - PRICE ADJUSTMENT: [Quantifiable risk for negotiation]
   - WARRANTY ITEM: [Require specific indemnification]
   - POST-CLOSING: [Integration planning items]

7. RISK QUANTIFICATION
   For each material issue provide:
   - Probability of occurrence (%)
   - Estimated financial impact ($)
   - Recommended mitigation strategy
   - Required warranty/indemnity language

OUTPUT FORMAT:
- Executive Summary (key findings in 5 bullets)
- Detailed findings by category
- Risk matrix with heat map
- Recommended disclosure schedules
- Suggested warranty language`,
      variables: ['BUYER_TYPE', 'TARGET_COMPANY', 'INDUSTRY', 'DEAL_VALUE', 'DEAL_STRUCTURE', 'PRIMARY_RISKS'],
      improvements: [
        {
          metric: 'Issue Detection',
          before: '64%',
          after: '97%',
          improvement: '+33%'
        },
        {
          metric: 'Risk Assessment',
          before: '70%',
          after: '95%',
          improvement: '+25%'
        },
        {
          metric: 'Review Cycles',
          before: '4.2',
          after: '1.8',
          improvement: '-57%'
        },
        {
          metric: 'Deal Protection',
          before: '76%',
          after: '99%',
          improvement: '+23%'
        }
      ],
      sampleOutput: {
        basic: `Reviewed the data room. Found some contracts with change of control. IP looks okay. There's pending litigation. Financials show good revenue but high customer concentration.`,
        engineered: `## DUE DILIGENCE EXECUTIVE SUMMARY
**Target:** TechCo Solutions | **Buyer:** Strategic Acquirer | **Value:** $50M

### 🔴 CRITICAL FINDINGS

1. **Customer Concentration Risk** [PRICE ADJUSTMENT]
   - 68% revenue from top 3 customers
   - No long-term contracts (all month-to-month)
   - Impact: $8-12M revenue at risk
   - Mitigation: Escrow 20% for 18 months

2. **Change of Control Triggers** [DEAL BREAKER]
   - 5 key contracts require consent (42% of revenue)
   - Oracle license terminates automatically
   - Status: Need consents before closing

3. **IP Ownership Gap** [WARRANTY ITEM]
   - 3 developers without IP assignments
   - Critical codebase affected
   - Resolution: Obtain assignments pre-closing
   - Warranty: Full IP ownership reps required

### MATERIAL CONTRACTS REVIEW

**Flagged Agreements:**
| Contract | Party | Annual Value | COC Issue | Action Required |
|----------|-------|-------------|-----------|-----------------|
| Master Services | MegaCorp | $12M | Consent required | Obtain waiver |
| Software License | Oracle | Critical | Auto-terminates | Renegotiate |
| Distribution | GlobalCo | $8M | 90-day notice | Provide notice |

### FINANCIAL RED FLAGS
- **Revenue Recognition:** Aggressive - recognizing multi-year deals upfront
- **Working Capital:** Negative $2.3M adjustment needed
- **Hidden Liability:** Unrecorded GDPR violation - potential €2M fine

### RISK QUANTIFICATION MATRIX
- High Risk/High Impact: Customer concentration, COC consents
- Medium Risk/High Impact: IP assignments, GDPR exposure
- Low Risk/Medium Impact: Lease assignment, permit transfers

### RECOMMENDED ACTIONS
1. Reduce price by $5M or structure earnout
2. Require 6-month revenue guarantee
3. Expand warranty survival to 24 months
4. Specific indemnity for GDPR and IP claims
5. Closing contingent on key customer/consent obtainment`
      },
      tips: [
        'Define transaction context upfront',
        'Use checklists for comprehensive coverage',
        'Categorize findings by severity',
        'Quantify risks in dollar terms',
        'Provide specific mitigation strategies'
      ]
    }
  ];

  const currentTemplate = promptTemplates.find(t => t.id === selectedTemplate)!;

  const copyToClipboard = (text: string, promptId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(promptId);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const overallMetrics = {
    accuracyImprovement: '87% → 96%',
    hallucination: 'Reduces hallucination by 73%',
    efficiency: 'Saves 2 review cycles',
    adoption: '94% attorney satisfaction'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Beaker className="h-8 w-8" />
              Prompt Engineering Lab
            </h2>
            <p className="text-purple-100 text-lg">
              Transform generic AI into a specialized legal assistant with structured prompting
            </p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-center">
              <div className="text-3xl font-bold">+23%</div>
              <div className="text-sm text-purple-100">Avg. Accuracy Gain</div>
            </div>
          </div>
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <Target className="h-5 w-5 mb-2 text-purple-200" />
            <div className="text-sm text-purple-100">Accuracy</div>
            <div className="font-bold">{overallMetrics.accuracyImprovement}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <Brain className="h-5 w-5 mb-2 text-purple-200" />
            <div className="text-sm text-purple-100">Hallucination</div>
            <div className="font-bold">{overallMetrics.hallucination}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <Zap className="h-5 w-5 mb-2 text-purple-200" />
            <div className="text-sm text-purple-100">Efficiency</div>
            <div className="font-bold">{overallMetrics.efficiency}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <CheckCircle className="h-5 w-5 mb-2 text-purple-200" />
            <div className="text-sm text-purple-100">Satisfaction</div>
            <div className="font-bold">{overallMetrics.adoption}</div>
          </div>
        </div>
      </div>

      {/* Template Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Select Legal Task Template</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {promptTemplates.map((template) => {
            const Icon = getIcon(template.iconName);
            const isSelected = template.id === selectedTemplate;
            return (
              <motion.button
                key={template.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{template.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{template.category}</p>
                  </div>
                  {isSelected && (
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Prompt Comparison */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              Prompt Engineering Comparison
            </h3>
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="text-gray-600 hover:text-gray-900"
            >
              {showComparison ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-200">
                {/* Basic Prompt */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      Basic Prompt
                    </h4>
                    <button
                      onClick={() => copyToClipboard(currentTemplate.basicPrompt, 'basic')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copiedPrompt === 'basic' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700 font-mono">
                      {currentTemplate.basicPrompt}
                    </p>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Sample Output:</h5>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
                      {currentTemplate.sampleOutput.basic}
                    </div>
                  </div>
                </div>

                {/* Engineered Prompt */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Engineered Prompt
                    </h4>
                    <button
                      onClick={() => copyToClipboard(currentTemplate.engineeredPrompt, 'engineered')}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copiedPrompt === 'engineered' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-sm text-gray-700 font-mono whitespace-pre-wrap max-h-64 overflow-y-auto">
                      {currentTemplate.engineeredPrompt.substring(0, 400)}...
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Sample Output:</h5>
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 max-h-32 overflow-y-auto">
                      {currentTemplate.sampleOutput.engineered.substring(0, 300)}...
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-green-500" />
          Performance Improvements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentTemplate.improvements.map((improvement, index) => (
            <motion.div
              key={improvement.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-4"
            >
              <h4 className="font-semibold text-gray-700 text-sm mb-2">
                {improvement.metric}
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="text-red-600 text-lg">{improvement.before}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <span className="text-green-600 text-lg font-bold">{improvement.after}</span>
              </div>
              <div className="mt-2 text-sm font-semibold text-green-600">
                {improvement.improvement}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Variables and Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Variables */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Template Variables
          </h3>
          <div className="space-y-2">
            {currentTemplate.variables.map((variable) => (
              <div
                key={variable}
                className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg"
              >
                <div className="px-2 py-1 bg-purple-500 text-white text-xs rounded font-mono">
                  {variable}
                </div>
                <span className="text-sm text-gray-600">Customizable parameter</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Prompt Engineering Tips
          </h3>
          <ul className="space-y-2">
            {currentTemplate.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full Template View */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Full Engineered Prompt Template
          </h3>
          <button
            onClick={() => setExpandedSection(expandedSection === 'full' ? null : 'full')}
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2"
          >
            {expandedSection === 'full' ? 'Collapse' : 'Expand'}
            {expandedSection === 'full' ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        <AnimatePresence>
          {expandedSection === 'full' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {currentTemplate.engineeredPrompt}
                </pre>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <button
                    onClick={() => copyToClipboard(currentTemplate.engineeredPrompt, 'full')}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Full Template
                  </button>
                  {copiedPrompt === 'full' && (
                    <span className="text-green-600 text-sm">Copied!</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900">Ready to implement these prompts?</h3>
            <p className="text-gray-600 text-sm mt-1">
              Export templates to your DeepJudge workspace with one click
            </p>
          </div>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2">
            Export to Workspace
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}