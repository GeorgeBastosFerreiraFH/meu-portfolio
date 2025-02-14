import { useParams } from "react-router-dom";
import Layout from "../../../../components/Admin/Layout";
import CategoriaForm from "../../../../components/Admin/CategoriaForm";
import { Toaster } from "../../../../components/ui/toaster";

function MyComponent() {
  const { id } = useParams();

  return (
    <Layout>
      <div>{id && <CategoriaForm id={id} />}</div>
      <Toaster />
    </Layout>
  );
}

export default MyComponent;
