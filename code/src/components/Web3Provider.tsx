'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// 完全禁用 SSR，避免 Node.js 环境下的模块兼容问题
const Web3ProviderInner = dynamic(
  () => import('./Web3ProviderInner'),
  { ssr: false }
);

export default function Web3Provider({ children }: { children: ReactNode }) {
  return <Web3ProviderInner>{children}</Web3ProviderInner>;
}
