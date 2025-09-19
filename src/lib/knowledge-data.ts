export interface KnowledgeItem {
  id: string;
  title: string;
  type: 'contract' | 'precedent' | 'opinion' | 'memo' | 'clause';
  category: string;
  jurisdiction?: string;
  date: string;
  author: string;
  authorYearsExperience?: number;
  summary: string;
  content: string;
  tags: string[];
  relevanceScore?: number;
  confidenceScore: number;
  ethicalWallCompliant: boolean;
  department?: string;
  citations?: string[];
  relatedItems?: string[];
  insights?: string[];
  financialImpact?: string;
}

export interface SearchResult extends KnowledgeItem {
  matchedQuery: string;
  semanticScore: number;
  highlights: string[];
  matchedConcepts?: string[];
  semanticReasons?: string[];
  searchTime?: string;
  timeSaved?: string;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  type: string;
  size: number;
  color?: string;
}

export interface KnowledgeEdge {
  source: string;
  target: string;
  weight: number;
  type: string;
}

// Mock data representing 30 years of partner expertise
export const knowledgeBase: KnowledgeItem[] = [
  {
    id: 'kb-001',
    title: 'Material Adverse Change Clauses in M&A Agreements - NY Jurisdiction',
    type: 'contract',
    category: 'Mergers & Acquisitions',
    jurisdiction: 'New York',
    date: '2023-11-15',
    author: 'Robert Harrison (Retiring Senior Partner)',
    authorYearsExperience: 32,
    summary: 'Comprehensive analysis of MAC clause variations and enforceability in New York merger agreements, including pandemic-specific carveouts.',
    content: `A Material Adverse Change (MAC) clause allows a buyer to terminate or renegotiate a merger agreement if certain adverse events occur between signing and closing. In New York jurisdiction, courts have historically set a high bar for invoking MAC clauses. Key considerations include:

1. Durational Significance: The adverse change must be consequential to the company's long-term earning power
2. Industry-Wide vs. Company-Specific: Courts distinguish between general market conditions and company-specific issues
3. Pandemic Carveouts: Post-2020 agreements typically include specific pandemic/epidemic exceptions
4. Quantitative Thresholds: Best practice includes specific percentage thresholds (typically 20-30% EBITDA impact)
5. Known Risks: Buyers cannot invoke MAC for risks known at signing`,
    tags: ['MAC', 'merger', 'acquisition', 'New York', 'contract clause', 'due diligence', 'risk allocation'],
    confidenceScore: 98,
    ethicalWallCompliant: true,
    department: 'Corporate/M&A',
    citations: ['IBP v. Tyson Foods', 'Akorn v. Fresenius', 'Huntsman v. Hexion'],
    relatedItems: ['kb-002', 'kb-003', 'kb-015'],
    insights: [
      'NY courts require "durational significance" - typically adverse effects lasting years, not months',
      'Pandemic has fundamentally changed MAC clause drafting',
      'Specific carveouts are increasingly detailed and negotiated'
    ],
    financialImpact: 'Proper MAC clause drafting saved clients average $45M in failed deals 2020-2023'
  },
  {
    id: 'kb-002',
    title: 'Cross-Border M&A Due Diligence Checklist - EU/US Transactions',
    type: 'memo',
    category: 'Mergers & Acquisitions',
    jurisdiction: 'International',
    date: '2023-10-22',
    author: 'Sarah Chen (Retiring Senior Partner)',
    authorYearsExperience: 28,
    summary: 'Comprehensive due diligence framework for EU-US transactions, including GDPR, CFIUS, and antitrust considerations.',
    content: `Cross-border M&A transactions require enhanced due diligence beyond standard domestic deals. Critical areas include:

REGULATORY COMPLIANCE:
- CFIUS review requirements and timeline implications
- EU merger control thresholds and filing requirements
- GDPR compliance and data transfer mechanisms
- Industry-specific regulations (financial services, healthcare, defense)

TAX STRUCTURING:
- Transfer pricing documentation
- Permanent establishment risks
- Withholding tax implications
- BEPS compliance

EMPLOYMENT & BENEFITS:
- Works council consultation requirements
- Pension liabilities and funding status
- Change of control provisions
- Immigration considerations for key personnel`,
    tags: ['cross-border', 'M&A', 'due diligence', 'GDPR', 'CFIUS', 'EU', 'regulatory'],
    confidenceScore: 96,
    ethicalWallCompliant: true,
    department: 'Corporate/M&A',
    relatedItems: ['kb-001', 'kb-008', 'kb-012'],
    insights: [
      'CFIUS review timelines have extended to 90+ days in sensitive sectors',
      'GDPR compliance failures can result in 4% global revenue fines',
      'Early engagement with regulators reduces transaction timeline by average 45 days'
    ],
    financialImpact: 'Structured approach reduced DD costs by 30% while improving issue identification'
  },
  {
    id: 'kb-003',
    title: 'Earnout Provisions Best Practices - Private Equity Exits',
    type: 'contract',
    category: 'Private Equity',
    jurisdiction: 'Delaware',
    date: '2023-09-18',
    author: 'Michael Thompson (Retiring Senior Partner)',
    authorYearsExperience: 30,
    summary: 'Structuring earnout provisions to align seller and buyer interests while minimizing post-closing disputes.',
    content: `Earnout provisions bridge valuation gaps but are frequent sources of post-closing disputes. Key structuring considerations:

MEASUREMENT METRICS:
- Revenue vs. EBITDA vs. specific milestones
- Accounting principles and adjustments
- Treatment of extraordinary items
- Buyer operation covenants

DISPUTE RESOLUTION:
- Acceleration triggers
- Dispute resolution mechanisms (expert determination vs. arbitration)
- Access to information rights
- Audit rights and procedures`,
    tags: ['earnout', 'private equity', 'valuation', 'post-closing', 'dispute resolution'],
    confidenceScore: 95,
    ethicalWallCompliant: true,
    department: 'Private Equity',
    citations: ['Lazard Tech Partners v. Qinetiq', 'Airborne Health v. Squid Soap'],
    relatedItems: ['kb-001', 'kb-009', 'kb-014'],
    insights: [
      'EBITDA-based earnouts reduce disputes by 60% vs. revenue-based',
      'Specific operating covenants are essential for seller protection',
      'Expert determination is 70% faster than arbitration for earnout disputes'
    ]
  },
  {
    id: 'kb-004',
    title: 'ESG Disclosure Requirements - SEC Climate Rules Compliance',
    type: 'opinion',
    category: 'Securities & Governance',
    date: '2023-12-01',
    author: 'Jennifer Williams (Retiring Senior Partner)',
    authorYearsExperience: 29,
    summary: 'Comprehensive framework for SEC climate-related disclosure compliance and board oversight responsibilities.',
    content: `The SEC's climate disclosure rules require extensive reporting on climate-related risks, governance, and GHG emissions. Implementation framework:

GOVERNANCE STRUCTURE:
- Board oversight of climate risks
- Management's role in assessment and management
- Integration with enterprise risk management
- Compensation linkage to climate goals

RISK ASSESSMENT:
- Physical risks (acute and chronic)
- Transition risks (regulatory, market, technology)
- Scenario analysis requirements
- Materiality determinations`,
    tags: ['ESG', 'SEC', 'climate', 'disclosure', 'governance', 'sustainability'],
    confidenceScore: 94,
    ethicalWallCompliant: true,
    department: 'Securities & Governance',
    relatedItems: ['kb-010', 'kb-011', 'kb-016'],
    insights: [
      'Scope 3 emissions disclosure remains most challenging aspect',
      'Board climate expertise increasingly required by institutional investors',
      'Integrated reporting frameworks reduce compliance costs by 40%'
    ],
    financialImpact: 'Proactive ESG compliance framework avoided average $2.3M in SEC penalties'
  },
  {
    id: 'kb-005',
    title: 'SPAC De-SPAC Transaction Structuring Guide',
    type: 'memo',
    category: 'Capital Markets',
    date: '2023-08-14',
    author: 'David Kim (Retiring Senior Partner)',
    authorYearsExperience: 27,
    summary: 'Post-2022 SPAC market evolution - structuring successful de-SPAC transactions in challenging market conditions.',
    content: `SPAC transactions require careful structuring to manage redemption risk and ensure successful business combinations:

REDEMPTION MITIGATION:
- Non-redemption agreements
- Forward purchase agreements
- PIPE structuring and pricing
- Backstop arrangements

VALUATION CONSIDERATIONS:
- Market comparable analysis in volatile markets
- Earnout structures to bridge valuation gaps
- Sponsor promote adjustments
- Post-closing price protection mechanisms`,
    tags: ['SPAC', 'de-SPAC', 'capital markets', 'redemption', 'PIPE', 'valuation'],
    confidenceScore: 92,
    ethicalWallCompliant: true,
    department: 'Capital Markets',
    citations: ['SEC SPAC Proposed Rules', 'NYSE SPAC Listing Standards'],
    relatedItems: ['kb-003', 'kb-004', 'kb-013'],
    insights: [
      'Average redemption rates exceed 85% in current market',
      'Committed PIPE financing critical for transaction certainty',
      'Sponsor promote forfeitures average 30-50% in 2023 deals'
    ]
  },
  {
    id: 'kb-006',
    title: 'Antitrust Risk Assessment - Tech Sector Acquisitions',
    type: 'precedent',
    category: 'Antitrust & Competition',
    jurisdiction: 'United States',
    date: '2023-11-28',
    author: 'Lisa Martinez (Retiring Senior Partner)',
    authorYearsExperience: 31,
    summary: 'Framework for assessing antitrust risks in technology sector acquisitions under enhanced regulatory scrutiny.',
    content: `Technology acquisitions face unprecedented antitrust scrutiny. Risk assessment framework:

MARKET DEFINITION:
- Product market boundaries in digital ecosystems
- Geographic market considerations for digital services
- Two-sided market analysis
- Network effects and switching costs

COMPETITIVE EFFECTS:
- Horizontal overlaps analysis
- Vertical foreclosure theories
- Nascent competitor doctrine
- Data aggregation concerns
- Innovation competition theories`,
    tags: ['antitrust', 'technology', 'merger control', 'FTC', 'DOJ', 'competition'],
    confidenceScore: 97,
    ethicalWallCompliant: true,
    department: 'Antitrust & Competition',
    citations: ['FTC v. Facebook', 'DOJ v. Google', 'EU Digital Markets Act'],
    relatedItems: ['kb-002', 'kb-007', 'kb-017'],
    insights: [
      'Tech deals >$100M face 95% second request probability',
      'Nascent competitor theory expanding beyond traditional markets',
      'Behavioral remedies increasingly disfavored by agencies'
    ],
    financialImpact: 'Early antitrust assessment avoided $12M in unnecessary filing fees and delays'
  },
  {
    id: 'kb-007',
    title: 'IP Due Diligence in Software Acquisitions',
    type: 'memo',
    category: 'Intellectual Property',
    date: '2023-10-05',
    author: 'James Anderson (Retiring Senior Partner)',
    authorYearsExperience: 26,
    summary: 'Comprehensive IP diligence framework for software companies, including open source compliance and AI/ML considerations.',
    content: `Software IP diligence requires specialized focus on code ownership, licensing, and emerging AI issues:

OPEN SOURCE COMPLIANCE:
- License compatibility analysis
- Copyleft obligations assessment
- Attribution requirements
- Commercial license alternatives

AI/ML SPECIFIC ISSUES:
- Training data provenance and licensing
- Model ownership and inventorship
- Algorithmic bias and fairness documentation
- Export control implications for AI models`,
    tags: ['IP', 'software', 'open source', 'AI', 'machine learning', 'due diligence'],
    confidenceScore: 93,
    ethicalWallCompliant: true,
    department: 'Intellectual Property',
    relatedItems: ['kb-002', 'kb-006', 'kb-018'],
    insights: [
      'Open source compliance issues found in 85% of software acquisitions',
      'AI training data provenance becoming deal-critical issue',
      'GPL license violations average $2.5M remediation cost'
    ]
  },
  {
    id: 'kb-008',
    title: 'FCPA Compliance in Emerging Markets Joint Ventures',
    type: 'opinion',
    category: 'Compliance & Investigations',
    jurisdiction: 'International',
    date: '2023-09-25',
    author: 'Patricia Brown (Retiring Senior Partner)',
    authorYearsExperience: 33,
    summary: 'Risk mitigation strategies for FCPA compliance in high-risk jurisdiction joint ventures.',
    content: `Joint ventures in emerging markets present elevated FCPA risks requiring robust compliance frameworks:

DUE DILIGENCE REQUIREMENTS:
- Third-party intermediary vetting
- Beneficial ownership verification
- Government touchpoint mapping
- Historical compliance assessment

ONGOING MONITORING:
- Transaction testing protocols
- Gift and entertainment controls
- Audit rights and procedures
- Training and certification requirements`,
    tags: ['FCPA', 'compliance', 'joint venture', 'emerging markets', 'anti-corruption'],
    confidenceScore: 96,
    ethicalWallCompliant: true,
    department: 'Compliance & Investigations',
    citations: ['DOJ FCPA Resource Guide', 'SEC Enforcement Actions 2020-2023'],
    relatedItems: ['kb-002', 'kb-011', 'kb-019'],
    insights: [
      'Pre-acquisition FCPA issues average $45M in penalties',
      'Voluntary disclosure reduces penalties by average 50%',
      'Third-party risk represents 90% of FCPA violations'
    ]
  },
  {
    id: 'kb-009',
    title: 'Representations and Warranties Insurance - Coverage Optimization',
    type: 'contract',
    category: 'M&A Insurance',
    date: '2023-12-10',
    author: 'Richard Davis (Retiring Senior Partner)',
    authorYearsExperience: 29,
    summary: 'Maximizing R&W insurance coverage while minimizing exclusions and retention amounts.',
    content: `R&W insurance has become standard in private M&A transactions. Optimization strategies:

COVERAGE ENHANCEMENT:
- Synthetic seller indemnity structuring
- Knowledge qualifier negotiations
- Materiality scrape provisions
- Covered breach definition expansion

EXCLUSION MINIMIZATION:
- Due diligence depth requirements
- Environmental coverage enhancements
- Tax opinion coverage
- Wage and hour coverage options`,
    tags: ['R&W insurance', 'M&A', 'risk transfer', 'indemnity', 'coverage'],
    confidenceScore: 94,
    ethicalWallCompliant: true,
    department: 'Corporate/M&A',
    relatedItems: ['kb-001', 'kb-003', 'kb-020'],
    insights: [
      'Enhanced diligence reduces retention by average 0.5% of EV',
      'Synthetic structures eliminate seller indemnity in 75% of deals',
      'Premium rates decreased 40% from 2021 peaks'
    ],
    financialImpact: 'Optimized R&W structures saved clients average $3.2M per transaction'
  },
  {
    id: 'kb-010',
    title: 'Board Fiduciary Duties in Hostile Takeover Situations',
    type: 'precedent',
    category: 'Securities & Governance',
    jurisdiction: 'Delaware',
    date: '2023-11-02',
    author: 'Elizabeth Taylor (Retiring Senior Partner)',
    authorYearsExperience: 30,
    summary: 'Delaware law framework for board decision-making in hostile takeover and activist situations.',
    content: `Boards face heightened scrutiny in hostile takeover contexts. Key fiduciary duty considerations:

ENHANCED SCRUTINY TRIGGERS:
- Unsolicited takeover proposals
- Activist campaigns
- Sale of control transactions
- Defensive measure adoption

REVLON DUTIES:
- Market check requirements
- Go-shop vs. no-shop provisions
- Fiduciary out negotiations
- Deal protection devices limits`,
    tags: ['fiduciary duty', 'hostile takeover', 'Delaware', 'governance', 'Revlon', 'activism'],
    confidenceScore: 98,
    ethicalWallCompliant: true,
    department: 'Securities & Governance',
    citations: ['Revlon v. MacAndrews', 'Unocal v. Mesa', 'Blasius v. Atlas'],
    relatedItems: ['kb-004', 'kb-016', 'kb-021'],
    insights: [
      'Poison pill adoption requires compelling justification post-2022',
      'Go-shop periods average 35 days in sale transactions',
      'Enhanced scrutiny applies to all defensive measures'
    ]
  },
  {
    id: 'kb-011',
    title: 'Cybersecurity Incident Response - Legal Framework',
    type: 'memo',
    category: 'Data Privacy & Cybersecurity',
    date: '2023-10-30',
    author: 'Christopher Wilson (Retiring Senior Partner)',
    authorYearsExperience: 25,
    summary: 'Legal response framework for cybersecurity incidents including breach notification and regulatory compliance.',
    content: `Cybersecurity incidents require coordinated legal response across multiple workstreams:

IMMEDIATE RESPONSE:
- Attorney-client privilege preservation
- Forensic investigation protocols
- Law enforcement coordination
- Insurance carrier notification

REGULATORY OBLIGATIONS:
- State breach notification timelines
- GDPR 72-hour requirement
- SEC 8-K disclosure obligations
- Sector-specific requirements (HIPAA, GLBA)`,
    tags: ['cybersecurity', 'data breach', 'incident response', 'privacy', 'compliance'],
    confidenceScore: 95,
    ethicalWallCompliant: true,
    department: 'Data Privacy & Cybersecurity',
    relatedItems: ['kb-004', 'kb-008', 'kb-022'],
    insights: [
      'Privileged forensic investigations reduce litigation exposure by 65%',
      'Ransomware attacks average $4.5M total cost including response',
      'Cyber insurance coverage disputes increased 300% in 2023'
    ]
  },
  {
    id: 'kb-012',
    title: 'Supply Chain Contracting - Force Majeure Evolution',
    type: 'clause',
    category: 'Commercial Contracts',
    date: '2023-08-28',
    author: 'Maria Rodriguez (Retiring Senior Partner)',
    authorYearsExperience: 28,
    summary: 'Post-pandemic force majeure clause drafting for supply chain resilience.',
    content: `Modern force majeure clauses require precise drafting to address supply chain vulnerabilities:

COVERED EVENTS:
- Pandemic/epidemic (with defined thresholds)
- Supply chain disruption
- Cyber attacks
- Climate events
- Government actions

MITIGATION OBLIGATIONS:
- Alternative supplier requirements
- Inventory maintenance levels
- Business continuity planning
- Cost allocation mechanisms`,
    tags: ['force majeure', 'supply chain', 'contract', 'pandemic', 'risk allocation'],
    confidenceScore: 93,
    ethicalWallCompliant: true,
    department: 'Commercial Contracts',
    relatedItems: ['kb-001', 'kb-023'],
    insights: [
      'Specific pandemic carveouts now standard in 95% of contracts',
      'Mitigation obligations reduce force majeure claims by 70%',
      'Alternative performance provisions preserve 60% of contract value'
    ]
  },
  {
    id: 'kb-013',
    title: 'Crypto Asset Regulatory Compliance Framework',
    type: 'opinion',
    category: 'Digital Assets',
    date: '2023-12-05',
    author: 'Brian Lee (Retiring Senior Partner)',
    authorYearsExperience: 27,
    summary: 'Navigating SEC, CFTC, and FinCEN requirements for digital asset transactions.',
    content: `Digital asset transactions face complex, evolving regulatory landscape:

SECURITIES LAW ANALYSIS:
- Howey test application
- Investment contract analysis
- Decentralization assessment
- Secondary market implications

AML/KYC REQUIREMENTS:
- FinCEN guidance compliance
- Travel rule implementation
- Wallet verification procedures
- Sanctions screening protocols`,
    tags: ['cryptocurrency', 'digital assets', 'SEC', 'blockchain', 'DeFi', 'compliance'],
    confidenceScore: 91,
    ethicalWallCompliant: true,
    department: 'Digital Assets',
    citations: ['SEC v. Ripple', 'SEC v. Telegram', 'FinCEN Guidance 2019'],
    relatedItems: ['kb-004', 'kb-024'],
    insights: [
      'SEC enforcement actions increased 250% in 2023',
      'Stablecoin legislation expected Q2 2024',
      'DeFi protocols face unprecedented regulatory scrutiny'
    ]
  },
  {
    id: 'kb-014',
    title: 'Executive Compensation - Clawback Policy Design',
    type: 'memo',
    category: 'Executive Compensation',
    date: '2023-09-12',
    author: 'Nancy Thompson (Retiring Senior Partner)',
    authorYearsExperience: 31,
    summary: 'NYSE/Nasdaq clawback rules compliance and optimal policy design.',
    content: `Mandatory clawback policies require careful design to ensure compliance and enforceability:

TRIGGERING EVENTS:
- Accounting restatements (Big R and little r)
- Misconduct definitions
- Compensation covered
- Look-back periods

ENFORCEMENT MECHANISMS:
- Recovery methods
- Statute of limitations
- Indemnification prohibitions
- Tax considerations`,
    tags: ['executive compensation', 'clawback', 'NYSE', 'Nasdaq', 'governance'],
    confidenceScore: 96,
    ethicalWallCompliant: true,
    department: 'Executive Compensation',
    relatedItems: ['kb-004', 'kb-010', 'kb-025'],
    insights: [
      'No-fault clawbacks required regardless of executive involvement',
      'Three-year look-back period applies to all restatements',
      'Board discretion limited to impracticability exceptions'
    ]
  },
  {
    id: 'kb-015',
    title: 'Hart-Scott-Rodino Act - Filing Strategy Optimization',
    type: 'precedent',
    category: 'Antitrust & Competition',
    jurisdiction: 'United States',
    date: '2023-10-18',
    author: 'Steven Chen (Retiring Senior Partner)',
    authorYearsExperience: 29,
    summary: 'Strategic HSR filing approaches to minimize review periods and second request risk.',
    content: `HSR filings require strategic approach to minimize regulatory delays:

FILING STRATEGY:
- Pull and refile timing
- Item 4(c)/(d) document preparation
- Advocacy paper submission
- Early engagement protocols

SECOND REQUEST AVOIDANCE:
- Market definition framing
- Competitive effects narrative
- Customer support letters
- Economic analysis preparation`,
    tags: ['HSR', 'antitrust', 'merger control', 'FTC', 'DOJ', 'filing strategy'],
    confidenceScore: 94,
    ethicalWallCompliant: true,
    department: 'Antitrust & Competition',
    relatedItems: ['kb-001', 'kb-006', 'kb-026'],
    insights: [
      'Early advocacy reduces second request probability by 40%',
      'Pull and refile adds average 30 days but avoids second request',
      'Customer letters critical in vertical transaction clearance'
    ]
  },
  {
    id: 'kb-016',
    title: 'Proxy Contest Defense Strategies',
    type: 'opinion',
    category: 'Securities & Governance',
    date: '2023-11-20',
    author: 'Rebecca Martinez (Retiring Senior Partner)',
    authorYearsExperience: 32,
    summary: 'Defending against activist proxy contests in the universal proxy era.',
    content: `Universal proxy rules fundamentally changed proxy contest dynamics:

DEFENSIVE STRATEGIES:
- Board composition assessment
- Advance notice bylaw provisions
- Settlement negotiation frameworks
- White knight alternatives

SHAREHOLDER ENGAGEMENT:
- ISS/Glass Lewis engagement
- Retail shareholder outreach
- ESG narrative development
- Track record presentation`,
    tags: ['proxy contest', 'activism', 'universal proxy', 'governance', 'defense'],
    confidenceScore: 95,
    ethicalWallCompliant: true,
    department: 'Securities & Governance',
    relatedItems: ['kb-010', 'kb-004', 'kb-027'],
    insights: [
      'Universal proxy increased activist success rate by 15%',
      'Early settlement discussions resolve 60% of campaigns',
      'ESG credentials increasingly important in proxy fights'
    ]
  },
  {
    id: 'kb-017',
    title: 'AI Technology Licensing - Key Terms and Pitfalls',
    type: 'contract',
    category: 'Technology Transactions',
    date: '2023-12-08',
    author: 'Daniel Park (Retiring Senior Partner)',
    authorYearsExperience: 26,
    summary: 'Structuring AI/ML technology licenses with appropriate risk allocation and IP protection.',
    content: `AI licensing requires specialized terms addressing unique risks:

IP OWNERSHIP:
- Training data rights
- Model improvements ownership
- Derivative works treatment
- Background IP protection

LIABILITY FRAMEWORK:
- Bias and fairness warranties
- Explainability requirements
- Regulatory compliance allocation
- Indemnification scopes`,
    tags: ['AI', 'licensing', 'technology', 'IP', 'machine learning', 'contract'],
    confidenceScore: 92,
    ethicalWallCompliant: true,
    department: 'Technology Transactions',
    relatedItems: ['kb-007', 'kb-028'],
    insights: [
      'Output ownership disputes increased 400% in 2023',
      'Explainability requirements becoming standard in regulated industries',
      'Training data indemnities most negotiated provision'
    ]
  },
  {
    id: 'kb-018',
    title: 'Patent Portfolio Valuation in Tech M&A',
    type: 'memo',
    category: 'Intellectual Property',
    date: '2023-09-08',
    author: 'Andrew Kim (Retiring Senior Partner)',
    authorYearsExperience: 30,
    summary: 'Framework for valuing patent portfolios in technology acquisitions.',
    content: `Patent portfolio valuation requires multi-faceted analysis:

VALUATION METHODS:
- Cost approach (prosecution costs)
- Market approach (comparable licenses)
- Income approach (royalty savings)
- Real options methodology

STRATEGIC VALUE:
- Freedom to operate analysis
- Competitive positioning
- Standards-essential patents
- Litigation risk assessment`,
    tags: ['patent', 'valuation', 'IP', 'M&A', 'technology', 'portfolio'],
    confidenceScore: 93,
    ethicalWallCompliant: true,
    department: 'Intellectual Property',
    relatedItems: ['kb-007', 'kb-029'],
    insights: [
      'SEP portfolios command 3-5x premium over implementation patents',
      'AI patents fastest growing category with 45% annual increase',
      'Patent quality more important than quantity in valuations'
    ]
  },
  {
    id: 'kb-019',
    title: 'Sanctions Compliance in International Transactions',
    type: 'opinion',
    category: 'Compliance & Investigations',
    jurisdiction: 'International',
    date: '2023-11-12',
    author: 'Victoria Adams (Retiring Senior Partner)',
    authorYearsExperience: 28,
    summary: 'Navigating OFAC, EU, and UK sanctions in complex international deals.',
    content: `Sanctions compliance requires careful navigation of multiple regimes:

SCREENING REQUIREMENTS:
- Ownership analysis (50% rule)
- Sectoral sanctions assessment
- Secondary sanctions risk
- General licenses applicability

TRANSACTION STRUCTURING:
- Wind-down provisions
- Sanctions clause drafting
- Escrow mechanisms
- License applications`,
    tags: ['sanctions', 'OFAC', 'compliance', 'international', 'export controls'],
    confidenceScore: 97,
    ethicalWallCompliant: true,
    department: 'Compliance & Investigations',
    relatedItems: ['kb-008', 'kb-030'],
    insights: [
      'Russia/Belarus sanctions fundamentally changed deal structures',
      'Ownership analysis increasingly complex with layered entities',
      'General licenses provide limited relief in practice'
    ]
  },
  {
    id: 'kb-020',
    title: 'Distressed M&A - 363 Sales vs. Plan Transactions',
    type: 'precedent',
    category: 'Restructuring',
    jurisdiction: 'United States',
    date: '2023-08-20',
    author: 'Joseph Miller (Retiring Senior Partner)',
    authorYearsExperience: 33,
    summary: 'Strategic considerations in choosing between 363 sales and plan of reorganization transactions.',
    content: `Distressed acquisitions require careful structure selection:

363 SALE ADVANTAGES:
- Speed to closing (60-90 days)
- Free and clear of liens
- Limited successor liability
- Stalking horse protections

PLAN TRANSACTION BENEFITS:
- Tax attribute preservation
- Operational continuity
- Regulatory transfer avoidance
- Employee benefit continuation`,
    tags: ['bankruptcy', '363 sale', 'restructuring', 'distressed M&A', 'Chapter 11'],
    confidenceScore: 95,
    ethicalWallCompliant: true,
    department: 'Restructuring',
    citations: ['In re Chrysler', 'In re General Motors', 'RadLAX v. Amalgamated Bank'],
    relatedItems: ['kb-009', 'kb-031'],
    insights: [
      'Credit bid rights complicate 363 sale processes',
      'Sub rosa plan concerns limit transaction flexibility',
      'DIP financing provides acquisition currency in 40% of deals'
    ]
  },
  {
    id: 'kb-021',
    title: 'SPACs - Redemption Rights and Trust Account Mechanics',
    type: 'contract',
    category: 'Capital Markets',
    date: '2023-09-28',
    author: 'Catherine White (Retiring Senior Partner)',
    authorYearsExperience: 27,
    summary: 'Understanding SPAC trust account operations and redemption rights management.',
    content: `SPAC trust accounts and redemption mechanics are transaction-critical:

TRUST ACCOUNT STRUCTURE:
- Investment guidelines
- Interest withdrawal rights
- Release conditions
- Tax payment mechanics

REDEMPTION MANAGEMENT:
- Redemption deadline setting
- Backstop agreements
- Non-redemption agreements
- Reverse termination fees`,
    tags: ['SPAC', 'redemption', 'trust account', 'capital markets', 'de-SPAC'],
    confidenceScore: 94,
    ethicalWallCompliant: true,
    department: 'Capital Markets',
    relatedItems: ['kb-005', 'kb-032'],
    insights: [
      'Trust account yields increased to 5%+ in 2023',
      'Redemption deadlines typically 2 days before vote',
      'Sponsor backstops average $25-50M in current market'
    ]
  },
  {
    id: 'kb-022',
    title: 'Privacy Shield Replacement - Data Transfer Mechanisms',
    type: 'memo',
    category: 'Data Privacy & Cybersecurity',
    jurisdiction: 'EU/US',
    date: '2023-10-08',
    author: 'Thomas Anderson (Retiring Senior Partner)',
    authorYearsExperience: 29,
    summary: 'Implementing EU-US Data Privacy Framework and alternative transfer mechanisms.',
    content: `Cross-border data transfers require robust legal mechanisms:

TRANSFER MECHANISMS:
- EU-US Data Privacy Framework
- Standard Contractual Clauses (2021)
- Binding Corporate Rules
- Derogations and exceptions

RISK ASSESSMENT:
- Transfer impact assessments
- Supplementary measures
- Local storage requirements
- Regulatory enforcement trends`,
    tags: ['privacy', 'GDPR', 'data transfer', 'Privacy Shield', 'SCCs'],
    confidenceScore: 93,
    ethicalWallCompliant: true,
    department: 'Data Privacy & Cybersecurity',
    relatedItems: ['kb-011', 'kb-033'],
    insights: [
      'Data Privacy Framework adoption at 30% of eligible companies',
      'SCCs require supplementary measures in most jurisdictions',
      'Data localization requirements expanding globally'
    ]
  },
  {
    id: 'kb-023',
    title: 'Joint Venture Structuring - Deadlock Resolution',
    type: 'contract',
    category: 'Joint Ventures',
    date: '2023-11-05',
    author: 'Michelle Brown (Retiring Senior Partner)',
    authorYearsExperience: 31,
    summary: 'Effective deadlock resolution mechanisms for 50/50 joint ventures.',
    content: `Deadlock resolution mechanisms critical for JV success:

RESOLUTION MECHANISMS:
- Rotating CEO/Chairman roles
- Casting vote provisions
- Baseball arbitration
- Texas/Mexican shootout
- Russian roulette provisions

ESCALATION PROCEDURES:
- Senior executive referral
- Mediation requirements
- Expert determination
- Buy-sell triggers`,
    tags: ['joint venture', 'deadlock', 'dispute resolution', 'governance', 'structuring'],
    confidenceScore: 96,
    ethicalWallCompliant: true,
    department: 'Corporate/M&A',
    relatedItems: ['kb-008', 'kb-034'],
    insights: [
      'Texas shootout provisions resolve 80% of deadlocks without execution',
      'Escalation procedures prevent 60% of potential deadlocks',
      'Put/call mechanisms increasingly replacing traditional buyouts'
    ]
  },
  {
    id: 'kb-024',
    title: 'NFT and Digital Asset Securities Analysis',
    type: 'opinion',
    category: 'Digital Assets',
    date: '2023-12-02',
    author: 'Kevin Liu (Retiring Senior Partner)',
    authorYearsExperience: 26,
    summary: 'Securities law analysis framework for NFT projects and digital collectibles.',
    content: `NFT projects require careful securities law analysis:

HOWEY TEST APPLICATION:
- Investment of money analysis
- Common enterprise evaluation
- Expectation of profits assessment
- Efforts of others determination

UTILITY EXEMPTIONS:
- Consumptive use rights
- Decentralization roadmaps
- Secondary market considerations
- Revenue sharing prohibitions`,
    tags: ['NFT', 'securities', 'digital assets', 'Web3', 'tokenization'],
    confidenceScore: 90,
    ethicalWallCompliant: true,
    department: 'Digital Assets',
    relatedItems: ['kb-013', 'kb-035'],
    insights: [
      'Royalty-bearing NFTs likely securities under current guidance',
      'Utility must be immediate and functional to avoid securities treatment',
      'Secondary market promises increase securities risk significantly'
    ]
  },
  {
    id: 'kb-025',
    title: 'Buy-Side R&W Insurance Claims Management',
    type: 'memo',
    category: 'M&A Insurance',
    date: '2023-09-15',
    author: 'Sandra Wilson (Retiring Senior Partner)',
    authorYearsExperience: 30,
    summary: 'Maximizing recovery on representation and warranty insurance claims.',
    content: `Successful R&W claims require strategic approach:

CLAIM PREPARATION:
- Notice timing requirements
- Proof of loss documentation
- Damages calculation methodology
- Mitigation obligations

INSURER PUSHBACK:
- Knowledge qualifier disputes
- Materiality threshold calculations
- Sandbagging provisions
- Exclusion interpretations`,
    tags: ['R&W insurance', 'claims', 'M&A', 'insurance recovery', 'disputes'],
    confidenceScore: 94,
    ethicalWallCompliant: true,
    department: 'Corporate/M&A',
    relatedItems: ['kb-009', 'kb-036'],
    insights: [
      'Claims paid on 20% of policies, average recovery $8.5M',
      'Financial statement breaches most common successful claims',
      'Pre-claim insurer engagement improves recovery by 35%'
    ]
  },
  {
    id: 'kb-026',
    title: 'Healthcare Regulatory Due Diligence Checklist',
    type: 'memo',
    category: 'Healthcare',
    date: '2023-10-25',
    author: 'Robert Garcia (Retiring Senior Partner)',
    authorYearsExperience: 32,
    summary: 'Comprehensive regulatory diligence for healthcare services acquisitions.',
    content: `Healthcare transactions require specialized regulatory diligence:

REGULATORY COMPLIANCE:
- Medicare/Medicaid enrollment
- Stark Law compliance
- Anti-kickback analysis
- HIPAA privacy/security
- State licensure status

REIMBURSEMENT ANALYSIS:
- Payor contract terms
- Reimbursement rate trends
- RAC audit history
- Billing compliance review`,
    tags: ['healthcare', 'regulatory', 'due diligence', 'Stark Law', 'compliance'],
    confidenceScore: 95,
    ethicalWallCompliant: true,
    department: 'Healthcare',
    citations: ['US v. Halifax Hospital', 'Tuomey Healthcare System'],
    relatedItems: ['kb-002', 'kb-037'],
    insights: [
      'Stark Law violations average $15M in settlements',
      'Billing compliance issues found in 70% of healthcare deals',
      'Change of ownership notifications critical for reimbursement'
    ]
  },
  {
    id: 'kb-027',
    title: 'Environmental Liability in Real Estate Transactions',
    type: 'precedent',
    category: 'Real Estate',
    date: '2023-11-18',
    author: 'Jennifer Thompson (Retiring Senior Partner)',
    authorYearsExperience: 28,
    summary: 'Managing environmental risks in commercial real estate acquisitions.',
    content: `Environmental liability requires careful risk allocation:

DUE DILIGENCE SCOPE:
- Phase I/II assessments
- Historical use analysis
- Regulatory database review
- Vapor intrusion assessment

RISK ALLOCATION:
- CERCLA liability exceptions
- Indemnification structures
- Environmental insurance
- Escrow and holdback provisions`,
    tags: ['environmental', 'real estate', 'CERCLA', 'liability', 'due diligence'],
    confidenceScore: 93,
    ethicalWallCompliant: true,
    department: 'Real Estate',
    relatedItems: ['kb-009', 'kb-038'],
    insights: [
      'Vapor intrusion most common post-closing issue',
      'Environmental insurance premiums 0.3-0.5% of coverage',
      'Phase II recommended for all industrial properties'
    ]
  },
  {
    id: 'kb-028',
    title: 'Employment Agreement Non-Compete Enforceability',
    type: 'opinion',
    category: 'Employment Law',
    jurisdiction: 'Multi-State',
    date: '2023-09-20',
    author: 'Paul Martinez (Retiring Senior Partner)',
    authorYearsExperience: 29,
    summary: 'State-by-state analysis of non-compete enforceability and FTC proposed rule impact.',
    content: `Non-compete agreements face increasing scrutiny:

ENFORCEABILITY FACTORS:
- Geographic scope reasonableness
- Duration limitations
- Legitimate business interests
- Consideration requirements

STATE VARIATIONS:
- California prohibition
- Garden leave requirements
- Blue pencil vs. reformation
- Customer non-solicit alternatives`,
    tags: ['non-compete', 'employment', 'restrictive covenants', 'FTC', 'enforceability'],
    confidenceScore: 92,
    ethicalWallCompliant: true,
    department: 'Employment Law',
    relatedItems: ['kb-014', 'kb-039'],
    insights: [
      'FTC rule would ban most employee non-competes',
      '12-month restrictions most likely enforced',
      'Customer non-solicits 80% more likely enforced than non-competes'
    ]
  },
  {
    id: 'kb-029',
    title: 'Software Development Agreement Best Practices',
    type: 'contract',
    category: 'Technology Transactions',
    date: '2023-10-12',
    author: 'Amanda Davis (Retiring Senior Partner)',
    authorYearsExperience: 27,
    summary: 'Structuring software development agreements for optimal IP protection and risk allocation.',
    content: `Software development agreements require precise terms:

IP OWNERSHIP:
- Work for hire provisions
- Pre-existing IP carveouts
- Joint development rights
- Open source obligations

DEVELOPMENT PROCESS:
- Agile methodology terms
- Acceptance criteria
- Change order procedures
- Support and maintenance`,
    tags: ['software', 'development', 'IP', 'technology', 'agile', 'contract'],
    confidenceScore: 94,
    ethicalWallCompliant: true,
    department: 'Technology Transactions',
    relatedItems: ['kb-017', 'kb-040'],
    insights: [
      'Agile development requires flexible acceptance procedures',
      'Source code escrow critical for mission-critical systems',
      'Change orders average 30% of original contract value'
    ]
  },
  {
    id: 'kb-030',
    title: 'Cross-Border Tax Structuring - BEPS Compliance',
    type: 'memo',
    category: 'Tax',
    jurisdiction: 'International',
    date: '2023-11-08',
    author: 'Charles Kim (Retiring Senior Partner)',
    authorYearsExperience: 31,
    summary: 'Implementing OECD BEPS recommendations in cross-border transaction structures.',
    content: `BEPS compliance essential in modern tax structuring:

PILLAR TWO REQUIREMENTS:
- Global minimum tax (15%)
- Income inclusion rules
- Undertaxed payments rule
- Subject to tax rule

STRUCTURE OPTIMIZATION:
- Substance requirements
- Principal purpose tests
- Treaty benefit limitations
- Transfer pricing documentation`,
    tags: ['tax', 'BEPS', 'international', 'transfer pricing', 'OECD'],
    confidenceScore: 95,
    ethicalWallCompliant: true,
    department: 'Tax',
    relatedItems: ['kb-002', 'kb-041'],
    insights: [
      'Pillar Two effective in 50+ jurisdictions by 2024',
      'IP holding structures require significant substance',
      'Transfer pricing documentation costs increased 200%'
    ]
  },
  {
    id: 'kb-031',
    title: 'Venture Capital - SAFE vs. Priced Round Analysis',
    type: 'opinion',
    category: 'Venture Capital',
    date: '2023-08-25',
    author: 'Lisa Anderson (Retiring Senior Partner)',
    authorYearsExperience: 26,
    summary: 'Strategic considerations in choosing between SAFE notes and priced equity rounds.',
    content: `SAFE vs. priced round decision impacts downstream financing:

SAFE ADVANTAGES:
- Speed and simplicity
- Lower legal costs
- No board seats
- Valuation cap flexibility

PRICED ROUND BENEFITS:
- Clear ownership percentages
- Protective provisions
- Board representation
- Information rights`,
    tags: ['venture capital', 'SAFE', 'financing', 'startup', 'equity'],
    confidenceScore: 93,
    ethicalWallCompliant: true,
    department: 'Venture Capital',
    relatedItems: ['kb-042'],
    insights: [
      'SAFEs represent 60% of early-stage financings',
      'Valuation caps decreased 30% in 2023',
      'Multiple SAFE rounds create complex cap tables'
    ]
  },
  {
    id: 'kb-032',
    title: 'FDA Regulatory Strategy for Medical Devices',
    type: 'memo',
    category: 'Healthcare',
    date: '2023-12-15',
    author: 'Matthew Johnson (Retiring Senior Partner)',
    authorYearsExperience: 30,
    summary: 'Navigating FDA approval pathways for medical device commercialization.',
    content: `FDA strategy critical for device commercialization:

PATHWAY SELECTION:
- 510(k) vs. PMA requirements
- De Novo classification
- Breakthrough device designation
- Software as medical device

CLINICAL TRIAL DESIGN:
- IDE requirements
- Pivotal study design
- Real-world evidence
- Post-market surveillance`,
    tags: ['FDA', 'medical device', 'regulatory', 'healthcare', 'clinical trials'],
    confidenceScore: 96,
    ethicalWallCompliant: true,
    department: 'Healthcare',
    relatedItems: ['kb-026', 'kb-043'],
    insights: [
      '510(k) clearance averages 5 months vs. 12+ for PMA',
      'Breakthrough designation reduces approval time by 40%',
      'Software devices face evolving regulatory framework'
    ]
  },
  {
    id: 'kb-033',
    title: 'Infrastructure Fund Investment Structures',
    type: 'contract',
    category: 'Infrastructure & Energy',
    date: '2023-10-28',
    author: 'Barbara Chen (Retiring Senior Partner)',
    authorYearsExperience: 28,
    summary: 'Structuring infrastructure investments for optimal tax and regulatory treatment.',
    content: `Infrastructure investments require specialized structuring:

FUND STRUCTURE:
- Partnership vs. corporate form
- REIT eligibility analysis
- MLP considerations
- Tax equity structures

REGULATORY CONSIDERATIONS:
- CFIUS implications
- FERC jurisdiction
- State PUC approvals
- Environmental permits`,
    tags: ['infrastructure', 'investment', 'fund', 'energy', 'tax equity'],
    confidenceScore: 94,
    ethicalWallCompliant: true,
    department: 'Infrastructure & Energy',
    relatedItems: ['kb-044'],
    insights: [
      'IRA tax credits transforming project economics',
      'YieldCo structures returning post-interest rate stabilization',
      'ESG requirements standard in infrastructure funds'
    ]
  },
  {
    id: 'kb-034',
    title: 'Franchise Agreement Negotiation Strategies',
    type: 'contract',
    category: 'Franchise Law',
    date: '2023-09-05',
    author: 'William Brown (Retiring Senior Partner)',
    authorYearsExperience: 32,
    summary: 'Key negotiation points in franchise agreements from franchisor and franchisee perspectives.',
    content: `Franchise agreements require balanced approach:

KEY TERMS:
- Territory rights and exclusivity
- Fee structures and royalties
- Marketing fund contributions
- Transfer restrictions

RELATIONSHIP LAWS:
- Good faith obligations
- Termination protections
- Disclosure requirements
- State registration rules`,
    tags: ['franchise', 'contract', 'negotiation', 'distribution', 'licensing'],
    confidenceScore: 95,
    ethicalWallCompliant: true,
    department: 'Franchise Law',
    relatedItems: ['kb-045'],
    insights: [
      'Exclusive territory increases franchise value 25%',
      'Marketing funds typically 2-4% of gross revenue',
      'State relationship laws override contract terms'
    ]
  },
  {
    id: 'kb-035',
    title: 'Blockchain Smart Contract Legal Framework',
    type: 'opinion',
    category: 'Digital Assets',
    date: '2023-11-25',
    author: 'Eric Kim (Retiring Senior Partner)',
    authorYearsExperience: 27,
    summary: 'Legal enforceability and risk management for blockchain-based smart contracts.',
    content: `Smart contracts present unique legal challenges:

ENFORCEABILITY:
- Legal wrapper agreements
- Dispute resolution mechanisms
- Jurisdiction and choice of law
- Code vs. intent interpretation

RISK MANAGEMENT:
- Oracle reliability
- Upgrade mechanisms
- Emergency pause functions
- Insurance and indemnity`,
    tags: ['blockchain', 'smart contract', 'DeFi', 'Web3', 'digital assets'],
    confidenceScore: 91,
    ethicalWallCompliant: true,
    department: 'Digital Assets',
    relatedItems: ['kb-013', 'kb-024'],
    insights: [
      'Hybrid contracts (legal + smart) becoming standard',
      'Oracle failures cause 40% of smart contract disputes',
      'Immutability creates unique legal challenges'
    ]
  }
];

// Semantic concept mappings for intelligent search
const conceptMappings: { [key: string]: string[] } = {
  'mac': ['material adverse change', 'material adverse effect', 'mae', 'mac clause'],
  'merger': ['m&a', 'acquisition', 'takeover', 'business combination', 'consolidation'],
  'fiduciary': ['duty of care', 'duty of loyalty', 'business judgment', 'board duties'],
  'ip': ['intellectual property', 'patent', 'copyright', 'trademark', 'trade secret'],
  'ai': ['artificial intelligence', 'machine learning', 'ml', 'neural network', 'algorithm'],
  'pandemic': ['covid', 'epidemic', 'health crisis', 'force majeure', 'act of god'],
  'breach': ['violation', 'default', 'non-compliance', 'failure to perform'],
  'precedent': ['case law', 'prior decision', 'judicial ruling', 'court opinion'],
  'force majeure': ['act of god', 'unforeseeable', 'extraordinary event', 'impossibility'],
  'privacy': ['data protection', 'gdpr', 'personal information', 'confidential'],
  'compliance': ['regulatory', 'conformity', 'adherence', 'requirements'],
  'arbitration': ['dispute resolution', 'adr', 'mediation', 'settlement']
};

// Helper functions for search and graph generation
export function searchKnowledge(query: string): SearchResult[] {
  const startTime = Date.now();
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/);

  // Expand query with semantic concepts
  const expandedTerms = new Set(queryTerms);
  queryTerms.forEach(term => {
    if (conceptMappings[term]) {
      conceptMappings[term].forEach(related => expandedTerms.add(related.toLowerCase()));
    }
    // Check if term is part of a concept
    Object.entries(conceptMappings).forEach(([key, values]) => {
      if (values.some(v => v.toLowerCase().includes(term))) {
        expandedTerms.add(key);
        values.forEach(v => expandedTerms.add(v.toLowerCase()));
      }
    });
  });

  const results = knowledgeBase
    .map(item => {
      let score = 0;
      const highlights: string[] = [];
      const matchedConcepts = new Set<string>();
      const semanticReasons: string[] = [];

      // Title matching with semantic expansion
      expandedTerms.forEach(term => {
        if (item.title.toLowerCase().includes(term)) {
          score += term.length > 3 ? 15 : 8;
          matchedConcepts.add(term);
          if (queryTerms.includes(term)) {
            semanticReasons.push(`Direct match: "${term}" in title`);
          } else {
            semanticReasons.push(`Semantic match: "${term}" related to query`);
          }
        }
      });

      // Content and summary matching
      expandedTerms.forEach(term => {
        const contentLower = item.content.toLowerCase();
        const summaryLower = item.summary.toLowerCase();

        if (contentLower.includes(term)) {
          score += term.length > 3 ? 10 : 5;
          matchedConcepts.add(term);
        }
        if (summaryLower.includes(term)) {
          score += term.length > 3 ? 12 : 6;
          matchedConcepts.add(term);
        }
      });

      // Tag matching with higher weight
      item.tags.forEach(tag => {
        const tagLower = tag.toLowerCase();
        expandedTerms.forEach(term => {
          if (tagLower.includes(term) || term.includes(tagLower)) {
            score += 20;
            matchedConcepts.add(tag);
            semanticReasons.push(`Tag match: "${tag}"`);
          }
        });
      });

      // Jurisdiction matching
      if (item.jurisdiction) {
        const jurisdictionLower = item.jurisdiction.toLowerCase();
        if (queryLower.includes('ny') || queryLower.includes('new york')) {
          if (jurisdictionLower.includes('new york') || jurisdictionLower === 'ny') {
            score += 25;
            semanticReasons.push(`Jurisdiction: ${item.jurisdiction}`);
          }
        }
        expandedTerms.forEach(term => {
          if (jurisdictionLower.includes(term)) {
            score += 15;
            matchedConcepts.add('jurisdiction');
          }
        });
      }

      // Category and practice area matching
      const categoryLower = item.category.toLowerCase();
      expandedTerms.forEach(term => {
        if (categoryLower.includes(term)) {
          score += 12;
          matchedConcepts.add(item.category);
          semanticReasons.push(`Practice area: ${item.category}`);
        }
      });

      // Author expertise matching
      if (item.authorYearsExperience && item.authorYearsExperience > 25) {
        score += 5;
        semanticReasons.push(`Senior expertise: ${item.authorYearsExperience} years`);
      }

      // Extract intelligent highlights
      const sentences = item.content.split('. ');
      const relevantSentences = sentences.filter(sentence => {
        const sentLower = sentence.toLowerCase();
        return Array.from(expandedTerms).some(term => sentLower.includes(term));
      });

      // Prioritize sentences with multiple matches
      relevantSentences.sort((a, b) => {
        const aMatches = Array.from(expandedTerms).filter(term =>
          a.toLowerCase().includes(term)).length;
        const bMatches = Array.from(expandedTerms).filter(term =>
          b.toLowerCase().includes(term)).length;
        return bMatches - aMatches;
      });

      // Add top highlights with concept bolding
      relevantSentences.slice(0, 3).forEach(sentence => {
        let highlighted = sentence;
        matchedConcepts.forEach(concept => {
          const regex = new RegExp(`\\b(${concept})\\b`, 'gi');
          highlighted = highlighted.replace(regex, '**$1**');
        });
        highlights.push(highlighted + '.');
      });

      // Add summary if no highlights found
      if (highlights.length === 0 && score > 0) {
        highlights.push(item.summary);
      }

      // Calculate search time (simulated but realistic)
      const searchTime = (Math.random() * 0.3 + 0.1).toFixed(2);

      return {
        ...item,
        matchedQuery: query,
        semanticScore: Math.min(score / 150, 0.99),
        highlights,
        relevanceScore: Math.min(score / 150, 0.99),
        matchedConcepts: Array.from(matchedConcepts),
        semanticReasons,
        searchTime: `${searchTime}s`,
        timeSaved: '~45 minutes'
      } as SearchResult & {
        matchedConcepts: string[];
        semanticReasons: string[];
        searchTime: string;
        timeSaved: string;
      };
    })
    .filter(result => result.semanticScore > 0.05)
    .sort((a, b) => b.semanticScore - a.semanticScore)
    .slice(0, 20);

  // Ensure we always return some results for demo queries
  if (results.length === 0 && queryLower.includes('mac')) {
    return knowledgeBase
      .filter(item => item.tags.includes('MAC') || item.title.includes('MAC'))
      .slice(0, 5)
      .map(item => ({
        ...item,
        matchedQuery: query,
        semanticScore: 0.85,
        highlights: [item.summary],
        relevanceScore: 0.85
      } as SearchResult));
  }

  return results;
}

export function generateKnowledgeGraph(centerItem?: KnowledgeItem): { nodes: KnowledgeNode[], edges: KnowledgeEdge[] } {
  const nodes: KnowledgeNode[] = [];
  const edges: KnowledgeEdge[] = [];
  const processedIds = new Set<string>();

  // If no centerItem provided and no knowledge base, return empty graph
  if (!centerItem && knowledgeBase.length === 0) {
    return { nodes: [], edges: [] };
  }

  // Start with center item or first item
  const startItem = centerItem || knowledgeBase[0];

  // Add center node
  nodes.push({
    id: startItem.id,
    label: startItem.title.substring(0, 50) + '...',
    type: startItem.type,
    size: 30,
    color: '#059669' // Emerald
  });
  processedIds.add(startItem.id);

  // Add related items
  startItem.relatedItems?.forEach(relatedId => {
    const related = knowledgeBase.find(kb => kb.id === relatedId);
    if (related && !processedIds.has(related.id)) {
      nodes.push({
        id: related.id,
        label: related.title.substring(0, 40) + '...',
        type: related.type,
        size: 20,
        color: '#10b981' // Green
      });
      edges.push({
        source: startItem.id,
        target: related.id,
        weight: 1,
        type: 'related'
      });
      processedIds.add(related.id);
    }
  });

  // Add items from same category
  knowledgeBase
    .filter(item => item.category === startItem.category && !processedIds.has(item.id))
    .slice(0, 5)
    .forEach(item => {
      nodes.push({
        id: item.id,
        label: item.title.substring(0, 35) + '...',
        type: item.type,
        size: 15,
        color: '#34d399' // Light green
      });
      edges.push({
        source: startItem.id,
        target: item.id,
        weight: 0.5,
        type: 'category'
      });
      processedIds.add(item.id);
    });

  // Add items from same author
  knowledgeBase
    .filter(item => item.author === startItem.author && !processedIds.has(item.id))
    .slice(0, 3)
    .forEach(item => {
      nodes.push({
        id: item.id,
        label: item.title.substring(0, 35) + '...',
        type: item.type,
        size: 12,
        color: '#6ee7b7' // Lighter green
      });
      edges.push({
        source: startItem.id,
        target: item.id,
        weight: 0.3,
        type: 'author'
      });
    });

  return { nodes, edges };
}

export function calculateROI(lawyersCount: number = 50): {
  annualSavings: number;
  timeSavedHours: number;
  costPerLawyer: number;
  breakdownItems: Array<{ category: string; amount: number }>;
} {
  const avgHourlyRate = 600;
  const hoursPerWeek = 8; // Hours saved per lawyer per week
  const weeksPerYear = 48; // Account for vacation

  const timeSavedHours = lawyersCount * hoursPerWeek * weeksPerYear;
  const annualSavings = timeSavedHours * avgHourlyRate;
  const costPerLawyer = annualSavings / lawyersCount;

  return {
    annualSavings,
    timeSavedHours,
    costPerLawyer,
    breakdownItems: [
      { category: 'Research Time Reduction', amount: annualSavings * 0.4 },
      { category: 'Improved Deal Velocity', amount: annualSavings * 0.25 },
      { category: 'Risk Mitigation', amount: annualSavings * 0.2 },
      { category: 'Knowledge Transfer', amount: annualSavings * 0.15 }
    ]
  };
}