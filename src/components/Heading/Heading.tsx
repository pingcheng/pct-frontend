export type HeadingProps = {
  title: string;
  subTitle?: string;
  align?: "left" | "right" | "center";
  className?: string;
};

/**
 * Heading component.
 */
export function Heading({
  title,
  subTitle,
  align = "left",
  className,
}: HeadingProps): JSX.Element {
  return (
    <div>
      <h1
        className={`mb-8 ${className ?? ""}`}
        style={{
          textAlign: align,
        }}
        role="heading"
      >
        <div>{title}</div>
        {subTitle && <div className="text-sm text-gray-500">{subTitle}</div>}
      </h1>
    </div>
  );
}
