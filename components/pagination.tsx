'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  total: number;       // total number of items
  pageSize: number;    // items per page (6)
  currentPage: number; // 1-based
  basePath: string;    // e.g. `/categories/${slug}`
}

export function Pagination({
  total,
  pageSize,
  currentPage,
  basePath,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8">
      <Button className="bg-[#0a0043] dark:bg-[#ffebd8]"
        size="sm"
        disabled={currentPage <= 1}
        asChild
      >
        <Link href={`${basePath}?page=${currentPage - 1}`}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Prev
        </Link>
      </Button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <Button
            key={page}
            size="sm"
            variant={page === currentPage ? 'default' : 'ghost'}
            asChild
          >
            <Link href={`${basePath}?page=${page}`}>{page}</Link>
          </Button>
        );
      })}

      <Button className="bg-[#0a0043] dark:bg-[#ffebd8]"
        size="sm"
        disabled={currentPage >= totalPages}
        asChild
      >
        <Link href={`${basePath}?page=${currentPage + 1}`}>
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </nav>
  );
}
