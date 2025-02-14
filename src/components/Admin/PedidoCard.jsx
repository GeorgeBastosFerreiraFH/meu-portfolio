import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
  Package,
  Clock,
  CreditCard,
  MapPin,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useToast } from "../ui/use-toast";

const statusColors = {
  pendente: "bg-yellow-100 text-yellow-800",
  "em andamento": "bg-blue-100 text-blue-800",
  "saiu para entrega": "bg-purple-100 text-purple-800",
  concluído: "bg-green-100 text-green-800",
  cancelado: "bg-red-100 text-red-800",
};

const PedidoCard = ({ pedido, onStatusChange }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pendente":
        return <Clock className="w-5 h-5" />;
      case "em andamento":
        return <Package className="w-5 h-5" />;
      case "saiu para entrega":
        return <MapPin className="w-5 h-5" />;
      case "concluído":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelado":
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const handleStatusChange = async (e) => {
    const novoStatus = e.target.value;
    try {
      await onStatusChange(pedido._id, novoStatus);
      setIsOpen(false); // Fechar o diálogo após a atualização
      toast({
        title: "Status atualizado",
        description: `Status do pedido de ${pedido.cliente.nome} atualizado com sucesso.`,
        className: "bg-green-500 text-white border-none",
      });
    } catch (erro) {
      toast({
        title: "Erro ao atualizar status",
        description: `Erro ao atualizar o status do pedido de ${pedido.cliente.nome}.`,
        variant: "destructive",
        className: "bg-red-500 text-white border-none",
      });
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{pedido.cliente.nome}</h3>
            <p className="text-sm text-gray-600">{pedido.cliente.telefone}</p>
          </div>
          <div
            className={`px-3 py-1 rounded-full flex items-center gap-2 ${
              statusColors[pedido.status]
            }`}
          >
            {getStatusIcon(pedido.status)}
            <span className="capitalize">{pedido.status}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{pedido.formaPagamento}</span>
          </div>
          <p className="font-medium">
            Total:{" "}
            {pedido.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Informações do Cliente</h4>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Nome:</span>{" "}
                    {pedido.cliente.nome}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {pedido.cliente.email}
                  </p>
                  <p>
                    <span className="font-medium">WhatsApp:</span>{" "}
                    {pedido.cliente.whatsapp}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Endereço de Entrega</h4>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">CEP:</span>{" "}
                    {pedido.cliente.endereco.cep}
                  </p>
                  <p>
                    <span className="font-medium">Rua:</span>{" "}
                    {pedido.cliente.endereco.rua}
                  </p>
                  <p>
                    <span className="font-medium">Número:</span>{" "}
                    {pedido.cliente.endereco.numero}
                  </p>
                  <p>
                    <span className="font-medium">Complemento:</span>{" "}
                    {pedido.cliente.endereco.complemento}
                  </p>
                  <p>
                    <span className="font-medium">Bairro:</span>{" "}
                    {pedido.cliente.endereco.bairro}
                  </p>
                  <p></p>
                  <p>
                    <span className="font-medium">Total:</span>{" "}
                    {pedido.total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Itens do Pedido</h4>
              <div className="space-y-2">
                {pedido.itens.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded"
                  >
                    <div>
                      <p className="font-medium">{item.nome}</p>
                      <p className="text-sm text-gray-600">
                        {item.observacoes}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>{item.quantidade}x</p>
                      <p className="font-medium">
                        {(item.preco * item.quantidade).toLocaleString(
                          "pt-BR",
                          {
                            style: "currency",
                            currency: "BRL",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Status do Pedido</h4>
              <select
                value={pedido.status}
                onChange={handleStatusChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em Andamento</option>
                <option value="saiu para entrega">Saiu para Entrega</option>
                <option value="concluído">Concluído</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PedidoCard;
