import React from "react";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

const View = async ({ id }: { id: string }) => {
  console.log("Fetching views for ID:", id);

  try {
    const { views: totalViews } = await client
      .withConfig({ useCdn: false })
      .fetch(STARTUP_VIEWS_QUERY, { id });

    // Modify number of views when post is seen

    return (
      <div className="view_container">
        <div className="absolute -top-2 -right-2">
          <Ping />
        </div>
        <p className="view-text">
          <span className="font-black">{totalViews} views</span>
        </p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching views:", error);
    return <p>Error loading views</p>;
  }
};

export default View;
