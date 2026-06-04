import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-8">
      <div className="flex items-center justify-center w-32 h-32 rounded-full bg-green-500 border shadow-xs">
        <Image
          width={43}
          height={42}
          src="/hollow_leaves_icon.svg"
          alt="hl_icon"
        />
      </div>

      <h1 className="text-head-01">Step Back</h1>
      <p className="text-body-01">정서적 쉼터로의 한 걸음</p>
    </div>
  );
}
