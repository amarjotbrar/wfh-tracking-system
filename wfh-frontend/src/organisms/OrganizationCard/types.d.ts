type OrgCardProps = {
  id: string;
  org_name: string,
  name: string;
  maxWfhDays: number;
  changeShowUsers: (org_name: string) => void;
  toastnotification: (message: string, type: boolean) => void;
};
