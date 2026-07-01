import React from 'react';

const LetterReveal = ({ 
  active, 
  lines, 
  letterDelay = 0.08, 
  className = "", 
  duration = 1200 // new prop: duration in ms 
}) => {
  const letters = [];
  lines.forEach((line, lineIdx) => {
    const words = line.split(' ');
    words.forEach((word, wordIdx) => {
      for (let i = 0; i < word.length; i++) {
        letters.push({
          char: word[i],
          line: lineIdx,
          word: wordIdx,
          pos: letters.length,
        });
      }
      if (wordIdx < words.length - 1) {
        letters.push({
          char: ' ',
          line: lineIdx,
          word: wordIdx,
          pos: letters.length,
          isSpace: true,
        });
      }
    });
  });

  return (
    <span className={`inline-block ${className}`}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block whitespace-nowrap md:whitespace-nowrap">
          {line.split(' ').map((word, wordIdx) => (
            <React.Fragment key={wordIdx}>
              {word.split('').map((char, charIdx) => {
                const globalIndex = letters.findIndex(
                  (l) =>
                    l.line === lineIdx &&
                    l.word === wordIdx &&
                    l.char === char &&
                    !l.isSpace
                );
                const delay = active ? `${globalIndex * letterDelay}s` : '0s';
                return (
                  <span
                    key={charIdx}
                    className="inline-block transition-all ease-out"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? 'translateY(0)' : 'translateY(40px)',
                      transitionDelay: delay,
                      transitionDuration: `${duration}ms`,
                    }}
                  >
                    {char}
                  </span>
                );
              })}
              {wordIdx < line.split(' ').length - 1 && (
                <span className="whitespace-pre"> </span>
              )}
            </React.Fragment>
          ))}
        </span>
      ))}
    </span>
  );
};

export default LetterReveal;