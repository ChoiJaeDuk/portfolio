/**
 * 헬스 체크 API
 *
 * 배포 후 서버가 살아있는지, 어떤 데이터 소스를 쓰는지 확인용.
 * GET /api/health
 */
import { NextResponse } from 'next/server';
import { isDbEnabled } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    dataSource: isDbEnabled() ? 'db' : 'seed',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}
