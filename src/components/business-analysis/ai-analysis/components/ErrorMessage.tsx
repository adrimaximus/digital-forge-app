
import React from 'react';
import { RefreshCcw } from 'lucide-react';

interface ErrorMessageProps {
  errorMessage: string;
  isVisible?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage, isVisible = true }) => {
  if (!isVisible) return null;
  
  return (
    <div className="mt-2 flex items-center text-amber-500 text-sm">
      <RefreshCcw className="h-4 w-4 mr-1" />
      <span>{errorMessage || "Terjadi kesalahan. Silakan coba lagi dengan mengklik tombol \"Coba Lagi\"."}</span>
    </div>
  );
};

export default ErrorMessage;
