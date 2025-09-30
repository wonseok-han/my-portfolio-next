import { cn } from './utils';

/**
 * 스켈레톤 컴포넌트
 * 로딩 상태를 표시하기 위한 플레이스홀더
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
