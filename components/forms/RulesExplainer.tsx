import { CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Rule {
  rule: string;
  status: 'pass' | 'fail';
  reason: string;
}

interface RulesExplainerProps {
  rules: Rule[];
  title?: string;
}

export function RulesExplainer({ rules, title = 'Eligibility Breakdown' }: RulesExplainerProps) {
  const passedRules = rules.filter((r) => r.status === 'pass');
  const failedRules = rules.filter((r) => r.status === 'fail');

  return (
    <Card className="p-6 space-y-6">
      <h3 className="text-lg font-bold text-foreground">{title}</h3>

      {/* Passed rules */}
      {passedRules.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-green-700 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Requirements Met ({passedRules.length})
          </h4>
          <ul className="space-y-2">
            {passedRules.map((rule, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{rule.rule}</p>
                  <p className="text-xs text-muted-foreground">{rule.reason}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Failed rules */}
      {failedRules.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-red-700 flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Requirements Not Met ({failedRules.length})
          </h4>
          <ul className="space-y-2">
            {failedRules.map((rule, idx) => (
              <li key={idx} className="flex gap-3 text-sm">
                <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">{rule.rule}</p>
                  <p className="text-xs text-muted-foreground">{rule.reason}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
