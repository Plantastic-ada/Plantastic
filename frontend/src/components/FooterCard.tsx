import { Link } from "react-router-dom";

type FooterLinkProps = {
    text: string;
    linkText: string;
    to: string;
}

export default function FooterLink({ text, linkText, to }: FooterLinkProps) {
  return (
    <div className="text-sm font-medium mt-2 text-gray-500 text-center">
      <p>
        {text}{" "}
        <Link to={to} className="text-blue-600 hover:underline">
          {linkText}
        </Link>
      </p>
    </div>
  );
}