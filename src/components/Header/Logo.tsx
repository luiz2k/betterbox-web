import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src={"/logo.png"}
        width={50}
        height={46.88}
        priority
        alt={"Logo"}
        className="w-12"
      />
    </Link>
  );
};

export default Logo;
