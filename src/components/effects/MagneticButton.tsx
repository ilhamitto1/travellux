import { ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';

interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, onClick, className = '', strength = 0.35 }: MagneticButtonProps) {
  const ref = useMagnetic(strength);

  return (
    <button ref={ref} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
