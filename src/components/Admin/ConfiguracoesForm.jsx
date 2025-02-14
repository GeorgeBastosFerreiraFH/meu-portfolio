"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "../ui/use-toast";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Clock, Save, RefreshCw } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Ajuste para sua URL base da API

const diasDaSemana = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const ConfiguracoesForm = () => {
  const { toast } = useToast();
  const [horarios, setHorarios] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const carregarConfiguracoes = useCallback(async () => {
    try {
      setCarregando(true);
      const resposta = await axios.get(`${API_URL}/configuracoes`);
      console.log("Dados recebidos:", resposta.data); // Debug

      if (resposta.data && resposta.data.horarios) {
        setHorarios(resposta.data.horarios);
      } else {
        // Criar horários padrão se não existirem
        const horariosIniciais = diasDaSemana.reduce((acc, dia) => {
          acc[dia] = {
            abertura: "08:00",
            fechamento: "22:00",
            aberto: true,
          };
          return acc;
        }, {});
        setHorarios(horariosIniciais);
      }
    } catch (erro) {
      console.error("Erro ao carregar:", erro); // Debug
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar as configurações.",
        variant: "destructive",
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      setCarregando(false);
    }
  }, [toast]);

  useEffect(() => {
    carregarConfiguracoes();
  }, [carregarConfiguracoes]);

  const handleChange = (dia, campo, valor) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [campo]: valor,
      },
    }));
  };

  const aplicarHorarioParaTodos = (diaReferencia) => {
    const novoHorario = horarios[diaReferencia];
    const novosHorarios = {};

    diasDaSemana.forEach((dia) => {
      novosHorarios[dia] = { ...novoHorario };
    });

    setHorarios(novosHorarios);

    toast({
      title: "Horários aplicados",
      description: "Os horários foram copiados para todos os dias.",
      className: "bg-green-500 text-white border-none",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSalvando(true);
      console.log("Enviando dados:", { horarios }); // Debug

      const resposta = await axios.put(`${API_URL}/configuracoes`, {
        horarios,
      });
      console.log("Resposta do servidor:", resposta.data); // Debug

      toast({
        title: "Configurações salvas",
        description: "As alterações foram salvas com sucesso!",
        className: "bg-green-500 text-white border-none",
      });
    } catch (erro) {
      console.error("Erro ao salvar:", erro); // Debug
      toast({
        title: "Erro ao salvar",
        description:
          erro.response?.data?.erro ||
          "Não foi possível salvar as configurações.",
        variant: "destructive",
        className: "bg-red-500 text-white border-none",
      });
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Horários de Funcionamento</h1>
        <Button
          onClick={carregarConfiguracoes}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Atualizar
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diasDaSemana.map((dia) => (
            <Card key={dia} className="p-4 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{dia}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {horarios[dia]?.aberto ? "Aberto" : "Fechado"}
                  </span>
                  <Switch
                    checked={horarios[dia]?.aberto}
                    onCheckedChange={(checked) =>
                      handleChange(dia, "aberto", checked)
                    }
                  />
                </div>
              </div>

              {horarios[dia]?.aberto && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Abertura
                    </label>
                    <input
                      type="time"
                      value={horarios[dia]?.abertura}
                      onChange={(e) =>
                        handleChange(dia, "abertura", e.target.value)
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Fechamento
                    </label>
                    <input
                      type="time"
                      value={horarios[dia]?.fechamento}
                      onChange={(e) =>
                        handleChange(dia, "fechamento", e.target.value)
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => aplicarHorarioParaTodos(dia)}
                  >
                    Aplicar para todos os dias
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={salvando}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <Save className="w-4 h-4" />
            {salvando ? "Salvando..." : "Salvar Configurações"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConfiguracoesForm;
