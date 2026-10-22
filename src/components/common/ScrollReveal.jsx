import useScrollReveal from "../../hooks/useScrollReveal";

export default function ScrollReveal({
  as: Component = "div",
  children,
  className = "",
  delay = 0,
  variant = "up",
  ...props
}) {
  const { elementRef, isVisible } = useScrollReveal();
  const classes = [
    "scroll-reveal",
    `scroll-reveal--${variant}`,
    isVisible ? "is-visible" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <Component
      {...props}
      ref={elementRef}
      className={classes}
      style={{
        ...props.style,
        "--reveal-delay": `${delay}ms`,
      }}
    >
      {children}
    </Component>
  );
}
