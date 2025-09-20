'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, FileText, Clock, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';
import { sampleMADocuments, sampleQuestions, type QAResponse, type Citation } from '@/lib/ma-documents';

export default function MatterQA() {
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState<QAResponse[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedCitations, setExpandedCitations] = useState<Set<string>>(new Set());
  const [showDocuments, setShowDocuments] = useState(true);
  const responseEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    responseEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [responses]);

  const processQuestion = (userQuestion: string) => {
    setIsProcessing(true);

    setTimeout(() => {
      const relevantDocs = sampleMADocuments.filter(doc => {
        const questionLower = userQuestion.toLowerCase();
        return doc.sections.some(section =>
          section.content.toLowerCase().includes(questionLower.split(' ').filter(w => w.length > 3)[0]) ||
          section.title.toLowerCase().includes(questionLower.split(' ').filter(w => w.length > 3)[0])
        );
      });

      const citations: Citation[] = [];
      let answerText = '';

      if (userQuestion.toLowerCase().includes('conditions') && userQuestion.toLowerCase().includes('closing')) {
        answerText = 'The transaction has several conditions to closing:\n\n1. **Regulatory Conditions**: No governmental authority shall have enacted any law restraining the transaction, and all required regulatory approvals including HSR clearance must be obtained.\n\n2. **No Legal Impediments**: No laws, injunctions, or orders prohibiting the consummation of the transaction.\n\n3. **Exclusivity Period**: The seller has agreed to exclusive negotiations for 60 days with a no-shop provision.\n\nThe target closing is within 90 days of the definitive agreement, with no financing contingency.';

        citations.push({
          documentId: 'spa-001',
          documentTitle: 'Stock Purchase Agreement',
          sectionId: 'spa-s2',
          sectionTitle: '7.1 Conditions to Obligations of All Parties',
          excerpt: 'All required regulatory approvals, including HSR clearance, shall have been obtained',
          pageNumber: 45
        });

        citations.push({
          documentId: 'loi-001',
          documentTitle: 'Letter of Intent',
          sectionId: 'loi-s1',
          sectionTitle: 'Transaction Structure',
          excerpt: 'Target closing within 90 days of definitive agreement',
          pageNumber: 2
        });
      } else if (userQuestion.toLowerCase().includes('change of control')) {
        answerText = 'Yes, there are significant change of control provisions for key executives:\n\n**Golden Parachute Terms**: If an executive is terminated without cause within 12 months of a change of control, they receive:\n- 24 months of base salary\n- 200% of target bonus\n- Full acceleration of all equity awards\n- Continued health benefits for 24 months\n\n**Non-Competition**: Executives are bound by a 24-month non-compete covering the legal technology industry in North America and Europe.';

        citations.push({
          documentId: 'ea-001',
          documentTitle: 'Employment Agreement - Key Executives',
          sectionId: 'ea-s1',
          sectionTitle: '4.1 Change of Control Provisions',
          excerpt: '24 months base salary; 200% target bonus; accelerated vesting of all equity awards',
          pageNumber: 12
        });
      } else if (userQuestion.toLowerCase().includes('ip') || userQuestion.toLowerCase().includes('intellectual property')) {
        answerText = 'The intellectual property being transferred includes:\n\n**Patents**:\n- US Patent No. 10,234,567 - Machine Learning System for Document Analysis\n- US Patent No. 10,345,678 - Natural Language Processing Engine\n- EU Patent No. 3,456,789 - Automated Contract Review System\n\n**Trademarks**:\n- DEEPJUDGE (US Reg. No. 5,678,901)\n- LEGALAI (US Reg. No. 5,789,012)\n- SMARTCONTRACTS (EU Reg. No. 5,890,123)\n\n**Software**: DeepJudge Core Engine v3.0, Contract Analysis Module v2.5, Document Intelligence Platform v4.0\n\nAll IP transfers free and clear of encumbrances with valid licenses for necessary third-party IP.';

        citations.push({
          documentId: 'spa-001',
          documentTitle: 'Stock Purchase Agreement',
          sectionId: 'spa-s4',
          sectionTitle: '5.12 Intellectual Property',
          excerpt: 'All Company IP will be transferred free and clear of all Encumbrances',
          pageNumber: 28
        });

        citations.push({
          documentId: 'ds-001',
          documentTitle: 'Disclosure Schedule 5.12 - Intellectual Property',
          sectionId: 'ds-s1',
          sectionTitle: 'Patents',
          excerpt: 'US Patent No. 10,234,567 - Machine Learning System for Document Analysis',
          pageNumber: 1
        });
      } else if (userQuestion.toLowerCase().includes('indemnification') || userQuestion.toLowerCase().includes('caps') || userQuestion.toLowerCase().includes('baskets')) {
        answerText = 'The deal has a multi-layered indemnification structure:\n\n**Seller Indemnification**:\n- Cap: $67.5M (15% of purchase price)\n- Basket: $2.25M (0.5% of purchase price)\n\n**Escrow Protection**:\n- Amount: $45M (10% of purchase price)\n- Release: 50% after 12 months, 50% after 18 months\n\n**R&W Insurance**:\n- Policy Limit: $45M\n- Retention: $4.5M (1% of purchase price)\n- Coverage: 6 years for fundamental reps, 3 years for general\n\nTotal potential recovery combines escrow and insurance for maximum protection.';

        citations.push({
          documentId: 'spa-001',
          documentTitle: 'Stock Purchase Agreement',
          sectionId: 'spa-s3',
          sectionTitle: '8.2 Indemnification by Seller',
          excerpt: 'The indemnification cap shall be $67,500,000 (15% of Purchase Price) with a basket of $2,250,000',
          pageNumber: 52
        });

        citations.push({
          documentId: 'rep-001',
          documentTitle: 'Representation and Warranty Insurance Policy',
          sectionId: 'rep-s1',
          sectionTitle: 'Coverage Limits',
          excerpt: 'Policy Limit: $45,000,000. Retention: $4,500,000',
          pageNumber: 5
        });
      } else {
        answerText = `I found ${relevantDocs.length} relevant documents for your question. Based on my analysis of the M&A transaction documents, I can help you understand specific aspects of this deal. Please ask about conditions to closing, change of control provisions, intellectual property transfers, or indemnification terms.`;

        if (relevantDocs.length > 0) {
          relevantDocs.slice(0, 2).forEach(doc => {
            const relevantSection = doc.sections[0];
            citations.push({
              documentId: doc.id,
              documentTitle: doc.title,
              sectionId: relevantSection.id,
              sectionTitle: relevantSection.title,
              excerpt: relevantSection.content.substring(0, 100) + '...',
              pageNumber: relevantSection.pageNumber
            });
          });
        }
      }

      const response: QAResponse = {
        question: userQuestion,
        answer: answerText,
        citations: citations,
        processingTime: Math.random() * 3 + 2
      };

      setResponses([...responses, response]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isProcessing) {
      processQuestion(question);
      setQuestion('');
    }
  };

  const toggleCitation = (responseIndex: number) => {
    const key = `response-${responseIndex}`;
    const newExpanded = new Set(expandedCitations);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedCitations(newExpanded);
  };

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(1)}s`;
  };

  return (
    <div className="flex h-[700px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Left Panel - Document List */}
      <div className={`${showDocuments ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-gray-200 overflow-hidden`}>
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-700 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            M&A Transaction Documents ({sampleMADocuments.length})
          </h3>
        </div>
        <div className="overflow-y-auto h-full pb-20">
          {sampleMADocuments.map((doc) => (
            <div key={doc.id} className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-700">{doc.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{doc.type}</div>
                  <div className="text-xs text-gray-400">{doc.sections.length} sections</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-emerald-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Matter Q&A - Multi-Document Analysis
              </h2>
              <p className="text-emerald-100 text-sm mt-1">
                Ask questions across all deal documents
              </p>
            </div>
            <button
              onClick={() => setShowDocuments(!showDocuments)}
              className="px-3 py-1 bg-emerald-700 rounded hover:bg-emerald-800 text-sm"
            >
              {showDocuments ? 'Hide' : 'Show'} Documents
            </button>
          </div>
        </div>

        {/* Sample Questions */}
        {responses.length === 0 && (
          <div className="p-4 bg-emerald-50 border-b">
            <div className="text-sm text-gray-600 mb-2">Try these questions:</div>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.slice(0, 4).map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => processQuestion(sq.question)}
                  disabled={isProcessing}
                  className="px-3 py-1.5 bg-white border border-emerald-300 rounded-full text-xs hover:bg-emerald-100 transition-colors"
                >
                  {sq.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {responses.map((response, idx) => (
            <div key={idx} className="space-y-3">
              {/* User Question */}
              <div className="flex justify-end">
                <div className="max-w-2xl bg-emerald-600 text-white p-3 rounded-lg">
                  <p className="text-sm">{response.question}</p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="max-w-3xl">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="whitespace-pre-line text-sm text-gray-700">
                      {response.answer}
                    </div>

                    {/* Citations */}
                    {response.citations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => toggleCitation(idx)}
                          className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-800"
                        >
                          <FileText className="h-3 w-3" />
                          {response.citations.length} source{response.citations.length > 1 ? 's' : ''} cited
                          {expandedCitations.has(`response-${idx}`) ?
                            <ChevronUp className="h-3 w-3" /> :
                            <ChevronDown className="h-3 w-3" />
                          }
                        </button>

                        {expandedCitations.has(`response-${idx}`) && (
                          <div className="mt-2 space-y-2">
                            {response.citations.map((citation, cidx) => (
                              <div key={cidx} className="p-2 bg-white rounded border border-gray-200">
                                <div className="flex items-start gap-2">
                                  <FileText className="h-3 w-3 text-gray-400 mt-0.5" />
                                  <div className="flex-1">
                                    <div className="text-xs font-medium text-gray-700">
                                      {citation.documentTitle}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {citation.sectionTitle}
                                      {citation.pageNumber && ` • Page ${citation.pageNumber}`}
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1 italic">
                                      "{citation.excerpt}"
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Processing Time */}
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      Answered in {formatTime(response.processingTime)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Analyzing documents...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={responseEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about conditions, IP transfers, indemnification, change of control..."
              disabled={isProcessing}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
            />
            <button
              type="submit"
              disabled={!question.trim() || isProcessing}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Ask
            </button>
          </form>

          {/* Time Savings Banner */}
          <div className="mt-3 p-2 bg-emerald-100 rounded text-center">
            <p className="text-xs text-emerald-700">
              <strong>Average time saved:</strong> 2+ hours of manual document review per question
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}