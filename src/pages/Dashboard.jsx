import { useAppContext } from "../context/AppContext";
import { DashboardContainer } from "../components/dashboard/DashboardContainer";

export default function Dashboard() {
  const { transactions } = useAppContext();
  return <DashboardContainer transactions={transactions} />;
}
