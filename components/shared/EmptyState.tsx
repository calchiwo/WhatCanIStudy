import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export function EmptyState({
  icon,
  title,
  description,
  ctaText,
  ctaHref,
  onCtaClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-6 text-center">
      {icon && (
        <div className="mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {ctaText && (
        <>
          {ctaHref ? (
            <Link href={ctaHref}>
              <Button>{ctaText}</Button>
            </Link>
          ) : (
            <Button onClick={onCtaClick}>{ctaText}</Button>
          )}
        </>
      )}
    </div>
  );
}
