import Image from "next/image";

type LogoProps = {
  className?: string;
  /**
   * Kept for backwards compatibility with existing call sites. The real
   * logo asset is a single flat badge (including the "Marjani Global
   * Services" plaque), so both variants render the same image.
   */
  variant?: "full" | "mark";
  title?: string;
};

/**
 * Renders the official Marjani Vending badge (public/images/logo-mark.png).
 * Sized entirely through the incoming className (pass explicit height and
 * width utilities) — the image itself stays undistorted via object-contain.
 */
export default function Logo({ className, title = "Marjani Vending" }: LogoProps) {
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <Image
        src="/images/logo-mark.png"
        alt={title}
        fill
        unoptimized
        className="object-contain"
      />
    </span>
  );
}
