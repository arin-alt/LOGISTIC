type HeaderProps = {
  name: string;
  subtitle?: string; // Optional subtitle for additional context
  align?: "left" | "center" | "right"; // Alignment for the header text
};

const Header = ({ name, subtitle, align = "left" }: HeaderProps) => {
  return (
    <div className={`text-${align} mb-4`}>
      <h1 className="text-2xl font-semibold text-gray-700">{name}</h1>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Header;
