import Image from "next/image"

function Footer() {
  return (
    <footer className="py-2 flex flex-col items-center justify-center">
      <h4 className="mb-1 font-semibold text-[#62A388]">For a better you :)</h4>
      <h4 className="flex font-bold text-red-400">Start Creating, Join BlogSpace Now <Image src="https://em-content.zobj.net/source/apple/354/hundred-points_1f4af.png" className="ml-1" width={25} height={15} alt="posted-img"/></h4>
    </footer>
  );
}

export default Footer;
