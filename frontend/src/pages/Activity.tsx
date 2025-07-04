import React, { useState } from "react";

interface ActivityPost {
  id: string;
  activityType: string;
  activityDuration: number;
  activityIntensity: string;
  activityDate: string;
  activityNote?: string;
}

const Activity: React.FC = () => {
  const [activity, setActivity] = useState<{
    id: string;
    activityType: string;
    activityDuration: number;
    activityIntensity: string;
    activityDate: string;
    activityNote?: string;
  } | null>(null);

  return (
    <>
      <h1>Activity</h1>;
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
        blanditiis. Tempora nisi distinctio omnis architecto sit modi, rem
        perspiciatis deleniti, numquam perferendis aliquid ab, deserunt ex
        laboriosam culpa dolorum eveniet?
      </p>
    </>
  );
};

export default Activity;
