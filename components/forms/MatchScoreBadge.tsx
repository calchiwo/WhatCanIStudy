import { Badge } from '@/components/ui/badge';

interface MatchScoreBadgeProps {
  score: number; // 0-100
  confidenceLevel: 'high' | 'medium' | 'low';
}

export function MatchScoreBadge({ score, confidenceLevel }: MatchScoreBadgeProps) {
  // Determine color based on score and confidence
  let bgColor = 'bg-red-100 text-red-800';
  let statusLabel = 'Not Eligible';
  let ariaLabel = `${score}% match score`;

  if (score >= 100) {
    bgColor = 'bg-green-100 text-green-800';
    statusLabel = `Eligible (${score}%)`;
    ariaLabel = `Eligible, 100% match score`;
  } else if (score >= 75) {
    bgColor = 'bg-amber-100 text-amber-800';
    statusLabel = `Close Match (${score}%)`;
    ariaLabel = `Close match, ${score}% match score`;
  } else {
    statusLabel = `${score}% Match`;
    ariaLabel = `${score}% match score`;
  }

  return (
    <div className="flex items-center gap-2">
      <Badge className={`${bgColor} border-0`} aria-label={ariaLabel}>
        {statusLabel}
      </Badge>
      <span className="text-xs text-muted-foreground">
        Confidence: {confidenceLevel}
      </span>
    </div>
  );
}
