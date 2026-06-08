'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  /** 'words' splits by word, 'chars' by character */
  splitBy?: 'words' | 'chars';
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  once = true,
  splitBy = 'words',
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  const tokens = splitBy === 'chars' ? text.split('') : text.split(' ');

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} aria-label={text}>
      <div className="flex flex-wrap">
        {tokens.map((token, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              className="inline-block"
              style={{ whiteSpace: splitBy === 'words' ? 'pre' : 'normal' }}
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: delay + i * (splitBy === 'chars' ? 0.03 : 0.07),
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {token}
              {splitBy === 'words' && i < tokens.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}
