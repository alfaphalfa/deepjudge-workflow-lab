'use client';

export default function PromptLabDebug() {
  console.log('PromptLabDebug rendering...');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Prompt Engineering Lab</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Basic Prompt</h3>
          <p className="text-sm text-gray-600">Review this contract</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Engineered Prompt</h3>
          <p className="text-sm text-gray-600">As a corporate attorney, analyze this merger agreement for: 1) Change of control provisions...</p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-green-50 rounded">
        <p className="font-semibold">Performance Improvement:</p>
        <p>87% → 96% accuracy with structured prompting</p>
      </div>
    </div>
  );
}