import React from 'react';
import HoursForm from '@/components/hours/HoursForm';
import HoursHistory from '@/components/hours/HoursHistory';

export default function HoursPage() {
  return (
    <main className="w-full bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <HoursForm />
          </div>

          {/* History Section */}
          <div className="lg:col-span-1">
            <HoursHistory />
          </div>
        </div>
      </div>
    </main>
  );
}
