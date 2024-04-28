import Image from 'next/image';

export default function NotFound() {
    return (
        <div className="flex justify-center items-center w-5/6 mx-auto p-4">
            <Image       
            width={360}
            height={360}
            src="/image-not-found.png"
            alt="image not found"
            />
        </div>
    );
  };