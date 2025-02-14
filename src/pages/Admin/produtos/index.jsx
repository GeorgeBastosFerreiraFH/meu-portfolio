import Layout from "../../../components/Admin/Layout";
import ProdutoList from "../../../components/Admin/ProdutoList";
import { Toaster } from "../../../components/ui/toaster";

export default function ProdutosPage() {
  return (
    <Layout>
      <ProdutoList />
      <Toaster />
    </Layout>
  );
}
