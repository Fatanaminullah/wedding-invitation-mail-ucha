"use client";

import { fadeInUp, slideInUp, zoomInSm } from "@/lib/keyframes";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Reveal, RevealProps } from "react-awesome-reveal";

type Props = RevealProps & React.HTMLAttributes<HTMLDivElement>;

const Anim = ({
  delay = 0,
  cascade = true,
  keyframes = fadeInUp,
  fraction = 0.5,
  damping = 0.1,
  triggerOnce = true,
  childClassName,
  childStyle,
  className,
  children,
  ...props
}: Props) => {
  const [isClient, setIsClient] = useState<boolean>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderReveal = (additionalClassName = "") => (
    <Reveal
      keyframes={keyframes}
      delay={delay}
      cascade={cascade}
      damping={damping}
      triggerOnce={triggerOnce}
      fraction={fraction}
      childClassName={childClassName}
      childStyle={childStyle}
      className={cn(additionalClassName, className)}
    >
      {children}
    </Reveal>
  );

  return (
    <>
      {isClient ? (
        <>
          {keyframes === slideInUp ? (
            <div className={cn("overflow-hidden", className)} {...props}>
              {renderReveal()}
            </div>
          ) : keyframes === zoomInSm ? (
            renderReveal("!ease-in-out-quart")
          ) : (
            renderReveal()
          )}
        </>
      ) : (
        <div {...props} className={cn(``, className)}>
          {children}
        </div>
      )}
    </>
  );
};

export default Anim;
