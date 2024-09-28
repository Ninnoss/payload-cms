export const handleIsActive = ({ data, operation }: HandleIsActiveParams) => {
  if (data?.applicationDeadline) {
    const deadlineDate = new Date(data?.applicationDeadline);
    const currentDate = new Date();

    if (deadlineDate < currentDate) {
      data.isActive = false;
    } else {
      // if we set the deadline in the future, make the job listing active
      data.isActive = true;
    }
  }

  // For all operations, we return the modified data
  return data;
};

interface HandleIsActiveParams {
  data: {
    applicationDeadline?: string | Date;
    isActive?: boolean;
    [key: string]: any;
  };
  operation: "create" | "update" | "read";
}
