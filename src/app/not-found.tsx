import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-xl">
      <h2>Not Found</h2>
      <p>Sorry, the page you are lookingfor does not exist.</p>
      <Link href="/" className="underline text-red-700">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
