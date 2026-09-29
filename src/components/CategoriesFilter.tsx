import React from 'react';
import { CATEGORIES } from '../data/products';
import { SlidersHorizontal, Search, X } from 'lucide-react';

interface CategoriesFilterProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
}) => {
  return (
    <div className="space-y-4 mb-8">
      
      {/* Top Filter Bar: Search & Sort Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input with quick clear */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          <input
            type="text"
            placeholder="ابحث بالاسم، النوع، أو المادة..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-9 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all text-slate-800"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Counter Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-slate-600">
          <span className="tabular-nums font-medium text-slate-500">
            {totalResults} منتج متوفر
          </span>

          <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 shadow-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">الترتيب:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
            >
              <option value="popular">الأكثر طلباً</option>
              <option value="price-asc">الأقل سعراً</option>
              <option value="price-desc">الأعلى سعراً</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>
          </div>
        </div>
      </div>

      {/* Segmented Category Buttons (Section 1.A: functional buttons allowed for filtering) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-stone-200 hover:border-stone-300'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[11px] tabular-nums ${isActive ? 'text-sky-300' : 'text-slate-400'}`}>
                ({cat.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Search / Filter Tag indicator */}
      {(searchQuery || selectedCategory !== 'all') && (
        <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
          <span>التصفيات الحالية:</span>
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded text-slate-800">
              {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
              <button
                onClick={() => onSelectCategory('all')}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded text-slate-800">
              &quot;{searchQuery}&quot;
              <button
                onClick={() => onSearchChange('')}
                className="hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={() => {
              onSelectCategory('all');
              onSearchChange('');
            }}
            className="text-sky-600 hover:underline mr-auto"
          >
            إعادة تعيين الكل
          </button>
        </div>
      )}

    </div>
  );
};
