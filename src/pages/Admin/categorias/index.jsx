import Layout from "../../../components/Admin/Layout";
import CategoriaList from "../../../components/Admin/CategoriaList";
import { Toaster } from "../../../components/ui/toaster";

export default function CategoriasPage() {
  return (
    <Layout>
      <CategoriaList />
      <Toaster />
    </Layout>
  );
}
