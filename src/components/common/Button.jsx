import { Link } from "react-router-dom";

export default function Button({ children, ...props }) {
  const isInternalLink =
    typeof props.href === "string" &&
    props.href.startsWith("/");

  if (isInternalLink) {
    const { href, ...linkProps } = props;
    return (
      <Link
        className="button button-primary"
        to={href}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <a className="button button-primary" {...props}>
      {children}
    </a>
  );
}
