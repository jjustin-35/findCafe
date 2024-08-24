'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h1 className="fs-1 fw-bold mb-3">404 - 頁面未找到</h1>
      <p className="fs-1-25 mb-4">抱歉，您所尋找的頁面不存在。</p>
      <Link href="/" className="btn btn-primary fs-1-25">
        返回首頁
      </Link>
    </div>
  );
}
