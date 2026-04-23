import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DataWarningProps {
  variant?: 'default' | 'info' | 'warning';
  title?: string;
  message: string;
}

export function DataWarning({
  variant = 'warning',
  title = 'Sample Data',
  message,
}: DataWarningProps) {
  const getBgColor = () => {
    switch (variant) {
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'warning':
        return 'text-amber-900';
      case 'info':
        return 'text-blue-900';
      default:
        return 'text-yellow-900';
    }
  };

  return (
    <Alert className={`${getBgColor()}`}>
      <AlertTriangle className={`h-4 w-4 ${getTextColor()}`} />
      <AlertDescription className={getTextColor()}>
        <strong>{title}:</strong> {message}
      </AlertDescription>
    </Alert>
  );
}
