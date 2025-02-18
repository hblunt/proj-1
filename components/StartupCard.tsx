import React from "react";
import { formatDate } from "@/lib/utils";

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(post._createdAt)}</p>
      </div>
    </li>
  );
};

export default StartupCard;
