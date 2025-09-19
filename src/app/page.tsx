'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, FileText, Users, Zap, Shield, Clock, TrendingUp, CheckCircle, Star, Brain, Search, DollarSign, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const stats = [
    { label: 'User Adoption', value: '92%', icon: Users, color: 'text-accent-500' },
    { label: 'Hours Saved Weekly', value: '8+', icon: Clock, color: 'text-primary-600' },
    { label: 'Knowledge Captured', value: '30 yrs', icon: Brain, color: 'text-secondary-500' },
    { label: 'Cost Savings/Lawyer', value: '$18K', icon: DollarSign, color: 'text-accent-500' },
  ];

  const features = [
    {
      title: 'Knowledge Activation',
      description: 'Capture 30 years of retiring partner expertise with AI-powered semantic search',
      icon: Brain,
      gradient: 'from-emerald-500 to-green-600',
      highlight: true,
      link: '/workflows/knowledge',
    },
    {
      title: 'Document Intelligence',
      description: '99.5% accuracy in legal document parsing across 50+ jurisdictions',
      icon: FileText,
      gradient: 'from-secondary-500 to-secondary-700',
    },
    {
      title: 'Predictive Analytics',
      description: 'Data-driven insights for case outcomes and resource optimization',
      icon: BarChart3,
      gradient: 'from-accent-500 to-accent-700',
    },
    {
      title: 'Enterprise Security',
      description: 'SOC 2 Type II certified with end-to-end encryption',
      icon: Shield,
      gradient: 'from-primary-600 to-secondary-600',
    },
  ];

  const testimonials = [
    {
      quote: "DeepJudge transformed our practice. We're saving 4+ hours per attorney daily.",
      author: 'Sarah Chen',
      role: 'Managing Partner',
      company: 'Chen & Associates',
      rating: 5,
    },
    {
      quote: "The 90% adoption rate speaks for itself. Our team actually loves using it.",
      author: 'Michael Roberts',
      role: 'General Counsel',
      company: 'Fortune 500 Corp',
      rating: 5,
    },
    {
      quote: "ROI of 350% in year one. Best legal tech investment we've ever made.",
      author: 'Jennifer Walsh',
      role: 'COO',
      company: 'Walsh Legal Group',
      rating: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-secondary-600/10" />

        <div className="max-width-container section-padding py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-full"
            >
              <Brain className="w-4 h-4 text-emerald-500" />
              30 Years of Partner Expertise Captured
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Knowledge Activation
              <span className="block gradient-text">Intelligence Platform</span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Transform retiring partner expertise into AI-powered legal intelligence.
              Save 8+ hours weekly. Achieve 92% adoption. Capture decades of institutional knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/workflows/knowledge">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Explore Knowledge Activation
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-width-container section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-width-container section-padding">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Legal Teams Choose DeepJudge
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built by lawyers, for lawyers. Every feature designed for maximum adoption and impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`glass-effect rounded-xl p-8 card-hover ${feature.highlight ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}
              >
                {feature.highlight && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Featured Workflow
                  </div>
                )}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {feature.description}
                </p>
                {feature.link && (
                  <Link href={feature.link}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Activation CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
        <div className="max-width-container section-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-12 text-center"
          >
            <Brain className="w-16 h-16 mx-auto mb-6 text-emerald-600" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Transform 30 Years of Expertise into Instant Intelligence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Our Knowledge Activation workflow captures retiring partner knowledge with AI-powered semantic search
              that understands context, not just keywords. Achieve 92% adoption while saving $18,000 per lawyer annually.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/workflows/knowledge">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Try Knowledge Search Demo
                </motion.button>
              </Link>
              <Link href="/workflows/knowledge#roi">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 border border-emerald-200"
                >
                  <DollarSign className="w-5 h-5" />
                  Calculate Your ROI
                </motion.button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                Natural language search
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                Ethical wall compliance
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                99% confidence scores
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-width-container section-padding">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Leading Law Firms
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join 150+ firms experiencing the DeepJudge difference
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-width-container section-padding text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join the 90% of users who can't imagine working without DeepJudge.
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2"
              >
                Start Free 30-Day Trial
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-all duration-200"
              >
                Schedule Demo
              </motion.button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Full access to all features
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                White-glove onboarding
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}