"use client";

import { FC, useOptimistic, startTransition } from 'react';
import { Switch } from "@/components/ui/switch";
import updateActiveEvent from "@/actions/events/toggle_status";
import { toast } from "sonner";

type Props = {
  id: string;
  currentStatus: boolean;
};

const ToggleActive: FC<Props> = ({ id, currentStatus }) => {

  const [ optimisticStatus, addOptimisticStatus ] = useOptimistic(
    currentStatus,
    (currentState) => !currentState
  );

  const onSwitchChange = async () => {
    startTransition(async () => {

      addOptimisticStatus(currentStatus);

      const response = await updateActiveEvent(id, !currentStatus);

      if (!response.ok) {
        toast.error(response.message, {
          duration: 3000,
          position: "top-right",
          className: "bg-red-500 text-white",
        });
      }
  
      if (response.ok) {
        toast.success(response.message, {
          duration: 3000,
          position: "top-right",
          className: "bg-green-500 text-white",
        });
      }
    });
  };

  return (
    <Switch
      key={id}
      checked={optimisticStatus}
      onCheckedChange={onSwitchChange}
    />
  );

};

export default ToggleActive;
