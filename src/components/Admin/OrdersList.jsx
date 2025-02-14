import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const OrdersList = ({ limit }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/pedidos?limite=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data.pedidos);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [limit, token]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pendente: { label: "Pendente", className: "bg-yellow-500" },
      "em andamento": { label: "Preparando", className: "bg-blue-500" },
      "saiu para entrega": { label: "Entregando", className: "bg-purple-500" },
      concluído: { label: "Entregue", className: "bg-green-500" },
      cancelado: { label: "Cancelado", className: "bg-red-500" },
    };

    const config = statusConfig[status] || statusConfig.pendente;

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      pix: "PIX",
      cartao: "Cartão",
      dinheiro: "Dinheiro",
    };
    return methods[method] || method;
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pedido</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Pagamento</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell>#{order._id.slice(-6)}</TableCell>
            <TableCell>{order.cliente.nome}</TableCell>
            <TableCell>{getStatusBadge(order.status)}</TableCell>
            <TableCell>{getPaymentMethodLabel(order.formaPagamento)}</TableCell>
            <TableCell>
              {order.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell>
              {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", {
                locale: ptBR,
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersList;
