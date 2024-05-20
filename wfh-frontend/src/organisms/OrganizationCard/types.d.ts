type OrgCardProps = {
  id: string;
  org_name: string,
  name: string;
  maxWfhDays: number;
  showPopup: (org_name: string) => void;
  toggleDelete: () => void;
};
