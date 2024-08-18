import NextLink from 'next/link';

import { HTMLAttributes } from 'react';

type LinkProps = HTMLAttributes<Element> & {
  to: string;
  target?: string;
};

export default function Link({
  children,
  className,
  to,
  target = '_self',
}: LinkProps) {
  return (
    <NextLink href={to} legacyBehavior>
      <a href={to} className={className} target={target}>
        {children}
      </a>
    </NextLink>
  );
}
