import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-stone-200/60 animate-pulse flex flex-col">
      <div className="w-full aspect-square rounded-2xl bg-stone-200 mb-4" />
      <div className="h-4 bg-stone-200 rounded w-1/3 mb-2" />
      <div className="h-6 bg-stone-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-stone-200 rounded w-full mb-4" />
      <div className="mt-auto flex items-center justify-between pt-2">
        <div className="h-6 bg-stone-200 rounded w-1/3" />
        <div className="h-10 w-10 bg-stone-200 rounded-full" />
      </div>
    </div>
  );
}