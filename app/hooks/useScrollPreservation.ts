import { useRef, useLayoutEffect } from "react";

export function useScrollPreservation(currentPage: number, autoScroll: boolean, resultsRef: React.RefObject<HTMLDivElement | null>) {
  const prevScrollHeight = useRef(0);
  const prevScrollPos = useRef(0);

  useLayoutEffect(() => {
    if (!autoScroll && prevScrollHeight.current > 0) {
      const newScrollHeight = document.documentElement.scrollHeight;
      const heightDifference = newScrollHeight - prevScrollHeight.current;
      
      if (heightDifference !== 0) {
        window.scrollTo({ 
          top: prevScrollPos.current + heightDifference, 
          behavior: 'instant' 
        });
      }
      prevScrollHeight.current = 0;
    }
  }, [currentPage, autoScroll]);

  const prepareScroll = () => {
    if (!autoScroll) {
      prevScrollHeight.current = document.documentElement.scrollHeight;
      prevScrollPos.current = window.scrollY;
    }
  };

  const scrollToResults = () => {
    if (autoScroll && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { prepareScroll, scrollToResults };
}
