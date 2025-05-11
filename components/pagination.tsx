"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  total: number;       
  pageSize: number;    
  currentPage: number; 
  basePath: string;    
}

export function Pagination({ total, pageSize, currentPage, basePath }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const windowSize = 3;

  let startPage = currentPage;
  if (startPage > totalPages - windowSize + 1) {
    startPage = totalPages - windowSize + 1;
  }
  if (startPage < 1) startPage = 1;

  const pages = Array.from({ length: windowSize }, (_, i) => startPage + i).filter(
    (p) => p >= 1 && p <= totalPages
  );

  return (
    <nav className="flex items-center justify-center space-x-2 mt-8">
      <Button
        size="sm"
        className="bg-[#0A0043] hover:bg-[#0A0043]/90 text-white dark:bg-[#FFEBD8] dark:text-[#0A0043] dark:hover:bg-[#FFEBD8]/90"
        disabled={currentPage <= 1}
        asChild
      >
        <Link href={`${basePath}?page=${currentPage - 1}`}>
          <ChevronLeft className="inline h-4 w-4 align-text-bottom mr-1" />
          Previous
        </Link>
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          size="sm"
          variant={page === currentPage ? 'default' : 'ghost'}
          className={
            page === currentPage
              ? 'bg-white text-[#0A0043] border border-[#0A0043] dark:bg-[#0A0043] dark:text-[#FFEBD8] dark:border-[#FFEBD8]'
              : 'text-[#0A0043] hover:bg-[#0A0043]/10 dark:text-[#FFEBD8] dark:hover:bg-[#FFEBD8]/10'
          }
          asChild
        >
          <Link href={`${basePath}?page=${page}`}>{page}</Link>
        </Button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <span className="px-2 text-[#0A0043] dark:text-[#FFEBD8] select-none">…</span>
      )}

      <Button
        size="sm"
        className="bg-[#0A0043] hover:bg-[#0A0043]/90 text-white dark:bg-[#FFEBD8] dark:text-[#0A0043] dark:hover:bg-[#FFEBD8]/90"
        disabled={currentPage >= totalPages}
        asChild
      >
        <Link href={`${basePath}?page=${currentPage + 1}`}>
          Next
          <ChevronRight className="inline h-4 w-4 align-text-bottom ml-1" />
        </Link>
      </Button>
    </nav>
  );
}