'use client';

/**
 * Scroll to Top 버튼 (Client Component)
 */
export function ScrollToTopButton({ className }: { className?: string }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={scrollToTop} className={className}>
      Portfolio
    </button>
  );
}
