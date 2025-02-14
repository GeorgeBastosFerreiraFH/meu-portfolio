import Layout from "../../../components/Admin/Layout";
import CategoriaForm from "../../../components/Admin/CategoriaForm";
import { Toaster } from "../../../components/ui/toaster";

export default function AdicionarCategoriaPage() {
  return (
    <Layout>
      <CategoriaForm />
      <Toaster />
    </Layout>
  );
}
