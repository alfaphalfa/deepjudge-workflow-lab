export interface MADocument {
  id: string;
  title: string;
  type: string;
  sections: DocumentSection[];
  dateUploaded: string;
}

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  pageNumber?: number;
}

export interface Citation {
  documentId: string;
  documentTitle: string;
  sectionId: string;
  sectionTitle: string;
  excerpt: string;
  pageNumber?: number;
}

export interface QAResponse {
  question: string;
  answer: string;
  citations: Citation[];
  processingTime: number;
}

export const sampleMADocuments: MADocument[] = [
  {
    id: 'spa-001',
    title: 'Stock Purchase Agreement',
    type: 'Purchase Agreement',
    dateUploaded: '2024-01-15',
    sections: [
      {
        id: 'spa-s1',
        title: '2.1 Purchase Price',
        content: 'The aggregate purchase price for the Shares shall be $450,000,000 (the "Purchase Price"), subject to adjustment as set forth in Section 2.3.',
        pageNumber: 8
      },
      {
        id: 'spa-s2',
        title: '7.1 Conditions to Obligations of All Parties',
        content: 'The obligations of each party to consummate the transactions contemplated by this Agreement shall be subject to the fulfillment, at or prior to the Closing, of each of the following conditions: (a) No Governmental Authority shall have enacted any law that is in effect and restrains, enjoins or otherwise prohibits the consummation of the transactions; (b) All required regulatory approvals, including HSR clearance, shall have been obtained.',
        pageNumber: 45
      },
      {
        id: 'spa-s3',
        title: '8.2 Indemnification by Seller',
        content: 'Seller agrees to indemnify Buyer from and against all Losses arising out of: (a) any breach of any representation or warranty of Seller; (b) any breach of any covenant or agreement of Seller. The indemnification cap shall be $67,500,000 (15% of Purchase Price) with a basket of $2,250,000 (0.5% of Purchase Price).',
        pageNumber: 52
      },
      {
        id: 'spa-s4',
        title: '5.12 Intellectual Property',
        content: 'Schedule 5.12 sets forth a complete list of all Registered IP owned by the Company. All Company IP will be transferred free and clear of all Encumbrances. The Company owns or has valid licenses to all IP necessary for the conduct of its business.',
        pageNumber: 28
      }
    ]
  },
  {
    id: 'ds-001',
    title: 'Disclosure Schedule 5.12 - Intellectual Property',
    type: 'Disclosure Schedule',
    dateUploaded: '2024-01-15',
    sections: [
      {
        id: 'ds-s1',
        title: 'Patents',
        content: '1. US Patent No. 10,234,567 - "Machine Learning System for Document Analysis"\n2. US Patent No. 10,345,678 - "Natural Language Processing Engine"\n3. EU Patent No. 3,456,789 - "Automated Contract Review System"',
        pageNumber: 1
      },
      {
        id: 'ds-s2',
        title: 'Trademarks',
        content: '1. "DEEPJUDGE" - Reg. No. 5,678,901 (US)\n2. "LEGALAI" - Reg. No. 5,789,012 (US)\n3. "SMARTCONTRACTS" - Reg. No. 5,890,123 (EU)',
        pageNumber: 2
      },
      {
        id: 'ds-s3',
        title: 'Software and Source Code',
        content: 'All proprietary software including: DeepJudge Core Engine v3.0, Contract Analysis Module v2.5, Document Intelligence Platform v4.0. All source code is maintained in secured repositories with full version control.',
        pageNumber: 3
      }
    ]
  },
  {
    id: 'ea-001',
    title: 'Employment Agreement - Key Executives',
    type: 'Employment Agreement',
    dateUploaded: '2024-01-15',
    sections: [
      {
        id: 'ea-s1',
        title: '4.1 Change of Control Provisions',
        content: 'Upon a Change of Control, if Executive is terminated without Cause within 12 months, Executive shall receive: (a) 24 months base salary; (b) 200% target bonus; (c) accelerated vesting of all equity awards; (d) continued health benefits for 24 months.',
        pageNumber: 12
      },
      {
        id: 'ea-s2',
        title: '5.1 Non-Competition',
        content: 'Executive agrees not to compete for a period of 24 months post-termination within the legal technology industry in North America and Europe.',
        pageNumber: 15
      }
    ]
  },
  {
    id: 'fin-001',
    title: 'Audited Financial Statements FY2023',
    type: 'Financial Document',
    dateUploaded: '2024-01-15',
    sections: [
      {
        id: 'fin-s1',
        title: 'Revenue Recognition',
        content: 'Total Revenue FY2023: $125,000,000. SaaS Revenue: $95,000,000 (76%). Professional Services: $30,000,000 (24%). Year-over-year growth: 45%.',
        pageNumber: 5
      },
      {
        id: 'fin-s2',
        title: 'Working Capital',
        content: 'Current Assets: $45,000,000. Current Liabilities: $18,000,000. Working Capital: $27,000,000. Working Capital Ratio: 2.5:1.',
        pageNumber: 8
      },
      {
        id: 'fin-s3',
        title: 'EBITDA',
        content: 'Adjusted EBITDA FY2023: $37,500,000. EBITDA Margin: 30%. Excludes one-time restructuring costs of $3,200,000.',
        pageNumber: 12
      }
    ]
  },
  {
    id: 'dd-001',
    title: 'Legal Due Diligence Report',
    type: 'Due Diligence',
    dateUploaded: '2024-01-15',
    sections: [
      {
        id: 'dd-s1',
        title: 'Material Contracts',
        content: 'Company has 127 material customer contracts with average remaining term of 2.3 years. Top 10 customers represent 35% of ARR. No single customer exceeds 8% of total revenue.',
        pageNumber: 15
      },
      {
        id: 'dd-s2',
        title: 'Litigation Summary',
        content: 'No material litigation pending. One minor employment dispute settled in Q3 2023 for $75,000. No regulatory investigations or proceedings.',
        pageNumber: 22
      },
      {
        id: 'dd-s3',
        title: 'Regulatory Compliance',
        content: 'Company maintains SOC 2 Type II certification, ISO 27001 compliance, and GDPR compliance. All certifications current through 2025.',
        pageNumber: 28
      }
    ]
  },
  {
    id: 'escrow-001',
    title: 'Escrow Agreement',
    type: 'Escrow Agreement',
    dateUploaded: '2024-01-15',
    sections: [
      {
        id: 'esc-s1',
        title: '2.1 Escrow Amount',
        content: 'Escrow Amount: $45,000,000 (10% of Purchase Price). Release Schedule: 50% after 12 months, remaining 50% after 18 months, subject to pending claims.',
        pageNumber: 4
      },
      {
        id: 'esc-s2',
        title: '4.1 Claim Procedures',
        content: 'Buyer must provide written notice of claims with reasonable detail. Seller has 30 days to object. Disputed amounts remain in escrow pending resolution.',
        pageNumber: 7
      }
    ]
  },
  {
    id: 'loi-001',
    title: 'Letter of Intent',
    type: 'Letter of Intent',
    dateUploaded: '2024-01-10',
    sections: [
      {
        id: 'loi-s1',
        title: 'Transaction Structure',
        content: 'Proposed acquisition of 100% of equity interests. Cash consideration of $450,000,000. No financing contingency. Target closing within 90 days of definitive agreement.',
        pageNumber: 2
      },
      {
        id: 'loi-s2',
        title: 'Exclusivity',
        content: 'Seller agrees to exclusive negotiations for 60 days. No-shop provision with customary fiduciary out for superior proposals.',
        pageNumber: 3
      }
    ]
  },
  {
    id: 'rep-001',
    title: 'Representation and Warranty Insurance Policy',
    type: 'Insurance',
    dateUploaded: '2024-01-15',
    sections: [
      {
        id: 'rep-s1',
        title: 'Coverage Limits',
        content: 'Policy Limit: $45,000,000. Retention: $4,500,000 (1% of Purchase Price). Premium: $1,350,000 (3% of limit). Coverage Period: 6 years for fundamental reps, 3 years for general reps.',
        pageNumber: 5
      },
      {
        id: 'rep-s2',
        title: 'Exclusions',
        content: 'Standard exclusions apply including: known issues, purchase price adjustments, forward-looking statements, and certain environmental matters identified in Phase I ESA.',
        pageNumber: 8
      }
    ]
  },
  {
    id: 'tsa-001',
    title: 'Transition Services Agreement',
    type: 'Transition Agreement',
    dateUploaded: '2024-01-15',
    sections: [
      {
        id: 'tsa-s1',
        title: 'Services to be Provided',
        content: 'Seller to provide: IT infrastructure support (6 months), HR/payroll services (3 months), accounting services (3 months), facilities management (6 months).',
        pageNumber: 3
      },
      {
        id: 'tsa-s2',
        title: 'Service Fees',
        content: 'Monthly fee: $250,000 for first 3 months, $150,000 for months 4-6. Fees cover actual costs plus 5% administrative charge.',
        pageNumber: 5
      }
    ]
  },
  {
    id: 'lease-001',
    title: 'Real Estate Lease Assignment',
    type: 'Real Estate',
    dateUploaded: '2024-01-15',
    sections: [
      {
        id: 'lease-s1',
        title: 'Headquarters Lease',
        content: 'Location: 123 Tech Plaza, San Francisco. Size: 45,000 sq ft. Remaining Term: 7 years. Annual Rent: $3,150,000. Landlord consent required for assignment.',
        pageNumber: 2
      },
      {
        id: 'lease-s2',
        title: 'Assignment Terms',
        content: 'Buyer assumes all obligations under lease. Seller remains liable for 24 months as guarantor. Security deposit of $525,000 transfers to Buyer.',
        pageNumber: 4
      }
    ]
  }
];

export const sampleQuestions = [
  {
    question: "What are all the conditions to closing?",
    expectedDocuments: ['Stock Purchase Agreement', 'Letter of Intent']
  },
  {
    question: "Are there any change of control provisions?",
    expectedDocuments: ['Employment Agreement - Key Executives']
  },
  {
    question: "What IP is being transferred?",
    expectedDocuments: ['Stock Purchase Agreement', 'Disclosure Schedule 5.12 - Intellectual Property']
  },
  {
    question: "What are the indemnification caps and baskets?",
    expectedDocuments: ['Stock Purchase Agreement', 'Escrow Agreement', 'Representation and Warranty Insurance Policy']
  },
  {
    question: "What is the total purchase price and payment structure?",
    expectedDocuments: ['Stock Purchase Agreement', 'Letter of Intent', 'Escrow Agreement']
  },
  {
    question: "What are the working capital adjustments?",
    expectedDocuments: ['Stock Purchase Agreement', 'Audited Financial Statements FY2023']
  },
  {
    question: "Are there any pending litigation or regulatory issues?",
    expectedDocuments: ['Legal Due Diligence Report']
  },
  {
    question: "What transition services will be provided post-closing?",
    expectedDocuments: ['Transition Services Agreement']
  }
];