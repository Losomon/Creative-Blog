"use client";

import { useEffect, useState } from "react";
import { TYPING_WORDS } from "@/lib/data";

export function useTypingEffect(delayMs = 1000) {
  const [text, setText] = useState<string>(TYPING_WORDS[0]);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentWord = TYPING_WORDS[wordIndex];

      if (isDeleting) {
        setText(currentWord.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % TYPING_WORDS.length;
          timer = setTimeout(tick, 800);
          return;
        }
        timer = setTimeout(tick, 40);
      } else {
        setText(currentWord.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentWord.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2000);
          return;
        }
        timer = setTimeout(tick, 80);
      }
    };

    timer = setTimeout(tick, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return text;
}
