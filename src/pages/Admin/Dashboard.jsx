import Layout from "../../components/Admin/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";
import { Card } from "../../components/ui/card";
import CashFlowChart from "../../components/Admin/CashFlowChart";
import PaymentMethodsChart from "../../components/Admin/PaymentMethodsChart";
import OrdersList from "../../components/Admin/OrdersList";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { token } = useAuth();
  const [cashFlowData, setCashFlowData] = useState({
    labels: [],
    total: [],
    pix: [],
    cartao: [],
    dinheiro: [],
  });
  const [paymentMethodsData, setPaymentMethodsData] = useState({
    pix: 0,
    cartao: 0,
    dinheiro: 0,
  });
  const [summaryData, setSummaryData] = useState({
    salesToday: 0,
    ordersToday: 0,
    averageTicket: 0,
    activeProducts: 0,
  });
  const [carregando, setcarregando] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ordersResponse = await axios.get(
          "http://localhost:5000/api/pedidos",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const orders = ordersResponse.data.pedidos;

        let activeProducts = 0;
        let pagina = 1;
        let totalPaginas = 1;

        while (pagina <= totalPaginas) {
          const productsResponse = await axios.get(
            `http://localhost:5000/api/produtos/?pagina=${pagina}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const { produtos, totalPaginas: total } = productsResponse.data;
          totalPaginas = total;

          activeProducts += produtos.filter(
            (product) => product.disponivel
          ).length;
          pagina++;
        }

        const processedData = processOrders(orders, activeProducts);
        setCashFlowData(processedData.cashFlowData);
        setPaymentMethodsData(processedData.paymentMethodsData);
        setSummaryData(processedData.summaryData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setcarregando(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  const processOrders = (orders, activeProducts) => {
    const today = new Date().toDateString();
    const last7Days = [...Array(7)]
      .map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toISOString().split("T")[0];
      })
      .reverse();

    const cashFlowData = {
      labels: last7Days,
      total: Array(7).fill(0),
      pix: Array(7).fill(0),
      cartao: Array(7).fill(0),
      dinheiro: Array(7).fill(0),
    };

    const paymentMethodsData = {
      pix: 0,
      cartao: 0,
      dinheiro: 0,
    };

    let salesToday = 0;
    let ordersToday = 0;
    let totalSales = 0;

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      const dayIndex = last7Days.indexOf(orderDate);

      if (dayIndex !== -1) {
        cashFlowData.total[dayIndex] += order.total;
        if (cashFlowData[order.formaPagamento]) {
          cashFlowData[order.formaPagamento][dayIndex] += order.total;
        }
      }

      if (paymentMethodsData[order.formaPagamento] !== undefined) {
        paymentMethodsData[order.formaPagamento] += order.total;
      }
      totalSales += order.total;

      if (new Date(order.createdAt).toDateString() === today) {
        salesToday += order.total;
        ordersToday++;
      }
    });

    const summaryData = {
      salesToday,
      ordersToday,
      averageTicket: totalSales / orders.length || 0,
      activeProducts,
    };

    return { cashFlowData, paymentMethodsData, summaryData };
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Bem-vindo ao painel administrativo do seu cardápio digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Vendas Hoje</h3>
            <p className="mt-2 text-3xl font-semibold">
              {summaryData.salesToday.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Pedidos Hoje</h3>
            <p className="mt-2 text-3xl font-semibold">
              {summaryData.ordersToday}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Ticket Médio</h3>
            <p className="mt-2 text-3xl font-semibold">
              {summaryData.averageTicket.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium text-gray-500">
              Produtos Ativos
            </h3>
            <p className="mt-2 text-3xl font-semibold">
              {summaryData.activeProducts}
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-4">
            <CashFlowChart data={cashFlowData} />
          </Card>
          <Card className="p-4">
            <PaymentMethodsChart data={paymentMethodsData} />
          </Card>
        </div>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Pedidos Recentes</h2>
          <OrdersList limit={5} />
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
