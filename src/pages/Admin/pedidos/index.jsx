import Layout from "../../../components/Admin/Layout";
import PedidoList from "../../../components/Admin/PedidoList";
import { Toaster } from "../../../components/ui/toaster";

export default function PedidosPage() {
  return (
    <Layout>
      <PedidoList />
      <Toaster />
    </Layout>
  );
}
