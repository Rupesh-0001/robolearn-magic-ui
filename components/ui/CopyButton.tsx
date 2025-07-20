'use client';
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CopyButton({ text, className = '', size = 'md' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 sm:gap-2 ${sizeClasses[size]} font-medium rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer ${
          copied
            ? 'bg-green-100 text-green-700 border border-green-200 cursor-default'
            : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 cursor-pointer'
        } ${className}`}
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className={iconSizes[size]} />
        ) : (
          <>
            <Copy className={iconSizes[size]} />
            <span className="hidden sm:inline">Copy</span>
          </>
        )}
      </button>
      {copied && (
        <span className="text-green-600 text-xs font-medium animate-pulse">
          Copied!
        </span>
      )}
    </div>
  );
} 