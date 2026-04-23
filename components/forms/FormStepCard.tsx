import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface FormStepCardProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormStepCard({
  stepNumber,
  totalSteps,
  title,
  description,
  children,
}: FormStepCardProps) {
  const progressPercent = (stepNumber / totalSteps) * 100;

  return (
    <Card className="w-full">
      <div className="p-6 space-y-6">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              {title}
            </h2>
            <span className="text-sm font-medium text-muted-foreground">
              Step {stepNumber} of {totalSteps}
            </span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </Card>
  );
}
