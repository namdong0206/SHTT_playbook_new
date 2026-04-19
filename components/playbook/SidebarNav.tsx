'use client';

import React from 'react';
import { LucideIcon, Gavel, ShieldAlert, GraduationCap, BarChart3, Zap, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PLAYBOOK_DATA } from '@/lib/data';

// Map icon name -> component, type-safe với LucideIcon
const ICON_MAP: Record<string, LucideIcon> = {
  Gavel,
  ShieldAlert,
  GraduationCap,
  BarChart3,
  Zap,
};

interface SidebarNavProps {
  activeTopicId: string;
  onSelect: (id: string) => void;
  /** 'sm' dùng cho desktop sidebar, 'md' dùng cho mobile overlay */
  size?: 'sm' | 'md';
}

export function SidebarNav({ activeTopicId, onSelect, size = 'sm' }: SidebarNavProps) {
  const isMd = size === 'md';

  const btnBase = cn(
    'w-full flex items-center text-left font-bold transition-all',
    isMd
      ? 'gap-3.5 px-5 py-3.5 rounded-2xl text-[13px]'
      : 'gap-3 px-4 py-2.5 rounded-xl text-[12px]'
  );

  const activeClass = 'bg-amber-900/10 text-amber-900 shadow-sm';
  const inactiveClass = 'opacity-50 hover:opacity-100 hover:bg-amber-900/5';

  const labelClass = cn(
    'uppercase tracking-[0.2em] font-black opacity-30 px-4',
    isMd ? 'text-[9px] tracking-[0.3em] px-5' : 'text-[8px]'
  );

  const sectionClass = isMd ? 'pt-10 pb-5' : 'pt-6 pb-3';

  return (
    <nav className="space-y-1 flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar">
      {/* Toàn bộ nội dung */}
      <button
        onClick={() => onSelect('all')}
        className={cn(btnBase, activeTopicId === 'all' ? activeClass : inactiveClass)}
      >
        <LayoutGrid className={cn('shrink-0', isMd ? 'w-4 h-4' : 'w-4 h-4')} />
        Toàn bộ nội dung
      </button>

      {/* Phân cách */}
      <div className={sectionClass}>
        <div className={labelClass}>Danh mục nội dung</div>
      </div>

      {/* Danh sách topic */}
      {PLAYBOOK_DATA.map((topic) => {
        const Icon = ICON_MAP[topic.icon] ?? Gavel;
        return (
          <button
            key={topic.id}
            onClick={() => onSelect(topic.id)}
            className={cn(btnBase, activeTopicId === topic.id ? activeClass : inactiveClass)}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="line-clamp-1 uppercase tracking-wide">
              {topic.shortTitle ?? topic.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
