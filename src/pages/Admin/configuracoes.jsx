import Layout from "../../components/Admin/Layout";
import ConfiguracoesForm from "../../components/Admin/ConfiguracoesForm";
import { Toaster } from "../../components/ui/toaster";

export default function ConfiguracoesPage() {
  return (
    <Layout>
      <ConfiguracoesForm />
      <Toaster />
    </Layout>
  );
}
