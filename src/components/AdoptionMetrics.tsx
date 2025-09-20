'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users, CheckCircle, Award, Target, Zap, Building } from 'lucide-react';

export default function AdoptionMetrics() {
  const competitorData = [
    { name: 'DeepJudge', adoption: 92, color: 'bg-emerald-500', highlight: true },
    { name: 'Competitor A', adoption: 45, color: 'bg-gray-400' },
    { name: 'Competitor B', adoption: 52, color: 'bg-gray-400' },
    { name: 'Industry Average', adoption: 38, color: 'bg-gray-300' },
  ];

  const keyDifferentiators = [
    {
      title: 'No Data Migration Required',
      description: 'Works with your existing systems from day one',
      icon: Zap,
      metric: '0 hours',
    },
    {
      title: '30-Day Setup',
      description: 'Full deployment in weeks, not months',
      icon: Clock,
      metric: '4 weeks',
    },
    {
      title: 'Works with Messy Data',
      description: 'AI understands context, not just perfect formats',
      icon: Target,
      metric: '99.5% accuracy',
    },
  ];


  const timeToValue = [
    { phase: 'First Search', deepjudge: '30 minutes', competitors: '3 weeks', icon: CheckCircle },
    { phase: 'Team Onboarded', deepjudge: '1 week', competitors: '2 months', icon: Users },
    { phase: 'Full Adoption', deepjudge: '30 days', competitors: '6+ months', icon: Award },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-width-container section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-full">
            <TrendingUp className="w-4 h-4" />
            Industry-Leading Adoption Metrics
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            92% Adoption Rate vs 40% Industry Average
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Why legal teams actually use DeepJudge - and keep using it
          </p>
        </motion.div>

        {/* Adoption Rate Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Adoption Rate Comparison
            </h3>
            <div className="space-y-6">
              {competitorData.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${item.highlight ? 'text-emerald-600' : 'text-gray-700 dark:text-gray-300'}`}>
                      {item.name}
                      {item.highlight && (
                        <span className="ml-2 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                          Your Choice
                        </span>
                      )}
                    </span>
                    <span className={`font-bold text-lg ${item.highlight ? 'text-emerald-600' : 'text-gray-600 dark:text-gray-400'}`}>
                      {item.adoption}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.adoption}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full ${item.color} ${item.highlight ? 'bg-gradient-to-r from-emerald-500 to-green-500' : ''} flex items-center justify-end px-3`}
                    >
                      {item.highlight && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="text-white text-sm font-semibold"
                        >
                          2.4x higher
                        </motion.span>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {keyDifferentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {item.description}
                    </p>
                    <div className="text-2xl font-bold text-emerald-600">
                      {item.metric}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>


        {/* Time to Value Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Time to Value: Minutes vs Months
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {timeToValue.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-12 h-12 mx-auto mb-4 text-emerald-200" />
                  <h4 className="font-bold text-lg mb-3">{phase.phase}</h4>
                  <div className="space-y-2">
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <div className="text-xs text-emerald-100">DeepJudge</div>
                      <div className="text-xl font-bold">{phase.deepjudge}</div>
                    </div>
                    <div className="bg-black/20 rounded-lg px-4 py-2">
                      <div className="text-xs text-emerald-200">Competitors</div>
                      <div className="text-lg text-emerald-300 line-through">{phase.competitors}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <p className="text-emerald-100 text-sm">
              * Based on actual deployment data from 150+ law firms
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}