import React from "react";
import { Heading } from "components/Heading/Heading";
import { RiEmotionSadLine } from "react-icons/ri";

export default function NotFoundPage() {
  return (
    <div className="container-body ">
      <div className="text-center text-gray-400 mb-6">
        <RiEmotionSadLine size="96" />
      </div>
      <Heading title="Not found 404" align="center" />
    </div>
  );
}
