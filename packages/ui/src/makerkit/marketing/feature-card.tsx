import React from 'react';

import { cn } from '../../lib/utils';
import { CardDescription, CardHeader, CardTitle } from '../../shadcn/card';

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  description: string;
  icon?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  className,
  label,
  description,
  icon,
  ...props
}) => {
  return (
    <div className={cn('p-4', className)} {...props}>
      <CardHeader>
        {icon && (
          <div className="bg-mti-foreground mb-4 flex h-24 w-24 items-center justify-center rounded-full">
            <div className="text-white">{icon}</div>
          </div>
        )}

        <CardTitle className="text-2xl font-medium">{label}</CardTitle>
        <div className="bg-mti-orange h-1 w-10" />

        <CardDescription className="text-muted-foreground max-w-xs text-sm font-normal">
          {description}
        </CardDescription>
      </CardHeader>
    </div>
  );
};
